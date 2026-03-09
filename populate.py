import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from store.models import Category, Product

def populate():
    men_cat, _ = Category.objects.get_or_create(name='Men', slug='men', description='Men eyewear')
    women_cat, _ = Category.objects.get_or_create(name='Women', slug='women', description='Women eyewear')
    unisex_cat, _ = Category.objects.get_or_create(name='Unisex', slug='unisex', description='Unisex eyewear')
    kids_cat, _ = Category.objects.get_or_create(name='Kids', slug='kids', description='Kids eyewear')

    products = [
        {'name': 'Aviator Classic', 'slug': 'aviator-classic', 'cat': men_cat, 'price': 150.00, 'stock': 10, '3d_url': 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Glasses/glTF/Glasses.gltf'},
        {'name': 'Wayfarer Minimal', 'slug': 'wayfarer-minimal', 'cat': unisex_cat, 'price': 120.00, 'stock': 15, '3d_url': 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Glasses/glTF/Glasses.gltf'},
        {'name': 'Cat Eye Chic', 'slug': 'cat-eye-chic', 'cat': women_cat, 'price': 180.00, 'stock': 8, '3d_url': 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Glasses/glTF/Glasses.gltf'},
        {'name': 'Round Retro', 'slug': 'round-retro', 'cat': men_cat, 'price': 130.00, 'stock': 20, '3d_url': 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Glasses/glTF/Glasses.gltf'},
        {'name': 'Sport X1', 'slug': 'sport-x1', 'cat': unisex_cat, 'price': 90.00, 'stock': 25, '3d_url': 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Glasses/glTF/Glasses.gltf'},
        {'name': 'Kids Flex', 'slug': 'kids-flex', 'cat': kids_cat, 'price': 60.00, 'stock': 30, '3d_url': 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Glasses/glTF/Glasses.gltf'},
        {'name': 'Titanium Edge', 'slug': 'titanium-edge', 'cat': men_cat, 'price': 220.00, 'stock': 5, '3d_url': 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Glasses/glTF/Glasses.gltf'},
        {'name': 'Fashion Oval', 'slug': 'fashion-oval', 'cat': women_cat, 'price': 140.00, 'stock': 12, '3d_url': 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Glasses/glTF/Glasses.gltf'},
    ]

    for p in products:
        Product.objects.get_or_create(
            name=p['name'],
            slug=p['slug'],
            category=p['cat'],
            defaults={
                'description': f"Premium quality {p['name']} glasses.",
                'price': p['price'],
                'stock': p['stock'],
                'model_3d_url': p['3d_url']
            }
        )

if __name__ == '__main__':
    print("Populating database...")
    populate()
    print("Done!")
