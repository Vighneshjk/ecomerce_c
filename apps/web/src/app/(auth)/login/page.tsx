'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Chrome } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginForm) => {
        setLoading(true)
        setError(null)
        try {
            const res = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            })
            if (res?.error) {
                setError('Invalid email or password')
            } else {
                router.push('/account/profile')
            }
        } catch (err) {
            setError('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-white">
            {/* Left Side: Brand Visual */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden lg:flex w-1/2 bg-charcoal-900 flex-col justify-between p-12 relative overflow-hidden"
            >
                <div className="z-10">
                    <Link href="/" className="flex flex-col">
                        <span className="text-4xl font-display font-medium tracking-widest text-white">AKELA</span>
                        <span className="text-[10px] tracking-[0.4em] font-sans text-brand-400 uppercase -mt-1 pl-1">EYEWEAR</span>
                    </Link>
                </div>

                <div className="z-10 max-w-sm">
                    <h2 className="text-5xl font-display text-white mb-6 leading-tight italic">
                        "Your vision is the window to your soul."
                    </h2>
                    <p className="text-charcoal-400 text-lg font-light leading-relaxed">
                        Welcome back to the world of visionary aesthetics. Authenticate to access your curated collection.
                    </p>
                </div>

                <div className="z-10 flex space-x-8 text-[11px] text-charcoal-500 uppercase tracking-widest">
                    <span>Visionary Craftsmanship</span>
                    <span>Sustainably Handcrafted</span>
                </div>

                {/* Decorative mask */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-brand-900/40 to-transparent pointer-events-none" />
            </motion.div>

            {/* Right Side: Form */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 md:px-20 bg-white"
            >
                <div className="w-full max-w-md space-y-10">
                    <div className="space-y-4 text-center lg:text-left">
                        <h1 className="text-4xl font-display font-semibold text-charcoal-900 tracking-tight">Welcome Back</h1>
                        <p className="text-charcoal-500">Sign in to your account to continue.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="name@example.com"
                            iconLeft={<Mail className="w-4 h-4" />}
                            {...register('email')}
                            error={errors.email?.message}
                        />

                        <div className="relative">
                            <Input
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                iconLeft={<Lock className="w-4 h-4" />}
                                {...register('password')}
                                error={errors.password?.message}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-[38px] text-charcoal-400 hover:text-charcoal-600 transition-colors"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <div className="flex justify-end mt-1.5">
                                <Link href="/forgot-password" className="text-xs font-semibold text-brand-600 hover:text-brand-700 underline underline-offset-4">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-lg"
                            loading={loading}
                        >
                            <span>Sign In</span>
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-charcoal-100" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-4 text-charcoal-400 tracking-widest">Or continue with</span>
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full h-12"
                            onClick={() => signIn('google')}
                        >
                            <Chrome className="w-5 h-5 mr-3 text-red-500" />
                            <span>Google</span>
                        </Button>

                        <p className="text-center text-sm text-charcoal-500">
                            New to Akela?{' '}
                            <Link href="/register" className="font-semibold text-brand-600 hover:text-brand-700 underline underline-offset-4">
                                Create an account
                            </Link>
                        </p>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

export default LoginPage
