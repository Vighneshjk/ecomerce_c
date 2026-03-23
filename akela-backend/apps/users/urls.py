from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    HealthCheckView, RegisterView, LoginView, LogoutView,
    TokenRefreshView, MeView, ChangePasswordView,
    ForgotPasswordView, ResetPasswordView, AddressViewSet,
    AdminUserListView, AdminUserDetailView,
    AdminTransactionListView, AdminTransactionDetailView,
)

router = DefaultRouter()
router.register('addresses', AddressViewSet, basename='address')

urlpatterns = [
    path('register/',                  RegisterView.as_view()),
    path('login/',                     LoginView.as_view()),
    path('logout/',                    LogoutView.as_view()),
    path('token/refresh/',             TokenRefreshView.as_view()),
    path('me/',                        MeView.as_view()),
    path('change-password/',           ChangePasswordView.as_view()),
    path('forgot-password/',           ForgotPasswordView.as_view()),
    path('reset-password/',            ResetPasswordView.as_view()),
    path('health/',                    HealthCheckView.as_view()),
    # Admin-only endpoints
    path('admin/users/',               AdminUserListView.as_view()),
    path('admin/users/<int:pk>/',      AdminUserDetailView.as_view()),
    path('admin/transactions/',        AdminTransactionListView.as_view()),
    path('admin/transactions/<int:pk>/', AdminTransactionDetailView.as_view()),
    path('', include(router.urls)),
]
