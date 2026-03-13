'use client'

import React from 'react'
import { Camera, Share2, Download, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const ShareCapture = () => {
    const handleCapture = async () => {
        // In a real implementation, you'd use a canvas screenshot or a specific R3F/Three.js renderer gl.domElement toDataURL
        // For now, this is the UI component for the action
        alert('Vision Broadcast Captured! Securely downloading your perspective...')
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Akela Eyewear Virtual Try-On',
                    text: 'Just tried on these frames with Akela Aura. What do you think?',
                    url: window.location.href,
                })
            } catch (err) {
                console.error('Sharing failed', err)
            }
        } else {
            alert('Web Share API not supported on this browser. Link copied to clipboard!')
        }
    }

    return (
        <div className="flex items-center space-x-4">
            <button
                onClick={handleCapture}
                className="p-4 bg-white/5 backdrop-blur-2xl border border-white/5 rounded-2xl text-white hover:bg-brand-500 hover:text-black hover:scale-110 active:scale-95 transition-all shadow-2xl group/ctrl"
            >
                <Download className="w-5 h-5" />
            </button>
            <button
                onClick={handleShare}
                className="p-4 bg-white/5 backdrop-blur-2xl border border-white/5 rounded-2xl text-white hover:bg-brand-500 hover:text-black hover:scale-110 active:scale-95 transition-all shadow-2xl group/ctrl"
            >
                <Share2 className="w-5 h-5" />
            </button>
            <button
                className="p-4 bg-white/5 backdrop-blur-2xl border border-white/5 rounded-2xl text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:scale-110 active:scale-95 transition-all shadow-2xl group/ctrl"
            >
                <Instagram className="w-5 h-5" />
            </button>
        </div>
    )
}
