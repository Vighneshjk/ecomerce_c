"""
Management command to seed initial data:
  - Admin user
  - Sample users: Shon, Tony, Jomon, Priya, Alex
  - 8 luxury eyewear products
"""
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from apps.users.models import CustomUser


USERS = [
    # (email, name, password, role, is_staff, is_superuser)
    ('admin@gmail.com',  'Admin Akeela', 'admin123', 'admin', True,  True),
    ('shon@gmail.com',   'Shon Thomas',  'shon123',  'user',  False, False),
    ('tony@gmail.com',   'Tony Stark',   'tony123',  'user',  False, False),
    ('jomon@gmail.com',  'Jomon Jose',   'jomon123', 'user',  False, False),
    ('priya@gmail.com',  'Priya Nair',   'priya123', 'user',  False, False),
    ('alex@gmail.com',   'Alex Martin',  'alex123',  'user',  False, False),
]

PRODUCTS = [
    {
        'name': 'Obsidian Prime',
        'sku': 'AKL-SUN-001',
        'price': 18999,
        'compare_price': 22999,
        'category': 'sunglasses',
        'gender': 'unisex',
        'frame_shape': 'square',
        'frame_material': 'acetate',
        'rim_type': 'full_rim',
        'stock': 42,
        'description': 'Handcrafted in Milan from premium Italian acetate. Polarised UV400 lenses with a deep obsidian finish.',
        'short_description': 'Luxury polarised sunglasses in Italian acetate.',
        'is_featured': True,
        'is_new_arrival': False,
        'suitable_face_shapes': 'Oval, Round',
        'image_url': 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600',
    },
    {
        'name': 'Aether Gold',
        'sku': 'AKL-LUX-002',
        'price': 24999,
        'compare_price': 29999,
        'category': 'eyeglasses',
        'gender': 'unisex',
        'frame_shape': 'aviator',
        'frame_material': 'titanium',
        'rim_type': 'half_rim',
        'stock': 15,
        'description': 'Titanium aviator frames plated in 18k gold. Ultra-lightweight at just 14g.',
        'short_description': 'Gold titanium aviators, featherlight luxury.',
        'is_featured': True,
        'is_new_arrival': True,
        'suitable_face_shapes': 'Heart, Diamond',
        'image_url': 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600',
    },
    {
        'name': 'Lunar Silver',
        'sku': 'AKL-OPT-003',
        'price': 13999,
        'compare_price': 16999,
        'category': 'eyeglasses',
        'gender': 'unisex',
        'frame_shape': 'round',
        'frame_material': 'metal',
        'rim_type': 'full_rim',
        'stock': 85,
        'description': 'Classic round frames in brushed silver stainless steel. Timeless and versatile.',
        'short_description': 'Brushed silver round optical frames.',
        'is_featured': False,
        'is_new_arrival': True,
        'suitable_face_shapes': 'Square, Rectangle',
        'image_url': 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600',
    },
    {
        'name': 'Carbon Noir',
        'sku': 'AKL-SUN-004',
        'price': 21999,
        'compare_price': 26999,
        'category': 'sunglasses',
        'gender': 'men',
        'frame_shape': 'rectangle',
        'frame_material': 'acetate',
        'rim_type': 'full_rim',
        'stock': 30,
        'description': 'Matte black rectangular frames with carbon-infused acetate for superior strength and style.',
        'short_description': 'Matte black rectangular carbon acetate sunglasses.',
        'is_featured': True,
        'is_new_arrival': False,
        'suitable_face_shapes': 'Oval, Heart',
        'image_url': 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600',
    },
    {
        'name': 'Rose Atelier',
        'sku': 'AKL-SUN-005',
        'price': 16999,
        'compare_price': 20999,
        'category': 'sunglasses',
        'gender': 'women',
        'frame_shape': 'cat_eye',
        'frame_material': 'acetate',
        'rim_type': 'full_rim',
        'stock': 22,
        'description': 'Cat-eye frames in blush rose acetate with gradient pink lenses. A feminine icon reborn.',
        'short_description': 'Cat-eye frames in blush rose with gradient lenses.',
        'is_featured': False,
        'is_new_arrival': True,
        'suitable_face_shapes': 'Square, Diamond, Oval',
        'image_url': 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600',
    },
    {
        'name': 'Glacier Blue',
        'sku': 'AKL-BLU-006',
        'price': 11999,
        'compare_price': 14999,
        'category': 'bluelight',
        'gender': 'unisex',
        'frame_shape': 'rectangle',
        'frame_material': 'tr90',
        'rim_type': 'full_rim',
        'stock': 60,
        'description': 'Advanced blue-light filtering lenses in a lightweight TR90 frame. Reduces digital eye strain.',
        'short_description': 'Blue-light blocking glasses for digital wellness.',
        'is_featured': False,
        'is_new_arrival': False,
        'suitable_face_shapes': 'All',
        'image_url': 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600',
    },
    {
        'name': 'Amber Wayfarer',
        'sku': 'AKL-SUN-007',
        'price': 15999,
        'compare_price': 18999,
        'category': 'sunglasses',
        'gender': 'unisex',
        'frame_shape': 'wayfarer',
        'frame_material': 'acetate',
        'rim_type': 'full_rim',
        'stock': 37,
        'description': 'Tortoiseshell wayfarer in warm amber acetate with polarised amber lenses. A timeless silhouette.',
        'short_description': 'Tortoiseshell wayfarer with amber polarised lenses.',
        'is_featured': False,
        'is_new_arrival': False,
        'suitable_face_shapes': 'Oval, Square',
        'image_url': 'https://images.unsplash.com/photo-1508179522497-5e96f72fae68?w=600',
    },
    {
        'name': 'Phantom Rimless',
        'sku': 'AKL-OPT-008',
        'price': 19999,
        'compare_price': 24999,
        'category': 'eyeglasses',
        'gender': 'unisex',
        'frame_shape': 'oval',
        'frame_material': 'titanium',
        'rim_type': 'rimless',
        'stock': 18,
        'description': 'Ultra-minimalist rimless titanium optical frames. Just the lenses and invisible temples.',
        'short_description': 'Rimless titanium minimalist optical frames.',
        'is_featured': True,
        'is_new_arrival': True,
        'suitable_face_shapes': 'Square, Rectangle, Diamond',
        'image_url': 'https://images.unsplash.com/photo-1604095802400-ed2b2c9ce7f0?w=600',
    },
]


