from django.core.management.base import BaseCommand
from apps.products.models import Product, Tag
import random

class Command(BaseCommand):
    help = 'Populate products'

    def handle(self, *args, **options):
        # Create Tags
        tags_data = ['Luxury', 'Optical', 'Sunglasses', 'Minimalist', 'Titanium', 'Bespoke', 'clear', 'minimal', 'coastal', 'tech', 'lightweight', 'amber', 'gold', 'blue', 'statement', 'zenith', 'black', 'classic', 'rose', 'pink', 'feminine', 'onyx', 'bold', 'sahara', 'geometric', 'green', 'eco', 'emerald', 'carbon', 'shadow', 'performance', 'pearl', 'white', 'butterfly', 'frost', 'matte', 'arctic', 'copper', 'wood', 'industrial', 'orange', 'flare', 'experimental', 'silver', 'mocha', 'brown', 'velvet']
        tags = {}
        for tag_name in tags_data:
            tag, _ = Tag.objects.get_or_create(name=tag_name)
            tags[tag_name] = tag

        products = [
            {
                'name': 'Obsidian Prime',
                'sku': 'AKL-OBS-001',
                'price': 24900,
                'description': 'Handcrafted acetate frames with polarized obsidian lenses.',
                'category': 'sunglasses',
                'frame_shape': 'oval',
                'frame_material': 'acetate',
                'rim_type': 'full_rim',
                'suitable_face_shapes': 'Square, Heart, Diamond',
                'gender': 'unisex',
                'tags': [tags['Luxury'], tags['Sunglasses']]
            },
            {
                'name': 'Aether Gold',
                'sku': 'AKL-AET-002',
                'price': 32900,
                'description': 'Ultra-lightweight titanium frames with 24k gold plating.',
                'category': 'sunglasses',
                'frame_shape': 'aviator',
                'frame_material': 'titanium',
                'rim_type': 'full_rim',
                'suitable_face_shapes': 'Oval, Square, Heart',
                'gender': 'unisex',
                'tags': [tags['Luxury'], tags['Bespoke']]
            },
            {
                'name': 'Lunar Silver',
                'sku': 'AKL-LUN-003',
                'price': 18900,
                'description': 'Minimalist round frames for a timeless aesthetic.',
                'category': 'eyeglasses',
                'frame_shape': 'round',
                'frame_material': 'metal',
                'rim_type': 'full_rim',
                'suitable_face_shapes': 'Square, Diamond, Oval',
                'gender': 'unisex',
                'tags': [tags['Optical'], tags['Minimalist']]
            },
            {
                'name': 'Midnight Aviator',
                'sku': 'AKL-MID-004',
                'price': 27900,
                'description': 'Classic aviator silhouette with a modern dark twist.',
                'category': 'sunglasses',
                'frame_shape': 'aviator',
                'frame_material': 'metal',
                'rim_type': 'full_rim',
                'suitable_face_shapes': 'Oval, Heart, Square',
                'gender': 'men',
                'tags': [tags['Sunglasses']]
            },
            {
                'name': 'Zenith Blue',
                'sku': 'AKL-ZEN-005',
                'price': 15900,
                'description': 'Modern rectangular frames for high-profile professionals.',
                'category': 'eyeglasses',
                'frame_shape': 'rectangle',
                'frame_material': 'acetate',
                'rim_type': 'full_rim',
                'suitable_face_shapes': 'Round, Heart, Oval',
                'gender': 'women',
                'tags': [tags['Optical']]
            },
            {
                'name': 'Amber Horizon',
                'sku': 'AKL-AMB-006',
                'price': 21900,
                'description': 'Warm-toned cat-eye sunglasses for a bold statement.',
                'category': 'sunglasses',
                'frame_shape': 'cat_eye',
                'frame_material': 'acetate',
                'rim_type': 'full_rim',
                'suitable_face_shapes': 'Heart, Oval, Diamond',
                'gender': 'women',
                'tags': [tags['Sunglasses'], tags['Luxury']]
            },
            {
                'name': 'Titan Edge',
                'sku': 'AKL-TIT-007',
                'price': 38900,
                'description': 'Futuristic rimless titanium frames - peak performance.',
                'category': 'eyeglasses',
                'frame_shape': 'rectangle',
                'frame_material': 'titanium',
                'rim_type': 'rimless',
                'suitable_face_shapes': 'Round, Oval, Heart',
                'gender': 'unisex',
                'tags': [tags['Bespoke'], tags['Titanium']]
            },
            {
                'name': 'Coastal Clear',
                'sku': 'AKL-COA-008',
                'price': 12900,
                'description': 'Transparent frames that match any outfit and face.',
                'category': 'eyeglasses',
                'frame_shape': 'square',
                'frame_material': 'tr90',
                'rim_type': 'full_rim',
                'suitable_face_shapes': 'Round, Oval, Heart',
                'gender': 'unisex',
                'tags': [tags['Minimalist']]
            },
            {
                'name': 'Classic Wayfarer',
                'sku': 'AKL-CWF-009',
                'price': 18500,
                'description': 'The quintessential shape that looks good on everyone.',
                'category': 'sunglasses',
                'frame_shape': 'wayfarer',
                'frame_material': 'acetate',
                'rim_type': 'full_rim',
                'suitable_face_shapes': 'Oval, Round, Heart',
                'gender': 'unisex',
                'tags': [tags['Sunglasses'], tags['classic']]
            },
            {
                'name': 'Geometric Gold',
                'sku': 'AKL-GEO-010',
                'price': 22500,
                'description': 'A unique hexagonal shape for those who dare to stand out.',
                'category': 'eyeglasses',
                'frame_shape': 'geometric',
                'frame_material': 'metal',
                'rim_type': 'full_rim',
                'suitable_face_shapes': 'Oval, Heart, Round',
                'gender': 'women',
                'tags': [tags['Optical'], tags['geometric'], tags['gold']]
            },
            {
                'name': 'Carbon Sport',
                'sku': 'AKL-SPO-011',
                'price': 26000,
                'description': 'Wraparound sunglasses in ultra-durable carbon fiber.',
                'category': 'sunglasses',
                'frame_shape': 'wraparound',
                'frame_material': 'carbon_fiber',
                'rim_type': 'half_rim',
                'suitable_face_shapes': 'Oval, Heart, Diamond',
                'gender': 'men',
                'tags': [tags['Sunglasses'], tags['performance'], tags['carbon']]
            },
            {
                'name': 'Vintage Browline',
                'sku': 'AKL-VBR-012',
                'price': 19500,
                'description': 'Retro-inspired browline glasses with modern materials.',
                'category': 'eyeglasses',
                'frame_shape': 'browline',
                'frame_material': 'mixed',
                'rim_type': 'half_rim',
                'suitable_face_shapes': 'Square, Oval, Diamond',
                'gender': 'unisex',
                'tags': [tags['Optical'], tags['classic']]
            },
            {
                'name': 'Oversized Square',
                'sku': 'AKL-OSQ-013',
                'price': 21000,
                'description': 'Bold, oversized square frames for maximum impact.',
                'category': 'sunglasses',
                'frame_shape': 'square',
                'frame_material': 'acetate',
                'rim_type': 'full_rim',
                'suitable_face_shapes': 'Round, Oval, Heart',
                'gender': 'women',
                'tags': [tags['Sunglasses'], tags['bold']]
            },
            {
                'name': 'Teashade Round',
                'sku': 'AKL-TEA-014',
                'price': 17500,
                'description': 'Small, perfectly circular frames for a distinct artist look.',
                'category': 'eyeglasses',
                'frame_shape': 'round',
                'frame_material': 'metal',
                'rim_type': 'full_rim',
                'suitable_face_shapes': 'Square, Diamond, Heart',
                'gender': 'unisex',
                'tags': [tags['Optical'], tags['minimal']]
            },
            {
                'name': 'Butterfly Effect',
                'sku': 'AKL-BTY-015',
                'price': 24000,
                'description': 'Elegant butterfly-shaped frames with gradient lenses.',
                'category': 'sunglasses',
                'frame_shape': 'butterfly',
                'frame_material': 'acetate',
                'rim_type': 'full_rim',
                'suitable_face_shapes': 'Diamond, Oval, Heart',
                'gender': 'women',
                'tags': [tags['Sunglasses'], tags['butterfly'], tags['feminine']]
            },
            {
                'name': 'Sleek Rectangle',
                'sku': 'AKL-SRE-016',
                'price': 16500,
                'description': 'Low-profile rectangular glasses for an understated look.',
                'category': 'eyeglasses',
                'frame_shape': 'rectangle',
                'frame_material': 'tr90',
                'rim_type': 'half_rim',
                'suitable_face_shapes': 'Round, Heart, Oval',
                'gender': 'men',
                'tags': [tags['Optical'], tags['minimal']]
            }
        ]

        for p_data in products:
            product_tags = p_data.pop('tags')
            product, created = Product.objects.update_or_create(
                sku=p_data['sku'],
                defaults=p_data
            )
            product.tags.set(product_tags)
            self.stdout.write(f'Created/Updated: {product.name}')

        self.stdout.write(self.style.SUCCESS('Successfully populated products'))
