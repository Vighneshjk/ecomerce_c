'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })
            if (res.ok) {
                setSuccess(true)
            } else {
                const data = await res.json()
                setError(data.message || 'Error occurred')
            }
        } catch (err) {
            setError('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-brand-50/30">
            <Link href="/" className="flex flex-col mb-12 items-center">
                <span className="text-3xl font-display font-medium tracking-widest text-charcoal-900">AKELA</span>
                <span className="text-[9px] tracking-[0.4em] font-sans text-brand-600 uppercase -mt-1 pl-1">EYEWEAR</span>
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl shadow-charcoal-100/50 border border-charcoal-100"
            >
                {success ? (
                    <div className="text-center space-y-6">
                        <div className="mx-auto w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-display font-semibold text-charcoal-900">Check Your Inbox</h1>
                            <p className="text-charcoal-500 text-sm">We've sent a password reset link to <span className="font-semibold text-charcoal-900">{email}</span>. Please check your email.</p>
                        </div>
                        <Button asChild variant="secondary" className="w-full">
                            <Link href="/login">Return to Login</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-display font-semibold text-charcoal-900">Forgot Password?</h1>
                            <p className="text-charcoal-500 text-sm">No worries, it happens. Enter your email and we'll send you a link to reset your password.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 text-center">
                                    {error}
                                </div>
                            )}
                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="name@example.com"
                                iconLeft={<Mail className="w-4 h-4" />}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Button type="submit" className="w-full h-12" loading={loading}>
                                Send Link
                            </Button>
                            <Link href="/login" className="flex items-center justify-center text-sm font-medium text-charcoal-500 hover:text-charcoal-900 transition-colors">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to login
                            </Link>
                        </form>
                    </div>
                )}
            </motion.div>
        </div>
    )
}

export default ForgotPasswordPage
