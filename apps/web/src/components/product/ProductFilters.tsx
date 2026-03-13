'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, Check, Shapes, Filter, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Divider } from '@/components/ui/Divider'

const filterOptions = {
    categories: ['SUNGLASSES', 'EYEGLASSES', 'BLUELIGHT', 'SPORTS', 'KIDS'],
    shapes: ['ROUND', 'SQUARE', 'RECTANGLE', 'AVIATOR', 'WAYFARER', 'CAT_EYE', 'OVAL', 'GEOMETRIC'],
    materials: ['ACETATE', 'METAL', 'TITANIUM', 'TR90', 'WOOD'],
    rimTypes: ['FULL_RIM', 'HALF_RIM', 'RIMLESS'],
    genders: ['MEN', 'WOMEN', 'UNISEX', 'KIDS'],
    colors: [
        { name: 'Black', hex: '#000000' },
        { name: 'Gold', hex: '#FFD700' },
        { name: 'Silver', hex: '#C0C0C0' },
        { name: 'Tortoise', hex: '#2F1B0F' },
        { name: 'Blue', hex: '#0000FF' },
        { name: 'Red', hex: '#FF0000' },
        { name: 'Brown', hex: '#8B4513' },
        { name: 'Clear', hex: '#F0F8FF' },
    ]
}

const ProductFilters = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [openGroup, setOpenGroup] = useState<string | null>('categories')
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    // Sync state with URL
    const updateUrl = (newParams: any) => {
        const params = new URLSearchParams(searchParams.toString())

        Object.keys(newParams).forEach(key => {
            if (newParams[key] === null) {
                params.delete(key)
            } else if (Array.isArray(newParams[key])) {
                params.delete(key)
                newParams[key].forEach((v: string) => params.append(key, v))
            } else {
                params.set(key, newParams[key])
            }
        })

        router.push(`${pathname}?${params.toString()}`)
    }

    const toggleFilter = (key: string, value: string) => {
        const current = searchParams.getAll(key)
        const next = current.includes(value)
            ? current.filter(v => v !== value)
            : [...current, value]

        updateUrl({ [key]: next.length ? next : null })
    }

    const clearAll = () => {
        router.push(pathname)
    }

    const FilterSkeleton = ({ title, children, groupKey }: any) => (
        <div className="border-b border-charcoal-50 py-4">
            <button
                onClick={() => setOpenGroup(openGroup === groupKey ? null : groupKey)}
                className="flex items-center justify-between w-full text-sm font-bold uppercase tracking-widest text-charcoal-900 group"
            >
                <span>{title}</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform", openGroup === groupKey ? "rotate-180" : "")} />
            </button>
            <AnimatePresence>
                {openGroup === groupKey && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pt-4 space-y-2"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )

    const Checkbox = ({ label, groupKey, value }: any) => {
        const checked = searchParams.getAll(groupKey).includes(value)
        return (
            <label
                className="flex items-center space-x-3 cursor-pointer group"
                onClick={() => toggleFilter(groupKey, value)}
            >
                <div className={cn(
                    "w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center",
                    checked ? "bg-brand-600 border-brand-600 text-white" : "border-charcoal-200 group-hover:border-brand-500"
                )}>
                    {checked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className={cn(
                    "text-sm font-medium transition-colors",
                    checked ? "text-charcoal-900 font-bold" : "text-charcoal-500"
                )}>
                    {label}
                </span>
            </label>
        )
    }

    const ActiveFilters = () => {
        const active = Array.from(searchParams.entries())
        if (!active.length) return null

        return (
            <div className="flex flex-wrap gap-2 mb-8">
                {active.map(([key, val], i) => (
                    <button
                        key={i}
                        onClick={() => toggleFilter(key, val)}
                        className="flex items-center space-x-2 px-3 py-1.5 bg-brand-50 text-brand-700 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-100 transition-all border border-brand-100"
                    >
                        <span>{val}</span>
                        <X className="w-3 h-3" />
                    </button>
                ))}
                <button
                    onClick={clearAll}
                    className="text-xs font-bold text-red-500 uppercase tracking-widest hover:underline px-2"
                >
                    Clear All
                </button>
            </div>
        )
    }

    return (
        <div className="space-y-6 lg:sticky lg:top-24 lg:max-h-[80vh] lg:overflow-y-auto lg:pr-4 custom-scrollbar">
            <div className="flex items-center justify-between mb-8 lg:hidden">
                <h3 className="text-xl font-display font-semibold">Filters</h3>
                <ActiveFilters />
            </div>

            <div className="hidden lg:block">
                <h3 className="text-2xl font-display font-semibold text-charcoal-900 mb-6">Filters</h3>
                <ActiveFilters />
            </div>

            <FilterSkeleton title="Category" groupKey="category">
                {filterOptions.categories.map(c => (
                    <Checkbox key={c} label={c} groupKey="category" value={c} />
                ))}
            </FilterSkeleton>

            <FilterSkeleton title="Frame Shape" groupKey="shape">
                <div className="grid grid-cols-2 gap-3">
                    {filterOptions.shapes.map(s => (
                        <div
                            key={s}
                            onClick={() => toggleFilter('shape', s)}
                            className={cn(
                                "flex flex-col items-center justify-center p-3 border rounded-xl transition-all cursor-pointer group",
                                searchParams.getAll('shape').includes(s)
                                    ? "bg-brand-50 border-brand-500 text-brand-700"
                                    : "border-charcoal-100 hover:border-brand-300 hover:bg-brand-50/20"
                            )}
                        >
                            <Shapes className="w-5 h-5 mb-2 opacity-50 group-hover:opacity-100" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{s}</span>
                        </div>
                    ))}
                </div>
            </FilterSkeleton>

            <FilterSkeleton title="Material" groupKey="material">
                {filterOptions.materials.map(m => (
                    <Checkbox key={m} label={m} groupKey="material" value={m} />
                ))}
            </FilterSkeleton>

            <FilterSkeleton title="Rim Type" groupKey="rimType">
                {filterOptions.rimTypes.map(r => (
                    <Checkbox key={r} label={r} groupKey="rimType" value={r} />
                ))}
            </FilterSkeleton>

            <FilterSkeleton title="Color" groupKey="color">
                <div className="grid grid-cols-4 gap-4">
                    {filterOptions.colors.map(c => (
                        <button
                            key={c.name}
                            onClick={() => toggleFilter('color', c.name)}
                            title={c.name}
                            className={cn(
                                "w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center",
                                searchParams.getAll('color').includes(c.name)
                                    ? "border-brand-600 scale-110 shadow-lg"
                                    : "border-transparent"
                            )}
                            style={{ backgroundColor: c.hex }}
                        >
                            {searchParams.getAll('color').includes(c.name) && (
                                <Check className={cn("w-4 h-4 stroke-[3]",
                                    c.name === 'Black' || c.name === 'Brown' || c.name === 'Blue' ? "text-white" : "text-black"
                                )} />
                            )}
                        </button>
                    ))}
                </div>
            </FilterSkeleton>

            <FilterSkeleton title="Gender" groupKey="gender">
                {filterOptions.genders.map(g => (
                    <Checkbox key={g} label={g} groupKey="gender" value={g} />
                ))}
            </FilterSkeleton>
        </div>
    )
}

export default ProductFilters
