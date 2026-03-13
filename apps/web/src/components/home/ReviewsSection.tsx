'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, CheckCircle2, Quote } from 'lucide-react'
import Image from 'next/image'

const reviews = [
    { name: 'Aditya Verma', role: 'Architect', text: 'The virtual try-on is incredibly accurate. I was skeptical, but the frames look exactly like they did on the screen.', rating: 5, verified: true },
    { name: 'Priya Sharma', role: 'Digital Creator', text: 'Absolutely love the Blue Light collection. No more eye strain during long editing sessions. Plus, they look super chic.', rating: 5, verified: true },
    { name: 'Rahul Khanna', role: 'Photographer', text: 'Premium quality at a fraction of the cost. The packaging alone felt like high-end luxury. Highly recommended.', rating: 5, verified: true },
    { name: 'Sneha Patel', role: 'Marketing Lead', text: 'The weight of titanium frames is insane. You barely feel them on your nose. Best investment for my vision.', rating: 5, verified: true },
    { name: 'Vikram Singh', role: 'Student', text: 'Fast delivery and great customer support. Had a small issue with sizing, and they replaced it in 48 hours.', rating: 4, verified: true },
    { name: 'Ananya Rao', role: 'Fashion Blogger', text: 'Akela has changed my perspective on eyewear. It truly is a fashion statement now.', rating: 5, verified: true },
]

const ReviewsSection = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative Background Element */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-brand-50 rounded-full blur-3xl opacity-50 z-0" />

            <div className="container-app relative z-10">
                <div className="flex flex-col items-center text-center space-y-4 mb-20">
                    <div className="flex items-center space-x-2">
                        <div className="h-[2px] w-8 bg-brand-500" />
                        <span className="text-sm font-bold text-brand-600 uppercase tracking-widest text-center">Testimonials</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-display font-semibold text-charcoal-900 tracking-tight leading-tight">
                        TRUSTED BY <br /> <span className="text-brand-500 italic">THOUSANDS.</span>
                    </h2>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {reviews.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="break-inside-avoid relative p-8 bg-white border border-charcoal-100 rounded-[2rem] shadow-xl shadow-brand-100/10 hover:shadow-brand-200/20 transition-all group"
                        >
                            <div className="absolute top-6 right-8 text-charcoal-50 opacity-20 group-hover:opacity-40 transition-opacity">
                                <Quote className="w-12 h-12 fill-current" />
                            </div>

                            <div className="flex space-x-1 mb-6">
                                {[...Array(5)].map((_, starI) => (
                                    <Star
                                        key={starI}
                                        className={cn("w-4 h-4", starI < review.rating ? "text-brand-500 fill-current" : "text-charcoal-200")}
                                    />
                                ))}
                            </div>

                            <p className="text-lg text-charcoal-700 font-medium leading-relaxed mb-8 italic">
                                "{review.text}"
                            </p>

                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold font-display text-xl">
                                    {review.name[0]}
                                </div>
                                <div className="space-y-0.5">
                                    <div className="flex items-center space-x-2">
                                        <h4 className="text-base font-semibold text-charcoal-900 leading-none">{review.name}</h4>
                                        {review.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />}
                                    </div>
                                    <span className="text-xs text-charcoal-500 font-bold uppercase tracking-widest">{review.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// Utility for cn if not using it from shared lib
const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default ReviewsSection
