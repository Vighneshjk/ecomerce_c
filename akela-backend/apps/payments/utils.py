import razorpay
import stripe
import hmac
import hashlib
import logging
from django.conf import settings

logger = logging.getLogger(__name__)

# razorpay_client = razorpay.Client(
#    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
# )
stripe.api_key = settings.STRIPE_SECRET_KEY


def create_razorpay_order(amount_inr, receipt):
    razorpay_client = razorpay.Client(
        auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
    )
    amount_paise = int(float(amount_inr) * 100)
    try:
        order = razorpay_client.order.create({
            'amount':   amount_paise,
            'currency': 'INR',
            'receipt':  str(receipt),
        })
        logger.info(f'Razorpay order created: {order["id"]} for ₹{amount_inr}')
        return order
    except Exception as e:
        logger.error(f'Razorpay order creation failed: {e}')
        raise


def verify_razorpay_signature(razorpay_order_id, razorpay_payment_id, razorpay_signature):
    body     = f"{razorpay_order_id}|{razorpay_payment_id}".encode('utf-8')
    expected = hmac.new(
        settings.RAZORPAY_KEY_SECRET.encode('utf-8'),
        body,
        hashlib.sha256,
    ).hexdigest()
    result = hmac.compare_digest(expected, razorpay_signature)
    if not result:
        logger.warning(
            f'Invalid Razorpay signature for order {razorpay_order_id}'
        )
    return result


def create_stripe_payment_intent(amount_inr, order_number):
    amount_paise = int(float(amount_inr) * 100)
    try:
        intent = stripe.PaymentIntent.create(
            amount   = amount_paise,
            currency = 'inr',
            metadata = {'order_number': str(order_number)},
        )
        logger.info(f'Stripe intent created: {intent.id} for ₹{amount_inr}')
        return intent
    except Exception as e:
        logger.error(f'Stripe intent creation failed: {e}')
        raise
