'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronUp, ChevronDown, Maximize2, Sparkles, Box } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProductImagesProps {
    images: any[]
    isFeatured?: boolean
}

const ProductImages = ({ images = [] }: ProductImagesProps) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isZoomed, setIsZoomed] = useState(false)

    if (!images.length) return <div className="aspect-[4/5] bg-charcoal-100 rounded-2xl animate-pulse" />

    return (
        <div className="flex flex-col-reverse lg:flex-row gap-6 lg:h-[800px]">
            {/* Thumbnail Strip */}
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:h-full lg:min-w-[100px] py-1 custom-scrollbar">
                {images.map((img, i) => (
                    <button
                        key={img.id || i}
                        onClick={() => setActiveIndex(i)}
                        className={cn(
                            "relative aspect-square w-20 lg:w-full rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 group ring-offset-4 ring-brand-100",
                            activeIndex === i ? "border-brand-500 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                        )}
                    >
                        <Image
                            src={img.url}
                            alt={`Preview ${i}`}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-brand-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                ))}
            </div>

            {/* Main Image View */}
            <div className="relative flex-1 aspect-[4/5] lg:h-full bg-brand-50/30 rounded-3xl overflow-hidden group border border-charcoal-50 shadow-2xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={images[activeIndex]?.url}
                            alt="Main Product View"
                            fill
                            className={cn(
                                "object-contain p-12 transition-all duration-[2s] ease-out",
                                isZoomed ? "scale-150 cursor-zoom-out" : "scale-100 hover:scale-110 cursor-zoom-in"
                            )}
                            onClick={() => setIsZoomed(!isZoomed)}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Overlays */}
                <div className="absolute top-8 left-8 z-10 flex flex-col space-y-3">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-charcoal-50 shadow-xl shadow-brand-100/20">
                        <Sparkles className="w-4 h-4 text-brand-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal-900 italic font-display">AKELA Vision</span>
                    </div>
                </div>

                <div className="absolute bottom-8 right-8 z-10 flex space-x-3">
                    <button
                        onClick={() => setIsZoomed(!isZoomed)}
                        className="p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-charcoal-50 shadow-xl hover:bg-brand-500 hover:text-white transition-all transform hover:scale-110"
                    >
                        <Maximize2 className="w-5 h-5" />
                    </button>
                    <button className="p-4 bg-charcoal-900 border border-white/10 text-white rounded-2xl shadow-xl hover:bg-brand-500 transition-all flex items-center space-x-2 group">
                        <Box className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-widest hidden group-hover:block transition-all">360° View</span>
                    </button>
                </div>

                {/* Navigation Arrows */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        disabled={activeIndex === 0}
                        onClick={(e) => { e.stopPropagation(); setActiveIndex(prev => prev - 1); }}
                        className="p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg pointer-events-auto disabled:opacity-30 hover:bg-brand-500 hover:text-white transition-all"
                    >
                        <ChevronUp className="-rotate-90 w-5 h-5" />
                    </button>
                    <button
                        disabled={activeIndex === images.length - 1}
                        onClick={(e) => { e.stopPropagation(); setActiveIndex(prev => prev + 1); }}
                        className="p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg pointer-events-auto disabled:opacity-30 hover:bg-brand-500 hover:text-white transition-all"
                    >
                        <ChevronDown className="-rotate-90 w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductImages
