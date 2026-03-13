from rest_framework import viewsets, permissions, status, filters, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Sum
from django.utils import timezone
from .models import (
    User, Product, Order, Review, ProductVariant,
    Address, Cart, CartItem, WishlistItem, Coupon, Prescription
)
from .serializers import (
    UserSerializer, RegisterSerializer,
    ProductSerializer, ProductWriteSerializer,
    ReviewSerializer, OrderSerializer,
    AddressSerializer, CartSerializer,
    WishlistItemSerializer, CouponSerializer, PrescriptionSerializer,
)
import uuid


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class ProductViewSet(viewsets.ModelViewSet):
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = [
        'category', 'gender', 'frame_shape', 'frame_material',
        'rim_type', 'is_active', 'is_featured', 'is_new_arrival',
    ]
    search_fields = ['name', 'sku', 'description']
    ordering_fields = ['price', 'created_at', 'is_featured']
    ordering = ['-created_at']
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ProductWriteSerializer
        return ProductSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        qs = Product.objects.prefetch_related('images', 'variants', 'tags')
        if not (self.request.user.is_authenticated and
                (self.request.user.is_staff or self.request.user.is_superuser)):
            qs = qs.filter(is_active=True)

        min_price = self.request.query_params.get('minPrice')
        max_price = self.request.query_params.get('maxPrice')
        if min_price:
            qs = qs.filter(price__gte=min_price)
        if max_price:
            qs = qs.filter(price__lte=max_price)
        return qs


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    @action(detail=False, methods=['GET', 'PATCH'])
    def me(self, request):
        if request.method == 'GET':
            serializer = self.get_serializer(request.user)
            return Response(serializer.data)
        serializer = self.get_serializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['product']

    def get_queryset(self):
        if self.request.user.is_authenticated and self.request.user.is_staff:
            return Review.objects.all().select_related('user')
        return Review.objects.filter(is_approved=True).select_related('user')

    def get_permissions(self):
        if self.action in ['create']:
            return [permissions.IsAuthenticated()]
        if self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Order.objects.all().prefetch_related('items').order_by('-created_at')
        return Order.objects.filter(
            user=self.request.user
        ).prefetch_related('items').order_by('-created_at')

    def perform_create(self, serializer):
        order_number = f"AKL-{uuid.uuid4().hex[:8].upper()}"
        serializer.save(user=self.request.user, order_number=order_number)


class CartViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    @action(detail=False, methods=['POST'])
    def add_item(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')
        variant_id = request.data.get('variant_id')
        quantity = int(request.data.get('quantity', 1))

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        variant = None
        if variant_id:
            try:
                variant = ProductVariant.objects.get(id=variant_id)
            except ProductVariant.DoesNotExist:
                return Response({'error': 'Variant not found'}, status=status.HTTP_404_NOT_FOUND)

        item, created = CartItem.objects.get_or_create(
            cart=cart, product=product, variant=variant
        )
        if not created:
            item.quantity += quantity
        else:
            item.quantity = quantity
        item.save()

        return Response(CartSerializer(cart).data)

    @action(detail=False, methods=['DELETE'])
    def remove_item(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        item_id = request.data.get('item_id')
        CartItem.objects.filter(cart=cart, id=item_id).delete()
        return Response(CartSerializer(cart).data)

    @action(detail=False, methods=['PATCH'])
    def update_quantity(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        item_id = request.data.get('item_id')
        quantity = int(request.data.get('quantity', 1))
        CartItem.objects.filter(cart=cart, id=item_id).update(quantity=quantity)
        return Response(CartSerializer(cart).data)

    @action(detail=False, methods=['DELETE'])
    def clear(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        cart.items.all().delete()
        return Response({'message': 'Cart cleared'})


class WishlistViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        items = WishlistItem.objects.filter(user=request.user).select_related('product')
        return Response(WishlistItemSerializer(items, many=True).data)

    def create(self, request):
        product_id = request.data.get('product_id')
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        item, created = WishlistItem.objects.get_or_create(user=request.user, product=product)
        if not created:
            return Response({'message': 'Already in wishlist'}, status=status.HTTP_200_OK)
        return Response(WishlistItemSerializer(item).data, status=status.HTTP_201_CREATED)

    def destroy(self, request, pk=None):
        WishlistItem.objects.filter(user=request.user, product_id=pk).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CouponViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['POST'])
    def validate(self, request):
        code = request.data.get('code', '').strip().upper()
        try:
            coupon = Coupon.objects.get(code=code, is_active=True)
        except Coupon.DoesNotExist:
            return Response(
                {'valid': False, 'message': 'Invalid coupon code'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if coupon.expires_at and coupon.expires_at < timezone.now():
            return Response(
                {'valid': False, 'message': 'Coupon has expired'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if coupon.usage_limit and coupon.usage_count >= coupon.usage_limit:
            return Response(
                {'valid': False, 'message': 'Coupon usage limit reached'},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response({'valid': True, 'coupon': CouponSerializer(coupon).data})


class PrescriptionViewSet(viewsets.ModelViewSet):
    serializer_class = PrescriptionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Prescription.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AdminAnalyticsView(generics.GenericAPIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        total_revenue = (
            Order.objects.filter(payment_status='PAID')
            .aggregate(total=Sum('total'))['total'] or 0
        )
        total_orders = Order.objects.count()
        total_customers = User.objects.filter(role='USER').count()

        recent_orders = list(
            Order.objects.order_by('-created_at')[:5].values(
                'id', 'order_number', 'status', 'total', 'created_at'
            )
        )
        for o in recent_orders:
            o['id'] = str(o['id'])

        return Response({
            'metrics': {
                'revenue': {'value': float(total_revenue), 'trend': 'up', 'trendValue': '+12.4%'},
                'orders': {'value': total_orders, 'trend': 'up', 'trendValue': '+8%'},
                'customers': {'value': total_customers, 'trend': 'up', 'trendValue': '+184'},
                'stock': {'value': 99.2},
            },
            'revenueChart': [
                {'name': '01 Mar', 'rev': 12000}, {'name': '05 Mar', 'rev': 18000},
                {'name': '10 Mar', 'rev': 14000}, {'name': '15 Mar', 'rev': 25000},
                {'name': '20 Mar', 'rev': 32000}, {'name': '25 Mar', 'rev': 28000},
                {'name': '30 Mar', 'rev': 45000},
            ],
            'categoryChart': [
                {'name': 'Sunglasses', 'value': 45000, 'color': '#FFD700'},
                {'name': 'Eyeglasses', 'value': 32000, 'color': '#FFFFFF'},
                {'name': 'Blue Light', 'value': 18000, 'color': '#666666'},
                {'name': 'Sports', 'value': 12000, 'color': '#333333'},
            ],
            'recentOrders': recent_orders,
        })
