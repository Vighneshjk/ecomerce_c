'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/utils'

const CartDrawer = () => {
    const {
        items,
        isOpen,
        closeCart,
        updateQuantity,
        removeItem,
        subtotal,
        totalItems
    } = useCart()

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl"
                    >
                        <div className="flex h-full flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-charcoal-100 p-6">
                                <div className="flex items-center space-x-2">
                                    <ShoppingBag className="h-5 w-5 text-charcoal-700" />
                                    <h2 className="text-xl font-display font-semibold text-charcoal-900">
                                        Shopping Cart ({totalItems})
                                    </h2>
                                </div>
                                <button
                                    onClick={closeCart}
                                    className="rounded-full p-2 text-charcoal-600 hover:bg-charcoal-50 hover:text-charcoal-900 transition-colors"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Items List */}
                            <div className="flex-1 overflow-y-auto px-6 py-4">
                                {items.length === 0 ? (
                                    <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                                        <div className="p-6 bg-brand-50 rounded-full">
                                            <ShoppingBag className="h-10 w-10 text-brand-500" />
                                        </div>
                                        <p className="text-lg font-medium text-charcoal-600">Your cart is empty</p>
                                        <Link
                                            href="/collections"
                                            onClick={closeCart}
                                            className="text-sm font-semibold text-brand-600 hover:text-brand-700 underline underline-offset-4"
                                        >
                                            Start Shopping
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {items.map((item) => (
                                            <div key={`${item.productId}-${item.variantId}`} className="flex space-x-4">
                                                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-charcoal-50 border border-charcoal-100">
                                                    {item.image ? (
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fill
                                                            className="h-full w-full object-cover object-center"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center bg-charcoal-100">
                                                            <ShoppingBag className="h-8 w-8 text-charcoal-300" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex flex-1 flex-col">
                                                    <div className="flex justify-between text-sm font-medium text-charcoal-900">
                                                        <h3>
                                                            <Link
                                                                href={`/product/${item.slug}`}
                                                                className="hover:text-brand-600 transition-colors"
                                                                onClick={closeCart}
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        </h3>
                                                        <p className="ml-4">{formatPrice(item.price)}</p>
                                                    </div>
                                                    <p className="mt-1 text-xs text-charcoal-500">
                                                        Color: {item.colorName}
                                                    </p>

                                                    <div className="mt-auto flex items-center justify-between pt-2">
                                                        <div className="flex items-center space-x-3 border border-charcoal-200 rounded-md px-2 py-1">
                                                            <button
                                                                onClick={() => updateQuantity(item.productId, item.variantId, Math.max(1, item.quantity - 1))}
                                                                className="p-1 text-charcoal-600 hover:text-brand-600 disabled:opacity-30"
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                <Minus className="h-3 w-3" />
                                                            </button>
                                                            <span className="text-sm font-semibold text-charcoal-900 w-4 text-center">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.productId, item.variantId, Math.min(item.stock, item.quantity + 1))}
                                                                className="p-1 text-charcoal-600 hover:text-brand-600 disabled:opacity-30"
                                                                disabled={item.quantity >= item.stock}
                                                            >
                                                                <Plus className="h-3 w-3" />
                                                            </button>
                                                        </div>

                                                        <button
                                                            onClick={() => removeItem(item.productId, item.variantId)}
                                                            className="text-charcoal-400 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {items.length > 0 && (
                                <div className="border-t border-charcoal-100 p-6 space-y-4 bg-charcoal-50/50">
                                    <div className="flex justify-between text-base font-medium text-charcoal-900">
                                        <p>Subtotal</p>
                                        <p>{formatPrice(subtotal)}</p>
                                    </div>
                                    <p className="text-xs text-charcoal-500">
                                        Shipping and taxes calculated at checkout.
                                    </p>
                                    <Button
                                        className="w-full h-14 text-lg"
                                        variant="primary"
                                        asChild
                                    >
                                        <Link href="/checkout" onClick={closeCart}>
                                            Checkout
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default CartDrawer
