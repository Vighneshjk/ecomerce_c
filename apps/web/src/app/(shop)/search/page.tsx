'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, SlidersHorizontal, LayoutGrid, List, Sparkles, Home, Filter, Trash2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import ProductCard from '@/components/product/ProductCard'
import { useProducts } from '@/hooks/useProducts'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const SearchPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const query = searchParams.get('q') || ''
    const [searchTerm, setSearchTerm] = useState(query)

    const { data, isLoading } = useProducts()
    const products = data?.products || []
    const total = data?.total || 0

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
        }
    }

    return (
        <div className="bg-[#FCFBF8] min-h-screen pt-32 pb-40">
            <div className="container-app">
                <div className="flex flex-col space-y-12">
                    <div className="space-y-6 text-center max-w-4xl mx-auto">
                        <div className="flex items-center justify-center space-x-3 text-xs font-bold text-charcoal-400 uppercase tracking-widest">
                            <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
                            <div className="w-1 h-1 bg-charcoal-200 rounded-full" />
                            <span className="text-charcoal-900">Virtual Insight</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-display font-semibold text-charcoal-900 tracking-tighter leading-none italic uppercase tracking-tighter">
                            LOCATE <span className="text-brand-500">YOUR VISION.</span>
                        </h1>

                        <form onSubmit={handleSearch} className="relative group max-w-2xl mx-auto pt-8">
                            <Input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by frame, color, or vibe..."
                                className="h-20 bg-white border-charcoal-100 rounded-[2.5rem] pl-16 pr-24 text-xl font-display font-medium shadow-2xl shadow-brand-100/30 focus-visible:ring-brand-500 transition-all border-2"
                            />
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-charcoal-300 group-focus-within:text-brand-500 transition-colors" />
                            <Button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-charcoal-900 text-white hover:bg-brand-500 transition-all flex items-center justify-center shadow-xl group/btn transform active:scale-95">
                                <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                        </form>
                    </div>

                    <div className="space-y-12">
                        <div className="flex items-center justify-between border-b border-charcoal-50 pb-6">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-charcoal-400 uppercase tracking-widest">Search Insights</span>
                                <div className="flex items-center space-x-3">
                                    <h2 className="text-2xl font-display font-bold text-charcoal-900 italic">Results for "{query || 'All Frames'}"</h2>
                                    <span className="px-3 py-1 bg-brand-50 text-brand-700 text-[10px] font-black rounded-full border border-brand-100 uppercase tracking-widest leading-none pt-1.5">{total} FOUND</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 bg-white p-1 rounded-xl border border-charcoal-100">
                                <Button variant="ghost" size="sm" className="h-10 px-4 rounded-lg bg-charcoal-50 hover:bg-white text-xs font-bold uppercase tracking-widest flex items-center">
                                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                                    Refine
                                </Button>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="aspect-[4/5] bg-white rounded-3xl border border-charcoal-100 animate-pulse" />
                                ))}
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {products.map((product, idx) => (
                                    <ProductCard key={product.id || idx} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-32 space-y-8 text-center bg-white rounded-[3rem] border border-charcoal-100 shadow-xl shadow-brand-100/10">
                                <div className="relative w-32 h-32 bg-charcoal-50 rounded-full flex items-center justify-center text-charcoal-200">
                                    <Search className="w-16 h-16" />
                                    <div className="absolute top-0 right-0 w-8 h-8 bg-brand-500 rounded-full shadow-lg flex items-center justify-center">
                                        <X className="w-4 h-4 text-black" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-4xl font-display font-semibold text-charcoal-900 uppercase tracking-widest italic">NO LENS MATCHED.</h3>
                                    <p className="text-charcoal-500 font-medium italic max-w-sm mx-auto">Try refining your aura keyword or explore our latest curated releases for inspiration.</p>
                                </div>
                                <Button asChild size="lg" className="h-14 px-10 rounded-2xl bg-charcoal-900 hover:bg-brand-600 transition-all shadow-xl group">
                                    <Link href="/products">
                                        <span>Discover Latest Highlights</span>
                                        <Sparkles className="w-4 h-4 ml-2 animate-pulse group-hover:scale-125 transition-transform" />
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage
