from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOwner(BasePermission):
    message = 'You do not have permission to access this resource.'
    def has_object_permission(self, request, view, obj):
        return hasattr(obj, 'user') and obj.user == request.user

class IsAdminRole(BasePermission):
    message = 'Admin access required.'
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            getattr(request.user, 'role', None) == 'admin'
        )

class IsOwnerOrAdmin(BasePermission):
    message = 'You must be the owner or an administrator.'
    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False
        if getattr(request.user, 'role', None) == 'admin':
            return True
        return hasattr(obj, 'user') and obj.user == request.user

class IsAdminOrReadOnly(BasePermission):
    message = 'Write access requires admin role.'
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(
            request.user and
            request.user.is_authenticated and
            getattr(request.user, 'role', None) == 'admin'
        )

class IsVerifiedPurchaser(BasePermission):
    message = 'Only verified purchasers can write reviews.'
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        if not request.user or not request.user.is_authenticated:
            return False
        product_id = request.data.get('product_id')
        if not product_id:
            return True
        from apps.orders.models import Order
        return Order.objects.filter(
            user=request.user,
            status='delivered',
            items__product_id=product_id,
        ).exists()
