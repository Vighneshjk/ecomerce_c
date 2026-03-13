'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Heart, ShieldCheck, Zap, Microscope, ArrowRight } from 'lucide-react'
import { TryOnCanvas } from './TryOnCanvas'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'

interface TryOnModalProps {
    isOpen: boolean
    onClose: () => void
    product: any
}

export function TryOnModal({ isOpen, onClose, product }: TryOnModalProps) {
    if (!product) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[1000] flex items-center justify-center bg-charcoal-900/95 backdrop-blur-3xl overflow-hidden p-6 lg:p-12"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, ease: 'circOut' }}
                        className="relative w-full h-full max-w-[1600px] bg-charcoal-950 rounded-[4.5rem] border border-white/5 flex flex-col lg:flex-row overflow-hidden shadow-2xl"
                    >
                        {/* Close Button */}
                        <div className="absolute top-10 right-10 z-[1100]">
                            <button
                                onClick={onClose}
                                className="p-5 bg-white/5 backdrop-blur-2xl border border-white/5 rounded-full text-white hover:bg-brand-500 hover:text-black hover:rotate-90 transition-all shadow-2xl duration-500"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Canvas Area */}
                        <div className="flex-1 relative order-2 lg:order-1 group">
                            <TryOnCanvas
                                modelUrl={product.model3dUrl || '/models/aviator.glb'}
                                frameColor={product.variants?.[0]?.colorHex || '#FFD700'}
                            />

                            {/* Floating Details */}
                            <div className="absolute bottom-10 left-10 p-6 bg-charcoal-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] space-y-2 hidden md:block">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-500 block leading-none mb-2 animate-pulse">Vision Sync Active</span>
                                <h3 className="text-2xl font-display font-black italic text-white uppercase tracking-widest leading-none">{product.name}</h3>
                            </div>
                        </div>

                        {/* Product Sidebar */}
                        <aside className="w-full lg:w-[450px] p-12 lg:p-20 flex flex-col justify-between order-1 lg:order-2 border-l border-white/5 bg-charcoal-950/50 backdrop-blur-xl">
                            <div className="space-y-12">
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-3 text-brand-600 font-black uppercase tracking-[0.4em] text-[10px]">
                                        <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" />
                                        <span>Modal Sync Link</span>
                                    </div>
                                    <h2 className="text-5xl lg:text-7xl font-display font-semibold text-white tracking-tighter leading-none italic uppercase">
                                        VIRTUAL <br /><span className="text-brand-500 lowercase">fitting.</span>
                                    </h2>
                                    <p className="text-lg text-charcoal-400 font-light italic leading-relaxed">
                                        Perspective calibration complete. Handcrafted silhouettes, broadcast to your face.
                                    </p>
                                </div>

                                <div className="space-y-8 bg-white/5 p-8 rounded-[3rem] border border-white/5">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-2xl font-display font-black italic text-white leading-none uppercase tracking-tighter">{product.name}</h4>
                                        <span className="text-xl font-display font-bold text-brand-500 tracking-tighter">{formatPrice(product.price)}</span>
                                    </div>
                                    <div className="flex -space-x-2">
                                        {product.variants?.map((v: any, i: number) => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-charcoal-900 shadow-xl" style={{ backgroundColor: v.colorHex }} />
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <Button className="h-20 rounded-[2.5rem] bg-brand-500 text-black hover:bg-white transition-all shadow-2xl relative group/btn overflow-hidden">
                                        <span className="relative z-10 flex items-center justify-center space-x-4 text-xl font-black uppercase tracking-widest">
                                            <span>Secure Vision</span>
                                            <ShoppingBag className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
                                        </span>
                                    </Button>
                                    <Button variant="outline" className="h-16 rounded-[2rem] border-2 border-white/10 text-white hover:bg-white hover:text-black transition-all">
                                        <span className="text-xs font-black uppercase tracking-widest italic">Full View Details</span>
                                        <ArrowRight className="w-4 h-4 ml-3" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center space-x-6 pt-12">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-500 mb-2">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-charcoal-600">Secure</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-500 mb-2">
                                        <Microscope className="w-6 h-6" />
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-charcoal-600">Artisan</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-500 mb-2">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-charcoal-600">Real-Time</span>
                                </div>
                            </div>
                        </aside>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
