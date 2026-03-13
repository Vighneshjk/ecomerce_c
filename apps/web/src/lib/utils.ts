import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, currency: string = 'INR') {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 0
    }).format(amount)
}

export function formatDate(date: Date | string) {
    const d = typeof date === 'string' ? new Date(date) : date
    return format(d, "dd MMMM yyyy")
}

export function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w-]+/g, '')  // Remove all non-word chars
        .replace(/--+/g, '-')      // Replace multiple - with single -
        .replace(/^-+/, '')        // Trim - from start of text
        .replace(/-+$/, '')        // Trim - from end of text
}

export function truncate(text: string, length: number) {
    if (text.length <= length) return text
    return text.slice(0, length) + '...'
}

export function getDiscountPercent(original: number, sale: number) {
    if (original <= 0) return 0
    const discount = ((original - sale) / original) * 100
    return Math.round(discount)
}
