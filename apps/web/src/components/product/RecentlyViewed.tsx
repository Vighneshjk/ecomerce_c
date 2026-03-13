'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Eye, History, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import ProductCard from './ProductCard'

const RecentlyViewed = () => {
    const [viewedIds, setViewedIds] = useState<string[]>([])
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const stored = localStorage.getItem('akela_recent_vision')
        if (stored) {
            const ids = JSON.parse(stored)
            setViewedIds(ids)
            fetchRecentProducts(ids)
        }
    }, [])

    const fetchRecentProducts = async (ids: string[]) => {
        if (!ids.length) return
        setLoading(true)
        try {
            // Bulk fetch for demo (Ideally use a bulk API endpoint)
            const results = await Promise.all(
                ids.slice(0, 4).map(async (id) => {
                    const res = await fetch(`/api/products/${id}`)
                    return res.ok ? await res.json() : null
                })
            )
            setProducts(results.filter(p => p !== null))
        } catch (err) {
            console.error('Fetch recent error:', err)
        } finally {
            setLoading(false)
        }
    }

    const clearRecent = () => {
        localStorage.removeItem('akela_recent_vision')
        setViewedIds([])
        setProducts([])
    }

    if (!products.length && !loading) return null

    return (
        <section className="py-24 bg-white border-t border-charcoal-50 overflow-hidden">
            <div className="container-app">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0">
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <History className="w-5 h-5 text-brand-600 animate-pulse" />
                            <span className="text-[10px] font-black text-charcoal-400 uppercase tracking-widest leading-none">Perspective History</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-display font-semibold text-charcoal-900 tracking-tight leading-none uppercase tracking-widest italic">
                            YOUR RECENT <br /> <span className="text-brand-500 italic">GLANCES.</span>
                        </h2>
                    </div>

                    <button
                        onClick={clearRecent}
                        className="group flex items-center space-x-2 text-[10px] font-black text-charcoal-400 uppercase tracking-widest hover:text-red-500 transition-colors"
                    >
                        <Trash2 className="w-4 h-4 group-hover:animate-shake" />
                        <span>Flush History</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <AnimatePresence>
                        {loading ? (
                            [...Array(4)].map((_, i) => (
                                <div key={i} className="aspect-[4/5] bg-charcoal-50 rounded-2xl animate-pulse" />
                            ))
                        ) : (
                            products.map((product, idx) => (
                                <motion.div
                                    key={product.id || idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}

export default RecentlyViewed
