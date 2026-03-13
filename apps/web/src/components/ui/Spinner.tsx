import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg"
}

const Spinner = ({ className, size = "md", ...props }: SpinnerProps) => {
    const sizes = {
        sm: "h-4 w-4",
        md: "h-8 w-8",
        lg: "h-12 w-12",
    }

    return (
        <div className={cn("flex items-center justify-center", className)} {...props}>
            <Loader2 className={cn("animate-spin text-brand-600", sizes[size])} />
        </div>
    )
}

export { Spinner }
