import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
    {
        variants: {
            variant: {
                new: "bg-green-100 text-green-800",
                sale: "bg-red-100 text-red-800",
                soldout: "bg-charcoal-100 text-charcoal-500 line-through",
                featured: "bg-brand-100 text-brand-800 border border-brand-200",
                default: "border-transparent bg-charcoal-100 text-charcoal-900",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
