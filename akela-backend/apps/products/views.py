from rest_framework.viewsets   import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response   import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters    import SearchFilter, OrderingFilter
from .models      import Product
from .serializers import ProductListSerializer, ProductDetailSerializer
from .filters     import ProductFilter


class ProductViewSet(ModelViewSet):
    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'featured', 'new_arrivals', 'related']:
            return [AllowAny()]
        return [IsAdminUser()]

    queryset = Product.objects.filter(
        is_active=True
    ).prefetch_related('images', 'variants', 'tags')
    lookup_field     = 'slug'
    filterset_class  = ProductFilter
    filter_backends  = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields    = ['name', 'description', 'tags__name', 'sku']
    ordering_fields  = ['price', 'created_at', 'name']
    ordering         = ['-created_at']

    def get_serializer_class(self):
        if self.action in ['retrieve', 'create', 'update', 'partial_update']:
            return ProductDetailSerializer
        return ProductListSerializer

    @action(detail=False, methods=['get'], url_path='featured')
    def featured(self, request):
        qs = self.get_queryset().filter(is_featured=True)[:12]
        return Response(
            ProductListSerializer(qs, many=True, context={'request': request}).data
        )

    @action(detail=False, methods=['get'], url_path='new-arrivals')
    def new_arrivals(self, request):
        qs = self.get_queryset().filter(is_new_arrival=True)[:12]
        return Response(
            ProductListSerializer(qs, many=True, context={'request': request}).data
        )

    @action(detail=True, methods=['get'], url_path='related')
    def related(self, request, slug=None):
        obj = self.get_object()
        qs  = self.get_queryset().filter(
            category=obj.category
        ).exclude(id=obj.id)[:8]
        return Response(
            ProductListSerializer(qs, many=True, context={'request': request}).data
        )
