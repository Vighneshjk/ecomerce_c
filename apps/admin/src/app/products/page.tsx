'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Search,
    Filter,
    Plus,
    MoreVertical,
    LayoutGrid,
    List,
    ArrowUpRight,
    Eye,
    Edit3,
    Trash2,
    ChevronLeft,
    ChevronRight,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    XCircle,
    Package,
    ArrowUpDown
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const mockProducts = [
    { id: '1', name: 'Aura Aviator', sku: 'AKL-SUN-001', category: 'Sunglasses', price: 18900, stock: 42, status: 'Active', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=200' },
    { id: '2', name: 'Round Vision', sku: 'AKL-EYE-002', category: 'Eyeglasses', price: 14500, stock: 18, status: 'Active', image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=200' },
    { id: '3', name: 'Block Cat-Eye', sku: 'AKL-SUN-003', category: 'Sunglasses', price: 16200, stock: 25, status: 'Draft', image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=200' },
    { id: '4', name: 'Linear Rectangle', sku: 'AKL-BLU-004', category: 'Blue Light', price: 12800, stock: 8, status: 'Active', image: 'https://images.unsplash.com/photo-1511499767390-a73359580bc3?auto=format&fit=crop&q=80&w=200' },
    { id: '5', name: 'Polar Square', sku: 'AKL-SUN-005', category: 'Sunglasses', price: 19500, stock: 12, status: 'Archived', image: 'https://images.unsplash.com/photo-1509100104048-73c894705751?auto=format&fit=crop&q=80&w=200' },
]

export default function ProductsPage() {
    const [search, setSearch] = useState('')
    const [view, setView] = useState<'list' | 'grid'>('list')

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-6">
                    <div className="flex items-center space-x-3 text-brand-600 font-black uppercase tracking-[0.4em] text-[10px]">
                        <Package className="w-3 h-3" />
                        <span>Product Inventory Node Registry</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-display font-semibold text-white tracking-tighter leading-none italic uppercase">
                        THE <span className="text-brand-500">catalog.</span>
                    </h1>
                </div>

                <Button asChild className="h-20 px-12 rounded-[2.5rem] bg-brand-500 text-black hover:bg-white transition-all shadow-2xl">
                    <Link href="/products/new" className="flex items-center space-x-4">
                        <Plus className="w-6 h-6" />
                        <span className="text-lg font-black uppercase tracking-widest">Add Vision Node</span>
                    </Link>
                </Button>
            </div>

            {/* Filters bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 bg-white/5 border border-white/5 rounded-[2.5rem] backdrop-blur-3xl">
                <div className="flex flex-1 items-center space-x-6">
                    <div className="relative flex-1 max-w-md group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-500 group-focus-within:text-brand-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Scan Catalog..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl pl-14 pr-6 text-sm font-black focus:ring-2 focus:ring-brand-500 transition-all outline-none"
                        />
                    </div>
                    <button className="h-14 px-8 bg-white/5 border border-white/5 rounded-2xl flex items-center space-x-3 text-charcoal-400 hover:text-white transition-all group">
                        <Filter className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Refine</span>
                    </button>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-white/5 p-1 rounded-2xl border border-white/5">
                        <button
                            onClick={() => setView('grid')}
                            className={`p-3 rounded-xl transition-all ${view === 'grid' ? 'bg-brand-500 text-black' : 'text-charcoal-500 hover:text-white'}`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setView('list')}
                            className={`p-3 rounded-xl transition-all ${view === 'list' ? 'bg-brand-500 text-black' : 'text-charcoal-500 hover:text-white'}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex items-center space-x-2 px-6 py-4 bg-white/5 border border-white/5 rounded-2xl">
                        <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-500">Count:</span>
                        <span className="text-sm font-display font-bold italic text-white">{mockProducts.length}</span>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="p-10 bg-[#141414] border border-white/5 rounded-[4rem] shadow-2xl overflow-hidden group">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="py-8 text-left w-16">
                                    <input type="checkbox" className="w-5 h-5 bg-white/5 border-white/5 rounded-lg accent-brand-500" />
                                </th>
                                <th className="py-8 text-left text-[10px] font-black uppercase tracking-widest text-charcoal-500">Element Vision</th>
                                <th className="py-8 text-left text-[10px] font-black uppercase tracking-widest text-charcoal-500">ID Node</th>
                                <th className="py-8 text-left text-[10px] font-black uppercase tracking-widest text-charcoal-500">Link Yield</th>
                                <th className="py-8 text-left text-[10px] font-black uppercase tracking-widest text-charcoal-500">Artisan Stock</th>
                                <th className="py-8 text-left text-[10px] font-black uppercase tracking-widest text-charcoal-500">Broadcast Link</th>
                                <th className="py-8"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {mockProducts.map((p, i) => (
                                <tr key={i} className="group/row hover:bg-white/5 transition-all">
                                    <td className="py-8">
                                        <input type="checkbox" className="w-5 h-5 bg-white/5 border-white/5 rounded-lg accent-brand-500" />
                                    </td>
                                    <td className="py-8">
                                        <div className="flex items-center space-x-6">
                                            <div className="w-16 h-16 bg-charcoal-900 rounded-2xl overflow-hidden border border-white/5 group-hover/row:scale-110 group-hover/row:border-brand-500 transition-all shadow-xl">
                                                <img src={p.image} className="w-full h-full object-cover p-2 sature-0 group-hover/row:saturate-100 transition-all" />
                                            </div>
                                            <div className="flex flex-col space-y-1 text-left">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-500">{p.category}</span>
                                                <h4 className="text-sm font-black italic tracking-tighter text-white">{p.name}</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-8">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-400 group-hover/row:text-white transition-colors">{p.sku}</span>
                                    </td>
                                    <td className="py-8">
                                        <span className="text-sm font-black text-brand-500 tracking-tighter">₹{p.price.toLocaleString()}</span>
                                    </td>
                                    <td className="py-8">
                                        <div className="flex items-center space-x-3 text-sm font-black tracking-tighter italic">
                                            <span className={p.stock < 10 ? 'text-red-500' : 'text-white'}>{p.stock}</span>
                                            <span className="text-[8px] font-black uppercase tracking-widest text-charcoal-600 group-hover/row:text-charcoal-400 transition-colors">Units</span>
                                        </div>
                                    </td>
                                    <td className="py-8">
                                        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${p.status === 'Active' ? 'bg-green-500/10 text-green-500' :
                                                p.status === 'Draft' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-charcoal-800 text-charcoal-400'
                                            }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${p.status === 'Active' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' :
                                                    p.status === 'Draft' ? 'bg-yellow-500' : 'bg-charcoal-600'
                                                }`} />
                                            <span>{p.status}</span>
                                        </div>
                                    </td>
                                    <td className="py-8 text-right">
                                        <div className="flex items-center justify-end space-x-3 opacity-0 group-hover/row:opacity-100 transition-opacity">
                                            <Link href={`/products/${p.id}`} className="p-3 bg-white/5 hover:bg-white hover:text-black rounded-xl transition-all shadow-xl">
                                                <Edit3 className="w-4 h-4" />
                                            </Link>
                                            <button className="p-3 bg-white/5 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-xl">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-3 bg-white/5 hover:bg-brand-500 hover:text-black rounded-xl transition-all shadow-xl">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-12 pt-12 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col text-left">
                        <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-500 leading-none mb-2">Displaying Node Stream</span>
                        <span className="text-sm font-display font-bold italic text-white">1 - {mockProducts.length} of 142 Artisan Objects</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="p-4 bg-white/5 border border-white/5 rounded-2xl text-charcoal-500 hover:text-white transition-all disabled:opacity-20 cursor-pointer" disabled>
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="flex items-center space-x-2">
                            {[1, 2, 3, '...', 12].map((n, i) => (
                                <button
                                    key={i}
                                    className={`w-12 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${n === 1 ? 'bg-brand-500 text-black shadow-lg shadow-brand-500/20' : 'bg-white/5 text-charcoal-400 hover:text-white'}`}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>
                        <button className="p-4 bg-white/5 border border-white/5 rounded-2xl text-charcoal-400 hover:text-white transition-all group cursor-pointer">
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
