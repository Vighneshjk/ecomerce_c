from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Order

@receiver(post_save, sender=Order)
def update_stock_on_failure(sender, instance, **kwargs):
    if instance.payment_status == 'failed':
        # Logic to restock items if needed
        pass
