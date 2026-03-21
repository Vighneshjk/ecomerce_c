from celery import shared_task
import resend
import logging
from django.conf         import settings
from apps.users.models   import CustomUser
from apps.orders.models  import Order

logger = logging.getLogger(__name__)
resend.api_key = settings.RESEND_API_KEY


@shared_task
def send_welcome_email(user_id):
    try:
        user  = CustomUser.objects.get(id=user_id)
        params = {
            'from':    'Akela Eyewear <no-reply@akela.in>',
            'to':      [user.email],
            'subject': 'Welcome to Akela — See the World Differently',
            'html':    f'<h1>Welcome {user.name}!</h1><p>You can now try on glasses virtually.</p>',
        }
        resend.Emails.send(params)
        logger.info(f'Welcome email sent to: {user.email}')
    except Exception as e:
        logger.error(f'Welcome email failed for {user_id}: {e}')


@shared_task
def send_order_confirmation_email(order_id):
    try:
        order = Order.objects.select_related('user').get(id=order_id)
        params = {
            'from':    'Akela Eyewear <orders@akela.in>',
            'to':      [order.user.email],
            'subject': f'Order Confirmation — #{order.order_number}',
            'html':    f'<h2>Thank you for your order!</h2><p>₹{order.total} will be processed.</p>',
        }
        resend.Emails.send(params)
        logger.info(f'Order email sent to: {order.user.email}')
    except Exception as e:
        logger.error(f'Order email failed for {order_id}: {e}')


@shared_task
def send_password_reset_email(email, reset_url):
    try:
        params = {
            'from':    'Akela Eyewear <auth@akela.in>',
            'to':      [email],
            'subject': 'Password Reset Request',
            'html':    f'<h1>Reset Link:</h1><a href="{reset_url}">{reset_url}</a>',
        }
        resend.Emails.send(params)
        logger.info(f'Password reset email sent to: {email}')
    except Exception as e:
        logger.error(f'Reset email failed for {email}: {e}')
