import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    children: React.ReactNode
}

export const Button = ({ variant = 'primary', size = 'md', children, className, ...props }: ButtonProps) => {
    const base = "inline-flex items-center justify-center font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"

    const variants = {
        primary: "bg-brand-500 text-black hover:bg-white shadow-xl shadow-brand-500/10",
        secondary: "bg-charcoal-900 text-white hover:bg-charcoal-800",
        outline: "bg-transparent border border-white/10 text-white hover:bg-white hover:text-black",
        ghost: "bg-transparent text-white hover:bg-white/5",
        danger: "bg-red-500 text-white hover:bg-red-600"
    }

    const sizes = {
        sm: "h-10 px-6 text-[8px]",
        md: "h-14 px-10 text-[10px]",
        lg: "h-20 px-16 text-xs"
    }

    return (
        <button
            className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}
