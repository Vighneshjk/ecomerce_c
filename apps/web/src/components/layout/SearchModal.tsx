'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Command, CreditCard, ShoppingBag, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUIStore } from '@/store/uiStore'
import { Input } from '@/components/ui/Input'
// Wait, I created Input.tsx but I'll use a direct input for search modal simplicity

const SearchModal = () => {
    const { searchOpen, closeSearch } = useUIStore()
    const [query, setQuery] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    useEffect(() => {
        if (searchOpen) {
            setTimeout(() => inputRef.current?.focus(), 100)
        }
    }, [searchOpen])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                // openSearch() // Store has toggle, etc.
            }
            if (e.key === 'Escape') {
                closeSearch()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [closeSearch])

    // Mock results
    const mockProducts = [
        { id: '1', name: 'Aviator Classic', slug: 'aviator-classic', price: 4999, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=200' },
        { id: '2', name: 'Wayfarer Noir', slug: 'wayfarer-noir', price: 3499, image: 'https://images.unsplash.com/photo-1511499767390-90342f5b89a8?auto=format&fit=crop&q=80&w=200' },
        { id: '3', name: 'Titanium Round', slug: 'titanium-round', price: 6499, image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&q=80&w=200' },
    ]

    const recentSearches = ['Aviators', 'Blue Light', 'Sunglasses', 'Round Frames']

    return (
        <AnimatePresence>
            {searchOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] overflow-y-auto bg-white/95 backdrop-blur-md"
                >
                    <div className="w-full max-w-3xl px-6 pb-20">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center space-x-2 text-brand-600">
                                <Search className="w-6 h-6" />
                                <span className="font-display text-2xl font-semibold uppercase tracking-wider">Search Akela</span>
                            </div>
                            <button
                                onClick={closeSearch}
                                className="p-2 rounded-full hover:bg-charcoal-50 text-charcoal-500 transition-colors"
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        {/* Input Overlay */}
                        <div className="relative group">
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search products, collections, styles..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-charcoal-100 py-6 text-4xl font-display placeholder:text-charcoal-200 focus:outline-none focus:border-brand-600 transition-colors"
                            />
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center space-x-2 text-xs font-mono text-charcoal-400 bg-charcoal-50 px-3 py-1.5 rounded border border-charcoal-100">
                                <Command className="w-3 h-3" />
                                <span>K</span>
                            </div>
                        </div>

                        {/* Results / Content */}
                        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
                            {/* Left Column: Recent Searches */}
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-sm font-semibold text-charcoal-400 uppercase tracking-widest mb-4">Recent Searches</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {recentSearches.map((item) => (
                                            <button
                                                key={item}
                                                onClick={() => setQuery(item)}
                                                className="px-4 py-2 bg-charcoal-50 hover:bg-brand-50 hover:text-brand-700 rounded-full text-sm font-medium text-charcoal-700 transition-colors"
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-charcoal-400 uppercase tracking-widest mb-4">Popular Categories</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['Sunglasses', 'Eyeglasses', 'Virtual Try-On', 'New Arrivals'].map((cat) => (
                                            <Link
                                                key={cat}
                                                href={`/category/${cat.toLowerCase()}`}
                                                onClick={closeSearch}
                                                className="p-4 bg-charcoal-50/50 hover:bg-white border border-transparent hover:border-brand-100 rounded-xl group transition-all"
                                            >
                                                <span className="text-sm font-medium text-charcoal-900 group-hover:text-brand-600">{cat}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Suggested Products */}
                            <div>
                                <h3 className="text-sm font-semibold text-charcoal-400 uppercase tracking-widest mb-6">
                                    {query ? `Results for "${query}"` : 'Suggested Products'}
                                </h3>
                                <div className="space-y-6">
                                    {mockProducts.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={`/product/${product.slug}`}
                                            onClick={closeSearch}
                                            className="flex items-center group"
                                        >
                                            <div className="h-20 w-20 flex-shrink-0 bg-charcoal-50 rounded-lg overflow-hidden border border-charcoal-100">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    width={80}
                                                    height={80}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <p className="text-charcoal-900 font-medium group-hover:text-brand-600 transition-colors">{product.name}</p>
                                                <p className="text-charcoal-500 text-sm">₹{product.price.toLocaleString()}</p>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-charcoal-200 opacity-0 group-hover:opacity-100 transition-opacity translate-x-1 group-hover:translate-x-0" />
                                        </Link>
                                    ))}

                                    {query && (
                                        <Link
                                            href={`/search?q=${query}`}
                                            onClick={closeSearch}
                                            className="block pt-4 text-center font-medium text-brand-600 hover:text-brand-700 underline underline-offset-4"
                                        >
                                            View all results for "{query}"
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default SearchModal
