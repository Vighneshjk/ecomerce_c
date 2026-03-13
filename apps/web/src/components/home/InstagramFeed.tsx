'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Instagram, ArrowRight, Heart, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const igImages = [
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1614713563397-b3711202e7df?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=600',
]

const InstagramFeed = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container-app">
                <div className="flex flex-col items-center text-center space-y-4 mb-20 relative">
                    <div className="flex items-center space-x-2">
                        <div className="h-[2px] w-8 bg-brand-500" />
                        <span className="text-sm font-bold text-brand-600 uppercase tracking-widest text-center">Social Community</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-display font-semibold text-charcoal-900 tracking-tight leading-tight uppercase font-sans">
                        WEAR IT. SHARE IT.
                    </h2>
                    <Link
                        href="https://instagram.com/akela.eyewear"
                        target="_blank"
                        className="flex items-center space-x-2 text-lg font-semibold text-charcoal-500 hover:text-brand-600 transition-colors"
                    >
                        <Instagram className="w-5 h-5 text-brand-500" />
                        <span>@akela.eyewear</span>
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {igImages.map((src, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="relative aspect-square overflow-hidden rounded-3xl group cursor-pointer"
                        >
                            <Image
                                src={src}
                                alt={`IG Feed ${i}`}
                                fill
                                className="object-cover transition-all duration-[1.5s] ease-out group-hover:scale-125 group-hover:blur-[2px] brightness-90 group-hover:brightness-50"
                            />

                            {/* Overlay Info */}
                            <div className="absolute inset-x-0 inset-y-0 flex flex-col items-center justify-center space-y-3 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <Instagram className="w-8 h-8 text-white mb-4" />
                                <div className="flex space-x-4 text-white font-bold">
                                    <div className="flex items-center space-x-2">
                                        <Heart className="w-4 h-4 fill-current" />
                                        <span className="text-sm font-display">{Math.floor(Math.random() * 500) + 100}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <MessageCircle className="w-4 h-4 fill-current" />
                                        <span className="text-sm font-display">{Math.floor(Math.random() * 100) + 10}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default InstagramFeed
