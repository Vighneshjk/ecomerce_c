'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const categories = [
    { name: 'Sunglasses', href: '/category/sunglasses', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600', count: 42 },
    { name: 'Eyeglasses', href: '/category/eyeglasses', image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&q=80&w=600', count: 36 },
    { name: 'Blue Light', href: '/category/bluelight', image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=600', count: 18 },
    { name: 'Sports', href: '/category/sports', image: 'https://images.unsplash.com/photo-1534190232481-29b492a37000?auto=format&fit=crop&q=80&w=600', count: 12 },
    { name: 'Kids', href: '/category/kids', image: 'https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?auto=format&fit=crop&q=80&w=600', count: 15 },
]

const CategoryStrip = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container-app">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
                    <div className="space-y-2">
                        <span className="text-sm font-semibold text-brand-600 uppercase tracking-widest block">Collection Categories</span>
                        <h2 className="text-4xl md:text-5xl font-display font-semibold text-charcoal-900 tracking-tight leading-tight">
                            Visionary styles for <br className="hidden md:block" /> every aesthetic.
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {categories.map((category, idx) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                href={category.href}
                                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-charcoal-100 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-100"
                            >
                                {/* Lifestyle Image */}
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover group-hover:scale-110 group-hover:brightness-[0.8] transition-all duration-700 ease-out"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                {/* Content */}
                                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-start translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="text-xs font-bold text-brand-300 uppercase tracking-[0.2em] mb-1">
                                        {category.count} Items
                                    </span>
                                    <h3 className="text-2xl font-display text-white mb-4">
                                        {category.name}
                                    </h3>
                                    <div className="flex items-center space-x-2 text-white/40 group-hover:text-white transition-colors">
                                        <span className="text-xs font-bold uppercase tracking-widest overflow-hidden h-0 group-hover:h-auto transition-all duration-500">
                                            Shop Collection
                                        </span>
                                        <ArrowRight className="w-5 h-5 translate-x-0 group-hover:translate-x-2 transition-transform duration-500" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CategoryStrip
