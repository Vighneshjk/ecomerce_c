'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, ShieldCheck, Microscope, Zap, Heart, ShoppingBag, Wind } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Divider } from '@/components/ui/Divider'

const products = [
    { id: '1', name: 'AURA AVIATOR', price: 18900, category: 'Sunglasses', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400', model: '/models/aviator.glb', color: 'Gold Titanium' },
    { id: '2', name: 'ROUND VISION', price: 14500, category: 'Eyeglasses', image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=400', model: '/models/round.glb', color: 'Glossy Black' },
    { id: '3', name: 'BLOCK CAT-EYE', price: 16200, category: 'Sunglasses', image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=400', model: '/models/cateye.glb', color: 'Tortoise' },
    { id: '4', name: 'LINEAR RECTANGLE', price: 12800, category: 'Blue Light', image: 'https://images.unsplash.com/photo-1511499767390-a73359580bc3?auto=format&fit=crop&q=80&w=400', model: '/models/rectangle.glb', color: 'Gunmetal' },
    { id: '5', name: 'POLAR SQUARE', price: 19500, category: 'Sunglasses', image: 'https://images.unsplash.com/photo-1509100104048-73c894705751?auto=format&fit=crop&q=80&w=400', model: '/models/square.glb', color: 'Matte Grey' },
]

export function FramePicker({ selectedId, onSelect }: { selectedId: string, onSelect: (p: any) => void }) {
    return (
        <div className="w-full space-y-10 group/picker">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-display font-semibold italic text-white/50 uppercase tracking-widest leading-none">THE <span className="text-white">nexus.</span></h3>
                <div className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-brand-500 italic">
                    <Zap className="w-4 h-4 animate-pulse" />
                    <span>Broadcast Frequency: Live</span>
                </div>
            </div>

            <div className="flex items-center space-x-4 overflow-x-auto pb-8 scrollbar-hide no-scrollbar -mx-10 px-10">
                {products.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => onSelect(p)}
                        className={`relative flex-shrink-0 w-32 group/item transition-all duration-500 ${selectedId === p.id ? 'scale-110' : 'opacity-40 hover:opacity-100 hover:scale-105'}`}
                    >
                        {/* Frame background glow */}
                        {selectedId === p.id && (
                            <motion.div
                                layoutId="selected-glow"
                                className="absolute inset-0 bg-brand-500 rounded-[2rem] blur-[30px] opacity-20"
                            />
                        )}

                        <div className={`relative aspect-square rounded-[2rem] bg-charcoal-900 border-2 overflow-hidden shadow-2xl transition-all duration-500 ${selectedId === p.id ? 'border-brand-500 shadow-brand-500/20' : 'border-white/5'}`}>
                            <img src={p.image} alt={p.name} className="w-full h-full object-contain p-4 group-hover/item:scale-125 transition-transform duration-700 saturate-0 group-hover/item:saturate-100" />

                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity" />
                            <div className="absolute bottom-3 left-0 w-full text-center opacity-0 group-hover/item:opacity-100 translate-y-2 group-hover/item:translate-y-0 transition-all">
                                <span className="text-[7px] font-black uppercase tracking-[0.2em] text-white italic">Vision Sync Link</span>
                            </div>
                        </div>

                        <div className="mt-4 text-center px-2">
                            <span className={`text-[8px] font-black uppercase tracking-widest leading-none block transition-colors ${selectedId === p.id ? 'text-brand-500' : 'text-charcoal-600 group-hover/item:text-white'}`}>{p.name.split(' ')[0]} <br /> {p.name.split(' ')[1]}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}
