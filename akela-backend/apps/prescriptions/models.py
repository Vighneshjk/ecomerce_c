from django.db import models


class Prescription(models.Model):
    user       = models.ForeignKey(
        'users.CustomUser', on_delete=models.CASCADE, related_name='prescriptions'
    )
    name       = models.CharField(max_length=100, default='My Prescription')
    right_sph  = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    right_cyl  = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    right_axis = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    right_add  = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    right_pd   = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    left_sph   = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    left_cyl   = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    left_axis  = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    left_add   = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    left_pd    = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    pd_total   = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    notes      = models.TextField(blank=True)
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.is_default:
            Prescription.objects.filter(user=self.user).exclude(pk=self.pk).update(is_default=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.user.email} — {self.name}'

    class Meta:
        db_table = 'prescriptions'
