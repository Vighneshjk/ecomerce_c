from django.db         import models
from django.utils.text import slugify
from cloudinary.models import CloudinaryField

CATEGORY_CHOICES = [
    ('sunglasses', 'Sunglasses'), ('eyeglasses', 'Eyeglasses'),
    ('bluelight',  'Blue Light'), ('sports',     'Sports'),
    ('kids',       'Kids'),
]
GENDER_CHOICES = [
    ('men', 'Men'), ('women', 'Women'),
    ('unisex', 'Unisex'), ('kids', 'Kids'),
]
SHAPE_CHOICES = [
    ('round',     'Round'),    ('square',    'Square'),
    ('rectangle', 'Rectangle'),('aviator',   'Aviator'),
    ('wayfarer',  'Wayfarer'), ('cat_eye',   'Cat Eye'),
    ('oval',      'Oval'),     ('geometric', 'Geometric'),
]
MATERIAL_CHOICES = [
    ('acetate', 'Acetate'), ('metal',    'Metal'),
    ('titanium','Titanium'),('tr90',     'TR90'),
    ('wood',    'Wood'),
]
RIM_CHOICES = [
    ('full_rim', 'Full Rim'), ('half_rim', 'Half Rim'),
    ('rimless',  'Rimless'),
]


class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'tags'


class Product(models.Model):
    name              = models.CharField(max_length=255)
    slug              = models.SlugField(unique=True, blank=True)
    description       = models.TextField(blank=True)
    short_description = models.CharField(max_length=500, blank=True)
    sku               = models.CharField(max_length=100, unique=True)
    price             = models.DecimalField(max_digits=10, decimal_places=2)
    compare_price     = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    cost_price        = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    stock             = models.IntegerField(default=0)
    low_stock_threshold = models.IntegerField(default=5)
    is_active         = models.BooleanField(default=True)
    is_featured       = models.BooleanField(default=False)
    is_new_arrival    = models.BooleanField(default=False)
    category          = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    gender            = models.CharField(max_length=10, choices=GENDER_CHOICES)
    frame_shape       = models.CharField(max_length=20, choices=SHAPE_CHOICES)
    frame_material    = models.CharField(max_length=20, choices=MATERIAL_CHOICES)
    rim_type          = models.CharField(max_length=20, choices=RIM_CHOICES)
    suitable_face_shapes = models.CharField(max_length=255, blank=True) # e.g. "Oval, Round"
    weight            = models.FloatField(null=True, blank=True)
    model_3d_url      = models.CharField(max_length=500, blank=True)
    tags              = models.ManyToManyField(Tag, blank=True)
    created_at        = models.DateTimeField(auto_now_add=True)
    updated_at        = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    @property
    def discount_percent(self):
        if self.compare_price and self.compare_price > self.price:
            return int((1 - self.price / self.compare_price) * 100)
        return None

    @property
    def primary_image(self):
        return self.images.filter(is_primary=True).first() or self.images.first()

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'products'
        ordering = ['-created_at']
        indexes  = [
            models.Index(fields=['category']),
            models.Index(fields=['gender']),
            models.Index(fields=['is_active']),
            models.Index(fields=['is_featured']),
            models.Index(fields=['frame_shape']),
            models.Index(fields=['price']),
        ]


class ProductImage(models.Model):
    product    = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image      = CloudinaryField('product_image')
    alt_text   = models.CharField(max_length=255, blank=True)
    position   = models.IntegerField(default=0)
    is_primary = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.product.name} image {self.position}'

    class Meta:
        db_table = 'product_images'
        ordering = ['position']


class ProductVariant(models.Model):
    product    = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    color_name = models.CharField(max_length=100)
    color_hex  = models.CharField(max_length=7)
    stock      = models.IntegerField(default=0)
    sku        = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return f'{self.product.name} — {self.color_name}'

    class Meta:
        db_table = 'product_variants'
