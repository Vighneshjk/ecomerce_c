import { PrismaClient, Category, Gender, FrameShape, FrameMaterial, RimType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Resetting database...')
  // Clean tables
  await prisma.productTag.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.productVariant.deleteMany()
  await prisma.tag.deleteMany()
  await prisma.product.deleteMany()

  console.log('Seeding products...')

  const products = [
    {
      name: 'Aviator Classic',
      slug: 'aviator-classic',
      description: 'The original pilot design, a timeless classic that has been the standard for decades.',
      shortDescription: 'Classic Metal Aviators',
      sku: 'AKL-AV-001',
      price: 4999,
      comparePrice: 5999,
      stock: 50,
      category: Category.SUNGLASSES,
      gender: Gender.UNISEX,
      frameShape: FrameShape.AVIATOR,
      frameMaterial: FrameMaterial.METAL,
      rimType: RimType.FULL_RIM,
      weight: 25.5,
      isActive: true,
      isFeatured: true,
      variants: {
        create: [
          { colorName: 'Gold/Green', colorHex: '#FFD700', stock: 25, sku: 'AKL-AV-001-GG' },
          { colorName: 'Silver/Black', colorHex: '#C0C0C0', stock: 25, sku: 'AKL-AV-001-SB' },
        ]
      },
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800', altText: 'Aviator Classic Gold', position: 1, isPrimary: true },
          { url: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800', altText: 'Aviator Classic Silver', position: 2 },
        ]
      }
    },
    {
      name: 'Wayfarer Noir',
      slug: 'wayfarer-noir',
      description: 'Bold acetate frames with a sophisticated rectangular shape. Perfect for city life.',
      shortDescription: 'Bold Black Wayfarers',
      sku: 'AKL-WF-002',
      price: 3499,
      stock: 30,
      category: Category.SUNGLASSES,
      gender: Gender.MEN,
      frameShape: FrameShape.WAYFARER,
      frameMaterial: FrameMaterial.ACETATE,
      rimType: RimType.FULL_RIM,
      weight: 30.0,
      isActive: true,
      variants: {
        create: [
          { colorName: 'Matte Black', colorHex: '#000000', stock: 30, sku: 'AKL-WF-002-MB' },
        ]
      },
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1511499767390-90342f5b89a8?auto=format&fit=crop&q=80&w=800', altText: 'Wayfarer Noir', position: 1, isPrimary: true },
        ]
      }
    },
    {
      name: 'Titanium Round',
      slug: 'titanium-round',
      description: 'Ultra-lightweight titanium frames with a minimalist round silhouette.',
      shortDescription: 'Lightweight Titanium Glasses',
      sku: 'AKL-TR-003',
      price: 6499,
      comparePrice: 7999,
      stock: 20,
      category: Category.EYEGLASSES,
      gender: Gender.WOMEN,
      frameShape: FrameShape.ROUND,
      frameMaterial: FrameMaterial.TITANIUM,
      rimType: RimType.RIMLESS,
      weight: 12.0,
      isActive: true,
      isFeatured: true,
      variants: {
        create: [
          { colorName: 'Rose Gold', colorHex: '#B76E79', stock: 10, sku: 'AKL-TR-003-RG' },
          { colorName: 'Gunmetal', colorHex: '#2C3E50', stock: 10, sku: 'AKL-TR-003-GM' },
        ]
      },
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&q=80&w=800', altText: 'Titanium Round', position: 1, isPrimary: true },
        ]
      }
    },
    {
      name: 'Urban Rectangular',
      slug: 'urban-rectangular',
      description: 'Modern rectangular frames made from high-quality TR90 material for flexibility.',
      shortDescription: 'Flexible TR90 Frames',
      sku: 'AKL-UR-004',
      price: 2499,
      stock: 45,
      category: Category.EYEGLASSES,
      gender: Gender.UNISEX,
      frameShape: FrameShape.RECTANGLE,
      frameMaterial: FrameMaterial.TR90,
      rimType: RimType.FULL_RIM,
      weight: 18.0,
      isActive: true,
      variants: {
        create: [
          { colorName: 'Navy Blue', colorHex: '#000080', stock: 45, sku: 'AKL-UR-004-NB' },
        ]
      },
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1614713563397-b3711202e7df?auto=format&fit=crop&q=80&w=800', altText: 'Urban Rectangular', position: 1, isPrimary: true },
        ]
      }
    },
    {
      name: 'Cat Eye Elite',
      slug: 'cat-eye-elite',
      description: 'Vintage-inspired cat-eye frames that add a touch of glamour to any look.',
      shortDescription: 'Vintage Cat Eye Sunglasses',
      sku: 'AKL-CE-005',
      price: 4299,
      stock: 25,
      category: Category.SUNGLASSES,
      gender: Gender.WOMEN,
      frameShape: FrameShape.CAT_EYE,
      frameMaterial: FrameMaterial.ACETATE,
      rimType: RimType.FULL_RIM,
      weight: 28.0,
      isActive: true,
      variants: {
        create: [
          { colorName: 'Tortoise Shell', colorHex: '#2F1B0F', stock: 25, sku: 'AKL-CE-005-TS' },
        ]
      },
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800', altText: 'Cat Eye Elite', position: 1, isPrimary: true },
        ]
      }
    },
    {
      name: 'Blue Light Shield',
      slug: 'blue-light-shield',
      description: 'Lenses designed to filter out blue light and reduce digital eye strain.',
      shortDescription: 'Anti-Glare Blue Light Glasses',
      sku: 'AKL-BL-006',
      price: 1999,
      stock: 100,
      category: Category.BLUELIGHT,
      gender: Gender.UNISEX,
      frameShape: FrameShape.SQUARE,
      frameMaterial: FrameMaterial.TR90,
      rimType: RimType.FULL_RIM,
      weight: 20.0,
      isActive: true,
      variants: {
        create: [
          { colorName: 'Clear Acrylic', colorHex: '#F0F8FF', stock: 100, sku: 'AKL-BL-006-CA' },
        ]
      },
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800', altText: 'Blue Light Shield', position: 1, isPrimary: true },
        ]
      }
    },
    {
      name: 'Modern Geometric',
      slug: 'modern-geometric',
      description: 'Unique geometric frames for those who want to stand out from the crowd.',
      shortDescription: 'Edgy Geometric Frames',
      sku: 'AKL-MG-007',
      price: 5299,
      stock: 15,
      category: Category.EYEGLASSES,
      gender: Gender.UNISEX,
      frameShape: FrameShape.GEOMETRIC,
      frameMaterial: FrameMaterial.METAL,
      rimType: RimType.HALF_RIM,
      weight: 22.0,
      isActive: true,
      variants: {
        create: [
          { colorName: 'Black/Silver', colorHex: '#1C1C1C', stock: 15, sku: 'AKL-MG-007-BS' },
        ]
      },
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=800', altText: 'Modern Geometric', position: 1, isPrimary: true },
        ]
      }
    },
    {
      name: 'Kid Guard',
      slug: 'kid-guard',
      description: 'Durable and colorful glasses designed specifically for active children.',
      shortDescription: 'Tough Kids Glasses',
      sku: 'AKL-KG-008',
      price: 1499,
      stock: 60,
      category: Category.KIDS,
      gender: Gender.KIDS,
      frameShape: FrameShape.SQUARE,
      frameMaterial: FrameMaterial.TR90,
      rimType: RimType.FULL_RIM,
      weight: 15.0,
      isActive: true,
      variants: {
        create: [
          { colorName: 'Bright Pink', colorHex: '#FF69B4', stock: 30, sku: 'AKL-KG-008-BP' },
          { colorName: 'Sky Blue', colorHex: '#87CEEB', stock: 30, sku: 'AKL-KG-008-SB' },
        ]
      },
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?auto=format&fit=crop&q=80&w=800', altText: 'Kid Guard', position: 1, isPrimary: true },
        ]
      }
    },
    {
      name: 'Sport Flex',
      slug: 'sport-flex',
      description: 'Wraparound design for maximum protection and visibility during sports.',
      shortDescription: 'High-Performance Sports Frames',
      sku: 'AKL-SF-009',
      price: 4599,
      stock: 20,
      category: Category.SPORTS,
      gender: Gender.UNISEX,
      frameShape: FrameShape.RECTANGLE,
      frameMaterial: FrameMaterial.TR90,
      rimType: RimType.FULL_RIM,
      weight: 32.0,
      isActive: true,
      variants: {
        create: [
          { colorName: 'Safety Orange', colorHex: '#FF5733', stock: 20, sku: 'AKL-SF-009-SO' },
        ]
      },
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1534190232481-29b492a37000?auto=format&fit=crop&q=80&w=800', altText: 'Sport Flex', position: 1, isPrimary: true },
        ]
      }
    },
    {
      name: 'Woodland Retro',
      slug: 'woodland-retro',
      description: 'Rustic wooden frames with a modern retro twist.',
      shortDescription: 'Handcrafted Wooden Frames',
      sku: 'AKL-WR-010',
      price: 7999,
      stock: 10,
      category: Category.SUNGLASSES,
      gender: Gender.MEN,
      frameShape: FrameShape.OVAL,
      frameMaterial: FrameMaterial.WOOD,
      rimType: RimType.FULL_RIM,
      weight: 35.0,
      isActive: true,
      isNewArrival: true,
      variants: {
        create: [
          { colorName: 'Dark Walnut', colorHex: '#5d4037', stock: 10, sku: 'AKL-WR-010-DW' },
        ]
      },
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=800', altText: 'Woodland Retro', position: 1, isPrimary: true },
        ]
      }
    },
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product as any,
    })
  }

  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
