from django.contrib import admin
from .models import Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display  = ['product', 'user', 'rating', 'is_approved', 'is_verified', 'created_at']
    list_filter   = ['rating', 'is_approved', 'is_verified']
    search_fields = ['product__name', 'user__email', 'title', 'body']
    actions       = ['approve_reviews', 'disapprove_reviews']

    @admin.action(description='Approve selected reviews')
    def approve_reviews(self, request, queryset):
        queryset.update(is_approved=True)

    @admin.action(description='Disapprove selected reviews')
    def disapprove_reviews(self, request, queryset):
        queryset.update(is_approved=False)
