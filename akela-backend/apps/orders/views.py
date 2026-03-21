import logging
from rest_framework.views       import APIView
from rest_framework.viewsets    import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response    import Response
from rest_framework.decorators  import action
from rest_framework             import status
from django.shortcuts           import get_object_or_404
from .models      import Cart, CartItem, Order
from .serializers import CartSerializer, OrderListSerializer, OrderDetailSerializer
from .services    import get_or_create_cart, add_to_cart, create_order_from_cart
from apps.users.models import Address

logger = logging.getLogger(__name__)


class CartView(APIView):

    def get(self, request):
        cart = get_or_create_cart(request)
        return Response(CartSerializer(cart).data)

    def post(self, request):
        cart = get_or_create_cart(request)
        add_to_cart(
            cart,
            request.data.get('product_id'),
            request.data.get('variant_id'),
            int(request.data.get('quantity', 1)),
        )
        return Response(CartSerializer(cart).data)

    def delete(self, request):
        cart = get_or_create_cart(request)
        CartItem.objects.filter(
            id=request.data.get('item_id'), cart=cart
        ).delete()
        return Response(CartSerializer(cart).data)

    def patch(self, request):
        cart = get_or_create_cart(request)
        item = get_object_or_404(
            CartItem,
            id=request.data.get('item_id'),
            cart=cart,
        )
        qty = int(request.data.get('quantity', 1))
        if qty < 1:
            item.delete()
        else:
            item.quantity = qty
            item.save()
        return Response(CartSerializer(cart).data)


class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        address = get_object_or_404(
            Address,
            id=request.data.get('address_id'),
            user=request.user,
        )
        cart = get_or_create_cart(request)
        order = create_order_from_cart(
            cart,
            address,
            request.data.get('payment_method', 'razorpay'),
            request.data.get('notes', ''),
            request.data.get('coupon_code', ''),
        )
        return Response(OrderDetailSerializer(order).data, status=status.HTTP_201_CREATED)


class OrderViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    http_method_names  = ['get', 'post', 'head', 'options']

    def get_queryset(self):
        return Order.objects.filter(
            user=self.request.user
        ).prefetch_related('items').order_by('-created_at')

    def get_serializer_class(self):
        return (
            OrderDetailSerializer
            if self.action == 'retrieve'
            else OrderListSerializer
        )

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        order = self.get_object()
        if order.status not in ['pending', 'confirmed']:
            return Response(
                {'error': 'Only pending or confirmed orders can be cancelled.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        order.status = 'cancelled'
        order.save(update_fields=['status', 'updated_at'])
        return Response(OrderDetailSerializer(order).data)
