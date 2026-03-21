from django.contrib import admin
from .models import WishlistItem

@admin.register(WishlistItem)
class WishlistAdmin(admin.ModelAdmin):
    list_display  = ['user', 'product', 'variant', 'created_at']
    list_filter   = ['created_at']
    search_fields = ['user__email', 'product__name']
