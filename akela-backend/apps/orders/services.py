from decimal import Decimal
from django.db.models import F
from django.shortcuts  import get_object_or_404
from rest_framework.exceptions import ValidationError
from .models import Cart, CartItem, Order, OrderItem
from apps.products.models import Product, ProductVariant
from apps.users.models    import Address
import logging

logger = logging.getLogger(__name__)


def get_or_create_cart(request):
    if request.user.is_authenticated:
        cart, _ = Cart.objects.get_or_create(
            user=request.user,
            defaults={'session_key': ''},
        )
        return cart
    if not request.session.session_key:
        request.session.create()
    cart, _ = Cart.objects.get_or_create(
        session_key=request.session.session_key,
        user=None,
    )
    return cart


def add_to_cart(cart, product_id, variant_id, quantity):
    if quantity < 1:
        raise ValidationError('Quantity must be at least 1.')

    product = get_object_or_404(Product, id=product_id, is_active=True)
    variant = None

    if variant_id:
        variant = get_object_or_404(ProductVariant, id=variant_id, product=product)

    available_stock = variant.stock if variant else product.stock

    if quantity > available_stock:
        raise ValidationError(
            f'Only {available_stock} item(s) available in stock.'
        )

    item, created = CartItem.objects.get_or_create(
        cart=cart, product=product, variant=variant
    )

    if not created:
        new_qty = item.quantity + quantity
        if new_qty > available_stock:
            raise ValidationError(
                f'Cannot add {quantity} more. Only {available_stock - item.quantity} remaining.'
            )
        item.quantity = new_qty
    else:
        item.quantity = quantity

    item.save()
    logger.info(f'Cart {cart.id}: added {product.name} x{quantity}')
    return item


def calculate_totals(cart):
    items    = cart.items.select_related('product').all()
    subtotal = sum(item.product.price * item.quantity for item in items)
    shipping = Decimal('0') if subtotal >= 999 else Decimal('99')
    tax      = (subtotal * Decimal('0.18')).quantize(Decimal('0.01'))
    total    = subtotal + shipping + tax
    return {
        'subtotal': subtotal,
        'shipping': shipping,
        'tax':      tax,
        'total':    total,
    }


def create_order_from_cart(cart, address, payment_method, notes='', coupon_code=''):
    if not cart.items.exists():
        raise ValidationError('Your cart is empty.')

    totals   = calculate_totals(cart)
    discount = Decimal('0')

    order = Order.objects.create(
        user           = cart.user,
        status         = 'pending',
        payment_method = payment_method,
        subtotal       = totals['subtotal'],
        discount       = discount,
        shipping       = totals['shipping'],
        tax            = totals['tax'],
        total          = totals['total'] - discount,
        shipping_name    = f"{address.first_name} {address.last_name}",
        shipping_phone   = address.phone,
        shipping_line1   = address.line1,
        shipping_line2   = address.line2,
        shipping_city    = address.city,
        shipping_state   = address.state,
        shipping_pincode = address.pincode,
        shipping_country = address.country,
        notes          = notes,
        coupon_code    = coupon_code,
    )

    for item in cart.items.select_related('product', 'variant').all():
        primary = item.product.primary_image
        image_url = primary.image.url if primary and primary.image else ''

        OrderItem.objects.create(
            order         = order,
            product       = item.product,
            variant       = item.variant,
            quantity      = item.quantity,
            price         = item.product.price,
            product_name  = item.product.name,
            variant_color = item.variant.color_name if item.variant else '',
            product_image = image_url,
        )

        if item.variant:
            ProductVariant.objects.filter(
                id=item.variant.id
            ).update(stock=F('stock') - item.quantity)
        else:
            Product.objects.filter(
                id=item.product.id
            ).update(stock=F('stock') - item.quantity)

    cart.items.all().delete()
    logger.info(f'Order {order.order_number} created from cart {cart.id}')
    return order
