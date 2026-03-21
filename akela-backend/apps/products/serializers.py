from rest_framework import serializers
from django.db.models import Avg
from .models import Product, ProductImage, ProductVariant, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Tag
        fields = ['id', 'name', 'slug']


class ProductImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        return obj.image.url if obj.image else None

    class Meta:
        model  = ProductImage
        fields = ['id', 'image', 'alt_text', 'position', 'is_primary']


class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model  = ProductVariant
        fields = ['id', 'color_name', 'color_hex', 'stock', 'sku']


class ProductListSerializer(serializers.ModelSerializer):
    primary_image    = ProductImageSerializer(read_only=True)
    variants         = ProductVariantSerializer(many=True, read_only=True)
    discount_percent = serializers.IntegerField(read_only=True)
    average_rating   = serializers.SerializerMethodField()
    review_count     = serializers.SerializerMethodField()

    def get_average_rating(self, obj):
        result = obj.reviews.filter(is_approved=True).aggregate(avg=Avg('rating'))
        return round(result['avg'], 1) if result['avg'] else 0

    def get_review_count(self, obj):
        return obj.reviews.filter(is_approved=True).count()

    class Meta:
        model  = Product
        fields = [
            'id', 'name', 'slug', 'price', 'compare_price', 'discount_percent',
            'category', 'gender', 'frame_shape', 'is_featured', 'is_new_arrival',
            'stock', 'primary_image', 'variants', 'average_rating', 'review_count',
        ]


class ProductDetailSerializer(ProductListSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    tags   = TagSerializer(many=True, read_only=True)

    class Meta(ProductListSerializer.Meta):
        fields = ProductListSerializer.Meta.fields + [
            'description', 'short_description', 'sku', 'frame_material',
            'rim_type', 'weight', 'model_3d_url', 'low_stock_threshold',
            'images', 'tags', 'created_at', 'updated_at',
        ]
