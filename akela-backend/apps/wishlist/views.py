from rest_framework.views       import APIView
from rest_framework.generics    import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response    import Response
from .models      import WishlistItem
from .serializers import WishlistItemSerializer
from apps.products.models import Product, ProductVariant


class WishlistListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class   = WishlistItemSerializer

    def get_queryset(self):
        return WishlistItem.objects.filter(
            user=self.request.user
        ).select_related('product', 'variant')


class WishlistToggleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        pid     = request.data.get('product_id')
        vid     = request.data.get('variant_id')
        product = Product.objects.get(id=pid)
        variant = ProductVariant.objects.filter(id=vid).first() if vid else None
        item    = WishlistItem.objects.filter(
            user=request.user, product=product, variant=variant
        ).first()
        if item:
            item.delete()
            return Response({'action': 'removed', 'product_id': pid})
        WishlistItem.objects.create(
            user=request.user, product=product, variant=variant
        )
        return Response({'action': 'added', 'product_id': pid})
