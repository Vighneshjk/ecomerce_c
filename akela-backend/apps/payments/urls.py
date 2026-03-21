from django.urls import path
from .views import (
    CreateRazorpayOrderView, VerifyRazorpayPaymentView,
    CreateStripeIntentView,  StripeWebhookView,
)

urlpatterns = [
    path('razorpay/order/',   CreateRazorpayOrderView.as_view()),
    path('razorpay/verify/',  VerifyRazorpayPaymentView.as_view()),
    path('stripe/intent/',    CreateStripeIntentView.as_view()),
    path('stripe/webhook/',   StripeWebhookView.as_view()),
]
