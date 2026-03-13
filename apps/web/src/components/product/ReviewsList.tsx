'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, CheckCircle2, ThumbsUp, Trash2, Camera, User, Share2, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Divider } from '@/components/ui/Divider'

interface ReviewsListProps {
    reviews: any[]
}

const ReviewsList = ({ reviews = [] }: ReviewsListProps) => {

    return (
        <section className="py-24 bg-white relative">
            <div className="container-app">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Summary Sidebar */}
                    <aside className="w-full lg:w-1/3">
                        <div className="sticky top-24 space-y-12 bg-charcoal-50 p-10 rounded-[3rem] border border-charcoal-100 shadow-xl shadow-brand-100/20">
                            <div className="space-y-4 text-center lg:text-left">
                                <h3 className="text-3xl font-display font-semibold text-charcoal-900 tracking-tight leading-none uppercase tracking-widest">Vision Insights</h3>
                                <div className="flex items-center justify-center lg:justify-start space-x-4">
                                    <span className="text-8xl font-display font-bold text-brand-600">4.8</span>
                                    <div className="space-y-1">
                                        <div className="flex space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={cn("w-5 h-5 fill-current transition-colors", i < 4.8 ? "text-brand-500 scale-110" : "text-charcoal-200")} />
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-bold text-charcoal-500 uppercase tracking-widest">{reviews.length}+ Verified Looks</span>
                                    </div>
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div className="space-y-4">
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <div key={rating} className="flex items-center space-x-4 group cursor-pointer hover:scale-[1.02] transition-transform">
                                        <span className="text-xs font-bold text-charcoal-400 w-3">{rating}</span>
                                        <div className="flex-1 h-2.5 bg-white/50 rounded-full overflow-hidden border border-charcoal-100 p-0.5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${[85, 12, 2, 1, 0][5 - rating]}%` }}
                                                transition={{ duration: 1, delay: 0.2 }}
                                                className="h-full bg-brand-500 rounded-full shadow-inner"
                                            />
                                        </div>
                                        <span className="text-[10px] font-bold text-charcoal-400 w-12 text-right">({[108, 14, 2, 1, 0][5 - rating]})</span>
                                    </div>
                                ))}
                            </div>

                            <Divider className="opacity-50" />

                            <div className="space-y-4">
                                <h4 className="text-xs font-black text-charcoal-900 uppercase tracking-widest">Share Your Experience</h4>
                                <p className="text-sm text-charcoal-500 leading-relaxed font-medium italic">Your insights help the Akela community find their perfect visionary match.</p>
                                <Button className="w-full h-14 rounded-2xl bg-charcoal-900 hover:bg-brand-600 transition-all shadow-xl shadow-brand-100 flex items-center justify-center space-x-2">
                                    <MessageSquare className="w-5 h-5" />
                                    <span>Write a Lens Review</span>
                                </Button>
                            </div>
                        </div>
                    </aside>

                    {/* Review Cards */}
                    <main className="w-full lg:w-2/3 space-y-12">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-charcoal-50">
                            <div className="flex space-x-6">
                                <button className="text-xs font-black text-charcoal-900 border-b-2 border-brand-500 pb-1 uppercase tracking-widest">All Reviews</button>
                                <button className="text-xs font-black text-charcoal-400 hover:text-brand-500 pb-1 uppercase tracking-widest transition-colors">With Vision Demo</button>
                                <button className="text-xs font-black text-charcoal-400 hover:text-brand-500 pb-1 uppercase tracking-widest transition-colors">Verified Only</button>
                            </div>
                            <div className="flex items-center bg-charcoal-50 px-4 py-2 rounded-xl text-xs font-bold text-charcoal-700 uppercase tracking-widest border border-charcoal-100 cursor-pointer hover:bg-brand-50 transition-all">
                                <span>Sort: Newest First</span>
                                <ChevronDown className="w-4 h-4 ml-2" />
                            </div>
                        </div>

                        {reviews.length ? (
                            <div className="space-y-12">
                                {reviews.map((review, i) => (
                                    <motion.div
                                        key={review.id || i}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        className="space-y-8 group border-b border-charcoal-50 pb-12 last:border-none"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-14 h-14 rounded-3xl bg-brand-100 flex items-center justify-center border border-brand-200 overflow-hidden shadow-xl shadow-brand-100/10">
                                                    {review.user?.image ? (
                                                        <img src={review.user.image} alt={review.user.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <User className="w-6 h-6 text-brand-600" />
                                                    )}
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex items-center space-x-2">
                                                        <h4 className="text-lg font-display font-semibold text-charcoal-900 leading-none">{review.user?.name || "Verified Visionary"}</h4>
                                                        <CheckCircle2 className="w-4 h-4 text-brand-500" />
                                                    </div>
                                                    <div className="flex items-center space-x-2 text-[10px] font-bold text-charcoal-400 uppercase tracking-widest leading-none">
                                                        <span>Visionary Since 2023</span>
                                                        <div className="w-1 h-1 bg-charcoal-200 rounded-full" />
                                                        <span>Verified Purchase</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end space-y-1">
                                                <div className="flex space-x-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={cn("w-3.5 h-3.5 fill-current", i < review.rating ? "text-brand-500" : "text-charcoal-100")} />
                                                    ))}
                                                </div>
                                                <span className="text-[10px] font-bold text-charcoal-300 uppercase tracking-widest">Oct 24, 2024</span>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h5 className="text-xl font-display font-bold text-charcoal-900 italic tracking-tight uppercase tracking-widest">"Perfect Fit, Exceptional Aura."</h5>
                                            <p className="text-lg text-charcoal-700 font-medium leading-relaxed max-w-2xl italic tracking-tight">
                                                {review.comment || review.body || "This is truly a masterpiece. The build quality and the lens tech exceeded all my expectations for such a price point."}
                                            </p>
                                        </div>

                                        {/* Action info */}
                                        <div className="flex items-center justify-between pt-4">
                                            <div className="flex items-center space-x-4">
                                                <button className="flex items-center space-x-2 px-4 py-2 bg-charcoal-50 hover:bg-brand-50 rounded-xl transition-all border border-charcoal-100 group">
                                                    <ThumbsUp className="w-3.5 h-3.5 text-charcoal-400 group-hover:text-brand-600 group-hover:fill-brand-100" />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal-600">Helpful (18)</span>
                                                </button>
                                                <button className="flex items-center space-x-2 text-[10px] font-bold text-charcoal-400 uppercase tracking-widest hover:text-brand-600 transition-all">
                                                    <Share2 className="w-3.5 h-3.5" />
                                                    <span>Share Review</span>
                                                </button>
                                            </div>
                                            <button className="p-2 hover:bg-charcoal-50 rounded-full transition-all text-charcoal-300 hover:text-charcoal-600">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                                <div className="w-20 h-20 bg-charcoal-50 rounded-full flex items-center justify-center text-charcoal-300">
                                    <MessageSquare className="w-10 h-10" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-display font-bold">BE THE FIRST TO REVIEW.</h3>
                                    <p className="text-charcoal-500 font-medium italic">Share your vision with the world and inspire others.</p>
                                </div>
                                <Button variant="outline" className="h-12 px-8 rounded-xl font-bold uppercase tracking-widest border-2">Write First Review</Button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </section>
    )
}

const MessageSquare = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;

export default ReviewsList
