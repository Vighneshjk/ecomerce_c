'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, Phone, CheckCircle2, ArrowRight, Chrome } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    password: z.string().min(8, 'Password must be at least 8 characters').regex(/[0-9]/, 'Password must contain at least 1 number'),
    confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters'),
    terms: z.boolean().refine(val => val === true, 'You must accept the terms'),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
})

type RegisterForm = z.infer<typeof registerSchema>

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: { terms: false }
    })

    const onSubmit = async (data: RegisterForm) => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    password: data.password
                })
            })

            const result = await res.json()

            if (!res.ok) {
                setError(result.message || 'Registration failed')
            } else {
                // Success: auto-login
                await signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    redirect: false
                })
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
                        "We see the world as you see it."
                    </h2>
                    <p className="text-charcoal-400 text-lg font-light leading-relaxed">
                        Create an account to join our visionary community. Bespoke offers and early access to drops await.
                    </p>
                </div>

                <div className="z-10 flex space-x-8 text-[11px] text-charcoal-500 uppercase tracking-widest">
                    <span>Global Shipping</span>
                    <span>Vision Support</span>
                </div>

                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-brand-900/30 to-transparent pointer-events-none" />
            </motion.div>

            {/* Right Side: Form */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 md:px-20 bg-white overflow-y-auto pt-10 pb-10"
            >
                <div className="w-full max-w-md space-y-8">
                    <div className="space-y-3 text-center lg:text-left">
                        <h1 className="text-4xl font-display font-semibold text-charcoal-900 tracking-tight">Create Account</h1>
                        <p className="text-charcoal-500">Join the Akela family today.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Full Name"
                                placeholder="John Doe"
                                iconLeft={<User className="w-4 h-4" />}
                                {...register('name')}
                                error={errors.name?.message}
                            />
                            <Input
                                label="Phone (Optional)"
                                placeholder="+91 9999999999"
                                iconLeft={<Phone className="w-4 h-4" />}
                                {...register('phone')}
                                error={errors.phone?.message}
                            />
                        </div>

                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="name@example.com"
                            iconLeft={<Mail className="w-4 h-4" />}
                            {...register('email')}
                            error={errors.email?.message}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <Input
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    iconLeft={<Lock className="w-4 h-4" />}
                                    {...register('password')}
                                    error={errors.password?.message}
                                />
                            </div>
                            <div className="relative">
                                <Input
                                    label="Confirm"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    iconLeft={<CheckCircle2 className="w-4 h-4" />}
                                    {...register('confirmPassword')}
                                    error={errors.confirmPassword?.message}
                                />
                            </div>
                        </div>

                        <div className="flex items-start space-x-2 pt-2">
                            <input
                                type="checkbox"
                                id="terms"
                                className="mt-1 h-4 w-4 rounded border-charcoal-300 text-brand-600 focus:ring-brand-500"
                                {...register('terms')}
                            />
                            <label htmlFor="terms" className="text-[11px] leading-relaxed text-charcoal-500">
                                I accept the <Link href="/terms" className="text-brand-600 underline font-medium">Terms of Service</Link> and <Link href="/privacy" className="text-brand-600 underline font-medium">Privacy Policy</Link>. I understand Akela will process my data according to these terms.
                            </label>
                        </div>
                        {errors.terms && <p className="text-xs font-medium text-red-500">{errors.terms.message}</p>}

                        <Button
                            type="submit"
                            className="w-full h-12 text-lg"
                            loading={loading}
                        >
                            <span>Create Account</span>
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-charcoal-100" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-4 text-charcoal-400 tracking-widest">Or sign up with</span>
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full h-12"
                            onClick={() => signIn('google')}
                        >
                            <Chrome className="w-5 h-5 mr-3 text-red-500" />
                            <span>Google Account</span>
                        </Button>

                        <p className="text-center text-sm text-charcoal-500">
                            Already have an account?{' '}
                            <Link href="/login" className="font-semibold text-brand-600 hover:text-brand-700 underline underline-offset-4">
                                Login here
                            </Link>
                        </p>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

export default RegisterPage
