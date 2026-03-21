from rest_framework import serializers
from .models import WishlistItem
from apps.products.serializers import ProductListSerializer, ProductVariantSerializer


class WishlistItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
    variant = ProductVariantSerializer(read_only=True)

    class Meta:
        model  = WishlistItem
        fields = ['id', 'product', 'variant', 'created_at']
