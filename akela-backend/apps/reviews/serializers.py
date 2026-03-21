import re
from rest_framework import serializers
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()

    def get_user_name(self, obj):
        return obj.user.name

    class Meta:
        model  = Review
        fields = ['id', 'user_name', 'rating', 'title', 'body', 'is_verified', 'created_at']


class CreateReviewSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField(write_only=True)

    class Meta:
        model  = Review
        fields = ['product_id', 'rating', 'title', 'body']

    def validate_rating(self, value):
        if not 1 <= value <= 5:
            raise serializers.ValidationError('Rating must be between 1 and 5.')
        return value

    def validate_title(self, value):
        value = value.strip()
        if len(value) < 3:
            raise serializers.ValidationError('Title must be at least 3 characters.')
        if len(value) > 200:
            raise serializers.ValidationError('Title cannot exceed 200 characters.')
        return re.sub(r'<[^>]+>', '', value)

    def validate_body(self, value):
        value = value.strip()
        if len(value) < 10:
            raise serializers.ValidationError('Review must be at least 10 characters.')
        if len(value) > 2000:
            raise serializers.ValidationError('Review cannot exceed 2000 characters.')
        return re.sub(r'<[^>]+>', '', value)

    def validate_product_id(self, value):
        from apps.products.models import Product
        if not Product.objects.filter(id=value, is_active=True).exists():
            raise serializers.ValidationError('Product not found.')
        return value

    def validate(self, data):
        user = self.context['request'].user
        if Review.objects.filter(user=user, product_id=data['product_id']).exists():
            raise serializers.ValidationError('You have already reviewed this product.')
        return data

    def create(self, validated_data):
        from apps.orders.models import Order
        user       = self.context['request'].user
        product_id = validated_data.pop('product_id')
        is_verified = Order.objects.filter(
            user=user, status='delivered', items__product_id=product_id
        ).exists()
        return Review.objects.create(
            user=user, product_id=product_id,
            is_verified=is_verified, **validated_data
        )
