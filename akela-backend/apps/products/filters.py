import django_filters
from .models import Product
from django.db import models


class ProductFilter(django_filters.FilterSet):
    category       = django_filters.CharFilter(field_name='category')
    gender         = django_filters.CharFilter(field_name='gender')
    frame_shape    = django_filters.CharFilter(field_name='frame_shape')
    frame_material = django_filters.CharFilter(field_name='frame_material')
    rim_type       = django_filters.CharFilter(field_name='rim_type')
    min_price      = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price      = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    is_featured    = django_filters.BooleanFilter(field_name='is_featured')
    is_new_arrival = django_filters.BooleanFilter(field_name='is_new_arrival')
    tag            = django_filters.CharFilter(field_name='tags__slug')
    search         = django_filters.CharFilter(method='filter_search')

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            models.Q(name__icontains=value) |
            models.Q(description__icontains=value) |
            models.Q(tags__name__icontains=value)
        ).distinct()

    class Meta:
        model  = Product
        fields = ['category', 'gender', 'frame_shape', 'frame_material', 'rim_type']
