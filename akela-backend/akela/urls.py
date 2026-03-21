from django.contrib import admin
from django.urls    import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('django-admin/',      admin.site.urls),
    path('api/auth/',          include('apps.users.urls')),
    path('api/products/',      include('apps.products.urls')),
    path('api/orders/',        include('apps.orders.urls')),
    path('api/payments/',      include('apps.payments.urls')),
    path('api/reviews/',       include('apps.reviews.urls')),
    path('api/wishlist/',      include('apps.wishlist.urls')),
    path('api/prescriptions/', include('apps.prescriptions.urls')),
    path('api/tryon/',         include('apps.tryon.urls')),
    path('api/schema/',        SpectacularAPIView.as_view(),         name='schema'),
    path('api/docs/',          SpectacularSwaggerView.as_view(
                                   url_name='schema'), name='docs'),
]
