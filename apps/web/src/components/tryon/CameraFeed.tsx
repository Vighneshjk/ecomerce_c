'use client'

import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera } from 'lucide-react'

// Using React.forwardRef to expose videoRef
export const CameraFeed = forwardRef<HTMLVideoElement, { isMirror?: boolean }>((props, ref) => {
    const internalRef = useRef<HTMLVideoElement>(null)

    // Using useImperativeHandle to forward the Ref if provided
    useImperativeHandle(ref, () => internalRef.current as HTMLVideoElement)

    useEffect(() => {
        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: 'user',
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                    },
                })
                if (internalRef.current) {
                    internalRef.current.srcObject = stream
                }
            } catch (err) {
                console.error('Error starting camera:', err)
            }
        }
        startCamera()

        return () => {
            if (internalRef.current?.srcObject) {
                const stream = internalRef.current.srcObject as MediaStream
                stream.getTracks().forEach((track) => track.stop())
            }
        }
    }, [])

    return (
        <div className="relative w-full h-full bg-charcoal-900 overflow-hidden">
            <video
                ref={internalRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover transform transition-transform ${props.isMirror ? '-scale-x-100' : ''}`}
            />
            {/* Mirror overlay indicator */}
            {props.isMirror && (
                <div className="absolute top-8 left-8 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/5 text-white/50 text-[8px] font-black uppercase tracking-widest flex items-center space-x-2">
                    <Camera className="w-3 h-3" />
                    <span>Mirror Vision Active</span>
                </div>
            )}
        </div>
    )
})

CameraFeed.displayName = 'CameraFeed'
