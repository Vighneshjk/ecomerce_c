import React from 'react'
import Link from 'next/link'
import { ArrowLeft, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react'

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-[#FCFBF8] flex flex-col items-center">
            {/* Checkout Minimal Header */}
            <header className="w-full h-24 bg-white border-b border-charcoal-50 sticky top-0 z-50 flex items-center shadow-xl shadow-brand-100/10">
                <div className="container-app flex items-center justify-between">
                    <Link href="/cart" className="flex items-center space-x-2 text-xs font-bold text-charcoal-400 uppercase tracking-widest hover:text-brand-600 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Return to Bag</span>
                    </Link>

                    <Link href="/" className="flex flex-col items-center">
                        <span className="text-2xl font-display font-medium tracking-[0.3em] text-charcoal-900 leading-none">AKELA</span>
                        <span className="text-[8px] tracking-[0.4em] font-sans text-brand-600 uppercase -mt-1 pl-1">EYEWEAR</span>
                    </Link>

                    <div className="flex items-center space-x-4 opacity-40">
                        <div className="flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-widest text-charcoal-500">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Secure 256-Bit</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="w-full flex-grow py-20 pb-40">
                {children}
            </main>

            {/* Modern Checkout Footer */}
            <footer className="w-full py-10 bg-white border-t border-charcoal-50">
                <div className="container-app flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center space-x-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-charcoal-900 uppercase tracking-widest">Global Vault</span>
                            <span className="text-[9px] font-bold text-charcoal-400">Payment Security Protocol</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-charcoal-900 uppercase tracking-widest">Akela Trust</span>
                            <span className="text-[9px] font-bold text-charcoal-400">1-Year Crafted Warranty</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/8d/Razorpay_logo.svg" alt="Razorpay" className="h-4" />
                    </div>
                </div>
            </footer>
        </div>
    )
}
