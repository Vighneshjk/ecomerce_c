'use client'

import React, { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraFeed } from './CameraFeed'
import { useFaceDetection } from '@/hooks/useFaceDetection'
import { useGlassesPosition } from '@/hooks/useGlassesPosition'
import { GlassesModel } from './GlassesModel'
import { FaceDetectionStatus } from './FaceDetectionStatus'
import { motion, AnimatePresence } from 'framer-motion'
import { Share2, Camera, User, Settings, ShieldCheck, Zap, Microscope, Trash2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface TryOnCanvasProps {
    modelUrl: string
    frameColor?: string
    lensColor?: string
    lensOpacity?: number
}

export function TryOnCanvas({
    modelUrl,
    frameColor = '#FFD700',
    lensColor = '#000000',
    lensOpacity = 0.6,
}: TryOnCanvasProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const { isLoading, isDetecting, faceData, error } = useFaceDetection(videoRef)
    const [isMirror, setIsMirror] = useState(true)

    const transform = useGlassesPosition(faceData)

    return (
        <div className="relative w-full h-full bg-charcoal-900 rounded-[4.5rem] overflow-hidden shadow-2xl border-[12px] border-charcoal-100 shadow-charcoal-900/50 group">
            <CameraFeed ref={videoRef} isMirror={isMirror} />

            <Canvas
                className="absolute inset-0 pointer-events-none"
                style={{ position: 'absolute' }}
                camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 5] }}
                gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
            >
                <ambientLight intensity={0.8} />
                <directionalLight position={[0, 2, 3]} intensity={1.2} />
                <pointLight position={[-2, 1, 2]} intensity={0.5} color="#ffd8a0" />

                <AnimatePresence>
                    {faceData && (
                        <GlassesModel
                            modelUrl={modelUrl}
                            transform={transform}
                            frameColor={frameColor}
                            lensColor={lensColor}
                            lensOpacity={lensOpacity}
                        />
                    )}
                </AnimatePresence>
            </Canvas>

            <FaceDetectionStatus isDetecting={isDetecting} isLoading={isLoading} />

            {/* Controls Overlay */}
            <div className="absolute top-10 right-10 flex flex-col space-y-4">
                <button onClick={() => setIsMirror(!isMirror)} className="p-4 bg-charcoal-900/40 backdrop-blur-2xl border border-white/5 rounded-2xl text-white hover:bg-brand-500 hover:text-black hover:scale-110 active:scale-95 transition-all shadow-2xl group/ctrl">
                    <User className={`w-5 h-5 transition-transform ${isMirror ? 'scale-x-100' : '-scale-x-100'}`} />
                    <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-charcoal-900/80 backdrop-blur-md rounded-xl text-[8px] font-black uppercase tracking-widest text-white/50 opacity-0 group-hover/ctrl:opacity-100 translate-x-4 group-hover/ctrl:translate-x-0 transition-all pointer-events-none">Toggle Mirror Mode</div>
                </button>
                <button className="p-4 bg-charcoal-900/40 backdrop-blur-2xl border border-white/5 rounded-2xl text-white hover:bg-brand-500 hover:text-black hover:scale-110 active:scale-95 transition-all shadow-2xl group/ctrl">
                    <Camera className="w-5 h-5" />
                    <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-charcoal-900/80 backdrop-blur-md rounded-xl text-[8px] font-black uppercase tracking-widest text-white/50 opacity-0 group-hover/ctrl:opacity-100 translate-x-4 group-hover/ctrl:translate-x-0 transition-all pointer-events-none">Snap Vision Broadcast</div>
                </button>
            </div>

            {/* Error Overlay */}
            {error && (
                <div className="absolute inset-0 bg-red-500/10 backdrop-blur-3xl z-[100] flex flex-col items-center justify-center p-12 text-center space-y-8">
                    <div className="w-24 h-24 bg-red-500 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-red-100 animate-bounce">
                        <Trash2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-4xl font-display font-semibold text-white tracking-widest uppercase italic leading-none">BROADCAST <br /><span className="text-red-500 lowercase underline decoration-red-100 underline-offset-8">interrupted.</span></h3>
                        <p className="text-lg text-white/50 font-medium italic leading-relaxed max-w-sm">{error}</p>
                    </div>
                    <Button className="h-16 px-12 rounded-2xl bg-white text-charcoal-900 font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-2xl">
                        <ArrowRight className="w-5 h-5 mr-3 rotate-180" />
                        Try Rebooting Link
                    </Button>
                </div>
            )}
        </div>
    )
}
