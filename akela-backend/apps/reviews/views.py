from rest_framework.viewsets    import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models      import Review
from .serializers import ReviewSerializer, CreateReviewSerializer


class ReviewViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    http_method_names  = ['get', 'post', 'delete', 'head', 'options']

    def get_queryset(self):
        qs   = Review.objects.filter(is_approved=True).select_related('user')
        slug = self.request.query_params.get('product')
        if slug:
            qs = qs.filter(product__slug=slug)
        return qs.order_by('-created_at')

    def get_serializer_class(self):
        return (
            CreateReviewSerializer
            if self.request.method == 'POST'
            else ReviewSerializer
        )
