from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
import uuid

class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(max_length=10, choices=[('USER', 'User'), ('ADMIN', 'Admin')], default='USER')
    name = models.CharField(max_length=255, null=True, blank=True)
    avatar = models.URLField(null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    
    class Meta:
        db_table = 'users'

class Address(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses')
    label = models.CharField(max_length=50, null=True, blank=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    line1 = models.CharField(max_length=255)
    line2 = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=20)
    country = models.CharField(max_length=100, default='India')
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'addresses'

class Category(models.TextChoices):
    SUNGLASSES = 'SUNGLASSES', _('Sunglasses')
    EYEGLASSES = 'EYEGLASSES', _('Eyeglasses')
    BLUELIGHT = 'BLUELIGHT', _('Blue Light')
    SPORTS = 'SPORTS', _('Sports')
    KIDS = 'KIDS', _('Kids')

class Gender(models.TextChoices):
    MEN = 'MEN', _('Men')
    WOMEN = 'WOMEN', _('Women')
    UNISEX = 'UNISEX', _('Unisex')
    KIDS = 'KIDS', _('Kids')

class FrameShape(models.TextChoices):
    ROUND = 'ROUND', _('Round')
    SQUARE = 'SQUARE', _('Square')
    RECTANGLE = 'RECTANGLE', _('Rectangle')
    AVIATOR = 'AVIATOR', _('Aviator')
    WAYFARER = 'WAYFARER', _('Wayfarer')
    CAT_EYE = 'CAT_EYE', _('Cat Eye')
    OVAL = 'OVAL', _('Oval')
    GEOMETRIC = 'GEOMETRIC', _('Geometric')

class FrameMaterial(models.TextChoices):
    ACETATE = 'ACETATE', _('Acetate')
    METAL = 'METAL', _('Metal')
    TITANIUM = 'TITANIUM', _('Titanium')
    TR90 = 'TR90', _('TR90')
    WOOD = 'WOOD', _('Wood')

class RimType(models.TextChoices):
    FULL_RIM = 'FULL_RIM', _('Full Rim')
    HALF_RIM = 'HALF_RIM', _('Half Rim')
    RIMLESS = 'RIMLESS', _('Rimless')

class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    short_description = models.TextField(null=True, blank=True)
    sku = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    compare_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    cost_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    stock = models.IntegerField(default=0)
    low_stock_threshold = models.IntegerField(default=5)
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    is_new_arrival = models.BooleanField(default=True)
    category = models.CharField(max_length=20, choices=Category.choices)
    gender = models.CharField(max_length=10, choices=Gender.choices)
    frame_shape = models.CharField(max_length=20, choices=FrameShape.choices)
    frame_material = models.CharField(max_length=20, choices=FrameMaterial.choices)
    rim_type = models.CharField(max_length=20, choices=RimType.choices)
    weight = models.FloatField(null=True, blank=True)
    model_3d_url = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'products'

class ProductImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    url = models.URLField()
    alt_text = models.CharField(max_length=255, null=True, blank=True)
    position = models.IntegerField(default=0)
    is_primary = models.BooleanField(default=False)

    class Meta:
        db_table = 'product_images'

class ProductVariant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    color_name = models.CharField(max_length=100)
    color_hex = models.CharField(max_length=10)
    stock = models.IntegerField(default=0)
    sku = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = 'product_variants'

class Tag(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)
    products = models.ManyToManyField(Product, related_name='tags')

    class Meta:
        db_table = 'tags'

class OrderStatus(models.TextChoices):
    PENDING = 'PENDING', _('Pending')
    CONFIRMED = 'CONFIRMED', _('Confirmed')
    PROCESSING = 'PROCESSING', _('Processing')
    SHIPPED = 'SHIPPED', _('Shipped')
    DELIVERED = 'DELIVERED', _('Delivered')
    CANCELLED = 'CANCELLED', _('Cancelled')
    REFUNDED = 'REFUNDED', _('Refunded')

class PaymentStatus(models.TextChoices):
    UNPAID = 'UNPAID', _('Unpaid')
    PAID = 'PAID', _('Paid')
    FAILED = 'FAILED', _('Failed')
    REFUNDED = 'REFUNDED', _('Refunded')

class PaymentMethod(models.TextChoices):
    RAZORPAY = 'RAZORPAY', _('Razorpay')
    STRIPE = 'STRIPE', _('Stripe')
    COD = 'COD', _('Cash on Delivery')

class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name='orders')
    order_number = models.CharField(max_length=20, unique=True)
    status = models.CharField(max_length=20, choices=OrderStatus.choices, default='PENDING')
    payment_status = models.CharField(max_length=20, choices=PaymentStatus.choices, default='UNPAID')
    payment_method = models.CharField(max_length=20, choices=PaymentMethod.choices)
    payment_id = models.CharField(max_length=100, null=True, blank=True)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    shipping = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    tax = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    
    shipping_name = models.CharField(max_length=255)
    shipping_line1 = models.CharField(max_length=255)
    shipping_line2 = models.CharField(max_length=255, null=True, blank=True)
    shipping_city = models.CharField(max_length=100)
    shipping_pincode = models.CharField(max_length=20)
    shipping_state = models.CharField(max_length=100)
    shipping_phone = models.CharField(max_length=20)

    notes = models.TextField(null=True, blank=True)
    tracking_number = models.CharField(max_length=100, null=True, blank=True)
    tracking_url = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    paid_at = models.DateTimeField(null=True, blank=True)
    shipped_at = models.DateTimeField(null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'orders'

class OrderItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    variant = models.ForeignKey(ProductVariant, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    product_name = models.CharField(max_length=255)
    variant_color = models.CharField(max_length=100, null=True, blank=True)
    product_image = models.URLField(null=True, blank=True)

    class Meta:
        db_table = 'order_items'

class Review(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField(default=5)
    title = models.CharField(max_length=255, null=True, blank=True)
    body = models.TextField()
    is_verified = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'reviews'

class CouponType(models.TextChoices):
    PERCENT = 'PERCENT', _('Percent')
    FLAT = 'FLAT', _('Flat')

class Coupon(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.CharField(max_length=50, unique=True)
    description = models.TextField(null=True, blank=True)
    type = models.CharField(max_length=10, choices=CouponType.choices)
    value = models.DecimalField(max_digits=10, decimal_places=2)
    min_order_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    max_discount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    usage_limit = models.IntegerField(null=True, blank=True)
    usage_count = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'coupons'

class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='carts')
    session_id = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    expires_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'carts'

class CartItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    variant = models.ForeignKey(ProductVariant, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.IntegerField(default=1)

    class Meta:
        db_table = 'cart_items'

class WishlistItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wishlist')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    variant = models.ForeignKey(ProductVariant, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'wishlist_items'

class Prescription(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='prescriptions')
    name = models.CharField(max_length=255)
    
    right_sph = models.FloatField()
    right_cyl = models.FloatField(null=True, blank=True)
    right_axis = models.IntegerField(null=True, blank=True)
    right_add = models.FloatField(null=True, blank=True)
    right_pd = models.FloatField(null=True, blank=True)
    
    left_sph = models.FloatField()
    left_cyl = models.FloatField(null=True, blank=True)
    left_axis = models.IntegerField(null=True, blank=True)
    left_add = models.FloatField(null=True, blank=True)
    left_pd = models.FloatField(null=True, blank=True)
    
    pd_total = models.FloatField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'prescriptions'
