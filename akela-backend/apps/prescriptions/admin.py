from django.contrib import admin
from .models import Prescription

@admin.register(Prescription)
class PrescriptionAdmin(admin.ModelAdmin):
    list_display  = ['user', 'name', 'pd_total', 'is_default', 'created_at']
    list_filter   = ['is_default', 'created_at']
    search_fields = ['user__email', 'name']
