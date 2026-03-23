import logging
from rest_framework.views       import APIView
from rest_framework.generics    import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.viewsets    import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response    import Response
from rest_framework.decorators  import action
from rest_framework             import status
from rest_framework.exceptions  import AuthenticationFailed
from rest_framework_simplejwt.tokens     import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.contrib.auth import authenticate
from django.shortcuts           import get_object_or_404
from django.db                  import models
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


# ─── Admin-only Views ────────────────────────────────────────────────────────

class AdminUserListView(APIView):
    """List all users, or approve/delete a specific user. Admin only."""
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = CustomUser.objects.all().order_by('-date_joined')
        data = []
        for u in users:
            data.append({
                'id':          u.id,
                'email':       u.email,
                'name':        u.name,
                'phone':       u.phone,
                'role':        u.role,
                'is_active':   u.is_active,
                'is_staff':    u.is_staff,
                'date_joined': u.date_joined.isoformat() if u.date_joined else None,
            })
        return Response(data)


class AdminUserDetailView(APIView):
    """View details, approve (activate), or delete a user. Admin only."""
    permission_classes = [IsAdminUser]

    def get(self, request, pk):
        from apps.orders.models import Order
        user = get_object_or_404(CustomUser, pk=pk)
        orders = Order.objects.filter(user=user)
        total_spent = orders.filter(payment_status='paid').aggregate(s=models.Sum('total'))['s'] or 0
        
        return Response({
            'id':          user.id,
            'email':       user.email,
            'name':        user.name,
            'phone':       user.phone,
            'role':        user.role,
            'is_active':   user.is_active,
            'date_joined': user.date_joined.isoformat() if user.date_joined else None,
            'analytics': {
                'total_orders': orders.count(),
                'total_spent':  str(total_spent),
                'last_order':   orders.first().created_at.isoformat() if orders.exists() else None
            }
        })

    def patch(self, request, pk):
        try:
            user = CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        action_type = request.data.get('action')
        if action_type == 'approve':
            user.is_active = True
            user.save(update_fields=['is_active'])
            return Response({'detail': f'User {user.email} approved/activated.'})
        elif action_type == 'disable':
            user.is_active = False
            user.save(update_fields=['is_active'])
            return Response({'detail': f'User {user.email} disabled.'})
        return Response({'error': 'Invalid action. Use "approve" or "disable".'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            user = CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        if user.role == 'admin':
            return Response({'error': 'Cannot delete an admin user.'}, status=status.HTTP_403_FORBIDDEN)
        email = user.email
        user.delete()
        return Response({'detail': f'User {email} deleted successfully.'})


class AdminTransactionListView(APIView):
    """List all orders/transactions for admin view with item details."""
    permission_classes = [IsAdminUser]

    def get(self, request):
        from apps.orders.models import Order
        orders = Order.objects.select_related('user').prefetch_related('items').order_by('-created_at')
        data = []
        for o in orders:
            items_data = []
            for item in o.items.all():
                items_data.append({
                    'id': item.id,
                    'name': item.product_name,
                    'qty': item.quantity,
                    'price': str(item.price),
                    'color': item.variant_color
                })
            
            data.append({
                'id':             o.id,
                'order_number':   o.order_number,
                'user_id':        o.user.id if o.user else None,
                'user_email':     o.user.email if o.user else 'Deleted User',
                'user_name':      o.user.name  if o.user else 'Deleted User',
                'status':         o.status,
                'payment_status': o.payment_status,
                'payment_method': o.payment_method,
                'payment_id':     o.payment_id,
                'total':          str(o.total),
                'item_count':     o.items.count(),
                'items':          items_data,
                'created_at':     o.created_at.isoformat() if o.created_at else None,
                'paid_at':        o.paid_at.isoformat() if o.paid_at else None,
                'shipping_address': f"{o.shipping_line1}, {o.shipping_city}, {o.shipping_pincode}" if o.shipping_line1 else None
            })
        return Response(data)


class AdminTransactionDetailView(APIView):
    """Update order status. Admin only."""
    permission_classes = [IsAdminUser]

    def patch(self, request, pk):
        from apps.orders.models import Order
        order = get_object_or_404(Order, pk=pk)
        new_status = request.data.get('status')
        if not new_status:
            return Response({'error': 'Status is required.'}, status=400)
        
        # Validate status choice
        if new_status not in dict(Order.STATUS_CHOICES):
            return Response({'error': f'Invalid status. Choose from: {", ".join(dict(Order.STATUS_CHOICES).keys())}'}, status=400)

        order.status = new_status
        # Special case: mark as paid if delivered? Or set timestamps
        from django.utils import timezone
        if new_status == 'delivered':
            order.delivered_at = timezone.now()
        elif new_status == 'shipped':
            order.shipped_at = timezone.now()
            
        order.save(update_fields=['status', 'delivered_at', 'shipped_at', 'updated_at'])
        return Response({'detail': f'Order {order.order_number} status updated to {new_status}.'})




