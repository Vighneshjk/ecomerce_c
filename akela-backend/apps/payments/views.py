import json
import logging
import stripe
from rest_framework.views       import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response    import Response
from rest_framework             import status
from django.shortcuts           import get_object_or_404
from django.utils               import timezone
from django.conf                import settings
from apps.orders.models         import Order
from .utils import (
    create_razorpay_order, verify_razorpay_signature,
    create_stripe_payment_intent,
)

logger = logging.getLogger(__name__)


class CreateRazorpayOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        order_number = request.data.get('order_number')
        order        = get_object_or_404(
            Order, order_number=order_number, user=request.user
        )
        try:
            rzp_order = create_razorpay_order(
                order.total, f"Order {order_number}"
            )
            order.payment_id = rzp_order['id']
            order.save(update_fields=['payment_id', 'updated_at'])
            return Response({
                'id':       rzp_order['id'],
                'amount':   rzp_order['amount'],
                'currency': rzp_order['currency'],
                'key':      settings.RAZORPAY_KEY_ID,
            })
        except Exception as e:
            logger.error(f'Razorpay order creation failed for {order_number}: {e}')
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class VerifyRazorpayPaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        razorpay_order_id   = request.data.get('razorpay_order_id')
        razorpay_payment_id = request.data.get('razorpay_payment_id')
        razorpay_signature  = request.data.get('razorpay_signature')
        order_number        = request.data.get('order_number')

        order = get_object_or_404(
            Order, order_number=order_number, user=request.user
        )
        if verify_razorpay_signature(
            razorpay_order_id, razorpay_payment_id, razorpay_signature
        ):
            order.payment_status = 'paid'
            order.status         = 'confirmed'
            order.payment_id     = razorpay_payment_id
            order.paid_at        = timezone.now()
            order.save()
            try:
                from apps.notifications.tasks import send_order_confirmation_email
                send_order_confirmation_email.delay(order.id)
            except Exception as e:
                logger.warning(f'Order confirmation email queue failed for {order.id}: {e}')
            return Response({'status': 'Payment verified and order confirmed.'})
        else:
            order.payment_status = 'failed'
            order.save()
            return Response(
                {'error': 'Invalid signature. Payment verification failed.'},
                status=status.HTTP_400_BAD_REQUEST,
            )


class CreateStripeIntentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        order_number = request.data.get('order_number')
        order        = get_object_or_404(Order, order_number=order_number, user=request.user)
        try:
            intent = create_stripe_payment_intent(order.total, order_number)
            order.payment_id = intent.id
            order.save(update_fields=['payment_id', 'updated_at'])
            return Response({'client_secret': intent.client_secret})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class StripeWebhookView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        payload    = request.body
        sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
            )
        except (ValueError, stripe.error.SignatureVerificationError) as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        if event['type'] == 'payment_intent.succeeded':
            intent       = event['data']['object']
            order_number = intent['metadata'].get('order_number')
            order        = Order.objects.filter(order_number=order_number).first()
            if order:
                order.payment_status = 'paid'
                order.status         = 'confirmed'
                order.payment_id     = intent['id']
                order.paid_at        = timezone.now()
                order.save()
                try:
                    from apps.notifications.tasks import send_order_confirmation_email
                    send_order_confirmation_email.delay(order.id)
                except Exception as e:
                    logger.warning(f'Webhook email queue failed for {order.id}: {e}')
                logger.info(f'Stripe order {order_number} confirmed via webhook.')
        return Response({'status': 'success'})
