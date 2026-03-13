import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    helperText?: string
    iconLeft?: React.ReactNode
    iconRight?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, helperText, iconLeft, iconRight, ...props }, ref) => {
        const id = React.useId()

        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label
                        htmlFor={id}
                        className="text-sm font-medium leading-none text-charcoal-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {iconLeft && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400">
                            {iconLeft}
                        </div>
                    )}
                    <input
                        id={id}
                        type={type}
                        className={cn(
                            "flex h-12 w-full rounded-md border border-charcoal-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-charcoal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
                            iconLeft && "pl-10",
                            iconRight && "pr-10",
                            error && "border-red-500 focus-visible:ring-red-200",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {iconRight && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400">
                            {iconRight}
                        </div>
                    )}
                </div>
                {error && <p className="text-xs font-medium text-red-500">{error}</p>}
                {helperText && !error && (
                    <p className="text-xs text-charcoal-500">{helperText}</p>
                )}
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
