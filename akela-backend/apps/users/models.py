from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db   import models
from cloudinary.models import CloudinaryField
import uuid


class UserManager(BaseUserManager):

    def create_user(self, email, name, password=None, **extra_fields):
        if not email:
            raise ValueError('Email address is required.')
        email = self.normalize_email(email).lower()
        user  = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None, **extra_fields):
        extra_fields.setdefault('role',         'admin')
        extra_fields.setdefault('is_staff',     True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, name, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email       = models.EmailField(unique=True, max_length=255)
    name        = models.CharField(max_length=255)
    phone       = models.CharField(max_length=20, blank=True)
    avatar      = CloudinaryField('avatar', blank=True, null=True)
    role        = models.CharField(
        max_length=10,
        choices=[('user', 'User'), ('admin', 'Admin')],
        default='user',
    )
    is_active   = models.BooleanField(default=True)
    is_staff    = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email

    class Meta:
        db_table = 'users'


class Address(models.Model):
    LABEL_CHOICES = [('home', 'Home'), ('work', 'Work'), ('other', 'Other')]
    user       = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name='addresses'
    )
    label      = models.CharField(max_length=10, choices=LABEL_CHOICES, default='home')
    first_name = models.CharField(max_length=100)
    last_name  = models.CharField(max_length=100)
    phone      = models.CharField(max_length=20)
    line1      = models.CharField(max_length=255)
    line2      = models.CharField(max_length=255, blank=True)
    city       = models.CharField(max_length=100)
    state      = models.CharField(max_length=100)
    pincode    = models.CharField(max_length=10)
    country    = models.CharField(max_length=100, default='India')
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.is_default:
            Address.objects.filter(user=self.user).exclude(pk=self.pk).update(is_default=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.user.email} — {self.label} — {self.city}'

    class Meta:
        db_table = 'addresses'


class PasswordResetToken(models.Model):
    user       = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name='reset_tokens'
    )
    token      = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    expires_at = models.DateTimeField()
    is_used    = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Reset token for {self.user.email}'

    class Meta:
        db_table = 'password_reset_tokens'
