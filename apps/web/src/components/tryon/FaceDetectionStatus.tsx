'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserCheck, UserX, Sparkles } from 'lucide-react'

interface FaceDetectionStatusProps {
    isDetecting: boolean
    isLoading: boolean
}

export function FaceDetectionStatus({ isDetecting, isLoading }: FaceDetectionStatusProps) {
    return (
        <div className="absolute inset-0 z-50 pointer-events-none flex flex-col items-center justify-center p-12">
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="p-10 bg-charcoal-900/80 backdrop-blur-2xl rounded-[3rem] border border-white/10 flex flex-col items-center space-y-4 shadow-2xl"
                    >
                        <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-500 text-center leading-relaxed">Vision Core <br /> Calibrating</span>
                    </motion.div>
                ) : !isDetecting ? (
                    <motion.div
                        key="not-detecting"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center space-y-12"
                    >
                        {/* pulsing guide box */}
                        <motion.div
                            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-72 h-96 border-4 border-dashed border-white/20 rounded-[4rem] relative"
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-charcoal-900 border border-white/5 rounded-2xl flex items-center space-x-3 shadow-2xl">
                                <UserX className="w-5 h-5 text-red-400" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-white/50">Subject Not Found</span>
                            </div>
                        </motion.div>

                        <div className="text-center space-y-3">
                            <h4 className="text-2xl font-display font-semibold text-white tracking-widest italic leading-none uppercase">POSITION YOUR FACE <br /><span className="text-brand-500">IN FRAME.</span></h4>
                            <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Aura Sync Node Awaitin Identification Transmission</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="detecting"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute bottom-32 left-1/2 -translate-x-1/2 p-4 bg-brand-500/10 backdrop-blur-3xl border border-brand-500/20 rounded-full flex items-center space-x-4 shadow-2xl"
                    >
                        <div className="w-10 h-10 bg-brand-500 text-black rounded-full flex items-center justify-center shadow-lg shadow-brand-100">
                            <UserCheck className="w-5 h-5" />
                        </div>
                        <div className="pr-6">
                            <span className="text-[9px] font-black text-brand-600 uppercase tracking-widest block leading-none mb-1">Status: Stable</span>
                            <span className="text-[10px] font-black italic text-white leading-none uppercase tracking-widest flex items-center">
                                Aura ID Link Established
                                <Sparkles className="w-3 h-3 ml-2 text-brand-500 animate-pulse" />
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
