from django.contrib import admin
from .models import CustomUser, Address

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display  = ['email', 'name', 'role', 'is_active', 'date_joined']
    list_filter   = ['role', 'is_active']
    search_fields = ['email', 'name', 'phone']
    ordering      = ['-date_joined']

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display  = ['user', 'label', 'city', 'state', 'is_default']
    list_filter   = ['state', 'is_default']
    search_fields = ['user__email', 'line1', 'city', 'pincode']
