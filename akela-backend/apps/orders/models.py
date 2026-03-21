from django.db import models
import random
import string


class Cart(models.Model):
    user        = models.ForeignKey(
        'users.CustomUser', on_delete=models.SET_NULL,
        null=True, blank=True
    )
    session_key = models.CharField(max_length=100, blank=True)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Cart {self.id} — {self.user or self.session_key}'

    class Meta:
        db_table = 'carts'


class CartItem(models.Model):
    cart     = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product  = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    variant  = models.ForeignKey(
        'products.ProductVariant', on_delete=models.SET_NULL,
        null=True, blank=True
    )
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f'{self.product.name} x{self.quantity}'

    class Meta:
        db_table        = 'cart_items'
        unique_together = [['cart', 'product', 'variant']]


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending',     'Pending'),
        ('confirmed',   'Confirmed'),
        ('processing',  'Processing'),
        ('shipped',     'Shipped'),
        ('delivered',   'Delivered'),
        ('cancelled',   'Cancelled'),
        ('refunded',    'Refunded'),
    ]
    PAY_STATUS_CHOICES = [
        ('unpaid',   'Unpaid'),
        ('paid',     'Paid'),
        ('failed',   'Failed'),
        ('refunded', 'Refunded'),
    ]
    PAY_METHOD_CHOICES = [
        ('razorpay', 'Razorpay'),
        ('stripe',   'Stripe'),
        ('cod',      'Cash on Delivery'),
    ]

    user           = models.ForeignKey(
        'users.CustomUser', on_delete=models.SET_NULL, null=True
    )
    order_number   = models.CharField(max_length=20, unique=True, blank=True)
    status         = models.CharField(max_length=20, choices=STATUS_CHOICES,     default='pending')
    payment_status = models.CharField(max_length=20, choices=PAY_STATUS_CHOICES, default='unpaid')
    payment_method = models.CharField(max_length=20, choices=PAY_METHOD_CHOICES, blank=True)
    payment_id     = models.CharField(max_length=200, blank=True)

    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    shipping = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    tax      = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total    = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    shipping_name    = models.CharField(max_length=255, blank=True)
    shipping_phone   = models.CharField(max_length=20,  blank=True)
    shipping_line1   = models.CharField(max_length=255, blank=True)
    shipping_line2   = models.CharField(max_length=255, blank=True)
    shipping_city    = models.CharField(max_length=100, blank=True)
    shipping_state   = models.CharField(max_length=100, blank=True)
    shipping_pincode = models.CharField(max_length=10,  blank=True)
    shipping_country = models.CharField(max_length=100, blank=True, default='India')

    notes           = models.TextField(blank=True)
    tracking_number = models.CharField(max_length=200, blank=True)
    tracking_url    = models.CharField(max_length=500, blank=True)
    coupon_code     = models.CharField(max_length=50,  blank=True)

    created_at   = models.DateTimeField(auto_now_add=True)
    updated_at   = models.DateTimeField(auto_now=True)
    paid_at      = models.DateTimeField(null=True, blank=True)
    shipped_at   = models.DateTimeField(null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.order_number:
            self.order_number = 'AKL-' + ''.join(random.choices(string.digits, k=6))
        super().save(*args, **kwargs)

    def __str__(self):
        return self.order_number

    class Meta:
        db_table = 'orders'
        ordering = ['-created_at']


class OrderItem(models.Model):
    order         = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product       = models.ForeignKey(
        'products.Product', on_delete=models.SET_NULL, null=True
    )
    variant       = models.ForeignKey(
        'products.ProductVariant', on_delete=models.SET_NULL, null=True, blank=True
    )
    quantity      = models.IntegerField()
    price         = models.DecimalField(max_digits=10, decimal_places=2)
    product_name  = models.CharField(max_length=255)
    variant_color = models.CharField(max_length=100, blank=True)
    product_image = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return f'{self.product_name} x{self.quantity}'

    class Meta:
        db_table = 'order_items'
