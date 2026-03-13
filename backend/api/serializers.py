from rest_framework import serializers
from django.contrib.auth import password_validation
from .models import (
    User, Address, Product, ProductImage, ProductVariant, Tag,
    Order, OrderItem, Review, Coupon, Cart, CartItem, WishlistItem, Prescription
)


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password', 'name', 'phone']
        read_only_fields = ['id']

    def validate_password(self, value):
        password_validation.validate_password(value)
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'role', 'avatar', 'phone']
        read_only_fields = ['id', 'role']


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'url', 'alt_text', 'position', 'is_primary']


class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ['id', 'color_name', 'color_hex', 'stock', 'sku']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'short_description', 'sku',
            'price', 'compare_price', 'cost_price', 'stock', 'low_stock_threshold',
            'is_active', 'is_featured', 'is_new_arrival', 'category', 'gender',
            'frame_shape', 'frame_material', 'rim_type', 'weight', 'model_3d_url',
            'created_at', 'updated_at', 'images', 'variants', 'tags',
        ]


class ProductWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'name', 'slug', 'description', 'short_description', 'sku',
            'price', 'compare_price', 'cost_price', 'stock', 'low_stock_threshold',
            'is_active', 'is_featured', 'is_new_arrival', 'category', 'gender',
            'frame_shape', 'frame_material', 'rim_type', 'weight', 'model_3d_url',
        ]


class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)
    user_avatar = serializers.URLField(source='user.avatar', read_only=True)

    class Meta:
        model = Review
        fields = [
            'id', 'user', 'user_name', 'user_avatar', 'product',
            'rating', 'title', 'body', 'is_verified', 'is_approved', 'created_at',
        ]
        read_only_fields = ['id', 'user', 'is_verified', 'is_approved', 'created_at']


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = [
            'id', 'product', 'variant', 'quantity', 'price',
            'product_name', 'variant_color', 'product_image',
        ]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['id', 'user', 'order_number', 'created_at', 'updated_at']


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = '__all__'
        read_only_fields = ['id', 'usage_count', 'created_at']


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.UUIDField(write_only=True)
    variant = ProductVariantSerializer(read_only=True)
    variant_id = serializers.UUIDField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'variant', 'variant_id', 'quantity']
        read_only_fields = ['id']


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'items', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class WishlistItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = WishlistItem
        fields = ['id', 'product', 'product_id', 'variant', 'created_at']
        read_only_fields = ['id', 'created_at']


class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at']
