from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class Review(models.Model):
    user        = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE)
    product     = models.ForeignKey(
        'products.Product', on_delete=models.CASCADE, related_name='reviews'
    )
    rating      = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    title       = models.CharField(max_length=200)
    body        = models.TextField()
    is_verified = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=True)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user.name} — {self.product.name} — {self.rating}★'

    class Meta:
        db_table        = 'reviews'
        unique_together = [['user', 'product']]
        ordering        = ['-created_at']
