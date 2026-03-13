'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Trash2, ArrowRight, Home, Sparkles, LayoutGrid, List, SlidersHorizontal, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import ProductCard from '@/components/product/ProductCard'
import { useWishlist } from '@/hooks/useWishlist'
import { useCart } from '@/hooks/useCart'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

const WishlistPage = () => {
    const { items, clearWishlist, itemsCount } = useWishlist()
    const { addItem, openCart } = useCart()

    const addAllToCart = () => {
        items.forEach(item => {
            addItem(item, item.variants?.[0], 1)
        })
        openCart()
    }

    if (itemsCount === 0) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 pt-32 space-y-8">
                <div className="relative w-48 h-48 mb-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 bg-brand-50 rounded-full blur-3xl opacity-50"
                    />
                    <div className="relative z-10 w-full h-full flex items-center justify-center text-charcoal-200">
                        <Heart className="w-32 h-32" />
                    </div>
                </div>

                <div className="text-center space-y-4 max-w-md">
                    <h1 className="text-4xl lg:text-5xl font-display font-semibold text-charcoal-900 tracking-tight leading-none uppercase tracking-widest italic">
                        GALLERY <span className="text-brand-500">VOID.</span>
                    </h1>
                    <p className="text-charcoal-500 font-medium leading-relaxed italic">Your saved perspectives will appear here. Start your curation journey to capture your favorite frames.</p>
                </div>

                <Button asChild size="lg" className="h-16 px-12 text-lg font-bold rounded-2xl shadow-2xl shadow-brand-100">
                    <Link href="/products">
                        Curate Collection
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="bg-[#FCFBF8] min-h-screen pt-32 pb-40">
            <div className="container-app">
                <div className="space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 text-xs font-bold text-charcoal-400 uppercase tracking-widest">
                                <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
                                <div className="w-1 h-1 bg-charcoal-200 rounded-full" />
                                <span className="text-charcoal-900">Curations</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-display font-semibold text-charcoal-900 tracking-tighter leading-none italic uppercase tracking-tighter">
                                WISHLIST <span className="text-brand-500 lowercase">vault.</span>
                            </h1>
                            <p className="text-lg text-charcoal-500 font-medium italic">You've curated {itemsCount} handcrafted masterpieces.</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <Button
                                onClick={addAllToCart}
                                className="h-14 px-10 rounded-2xl bg-charcoal-900 hover:bg-brand-600 transition-all shadow-xl shadow-brand-100 flex items-center justify-center space-x-3 group"
                            >
                                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span>Move All to Bag</span>
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={clearWishlist}
                                className="h-14 px-6 rounded-2xl text-red-500 hover:bg-red-50 text-xs font-black uppercase tracking-widest"
                            >
                                <Trash2 className="w-5 h-5 mr-2" />
                                Flush Vault
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <AnimatePresence mode="popLayout">
                            {items.map((product, idx) => (
                                <motion.div
                                    key={product.id || idx}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Recommended Curation */}
                    <div className="pt-32 space-y-12">
                        <div className="flex items-center space-x-4">
                            <Sparkles className="w-8 h-8 text-brand-500 animate-pulse" />
                            <h2 className="text-3xl font-display font-black uppercase tracking-widest text-charcoal-900 italic">CURATED <span className="text-brand-500 lowercase">additions.</span></h2>
                        </div>
                        <div className="p-12 bg-white rounded-[4rem] border border-charcoal-100 shadow-2xl shadow-brand-100/10 flex flex-col md:flex-row items-center gap-12 group">
                            <div className="relative aspect-video w-full md:w-1/2 rounded-[3rem] overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1200"
                                    alt="Curation Banner"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                <div className="absolute bottom-10 left-10 space-y-2">
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest bg-brand-500/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">Autumn Perspective</span>
                                    <h3 className="text-4xl font-display font-bold text-white tracking-tighter uppercase tracking-widest">THE <span className="text-brand-500 lowercase italic">monochrome</span> SERIES.</h3>
                                </div>
                            </div>
                            <div className="flex-1 space-y-6">
                                <h4 className="text-4xl font-display font-semibold text-charcoal-900 leading-tight tracking-tight uppercase tracking-widest truncate">VISIONARY <br /><span className="text-brand-500 italic lowercase">recommendation.</span></h4>
                                <p className="text-lg text-charcoal-500 font-medium italic leading-relaxed">Based on your curations, you might appreciate the precision build of our Titanium collection.</p>
                                <Button asChild variant="outline" className="h-14 px-10 rounded-2xl border-2 font-bold uppercase tracking-widest shadow-xl group">
                                    <Link href="/products?material=TITANIUM">
                                        <span>Explore Pure Metal</span>
                                        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WishlistPage
