from django.contrib import admin
from .models import Product, ProductImage, ProductVariant, Tag

class ImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

class VariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display  = ['name', 'price', 'category', 'gender', 'stock', 'is_active', 'is_featured']
    list_filter   = ['category', 'gender', 'is_active', 'is_featured']
    search_fields = ['name', 'sku', 'slug']
    prepopulated_fields = {'slug': ('name',)}
    inlines      = [ImageInline, VariantInline]

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display  = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}
