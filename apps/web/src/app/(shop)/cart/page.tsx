'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, Home, Sparkles, ShieldCheck, Ticket, LayoutGrid, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice, cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useCart } from '@/hooks/useCart'
import { Divider } from '@/components/ui/Divider'
import { Info } from 'lucide-react'

const CartPage = () => {
    const { items, removeItem, updateQuantity, clearCart, itemCount, subtotal } = useCart()
    const [coupon, setCoupon] = useState('')
    const [couponApplied, setCouponApplied] = useState(false)

    const shipping = subtotal > 999 ? 0 : 99
    const tax = subtotal * 0.18 // 18% GST
    const discount = couponApplied ? subtotal * 0.1 : 0
    const total = subtotal + shipping + tax - discount

    if (itemCount === 0) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 pt-32 space-y-8">
                <div className="relative w-48 h-48 mb-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 bg-brand-50 rounded-full blur-3xl opacity-50"
                    />
                    <div className="relative z-10 w-full h-full flex items-center justify-center text-charcoal-200">
                        <ShoppingBag className="w-32 h-32" />
                    </div>
                </div>

                <div className="text-center space-y-4 max-w-md">
                    <h1 className="text-4xl lg:text-5xl font-display font-semibold text-charcoal-900 tracking-tight leading-none uppercase tracking-widest italic">
                        BAG IS EMPTY. <br /> <span className="text-brand-500">BUT VISION IS NOT.</span>
                    </h1>
                    <p className="text-charcoal-500 font-medium leading-relaxed italic">Your visionary journey starts with a single frame. Explore our handcrafted collection to find your perfect fit.</p>
                </div>

                <Button asChild size="lg" className="h-16 px-12 text-lg font-bold rounded-2xl shadow-2xl shadow-brand-100">
                    <Link href="/products">
                        Start Shopping
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#FCFBF8] pt-32 pb-40">
            <div className="container-app">
                <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
                    {/* Cart Items (Left) */}
                    <div className="w-full lg:w-2/3 space-y-10">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 text-xs font-bold text-charcoal-400 uppercase tracking-widest">
                                <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
                                <ArrowRight className="w-3.5 h-3.5" />
                                <span className="text-charcoal-900">Cart</span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-display font-semibold text-charcoal-900 tracking-tight leading-none uppercase tracking-widest italic">
                                YOUR <span className="text-brand-500">BAG.</span>
                            </h1>
                            <div className="flex items-center space-x-3 text-xs font-bold text-charcoal-500 uppercase tracking-widest">
                                <span>{itemCount} ITEMS SELECTED</span>
                                <div className="w-1 h-1 bg-charcoal-200 rounded-full" />
                                <button onClick={clearCart} className="text-red-400 hover:text-red-500 transition-colors flex items-center">
                                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                                    Empty Bag
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <AnimatePresence mode="popLayout">
                                {items.map((item, idx) => (
                                    <motion.div
                                        key={`${item.id}-${item.variantId}`}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        className="relative group p-6 lg:p-8 bg-white border border-charcoal-100 rounded-[2rem] shadow-xl shadow-brand-100/10 hover:shadow-brand-200/20 transition-all flex flex-col md:flex-row gap-8 items-center"
                                    >
                                        <Link
                                            href={`/product/${item.slug}`}
                                            className="relative aspect-square w-full md:w-32 bg-brand-50 rounded-2xl overflow-hidden group-hover:bg-brand-500/10 transition-all"
                                        >
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </Link>

                                        <div className="flex-1 space-y-4 w-full text-center md:text-left">
                                            <div className="space-y-1">
                                                <h3 className="text-2xl font-display font-semibold text-charcoal-900 leading-tight tracking-tight uppercase tracking-widest group-hover:text-brand-600 transition-colors">
                                                    {item.name}
                                                </h3>
                                                <div className="flex items-center justify-center md:justify-start space-x-3 text-[10px] font-bold text-charcoal-400 uppercase tracking-widest">
                                                    <div className="flex items-center">
                                                        <div className="w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: item.colorHex }} />
                                                        <span>{item.colorName}</span>
                                                    </div>
                                                    <div className="w-1 h-1 bg-charcoal-200 rounded-full" />
                                                    <span>Premium Aura Grade</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                <div className="flex items-center justify-center md:justify-start space-x-4">
                                                    <div className="flex items-center bg-charcoal-50 rounded-xl border border-charcoal-100 p-1">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.variantId, item.quantity - 1)}
                                                            className="p-2 bg-white rounded-lg hover:text-brand-600 transition-all disabled:opacity-30"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus className="w-3.5 h-3.5" />
                                                        </button>
                                                        <span className="w-10 text-center font-display font-black text-lg">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.variantId, item.quantity + 1)}
                                                            className="p-2 bg-white rounded-lg hover:text-brand-600 transition-all"
                                                        >
                                                            <Plus className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                    <span className="text-xl font-display font-bold text-charcoal-900">{formatPrice(item.price)}</span>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item.id, item.variantId)}
                                                    className="p-3 text-charcoal-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all md:self-end"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Order Summary (Right) */}
                    <div className="w-full lg:w-1/3">
                        <div className="sticky top-32 space-y-8 bg-charcoal-900 text-white p-10 rounded-[3rem] shadow-2xl shadow-charcoal-900/50 border border-white/5 relative overflow-hidden">
                            {/* Glossy Overlay */}
                            <div className="absolute top-0 right-0 w-full h-[30%] bg-gradient-to-b from-white/5 to-transparent z-0 pointer-events-none" />

                            <div className="relative z-10 space-y-6">
                                <h3 className="text-3xl font-display font-semibold tracking-tight uppercase tracking-widest italic leading-none">ORDER <span className="text-brand-500">SUMMARY.</span></h3>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-charcoal-400 font-bold text-xs uppercase tracking-[0.2em]">
                                        <span>Subtotal ({itemCount} Items)</span>
                                        <span className="text-white">{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-charcoal-400 font-bold text-xs uppercase tracking-[0.2em]">
                                        <span>Estimated Shipping</span>
                                        <span className={cn("text-white", shipping === 0 && "text-brand-500")}>
                                            {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-charcoal-400 font-bold text-xs uppercase tracking-[0.2em]">
                                        <div className="flex items-center">
                                            <span>Vision Tax (GST 18%)</span>
                                            <Info className="w-3 h-3 ml-1 opacity-40" />
                                        </div>
                                        <span className="text-white">{formatPrice(tax)}</span>
                                    </div>
                                    {couponApplied && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            className="flex justify-between text-brand-400 font-bold text-xs uppercase tracking-[0.2em]"
                                        >
                                            <span>VISIONARY DISCOUNT (10%)</span>
                                            <span className="text-white">-{formatPrice(discount)}</span>
                                        </motion.div>
                                    )}
                                </div>

                                <Divider className="opacity-10" />

                                <div className="flex justify-between items-end pb-2">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-brand-500 uppercase tracking-widest">Total Lens Value</span>
                                        <span className="text-5xl font-display font-bold text-white tracking-tighter">{formatPrice(total)}</span>
                                    </div>
                                    <span className="text-[10px] font-black text-charcoal-500 uppercase tracking-[0.3em] pl-2 pb-2">INR</span>
                                </div>

                                {/* Coupon Input */}
                                <div className="pt-4">
                                    {!couponApplied ? (
                                        <div className="relative group">
                                            <Input
                                                placeholder="COUPON CODE"
                                                className="bg-white/5 border-white/10 text-white placeholder:text-charcoal-600 rounded-2xl h-14 pl-12 focus-visible:ring-brand-500 transition-all font-black"
                                                value={coupon}
                                                onChange={(e) => setCoupon(e.target.value)}
                                            />
                                            <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-600 group-focus-within:text-brand-500 transition-colors" />
                                            <button
                                                onClick={() => setCouponApplied(true)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-brand-500 text-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-white active:scale-95"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="p-4 bg-brand-500/10 border border-brand-500/20 rounded-2xl flex items-center justify-between text-brand-500">
                                            <div className="flex items-center space-x-3">
                                                <Sparkles className="w-5 h-5" />
                                                <div>
                                                    <span className="text-xs font-black uppercase tracking-widest block">"WELCOMEVISION" Applied</span>
                                                    <span className="text-[10px] opacity-70">10% Off Signature Order</span>
                                                </div>
                                            </div>
                                            <button onClick={() => setCouponApplied(false)} className="p-2 hover:bg-white/5 rounded-full transition-all">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <Button asChild size="lg" className="h-16 w-full text-lg font-bold rounded-2xl bg-white text-charcoal-900 hover:bg-brand-500 shadow-2xl relative group overflow-hidden">
                                    <Link href="/checkout">
                                        <span className="relative z-10 flex items-center justify-center space-x-3">
                                            <span>Finalize Order</span>
                                            <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
                                        </span>
                                    </Link>
                                </Button>

                                <div className="flex items-center justify-center space-x-4 opacity-40 pt-4">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Hyper-Secure 256-Bit SSL Checkout</span>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info / Marketing */}
                        <div className="mt-8 p-8 bg-white border border-charcoal-100 rounded-[2rem] space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-brand-50 rounded-xl text-brand-600">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-black uppercase tracking-widest text-charcoal-900 italic">Vision Support</h4>
                                    <p className="text-xs text-charcoal-500 leading-relaxed font-medium italic">Our vision engineers are available to help you with sizing or lens questions at 1800-AKELA-EYE.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const X = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6L6 18M6 6l12 12"></path></svg>;

export default CartPage
