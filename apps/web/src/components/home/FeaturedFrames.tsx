'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'

// Mock products (Will be replaced by React Query)
const featuredProducts = [
    {
        id: '1',
        name: 'Aviator Classic',
        slug: 'aviator-classic',
        price: 4999,
        comparePrice: 5999,
        category: 'Sunglasses',
        isNewArrival: true,
        isFeatured: true,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600',
        images: [
            { url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600', isPrimary: true },
            { url: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=600' }
        ],
        variants: [
            { colorName: 'Gold', colorHex: '#FFD700' },
            { colorName: 'Silver', colorHex: '#C0C0C0' }
        ]
    },
    {
        id: '2',
        name: 'Wayfarer Noir',
        slug: 'wayfarer-noir',
        price: 3499,
        category: 'Sunglasses',
        isFeatured: true,
        image: 'https://images.unsplash.com/photo-1511499767390-90342f5b89a8?auto=format&fit=crop&q=80&w=600',
        images: [
            { url: 'https://images.unsplash.com/photo-1511499767390-90342f5b89a8?auto=format&fit=crop&q=80&w=600', isPrimary: true },
            { url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=600' }
        ],
        variants: [
            { colorName: 'Black', colorHex: '#000000' }
        ]
    },
    {
        id: '3',
        name: 'Titanium Round',
        slug: 'titanium-round',
        price: 6499,
        comparePrice: 7999,
        category: 'Eyeglasses',
        isFeatured: true,
        image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&q=80&w=600',
        images: [
            { url: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&q=80&w=600', isPrimary: true },
            { url: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=600' }
        ],
        variants: [
            { colorName: 'Rose Gold', colorHex: '#B76E79' },
            { colorName: 'Chrome', colorHex: '#E5E4E2' }
        ]
    },
    {
        id: '4',
        name: 'Cat Eye Elite',
        slug: 'cat-eye-elite',
        price: 4299,
        category: 'Sunglasses',
        isFeatured: true,
        image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=600',
        images: [
            { url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=600', isPrimary: true }
        ],
        variants: [
            { colorName: 'Tortoise', colorHex: '#2F1B0F' }
        ]
    }
]

const FeaturedFrames = () => {
    return (
        <section className="py-24 bg-[#FCFBF8]">
            <div className="container-app">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0 relative">
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Sparkles className="w-5 h-5 text-brand-500 animate-pulse" />
                            <span className="text-sm font-bold text-brand-600 uppercase tracking-[0.3em]">Curation</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-display font-semibold text-charcoal-900 tracking-tight">
                            THIS SEASON'S <br /> <span className="text-brand-500 italic">FAVORITES</span>
                        </h2>
                    </div>

                    <Link
                        href="/products?featured=true"
                        className="group flex items-center space-x-3 text-lg font-semibold text-charcoal-800 hover:text-brand-600 transition-colors"
                    >
                        <span>View All Collection</span>
                        <div className="w-12 h-12 rounded-full border border-charcoal-200 flex items-center justify-center group-hover:bg-brand-500 group-hover:border-brand-500 group-hover:text-white transition-all transform group-hover:rotate-45">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map((product, idx) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Visual Accent */}
                <div className="mt-20 flex justify-center opacity-10">
                    <span className="text-9xl font-display font-bold text-charcoal-900 tracking-[0.5em] select-none">VISION</span>
                </div>
            </div>
        </section>
    )
}

export default FeaturedFrames