class Command(BaseCommand):
    help = 'Seed database with admin, sample users, and luxury products'

    def handle(self, *args, **options):
        self.stdout.write(self.style.MIGRATE_HEADING('=== Akeela Seed Data ==='))

        # ── Create Users ──────────────────────────────────────────────────────
        self.stdout.write('\n📦 Creating users...')
        for email, name, password, role, is_staff, is_superuser in USERS:
            if CustomUser.objects.filter(email=email).exists():
                self.stdout.write(f'   ⏭  {email} already exists, skipping.')
                continue
            user = CustomUser.objects.create_user(
                email=email, name=name, password=password,
            )
            user.role         = role
            user.is_staff     = is_staff
            user.is_superuser = is_superuser
            user.save()
            self.stdout.write(self.style.SUCCESS(f'   ✅ Created {role}: {email}  /  password: {password}'))

        # ── Create Products ────────────────────────────────────────────────────
        self.stdout.write('\n🕶  Creating products...')
        from apps.products.models import Product, ProductImage

        for p in PRODUCTS:
            image_url = p.pop('image_url')
            slug = slugify(p['name'])
            if Product.objects.filter(sku=p['sku']).exists() or Product.objects.filter(slug=slug).exists():
                self.stdout.write(f'   ⏭  Product {p["name"]} already exists, skipping.')
                p['image_url'] = image_url  # restore
                continue
            product = Product.objects.create(**p)

            # Create a ProductImage with external URL in alt_text (Cloudinary not used in dev)
            ProductImage.objects.create(
                product=product,
                image=image_url,
                alt_text=image_url,
                is_primary=True,
                position=0,
            )
            self.stdout.write(self.style.SUCCESS(f'   ✅ Created: {product.name}  ₹{product.price}'))

        self.stdout.write('\n')
        self.stdout.write(self.style.SUCCESS('✅ Seed complete! Login credentials:'))
        self.stdout.write('─' * 50)
        for email, name, password, role, *_ in USERS:
            self.stdout.write(f'   {role.upper():5s}  {email:30s}  {password}')
        self.stdout.write('─' * 50)
