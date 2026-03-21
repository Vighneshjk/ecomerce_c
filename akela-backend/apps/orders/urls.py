from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CartView, CreateOrderView, OrderViewSet

router = DefaultRouter()
router.register('', OrderViewSet, basename='order')

urlpatterns = [
    path('cart/',   CartView.as_view()),
    path('create/', CreateOrderView.as_view()),
    path('', include(router.urls)),
]
