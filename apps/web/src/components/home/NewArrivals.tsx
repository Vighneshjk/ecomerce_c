'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'

// Mock data
const newArrivals = [
    { id: '10', name: 'Woodland Retro', slug: 'woodland-retro', price: 7999, category: 'Sunglasses', isNewArrival: true, image: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=600', images: [{ url: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=600', isPrimary: true }], variants: [{ colorName: 'Walnut', colorHex: '#5d4037' }] },
    { id: '11', name: 'Sport Flex', slug: 'sport-flex', price: 4599, category: 'Sports', isNewArrival: true, image: 'https://images.unsplash.com/photo-1534190232481-29b492a37000?auto=format&fit=crop&q=80&w=600', images: [{ url: 'https://images.unsplash.com/photo-1534190232481-29b492a37000?auto=format&fit=crop&q=80&w=600', isPrimary: true }], variants: [{ colorName: 'Orange', colorHex: '#FF5733' }] },
    { id: '12', name: 'Blue Light Shield', slug: 'blue-light-shield', price: 1999, category: 'Blue Light', isNewArrival: true, image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=600', images: [{ url: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=600', isPrimary: true }], variants: [{ colorName: 'Clear', colorHex: '#EEF2FF' }] },
    { id: '13', name: 'Urban Rectangular', slug: 'urban-rectangular', price: 2499, category: 'Eyeglasses', isNewArrival: true, image: 'https://images.unsplash.com/photo-1614713563397-b3711202e7df?auto=format&fit=crop&q=80&w=600', images: [{ url: 'https://images.unsplash.com/photo-1614713563397-b3711202e7df?auto=format&fit=crop&q=80&w=600', isPrimary: true }], variants: [{ colorName: 'Navy', colorHex: '#000080' }] },
    { id: '14', name: 'Kid Guard', slug: 'kid-guard', price: 1499, category: 'Kids', isNewArrival: true, image: 'https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?auto=format&fit=crop&q=80&w=600', images: [{ url: 'https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?auto=format&fit=crop&q=80&w=600', isPrimary: true }], variants: [{ colorName: 'Pink', colorHex: '#FF69B4' }] },
]

const NewArrivals = () => {
    return (
        <section className="py-24 bg-[#0d0d0d] text-white">
            <div className="container-app">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0">
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Sparkles className="w-5 h-5 text-brand-500" />
                            <span className="text-sm font-bold text-brand-400 uppercase tracking-widest">Fresh Drop</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-display font-semibold text-white tracking-tight">
                            NEW <span className="text-brand-500 italic">ARRIVALS</span>
                        </h2>
                    </div>

                    <div className="flex space-x-4">
                        <button className="swiper-prev-btn p-3 rounded-full border border-white/10 hover:bg-brand-500 hover:border-brand-500 hover:text-white transition-all transform hover:-translate-x-1 group">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button className="swiper-next-btn p-3 rounded-full border border-white/10 hover:bg-brand-500 hover:border-brand-500 hover:text-white transition-all transform hover:translate-x-1 group">
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={32}
                    slidesPerView={1}
                    navigation={{
                        prevEl: '.swiper-prev-btn',
                        nextEl: '.swiper-next-btn',
                    }}
                    autoplay={{ delay: 5000 }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                    className="pb-12"
                >
                    {newArrivals.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default NewArrivals
