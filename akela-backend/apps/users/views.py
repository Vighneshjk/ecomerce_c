import logging
from rest_framework.views       import APIView
from rest_framework.generics    import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.viewsets    import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response    import Response
from rest_framework.decorators  import action
from rest_framework             import status
from rest_framework.exceptions  import AuthenticationFailed
from rest_framework_simplejwt.tokens     import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.contrib.auth import authenticate
from django.utils        import timezone
from datetime            import timedelta
from django.conf         import settings
from .models      import CustomUser, Address, PasswordResetToken
from .serializers import (
    UserSerializer, UserUpdateSerializer, UserRegisterSerializer,
    ChangePasswordSerializer, AddressSerializer,
)
from core.throttles import LoginThrottle, RegisterThrottle

logger = logging.getLogger(__name__)


def make_token_response(user, status_code=200):
    refresh = RefreshToken.for_user(user)
    return Response(
        {
            'user':    UserSerializer(user).data,
            'access':  str(refresh.access_token),
            'refresh': str(refresh),
        },
        status=status_code,
    )


class HealthCheckView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        from django.db import connection
        try:
            connection.cursor()
            db_status = 'connected'
        except Exception:
            db_status = 'error'
        return Response({'status': 'ok', 'database': db_status})


class RegisterView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class   = UserRegisterSerializer
    # throttle_classes   = [RegisterThrottle]
    # throttle_scope     = 'register'

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        try:
            from apps.notifications.tasks import send_welcome_email
            send_welcome_email.delay(user.id)
        except Exception as e:
            logger.warning(f'Welcome email queue failed for user {user.id}: {e}')
        return make_token_response(user, status_code=201)


class LoginView(APIView):
    permission_classes = [AllowAny]
    # throttle_classes   = [LoginThrottle]
    # throttle_scope     = 'login'

    def post(self, request):
        email    = request.data.get('email', '').strip().lower()
        password = request.data.get('password', '')
        if not email or not password:
            raise AuthenticationFailed('Email and password are required.')
        user = authenticate(request, username=email, password=password)
        if user is None:
            logger.warning(f'Failed login attempt for: {email}')
            raise AuthenticationFailed('Invalid email or password.')
        if not user.is_active:
            raise AuthenticationFailed('This account has been disabled.')
        logger.info(f'Successful login for user {user.id}')
        return make_token_response(user)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get('refresh', '')
        if refresh_token:
            try:
                RefreshToken(refresh_token).blacklist()
            except TokenError:
                pass
        return Response({'detail': 'Successfully logged out.'})


class TokenRefreshView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.data.get('refresh', '')
        if not refresh_token:
            return Response(
                {'error': 'Refresh token is required.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            token  = RefreshToken(refresh_token)
            access = str(token.access_token)
            if settings.SIMPLE_JWT.get('ROTATE_REFRESH_TOKENS', False):
                token.blacklist()
                user        = CustomUser.objects.get(id=token['user_id'])
                new_refresh = str(RefreshToken.for_user(user))
                return Response({'access': access, 'refresh': new_refresh})
            return Response({'access': access})
        except TokenError:
            return Response(
                {'error': 'Invalid or expired refresh token.'},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class MeView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        return (
            UserUpdateSerializer
            if self.request.method in ('PUT', 'PATCH')
            else UserSerializer
        )

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, *args, **kwargs)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(
            data=request.data, context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'detail': 'Password changed successfully. Please log in again.'})


class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email', '').strip().lower()
        if email:
            try:
                user = CustomUser.objects.get(email=email)
                PasswordResetToken.objects.filter(
                    user=user, is_used=False
                ).update(is_used=True)
                token = PasswordResetToken.objects.create(
                    user       = user,
                    expires_at = timezone.now() + timedelta(hours=1),
                )
                url = f"{settings.FRONTEND_URL}/auth/reset-password?token={token.token}"
                from apps.notifications.tasks import send_password_reset_email
                send_password_reset_email.delay(user.email, url)
                logger.info(f'Password reset requested for: {email}')
            except CustomUser.DoesNotExist:
                logger.info(f'Reset attempt for non-existent email: {email}')
        return Response(
            {'detail': 'If that email exists, a reset link has been sent.'}
        )


class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        import re
        token_str    = request.data.get('token', '').strip()
        new_password = request.data.get('new_password', '')

        if not token_str:
            return Response(
                {'error': 'Reset token is required.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if len(new_password) < 8:
            return Response(
                {'error': 'Password must be at least 8 characters.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if not re.search(r'[A-Za-z]', new_password) or not re.search(r'\d', new_password):
            return Response(
                {'error': 'Password must contain at least one letter and one number.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            token = PasswordResetToken.objects.select_related('user').get(
                token=token_str, is_used=False
            )
        except PasswordResetToken.DoesNotExist:
            return Response(
                {'error': 'Invalid or expired reset token.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if token.expires_at < timezone.now():
            token.is_used = True
            token.save()
            return Response(
                {'error': 'This reset link has expired. Please request a new one.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        token.user.set_password(new_password)
        token.user.save()
        token.is_used = True
        token.save()
        logger.info(f'Password reset successful for user {token.user.id}')
        return Response({'detail': 'Password reset successfully. You can now log in.'})


class AddressViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class   = AddressSerializer

    def get_queryset(self):
        return Address.objects.filter(
            user=self.request.user
        ).order_by('-is_default', '-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def set_default(self, request, pk=None):
        address            = self.get_object()
        address.is_default = True
        address.save()
        return Response(AddressSerializer(address).data)
