'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingBag, Sparkles, Plus, Eye, ArrowRight, Minus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { formatPrice, getDiscountPercent } from '@/lib/utils'
import { cn } from '@/lib/utils'

export interface ProductCardProps {
    product: any; // Using any for simplicity in initial setup
    loading?: boolean;
}

const ProductCard = ({ product, loading = false }: ProductCardProps) => {
    const { toggleItem, isWishlisted } = useWishlist()
    const { addItem, openCart } = useCart()
    const [isHovered, setIsHovered] = useState(false)

    if (loading) {
        return (
            <div className="group relative space-y-4 animate-pulse">
                <div className="aspect-[4/5] bg-charcoal-100 rounded-2xl w-full" />
                <div className="space-y-2">
                    <div className="h-4 bg-charcoal-100 rounded w-3/4" />
                    <div className="h-4 bg-charcoal-100 rounded w-1/4" />
                </div>
            </div>
        )
    }

    const primaryImage = product.images?.find((img: any) => img.isPrimary)?.url || product.images?.[0]?.url || product.image
    const secondaryImage = product.images?.[1]?.url || primaryImage

    const hasDiscount = product.comparePrice && product.comparePrice > product.price
    const discountPercent = hasDiscount ? getDiscountPercent(product.comparePrice, product.price) : 0

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative space-y-4 flex flex-col items-center bg-white border border-charcoal-50 p-4 rounded-3xl hover:shadow-2xl hover:shadow-brand-100/50 transition-all duration-700 h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Top Badge Overlay */}
            <div className="absolute top-6 left-6 z-20 flex flex-col space-y-2">
                {product.isNewArrival && <Badge variant="new">NEW</Badge>}
                {hasDiscount && <Badge variant="sale">-{discountPercent}%</Badge>}
                {product.isFeatured && <Badge variant="featured">FEATURED</Badge>}
            </div>

            {/* Wishlist Button */}
            <button
                onClick={(e) => { e.preventDefault(); toggleItem(product); }}
                className={cn(
                    "absolute top-6 right-6 z-20 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110",
                    isWishlisted(product.id)
                        ? "bg-red-500 text-white"
                        : "bg-white/80 text-charcoal-600 border border-charcoal-100"
                )}
            >
                <Heart className={cn("w-4 h-4 transition-colors", isWishlisted(product.id) && "fill-current")} />
            </button>

            {/* Image Section */}
            <Link
                href={`/product/${product.slug}`}
                className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-brand-50/20 group-hover:bg-brand-50/50 transition-colors"
            >
                <Image
                    src={isHovered ? secondaryImage : primaryImage}
                    alt={product.name}
                    fill
                    className="object-contain p-6 scale-90 group-hover:scale-100 transition-all duration-1000 ease-out"
                />

                {/* Quick Add Overlay */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-4 inset-x-4 space-y-2"
                >
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addItem(product, product.variants?.[0] || { id: 'default', colorName: 'Default', colorHex: '#000', stock: 10 }, 1);
                            openCart();
                        }}
                        className="w-full h-11 bg-charcoal-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-brand-600 transition-all active:scale-95 shadow-xl"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add To Bag</span>
                    </button>

                    <Link
                        href={`/tryon?productId=${product.id}`}
                        className="w-full h-11 bg-white/90 backdrop-blur-sm text-charcoal-900 border border-charcoal-100 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-white hover:text-brand-600 transition-all active:scale-95"
                    >
                        <Sparkles className="w-4 h-4 text-brand-500" />
                        <span>Virtual Try-On</span>
                    </Link>
                </motion.div>
            </Link>

            {/* Info Section */}
            <div className="w-full space-y-2 pt-2 text-center lg:text-left">
                <div className="flex flex-col items-center lg:items-start">
                    <span className="text-[10px] font-bold text-charcoal-400 uppercase tracking-widest">
                        {product.category || 'Sunglasses'}
                    </span>
                    <h3 className="text-lg font-display font-semibold text-charcoal-900 group-hover:text-brand-600 transition-colors leading-tight">
                        {product.name}
                    </h3>
                </div>

                {/* Color Variants Dot Indicator */}
                <div className="flex justify-center lg:justify-start space-x-2 py-1">
                    {product.variants?.slice(0, 4).map((variant: any, i: number) => (
                        <div
                            key={i}
                            className="w-3 h-3 rounded-full ring-1 ring-offset-1 ring-charcoal-100 cursor-pointer hover:ring-brand-500 transition-all"
                            style={{ backgroundColor: variant.colorHex }}
                            title={variant.colorName}
                        />
                    ))}
                    {product.variants?.length > 4 && (
                        <span className="text-[10px] text-charcoal-400 font-bold">+{product.variants.length - 4}</span>
                    )}
                </div>

                <div className="flex flex-col items-center lg:items-start">
                    <div className="flex items-baseline space-x-2">
                        <span className="text-xl font-bold font-display text-charcoal-900">{formatPrice(product.price)}</span>
                        {hasDiscount && (
                            <span className="text-sm text-charcoal-400 line-through font-medium">
                                {formatPrice(product.comparePrice)}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ProductCard
