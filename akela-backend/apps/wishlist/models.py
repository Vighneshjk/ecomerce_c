from django.db import models


class WishlistItem(models.Model):
    user       = models.ForeignKey(
        'users.CustomUser', on_delete=models.CASCADE, related_name='wishlist'
    )
    product    = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    variant    = models.ForeignKey(
        'products.ProductVariant', on_delete=models.SET_NULL, null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.email} — {self.product.name}'

    class Meta:
        db_table        = 'wishlist_items'
        unique_together = [['user', 'product', 'variant']]
