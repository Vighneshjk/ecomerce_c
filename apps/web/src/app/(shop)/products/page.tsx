'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, LayoutGrid, List, ChevronDown, ChevronRight, Home, Sparkles, Filter, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import ProductFilters from '@/components/product/ProductFilters'
import ProductGrid from '@/components/product/ProductGrid'
import { useProducts } from '@/hooks/useProducts'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

const CatalogPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    const { data, isLoading, isFetching } = useProducts()
    const products = data?.products || []
    const total = data?.total || 0
    const page = data?.page || 1
    const totalPages = data?.totalPages || 1

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 200)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handlePageChange = (p: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', p.toString())
        router.push(`/products?${params.toString()}`)
    }

    const sortOption = searchParams.get('sort') || 'featured'

    const updateSort = (s: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('sort', s)
        router.push(`/products?${params.toString()}`)
    }

    return (
        <div className="bg-white min-h-screen pt-24 pb-32 overflow-hidden">
            {/* Breadcrumb & Title */}
            <div className="container-app py-12 relative">
                <div className="absolute top-0 right-0 opacity-[0.03] select-none pointer-events-none -translate-y-1/2 translate-x-1/2">
                    <span className="text-[15rem] font-display font-bold text-charcoal-900 tracking-tighter">VISION</span>
                </div>

                <div className="flex flex-col space-y-6 relative z-10">
                    <nav className="flex items-center space-x-3 text-xs font-bold text-charcoal-400 uppercase tracking-widest">
                        <Link href="/" className="hover:text-brand-600 flex items-center transition-colors">
                            <Home className="w-3.5 h-3.5 mr-1" />
                            Home
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-charcoal-900 border-b-2 border-brand-500 pb-0.5">Collection</span>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                                <h1 className="text-6xl md:text-8xl font-display font-semibold text-charcoal-900 tracking-tighter">
                                    THE <br className="hidden md:block" /> COLLECTION.
                                </h1>
                                <Sparkles className="w-10 h-10 text-brand-500 animate-pulse hidden lg:block" />
                            </div>
                            <p className="text-xl text-charcoal-500 font-light max-w-lg leading-relaxed pt-4">
                                Handcrafted with passion, engineered for precision. Explore our curated range of silhouettes.
                            </p>
                        </div>

                        {/* Results Count & View Toggle */}
                        <div className="flex flex-wrap items-center gap-4 lg:gap-8 bg-charcoal-50 p-4 lg:p-6 rounded-[2rem] border border-charcoal-100 shadow-xl shadow-brand-100/20">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-charcoal-400 uppercase tracking-widest">Showing</span>
                                <span className="text-lg font-display font-semibold text-charcoal-900">{total} Frames Found</span>
                            </div>

                            <Divider orientation="vertical" className="h-10 hidden sm:block" />

                            <div className="flex items-center space-x-2 bg-white/50 p-1 rounded-xl border border-charcoal-100">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={cn("p-2.5 rounded-lg transition-all", viewMode === 'grid' ? "bg-charcoal-900 text-white shadow-lg" : "text-charcoal-400 hover:text-charcoal-600")}
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={cn("p-2.5 rounded-lg transition-all", viewMode === 'list' ? "bg-charcoal-900 text-white shadow-lg" : "text-charcoal-400 hover:text-charcoal-600")}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="relative group">
                                <select
                                    value={sortOption}
                                    onChange={(e) => updateSort(e.target.value)}
                                    className="appearance-none bg-white border border-charcoal-100 rounded-xl px-4 py-2.5 text-sm font-bold uppercase tracking-widest text-charcoal-700 outline-none focus:ring-2 focus:ring-brand-500 transition-all pr-12 cursor-pointer hover:border-brand-300"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="newest">Newest First</option>
                                    <option value="price-low">Price: Low-High</option>
                                    <option value="price-high">Price: High-Low</option>
                                    <option value="rating">Best Rated</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400 pointer-events-none group-hover:text-brand-500 transition-colors" />
                            </div>

                            <Button
                                variant="outline"
                                className="lg:hidden h-12 rounded-xl"
                                onClick={() => setIsMobileFiltersOpen(true)}
                            >
                                <Filter className="w-4 h-4 mr-2" />
                                Filter
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-app grid grid-cols-1 lg:grid-cols-4 gap-12 pt-8">
                {/* Desktop Filters */}
                <aside className="hidden lg:block col-span-1">
                    <ProductFilters />
                </aside>

                {/* Product Grid Area */}
                <main className="lg:col-span-3">
                    <ProductGrid
                        products={products}
                        isLoading={isLoading}
                        isFetching={isFetching}
                        total={total}
                        page={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        viewMode={viewMode}
                    />
                </main>
            </div>

            {/* Mobile Filters Drawer */}
            <AnimatePresence>
                {isMobileFiltersOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileFiltersOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[101] shadow-2xl p-8 overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-8 pb-4 border-b">
                                <h3 className="text-2xl font-display font-semibold">Filter Results</h3>
                                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 hover:bg-charcoal-50 rounded-full transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <ProductFilters />
                            <div className="sticky bottom-0 left-0 right-0 pt-8 pb-4 bg-white">
                                <Button className="w-full h-14 rounded-2xl shadow-xl shadow-brand-100" onClick={() => setIsMobileFiltersOpen(false)}>
                                    Apply Filters ({total} Results)
                                </Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Sticky Mobile Filter Button */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : 100 }}
                className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[50] lg:hidden"
            >
                <Button
                    className="h-14 px-8 rounded-full shadow-2xl shadow-brand-500/50 flex items-center space-x-3 bg-charcoal-900 border border-brand-500/30"
                    onClick={() => setIsMobileFiltersOpen(true)}
                >
                    <Filter className="w-4 h-4 text-brand-500" />
                    <span className="text-sm font-bold uppercase tracking-widest">Refine Results</span>
                    <span className="w-6 h-6 rounded-full bg-brand-500 text-black flex items-center justify-center text-[10px] font-black">{total}</span>
                </Button>
            </motion.div>
        </div>
    )
}

export default CatalogPage
