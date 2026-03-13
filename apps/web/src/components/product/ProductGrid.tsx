'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, List, SlidersHorizontal, Loader2, Sparkles, AlertCircle } from 'lucide-react'
import ProductCard from './ProductCard'
import { Button } from '@/components/ui/Button'

interface ProductGridProps {
    products: any[]
    isLoading: boolean
    isFetching: boolean
    total: number
    page: number
    totalPages: number
    onPageChange: (page: number) => void
    viewMode: 'grid' | 'list'
}

const ProductGrid = ({
    products,
    isLoading,
    isFetching,
    total,
    page,
    totalPages,
    onPageChange,
    viewMode
}: ProductGridProps) => {

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                    <ProductCard key={i} product={{}} loading={true} />
                ))}
            </div>
        )
    }

    if (!products?.length) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-32 space-y-6 text-center"
            >
                <div className="w-24 h-24 bg-charcoal-50 rounded-full flex items-center justify-center text-charcoal-300">
                    <AlertCircle className="w-12 h-12" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-3xl font-display font-semibold text-charcoal-900 leading-none">NO FRAMES FOUND.</h3>
                    <p className="text-charcoal-500 font-medium">Try adjusting your filters or search query to find your perfect fit.</p>
                </div>
                <Button variant="outline" className="h-12 px-8 rounded-full" onClick={() => window.location.href = '/products'}>
                    <Sparkles className="w-4 h-4 mr-2 text-brand-500" />
                    Reset All Filters
                </Button>
            </motion.div>
        )
    }

    return (
        <div className="space-y-12">
            <div className={cn(
                "grid gap-8",
                viewMode === 'grid'
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
            )}>
                <AnimatePresence mode="popLayout">
                    {products.map((product, idx) => (
                        <motion.div
                            key={product.id || idx}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex flex-col items-center justify-center space-y-4 pt-12 border-t border-charcoal-50">
                    <div className="flex items-center space-x-2">
                        {[...Array(totalPages)].map((_, i) => {
                            const p = i + 1
                            return (
                                <button
                                    key={p}
                                    onClick={() => onPageChange(p)}
                                    className={cn(
                                        "w-12 h-12 rounded-xl text-sm font-bold transition-all border",
                                        p === page
                                            ? "bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-100 scale-110"
                                            : "bg-white border-charcoal-100 text-charcoal-600 hover:border-brand-300 hover:bg-brand-50/50"
                                    )}
                                >
                                    {p}
                                </button>
                            )
                        })}
                    </div>
                    <span className="text-xs font-bold text-charcoal-400 uppercase tracking-widest leading-none">
                        Showing page {page} of {totalPages}
                    </span>
                </div>
            )}
        </div>
    )
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default ProductGrid
