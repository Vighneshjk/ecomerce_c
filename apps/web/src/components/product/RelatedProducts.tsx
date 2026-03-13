'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Link from 'next/link'
import ProductCard from './ProductCard'

interface RelatedProductsProps {
    products: any[]
}

const RelatedProducts = ({ products = [] }: RelatedProductsProps) => {

    // Fallback if no related products are found
    if (!products || products.length === 0) return null

    return (
        <section className="py-24 bg-charcoal-50/50 relative overflow-hidden">
            {/* Decorative Background Element */}
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-500 rounded-full blur-[100px] opacity-10" />

            <div className="container-app relative">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0">
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Sparkles className="w-5 h-5 text-brand-500 animate-pulse" />
                            <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest leading-none">Curation</span>
                        </div>
                        <h2 className="text-5xl lg:text-7xl font-display font-semibold text-charcoal-900 tracking-tight leading-none uppercase tracking-widest italic">
                            COMPLETE THE <br /> <span className="text-brand-500 italic">LENS LOOK.</span>
                        </h2>
                    </div>

                    <Link
                        href="/products"
                        className="group flex items-center space-x-3 text-sm font-black text-charcoal-800 uppercase tracking-widest hover:text-brand-600 transition-colors"
                    >
                        <span>Browse Entire Collection</span>
                        <div className="w-12 h-12 rounded-[1.5rem] border border-charcoal-200 flex items-center justify-center group-hover:bg-brand-500 group-hover:border-brand-500 group-hover:text-white transition-all transform group-hover:rotate-45 shadow-xl shadow-brand-100/50">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, idx) => (
                        <ProductCard key={product.id || idx} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default RelatedProducts
