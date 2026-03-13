'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, CheckCircle, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const NewsletterSection = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // Simulate API call
        await new Promise(r => setTimeout(r, 1500))
        setLoading(false)
        setSuccess(true)
    }

    return (
        <section className="py-24 bg-brand-50 relative overflow-hidden">
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="4" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            <div className="container-app relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8 max-w-xl">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="h-[2px] w-8 bg-brand-500" />
                            <span className="text-sm font-bold text-brand-600 uppercase tracking-widest leading-none">News & Community</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-display font-semibold text-charcoal-900 tracking-tight leading-[1.05]">
                            JOIN THE <br />
                            <span className="text-brand-500 italic"> VISIONARY CLUB.</span>
                        </h2>
                        <p className="text-xl text-charcoal-500 font-light leading-relaxed">
                            Subscribe to receive exclusive insights into our artisan process, early access to new collections, and visionary event invites.
                        </p>
                    </div>

                    <ul className="space-y-4">
                        {[
                            { text: '10% OFF on your first order', icon: <Sparkles className="w-4 h-4 text-brand-500" /> },
                            { text: 'Exclusive member-only drops', icon: <CheckCircle className="w-4 h-4 text-brand-500" /> },
                            { text: 'Invitation to Akela Studio events', icon: <CheckCircle className="w-4 h-4 text-brand-500" /> },
                        ].map((item, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + (i * 0.1) }}
                                viewport={{ once: true }}
                                className="flex items-center space-x-3 text-sm font-semibold text-charcoal-800"
                            >
                                {item.icon}
                                <span>{item.text}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                <div className="relative p-10 bg-white shadow-2xl shadow-brand-100 rounded-[3rem] border border-charcoal-50 min-h-[300px] flex items-center">
                    <AnimatePresence mode="wait">
                        {!success ? (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                onSubmit={handleSubmit}
                                className="w-full space-y-8"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-display font-semibold text-charcoal-900">Get the vision in your inbox.</h3>
                                    <p className="text-sm text-charcoal-500 font-medium">No spam, only excellence.</p>
                                </div>
                                <div className="space-y-3">
                                    <Input
                                        type="email"
                                        placeholder="Email Address"
                                        className="h-14 bg-charcoal-50 border-none text-lg rounded-2xl px-6 focus-visible:ring-brand-500"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        iconRight={<Mail className="w-5 h-5 text-charcoal-300" />}
                                    />
                                    <Button
                                        type="submit"
                                        className="w-full h-14 bg-charcoal-900 hover:bg-brand-600 rounded-2xl text-lg font-bold shadow-xl transition-all"
                                        loading={loading}
                                    >
                                        <span>Subscribe Now</span>
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                    <p className="text-[10px] text-center text-charcoal-400 font-medium uppercase tracking-[0.2em] pt-4">
                                        By subscribing you agree to our Terms and Privacy Policy.
                                    </p>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full text-center space-y-6"
                            >
                                <div className="mx-auto w-24 h-24 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-4xl shadow-xl animate-bounce">
                                    <Sparkles className="w-12 h-12" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-display font-semibold text-charcoal-900 italic">"Welcome Visionary."</h3>
                                    <p className="text-lg text-charcoal-500 font-medium">Check your inbox for your 10% welcome gift.</p>
                                </div>
                                <Button
                                    onClick={() => setSuccess(false)}
                                    variant="ghost"
                                    className="text-brand-600 font-bold hover:bg-brand-50"
                                >
                                    Try with another email
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}

export default NewsletterSection
