'use client'

import React from 'react'
import Link from 'next/link'
import { Instagram, Facebook, Youtube, ArrowRight, Plane, ShieldCheck, Clock, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const footerLinks = {
    shop: [
        { name: 'Sunglasses', href: '/category/sunglasses' },
        { name: 'Eyeglasses', href: '/category/eyeglasses' },
        { name: 'Blue Light', href: '/category/bluelight' },
        { name: 'Virtual Try-On', href: '/virtual-tryon' },
    ],
    help: [
        { name: 'FAQ', href: '/help/faq' },
        { name: 'Returns', href: '/help/returns' },
        { name: 'Shipping', href: '/help/shipping' },
        { name: 'Contact', href: '/help/contact' },
    ],
    connect: [
        { name: 'Instagram', href: 'https://instagram.com', icon: <Instagram className="w-5 h-5" /> },
        { name: 'Facebook', href: 'https://facebook.com', icon: <Facebook className="w-5 h-5" /> },
        { name: 'YouTube', href: 'https://youtube.com', icon: <Youtube className="w-5 h-5" /> },
    ],
}

const Footer = () => {
    return (
        <footer className="bg-charcoal-900 text-white pt-20 pb-10">
            <div className="container-app">
                {/* Brand Info & Newsletter */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-20 mb-20">
                    <div className="lg:col-span-1 space-y-6">
                        <Link href="/" className="flex flex-col">
                            <span className="text-3xl font-display font-medium tracking-widest text-white">
                                AKELA
                            </span>
                            <span className="text-[9px] tracking-[0.3em] font-sans text-brand-400 uppercase -mt-1 pl-1">
                                EYEWEAR
                            </span>
                        </Link>
                        <p className="text-charcoal-400 text-sm leading-relaxed max-w-xs">
                            Handcrafted eyewear designed for the modern visionaries. Our frames blend timeless aesthetics with innovative technology.
                        </p>
                        <div className="flex space-x-4">
                            {footerLinks.connect.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-charcoal-800 rounded-full hover:bg-brand-600 hover:text-white text-charcoal-300 transition-all duration-300"
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <h4 className="text-sm font-semibold uppercase tracking-widest mb-6 text-brand-400">Shop</h4>
                        <ul className="space-y-4">
                            {footerLinks.shop.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-charcoal-300 hover:text-white transition-colors text-sm font-medium">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-1">
                        <h4 className="text-sm font-semibold uppercase tracking-widest mb-6 text-brand-400">Help</h4>
                        <ul className="space-y-4">
                            {footerLinks.help.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-charcoal-300 hover:text-white transition-colors text-sm font-medium">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-1">
                        <h4 className="text-sm font-semibold uppercase tracking-widest mb-6 text-brand-400">Newsletter</h4>
                        <p className="text-charcoal-400 text-sm mb-6">
                            Subscribe to get exclusive offers and updates.
                        </p>
                        <div className="space-y-3">
                            <Input
                                placeholder="Email address"
                                className="bg-charcoal-800 border-charcoal-700 text-white placeholder:text-charcoal-500 focus-visible:ring-brand-400"
                            />
                            <Button className="w-full bg-brand-500 hover:bg-brand-600" size="md">
                                <span>Join Akela</span>
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Brand Promises */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-charcoal-800 mb-10">
                    {[
                        { tag: 'Free Shipping', desc: 'On orders above ₹999', icon: <Plane className="w-5 h-5" /> },
                        { tag: '100% Authentic', desc: 'Certified brand quality', icon: <ShieldCheck className="w-5 h-5" /> },
                        { tag: 'Fast Delivery', desc: 'Across 20,000+ pincodes', icon: <Clock className="w-5 h-5" /> },
                        { tag: 'Secure Payments', desc: 'Trusted gateway partners', icon: <CreditCard className="w-5 h-5" /> },
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center space-y-2">
                            <div className="p-3 bg-charcoal-800 rounded-full text-brand-500 mb-2">
                                {item.icon}
                            </div>
                            <h5 className="text-sm font-bold text-white">{item.tag}</h5>
                            <p className="text-[10px] text-charcoal-400 uppercase tracking-wider">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[11px] text-charcoal-500 uppercase tracking-widest">
                    <p>© 2024 Akela Eyewear. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                    <div className="flex items-center space-x-3 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
                        {/* Payment icons could go here */}
                        <span className="bg-white/10 px-2 py-0.5 rounded text-[8px] border border-white/10">RazorPay</span>
                        <span className="bg-white/10 px-2 py-0.5 rounded text-[8px] border border-white/10">Stripe</span>
                        <span className="bg-white/10 px-2 py-0.5 rounded text-[8px] border border-white/10">Visa</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
