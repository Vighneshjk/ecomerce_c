from rest_framework import serializers
from .models import Cart, CartItem, Order, OrderItem
from apps.products.serializers import ProductListSerializer, ProductVariantSerializer


class CartItemSerializer(serializers.ModelSerializer):
    product    = ProductListSerializer(read_only=True)
    variant    = ProductVariantSerializer(read_only=True)
    line_total = serializers.SerializerMethodField()

    def get_line_total(self, obj):
        return round(float(obj.product.price) * obj.quantity, 2)

    class Meta:
        model  = CartItem
        fields = ['id', 'product', 'variant', 'quantity', 'line_total']


class CartSerializer(serializers.ModelSerializer):
    items      = CartItemSerializer(many=True, read_only=True)
    item_count = serializers.SerializerMethodField()
    subtotal   = serializers.SerializerMethodField()
    shipping   = serializers.SerializerMethodField()
    tax        = serializers.SerializerMethodField()
    total      = serializers.SerializerMethodField()

    def get_item_count(self, obj):
        return sum(i.quantity for i in obj.items.all())

    def get_subtotal(self, obj):
        return round(sum(float(i.product.price) * i.quantity for i in obj.items.all()), 2)

    def get_shipping(self, obj):
        subtotal = self.get_subtotal(obj)
        return 0 if subtotal >= 999 else 99

    def get_tax(self, obj):
        return round(self.get_subtotal(obj) * 0.18, 2)

    def get_total(self, obj):
        subtotal = self.get_subtotal(obj)
        shipping = self.get_shipping(obj)
        tax      = self.get_tax(obj)
        return round(subtotal + shipping + tax, 2)

    class Meta:
        model  = Cart
        fields = ['id', 'items', 'item_count', 'subtotal', 'shipping', 'tax', 'total']


class OrderItemSerializer(serializers.ModelSerializer):
    line_total = serializers.SerializerMethodField()

    def get_line_total(self, obj):
        return round(float(obj.price) * obj.quantity, 2)

    class Meta:
        model  = OrderItem
        fields = [
            'id', 'product_name', 'variant_color', 'product_image',
            'quantity', 'price', 'line_total',
        ]


class OrderListSerializer(serializers.ModelSerializer):
    item_count = serializers.SerializerMethodField()

    def get_item_count(self, obj):
        return obj.items.count()

    class Meta:
        model  = Order
        fields = [
            'id', 'order_number', 'status', 'payment_status',
            'total', 'created_at', 'item_count',
        ]


class OrderDetailSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model  = Order
        fields = '__all__'
