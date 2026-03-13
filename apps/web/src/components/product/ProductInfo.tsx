'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Truck, ShieldCheck, RefreshCcw, Sparkles, Heart, ShoppingBag, Plus, Minus, Info, Camera, Share2, Ruler } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPrice, getDiscountPercent } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { Badge } from '@/components/ui/Badge'
import { Divider } from '@/components/ui/Divider'

interface ProductInfoProps {
    product: any
}

const ProductInfo = ({ product }: ProductInfoProps) => {
    const { addItem, openCart } = useCart()
    const { toggleItem, isWishlisted } = useWishlist()
    const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null)
    const [quantity, setQuantity] = useState(1)
    const [lensType, setLensType] = useState('single')

    const hasDiscount = product.comparePrice && product.comparePrice > product.price
    const discountPercent = hasDiscount ? getDiscountPercent(product.comparePrice, product.price) : 0

    const handleAddToCart = () => {
        if (!selectedVariant) return
        addItem(product, selectedVariant, quantity)
        openCart()
    }

    return (
        <div className="flex flex-col space-y-8 h-full">
            {/* Header & Badges */}
            <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                    <nav className="flex items-center space-x-2 text-[10px] font-bold text-charcoal-400 uppercase tracking-widest">
                        <span>{product.category}</span>
                        <div className="w-1 h-1 bg-charcoal-200 rounded-full" />
                        <span>Collection 2024</span>
                    </nav>
                    {product.isNewArrival && <Badge variant="new">NEW ARRIVAL</Badge>}
                    {hasDiscount && <Badge variant="sale">FLASH SALE</Badge>}
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl lg:text-7xl font-display font-semibold text-charcoal-900 tracking-tighter leading-tight"
                >
                    {product.name}
                </motion.h1>

                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2 bg-brand-50 p-1.5 rounded-full px-4 border border-brand-100 shadow-xl shadow-brand-100/10">
                        <div className="flex -space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className={cn("w-3.5 h-3.5 fill-current", star <= 4.5 ? "text-brand-500" : "text-charcoal-200")} />
                            ))}
                        </div>
                        <span className="text-xs font-bold text-charcoal-900 border-l border-brand-200 pl-2">4.8 (124+ Reviews)</span>
                    </div>
                    <span className="text-xs font-bold text-brand-600 uppercase tracking-widest flex items-center">
                        <Camera className="w-3.5 h-3.5 mr-1" />
                        85% Accuracy in Virtual Try-On
                    </span>
                </div>
            </div>

            {/* Price section */}
            <div className="space-y-2">
                <div className="flex items-baseline space-x-4">
                    <span className="text-5xl font-display font-bold text-charcoal-900">{formatPrice(product.price)}</span>
                    {hasDiscount && (
                        <>
                            <span className="text-2xl text-charcoal-300 line-through font-display">{formatPrice(product.comparePrice)}</span>
                            <div className="px-3 py-1 bg-brand-500/10 text-brand-600 rounded-lg text-sm font-bold animate-pulse uppercase tracking-widest">
                                Save {discountPercent}%
                            </div>
                        </>
                    )}
                </div>
                <p className="text-xs font-bold text-charcoal-400 uppercase tracking-widest">Incl. of all taxes (GST 18%)</p>
            </div>

            <Divider className="opacity-50" />

            {/* Variants Selector */}
            {product.variants?.length > 0 && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-charcoal-400 uppercase tracking-widest">Choice of Aura</span>
                        <span className="text-sm font-semibold text-charcoal-900 italic font-display">{selectedVariant?.colorName} Edition</span>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {product.variants.map((variant: any) => (
                            <button
                                key={variant.id}
                                onClick={() => setSelectedVariant(variant)}
                                className={cn(
                                    "relative w-14 h-14 rounded-2xl border-2 transition-all group p-1 flex items-center justify-center transform active:scale-90",
                                    selectedVariant?.id === variant.id
                                        ? "border-brand-500 scale-110 shadow-xl shadow-brand-100/50"
                                        : "border-charcoal-100 hover:border-brand-300"
                                )}
                            >
                                <div
                                    className="w-full h-full rounded-xl transition-all shadow-inner"
                                    style={{ backgroundColor: variant.colorHex }}
                                />
                                {variant.stock <= 5 && variant.stock > 0 && (
                                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-400 rounded-full border-2 border-white animate-pulse" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Lens Guide / Selector */}
            <div className="space-y-4">
                <span className="text-[10px] font-bold text-charcoal-400 uppercase tracking-widest">Optical Customization</span>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { id: 'single', name: 'Zero Power', price: 0, desc: 'Digital safety lenses' },
                        { id: 'prescription', name: 'Prescription', price: 999, desc: 'Precision eye protection' }
                    ].map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setLensType(type.id)}
                            className={cn(
                                "p-4 rounded-2xl border-2 text-left transition-all space-y-2 group",
                                lensType === type.id
                                    ? "border-charcoal-900 bg-charcoal-900 text-white shadow-xl shadow-charcoal-200"
                                    : "border-charcoal-100 hover:border-brand-500 bg-white"
                            )}
                        >
                            <h5 className="font-bold text-sm uppercase tracking-widest">{type.name}</h5>
                            <p className={cn("text-xs leading-relaxed", lensType === type.id ? "text-charcoal-400" : "text-charcoal-500")}>
                                {type.desc}
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-6 sticky bottom-0 z-10 bg-white/80 backdrop-blur-md pb-4 pt-4 lg:relative lg:bg-transparent lg:pb-0">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between p-2 bg-charcoal-50 rounded-2xl border border-charcoal-100 w-full sm:w-1/3">
                        <button
                            disabled={quantity <= 1}
                            onClick={() => setQuantity(prev => prev - 1)}
                            className="p-3 bg-white text-charcoal-900 rounded-xl hover:bg-brand-50 disabled:opacity-30 transition-all shadow-sm transform active:scale-95"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-display font-black text-2xl text-charcoal-900">{quantity}</span>
                        <button
                            onClick={() => setQuantity(prev => prev + 1)}
                            className="p-3 bg-white text-charcoal-900 rounded-xl hover:bg-brand-50 transition-all shadow-sm transform active:scale-95"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    <Button
                        size="lg"
                        className="w-full sm:flex-1 h-16 rounded-2xl shadow-2xl shadow-brand-500/20 text-lg font-bold transition-all relative group overflow-hidden"
                        onClick={handleAddToCart}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                className="flex items-center space-x-3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <ShoppingBag className="w-6 h-6" />
                                <span>Place in Bag</span>
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                    </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button
                        variant="outline"
                        size="lg"
                        className="h-16 rounded-2xl border-2 flex items-center space-x-2 text-charcoal-900 group shadow-xl shadow-brand-100/50"
                        onClick={() => toggleItem(product)}
                    >
                        <Heart className={cn("w-5 h-5 transition-all duration-300", isWishlisted(product.id) ? "fill-red-500 text-red-500 scale-125" : "text-charcoal-400 group-hover:text-red-500")} />
                        <span className="font-bold uppercase tracking-widest text-xs">Save for later</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="lg"
                        className="h-16 rounded-2xl bg-brand-50 border-brand-100 border text-white flex items-center group relative overflow-hidden"
                        asChild
                    >
                        <Link href={`/virtual-tryon?id=${product.slug}`}>
                            <div className="absolute inset-0 bg-brand-500 transition-transform duration-500 translate-y-full group-hover:translate-y-0" />
                            <div className="relative z-10 flex items-center space-x-3 text-brand-600 transition-colors duration-500 group-hover:text-white">
                                <Sparkles className="w-6 h-6 animate-pulse" />
                                <span className="font-bold uppercase tracking-widest text-xs">Aura Try-On</span>
                            </div>
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-charcoal-50">
                {[
                    { label: 'Hyper Fast Delivery', icon: <Truck className="w-5 h-5" />, desc: '3-4 Days Global' },
                    { label: 'Craft Guarantee', icon: <ShieldCheck className="w-5 h-5" />, desc: '1-Year Warranty' },
                    { label: 'Vision Fit Replace', icon: <RefreshCcw className="w-5 h-5" />, desc: '14 Days Exchange' },
                ].map((badge, i) => (
                    <div key={i} className="flex flex-col items-center text-center space-y-3 group cursor-pointer">
                        <div className="w-12 h-12 bg-charcoal-50 rounded-2xl flex items-center justify-center text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-all transform group-hover:rotate-12 group-hover:scale-110 shadow-inner">
                            {badge.icon}
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-black text-charcoal-900 uppercase tracking-widest block">{badge.label}</span>
                            <span className="text-[9px] font-bold text-charcoal-400 block">{badge.desc}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-8 flex flex-wrap gap-6 items-center border-t border-charcoal-50">
                <button className="flex items-center space-x-2 text-[10px] font-bold text-charcoal-500 uppercase tracking-widest hover:text-brand-600 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>Share Design</span>
                </button>
                <button className="flex items-center space-x-2 text-[10px] font-bold text-charcoal-500 uppercase tracking-widest hover:text-brand-600 transition-colors">
                    <Ruler className="w-4 h-4" />
                    <span>Sizing Guide</span>
                </button>
            </div>
        </div>
    )
}

export default ProductInfo
