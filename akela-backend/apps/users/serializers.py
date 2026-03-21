import re
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from .models import CustomUser, Address


class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    def get_avatar(self, obj):
        return obj.avatar.url if obj.avatar else None

    class Meta:
        model        = CustomUser
        fields       = ['id', 'email', 'name', 'phone', 'avatar', 'role', 'date_joined']
        read_only_fields = ['id', 'email', 'role', 'date_joined']


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = CustomUser
        fields = ['name', 'phone']

    def validate_name(self, value):
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError('Name must be at least 2 characters.')
        if len(value) > 150:
            raise serializers.ValidationError('Name cannot exceed 150 characters.')
        return re.sub(r'<[^>]+>', '', value)

    def validate_phone(self, value):
        if not value:
            return value
        value = re.sub(r'\s+', '', value.strip())
        if not re.match(r'^(\+91)?[6-9]\d{9}$', value):
            raise serializers.ValidationError('Enter a valid 10-digit Indian mobile number.')
        return value


class UserRegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model        = CustomUser
        fields       = ['email', 'name', 'password', 'confirm_password']
        extra_kwargs = {'password': {'write_only': True, 'min_length': 8}}

    def validate_email(self, value):
        value = value.strip().lower()
        if not re.match(
            r'^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$', value
        ):
            raise serializers.ValidationError('Enter a valid email address.')
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError('An account with this email already exists.')
        return value

    def validate_name(self, value):
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError('Name must be at least 2 characters.')
        return re.sub(r'<[^>]+>', '', value)

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError('Password must be at least 8 characters.')
        if not re.search(r'[A-Za-z]', value):
            raise serializers.ValidationError('Password must contain at least one letter.')
        if not re.search(r'\d', value):
            raise serializers.ValidationError('Password must contain at least one number.')
        try:
            validate_password(value)
        except DjangoValidationError as e:
            raise serializers.ValidationError(list(e.messages))
        return value

    def validate(self, data):
        if data['password'] != data.pop('confirm_password'):
            raise serializers.ValidationError(
                {'confirm_password': 'Passwords do not match.'}
            )
        return data

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)


class ChangePasswordSerializer(serializers.Serializer):
    old_password         = serializers.CharField(required=True, write_only=True)
    new_password         = serializers.CharField(required=True, write_only=True)
    confirm_new_password = serializers.CharField(required=True, write_only=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Current password is incorrect.')
        return value

    def validate_new_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError('Password must be at least 8 characters.')
        if not re.search(r'[A-Za-z]', value):
            raise serializers.ValidationError('Password must contain at least one letter.')
        if not re.search(r'\d', value):
            raise serializers.ValidationError('Password must contain at least one number.')
        return value

    def validate(self, data):
        if data['new_password'] != data['confirm_new_password']:
            raise serializers.ValidationError(
                {'confirm_new_password': 'New passwords do not match.'}
            )
        if data['old_password'] == data['new_password']:
            raise serializers.ValidationError(
                {'new_password': 'New password must differ from your current password.'}
            )
        return data

    def save(self):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model   = Address
        exclude = ['user']

    def validate_phone(self, value):
        value = re.sub(r'\s+', '', value.strip())
        if not re.match(r'^(\+91)?[6-9]\d{9}$', value):
            raise serializers.ValidationError('Enter a valid 10-digit Indian mobile number.')
        return value

    def validate_pincode(self, value):
        value = value.strip()
        if not re.match(r'^\d{6}$', value):
            raise serializers.ValidationError('Enter a valid 6-digit Indian pincode.')
        return value

    def validate_line1(self, value):
        value = value.strip()
        if len(value) < 5:
            raise serializers.ValidationError('Address line must be at least 5 characters.')
        return re.sub(r'<[^>]+>', '', value)
