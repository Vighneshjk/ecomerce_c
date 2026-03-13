'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, MapPin, CreditCard, ChevronRight, CheckCircle2, ShoppingBag, Plus, Trash2, ShieldCheck, Sparkles, Box, Info, ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Divider } from '@/components/ui/Divider'

const checkoutSchema = z.object({
    firstName: z.string().min(2, 'Required'),
    lastName: z.string().min(2, 'Required'),
    email: z.string().email('Invalid email'),
    phone: z.string().regex(/^\d{10}$/, 'Invalid phone number'),
    address: z.string().min(5, 'Required'),
    city: z.string().min(2, 'Required'),
    state: z.string().min(2, 'Required'),
    pincode: z.string().regex(/^\d{6}$/, 'Invalid Indian Pincode'),
})

type CheckoutForm = z.infer<typeof checkoutSchema>

const CheckoutPage = () => {
    const { items, subtotal, itemsCount } = useCart()
    const [step, setStep] = useState(1) // 1: Contact/Delivery, 2: Payment/Review
    const [loading, setLoading] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState('razorpay')

    const { register, handleSubmit, formState: { errors }, watch } = useForm<CheckoutForm>({
        resolver: zodResolver(checkoutSchema)
    })

    const shipping = subtotal > 999 ? 0 : 99
    const tax = subtotal * 0.18
    const total = subtotal + shipping + tax

    const onSubmit = (data: CheckoutForm) => {
        if (step === 1) {
            setStep(2)
        } else {
            handleFinalSubmit(data)
        }
    }

    const handleFinalSubmit = async (data: CheckoutForm) => {
        setLoading(true)
        // Simulate Order creation
        await new Promise(r => setTimeout(r, 2000))
        setLoading(false)
        window.location.href = '/checkout/success'
    }

    return (
        <div className="container-app">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
                {/* Steps Section (Left) */}
                <div className="lg:col-span-7 space-y-12">

                    {/* Progress Indicator */}
                    <div className="flex items-center space-x-6 pb-4 border-b border-charcoal-50 overflow-x-auto">
                        {[
                            { id: 1, name: 'Identity & Aura Location', icon: <User className="w-4 h-4" /> },
                            { id: 2, name: 'Lens Selection & Payment', icon: <CreditCard className="w-4 h-4" /> }
                        ].map((s) => (
                            <div
                                key={s.id}
                                className={cn(
                                    "flex items-center space-x-3 whitespace-nowrap pb-2 transition-all relative overflow-hidden",
                                    step >= s.id ? "text-charcoal-900 opacity-100" : "text-charcoal-300 opacity-50"
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-all",
                                    step === s.id ? "bg-charcoal-900 text-white shadow-xl shadow-charcoal-200 scale-110" : "bg-charcoal-100 text-charcoal-500",
                                    step > s.id ? "bg-brand-500 text-white" : ""
                                )}>
                                    {step > s.id ? <CheckCircle2 className="w-5 h-5" /> : s.id}
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest">{s.name}</span>
                                {step === s.id && (
                                    <motion.div layoutId="stepBar" className="absolute bottom-0 inset-x-0 h-1 bg-brand-500 rounded-full" />
                                )}
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                        <AnimatePresence mode="wait">
                            {step === 1 ? (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-8"
                                >
                                    <div className="space-y-4">
                                        <h2 className="text-4xl font-display font-semibold text-charcoal-900 tracking-tight leading-none uppercase tracking-widest italic">
                                            CONTACT <span className="text-brand-500">AURA.</span>
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input label="First Name" placeholder="Ex. Vikram" {...register('firstName')} error={errors.firstName?.message} />
                                            <Input label="Last Name" placeholder="Ex. Singh" {...register('lastName')} error={errors.lastName?.message} />
                                        </div>
                                        <Input label="Email Address" placeholder="name@domain.com" {...register('email')} error={errors.email?.message} />
                                        <Input label="Phone Number" placeholder="10-digit number" {...register('phone')} error={errors.phone?.message} />
                                    </div>

                                    <div className="space-y-4">
                                        <h2 className="text-4xl font-display font-semibold text-charcoal-900 tracking-tight leading-none uppercase tracking-widest italic">
                                            DELIVERY <span className="text-brand-500">VAULT.</span>
                                        </h2>
                                        <Input label="Complete Address" placeholder="Society, Road, Landmark" {...register('address')} error={errors.address?.message} />
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="col-span-2 md:col-span-1">
                                                <Input label="Pincode" placeholder="XXXXXX" {...register('pincode')} error={errors.pincode?.message} />
                                            </div>
                                            <div className="col-span-2 md:col-span-1">
                                                <Input label="City" placeholder="City" {...register('city')} error={errors.city?.message} />
                                            </div>
                                            <div className="col-span-2 md:col-span-2">
                                                <Input label="State" placeholder="State/Region" {...register('state')} error={errors.state?.message} />
                                            </div>
                                        </div>
                                    </div>

                                    <Button type="submit" size="lg" className="h-16 w-full lg:w-fit px-12 rounded-[1.5rem] bg-charcoal-900 text-white hover:bg-brand-600 transition-all shadow-2xl">
                                        <span>Proceed to Verification</span>
                                        <ChevronRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-12"
                                >
                                    <div className="space-y-6 bg-white p-8 rounded-[2rem] border border-charcoal-100 shadow-xl shadow-brand-100/10">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-3xl font-display font-semibold text-charcoal-900 tracking-tight leading-none uppercase tracking-widest italic leading-none">IDENTITY <span className="text-brand-500 italic lowercase">details.</span></h2>
                                            <button type="button" onClick={() => setStep(1)} className="text-[10px] font-black uppercase tracking-widest text-brand-600 hover:scale-105 transition-transform">Refine Address</button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-8 text-xs font-bold text-charcoal-400 uppercase tracking-widest">
                                            <div className="space-y-1">
                                                <span className="opacity-50">Visionary</span>
                                                <p className="text-charcoal-900 text-sm font-black italic">{watch('firstName')} {watch('lastName')}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="opacity-50">Aura Link</span>
                                                <p className="text-charcoal-900 text-sm font-black italic">{watch('email')}</p>
                                            </div>
                                            <div className="col-span-2 space-y-1 pt-2">
                                                <span className="opacity-50">Delivery Coordinates</span>
                                                <p className="text-charcoal-900 text-sm font-black italic">{watch('address')}, {watch('city')}, {watch('state')} - {watch('pincode')}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <h2 className="text-4xl font-display font-semibold text-charcoal-900 tracking-tight leading-none uppercase tracking-widest italic leading-none">CHOICE OF <br /><span className="text-brand-500 italic lowercase">transaction.</span></h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {[
                                                { id: 'razorpay', name: 'Razorpay Instant', desc: 'Secure UPI, Cards, Net Banking', icon: <div className="p-3 bg-brand-500/10 rounded-xl"><Sparkles className="w-5 h-5 text-brand-600" /></div> },
                                                { id: 'pod', name: 'Vision at Door', desc: 'Pay on Delivery Access', icon: <div className="p-3 bg-charcoal-100 rounded-xl"><MapPin className="w-5 h-5 text-charcoal-500" /></div> }
                                            ].map((method) => (
                                                <button
                                                    key={method.id}
                                                    type="button"
                                                    onClick={() => setPaymentMethod(method.id)}
                                                    className={cn(
                                                        "p-6 rounded-[2rem] border-2 text-left transition-all flex items-start space-x-4",
                                                        paymentMethod === method.id
                                                            ? "bg-charcoal-900 text-white border-charcoal-900 shadow-2xl shadow-charcoal-100 scale-105"
                                                            : "bg-white text-charcoal-900 border-charcoal-50 hover:border-brand-500"
                                                    )}
                                                >
                                                    {method.icon}
                                                    <div className="space-y-1 pt-1">
                                                        <span className="text-sm font-black uppercase tracking-widest block">{method.name}</span>
                                                        <p className={cn("text-[10px] uppercase font-bold tracking-widest leading-none", paymentMethod === method.id ? "text-charcoal-400" : "text-charcoal-400")}>{method.desc}</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-8">
                                        <Button type="submit" size="lg" className="h-16 w-full rounded-[1.5rem] bg-brand-500 text-black hover:bg-white text-lg font-black tracking-widest shadow-2xl relative group overflow-hidden" loading={loading}>
                                            <span className="relative z-10 flex items-center justify-center space-x-3">
                                                <span>Unlock Your Vision</span>
                                                <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
                                            </span>
                                            <div className="absolute inset-x-0 inset-y-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <span className="absolute bottom-0 inset-x-0 h-1 bg-black opacity-10" />
                                        </Button>
                                        <p className="text-[10px] text-center text-charcoal-400 font-bold uppercase tracking-[0.3em] pt-6 leading-relaxed">
                                            By proceeding, you unlock our artisan warranty and visionary protection programs. <br /> Total Secure Session ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>

                {/* Summary Section (Right) */}
                <div className="lg:col-span-5 w-full">
                    <div className="sticky top-32 space-y-12 bg-white p-10 rounded-[3rem] border border-charcoal-100 shadow-[0_40px_100px_rgba(0,0,0,0.05)] relative overflow-hidden">
                        {/* Product Breakdown Hover Effect */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-display font-semibold tracking-tight uppercase tracking-widest italic leading-none flex items-center">
                                <Box className="w-5 h-5 mr-3 text-brand-500" />
                                BAG <span className="text-brand-500 lowercase ml-1">inventory.</span>
                            </h3>
                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                                {items.map((item, i) => (
                                    <div key={i} className="flex items-center space-x-4 p-4 bg-charcoal-50/50 rounded-2xl hover:bg-brand-50 transition-all group">
                                        <div className="relative aspect-square w-16 bg-white rounded-xl overflow-hidden border border-charcoal-100 flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-contain p-2 group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div className="flex-1 space-y-1 min-w-0">
                                            <h4 className="text-xs font-black uppercase tracking-widest text-charcoal-900 truncate">{item.name}</h4>
                                            <div className="flex items-center space-x-2 text-[9px] font-bold text-charcoal-400 uppercase tracking-widest">
                                                <span>{item.quantity} x {formatPrice(item.price)}</span>
                                                <div className="w-1 h-1 bg-charcoal-200 rounded-full" />
                                                <span className="truncate">{item.colorName} Edition</span>
                                            </div>
                                        </div>
                                        <span className="text-sm font-black text-charcoal-900">{formatPrice(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6 pt-6 border-t border-charcoal-50">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-[10px] font-bold text-charcoal-400 uppercase tracking-widest">
                                    <span>Inventory Value</span>
                                    <span className="text-charcoal-900">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-bold text-charcoal-400 uppercase tracking-widest">
                                    <span>Vision Logistics</span>
                                    <span className={cn("text-charcoal-900", shipping === 0 && "text-brand-600")}>{shipping === 0 ? 'COMPLIMENTARY' : formatPrice(shipping)}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-bold text-charcoal-400 uppercase tracking-widest">
                                    <span>Aura Taxes (GST 18%)</span>
                                    <span className="text-charcoal-900">{formatPrice(tax)}</span>
                                </div>
                            </div>

                            <div className="p-6 bg-charcoal-900 text-white rounded-[2rem] shadow-2xl shadow-charcoal-200 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                                <div className="relative z-10 flex flex-col items-center">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-charcoal-400 mb-1">Final Settlement</span>
                                    <span className="text-5xl font-display font-bold text-white tracking-tighter leading-none">{formatPrice(total)}</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-500 mt-2">Indian Rupees (INR)</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                {[
                                    { icon: <ShieldCheck className="w-4 h-4" />, label: "Certified Visionary Checkout" },
                                    { icon: <Lock className="w-4 h-4" />, label: "Akela Data Encryption Protocol" }
                                ].map((it, i) => (
                                    <div key={i} className="flex items-center justify-center space-x-3 text-[9px] font-black text-charcoal-300 uppercase tracking-widest">
                                        {it.icon}
                                        <span>{it.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default CheckoutPage
