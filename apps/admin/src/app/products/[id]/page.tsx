'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    ChevronLeft,
    Save,
    Eye,
    Trash2,
    Plus,
    Image as ImageIcon,
    Box,
    Target,
    Zap,
    Sparkles,
    CheckCircle2,
    X,
    UploadCloud,
    ExternalLink,
    BoxSelect,
    Palette,
    Layers,
    Search,
    Globe
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import MDEditor from '@uiw/react-md-editor'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const productSchema = z.object({
    name: z.string().min(2, 'Name required'),
    slug: z.string().min(2, 'Slug required'),
    description: z.string(),
    price: z.number().min(0),
    comparePrice: z.number().optional(),
    costPrice: z.number().optional(),
    category: z.string(),
    sku: z.string(),
    stock: z.number(),
    status: z.enum(['Active', 'Draft', 'Archived']),
    variants: z.array(z.object({
        colorName: z.string(),
        colorHex: z.string(),
        stock: z.number(),
        sku: z.string()
    })),
    modelUrl: z.string().optional()
})

export default function ProductEditorPage({ params }: { params: { id: string } }) {
    const isNew = params.id === 'new'
    const [description, setDescription] = useState('**Handcrafted in the Akela Artisan Studio.**')
    const [images, setImages] = useState<string[]>([])

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            status: 'Draft',
            variants: [{ colorName: 'Default', colorHex: '#000000', stock: 10, sku: 'AKL-VAR-001' }]
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'variants'
    })

    const onSubmit = (data: any) => {
        console.log('Syncing Node Broadcast:', { ...data, description, images })
        alert('Mission Control: Product Node Link Established.')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 pb-32">
            {/* Action Bar */}
            <div className="sticky top-0 z-[60] -mx-12 px-12 py-8 bg-[#0A0A0A]/80 backdrop-blur-3xl border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    <Link href="/products" className="p-4 bg-white/5 rounded-2xl hover:bg-white hover:text-black transition-all group">
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-500 block leading-none mb-2">Subject Configuration Node</span>
                        <h1 className="text-4xl font-display font-black text-white italic tracking-tighter uppercase leading-none">
                            {isNew ? 'Create' : 'Edit'} <span className="text-brand-500">artisan object.</span>
                        </h1>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <Button variant="outline" className="h-16 rounded-2xl border-white/5 text-white hover:bg-white hover:text-black transition-all">
                        <Eye className="w-5 h-5 mr-3" />
                        Preview Link
                    </Button>
                    <Button type="submit" className="h-16 px-10 rounded-2xl bg-brand-500 text-black hover:bg-white shadow-2xl">
                        <Save className="w-5 h-5 mr-3" />
                        Save Broadcast
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column: Basic Info */}
                <div className="lg:col-span-8 space-y-12">
                    <section className="p-10 bg-[#141414] border border-white/5 rounded-[4rem] space-y-10 shadow-2xl">
                        <div className="flex items-center space-x-4">
                            <BoxSelect className="w-8 h-8 text-brand-500" />
                            <h3 className="text-3xl font-display font-semibold text-white tracking-tighter uppercase italic leading-none">CORE <span className="text-brand-500">identity.</span></h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-charcoal-500">Subject Name</label>
                                <input {...register('name')} placeholder="Aura Aviator..." className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-6 text-sm font-black focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
                                {errors.name && <span className="text-[8px] text-red-500 font-black uppercase">{errors.name.message as string}</span>}
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-charcoal-500">Identification Slug</label>
                                <input {...register('slug')} placeholder="aura-aviator-noir" className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-6 text-sm font-black focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
                            </div>
                        </div>
                        <div className="space-y-3" data-color-mode="dark">
                            <label className="text-[10px] font-black uppercase tracking-widest text-charcoal-500">Description Broadcast</label>
                            <MDEctor value={description} onChange={(v: string | undefined) => setDescription(v || '')} className="border border-white/5 rounded-2xl overflow-hidden shadow-2xl" preview="edit" />
                        </div>
                    </section>

                    <section className="p-10 bg-[#141414] border border-white/5 rounded-[4rem] space-y-10 shadow-2xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Palette className="w-8 h-8 text-brand-500" />
                                <h3 className="text-3xl font-display font-semibold text-white tracking-tighter uppercase italic leading-none">VARIANT <span className="text-brand-500">matrix.</span></h3>
                            </div>
                            <Button type="button" onClick={() => append({ colorName: '', colorHex: '#000000', stock: 0, sku: '' })} className="h-10 px-6 rounded-xl bg-white/5 border border-white/5 text-[8px] hover:bg-brand-500 hover:text-black">
                                <Plus className="w-3 h-3 mr-2" /> Append Row
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {fields.map((field, index) => (
                                <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-white/5 border border-white/5 rounded-3xl group">
                                    <div className="space-y-2">
                                        <span className="text-[8px] font-black uppercase tracking-widest text-charcoal-600">Color ID</span>
                                        <input {...register(`variants.${index}.colorName`)} placeholder="Obsidian" className="w-full h-12 bg-charcoal-900 border border-white/5 rounded-xl px-4 text-xs font-black text-white outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-[8px] font-black uppercase tracking-widest text-charcoal-600">Hex Code</span>
                                        <div className="flex items-center space-x-3">
                                            <input type="color" {...register(`variants.${index}.colorHex`)} className="w-10 h-10 rounded-full border border-white/5 overflow-hidden p-0" />
                                            <input {...register(`variants.${index}.colorHex`)} className="flex-1 h-12 bg-charcoal-900 border border-white/5 rounded-xl px-4 text-xs font-black text-white outline-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-[8px] font-black uppercase tracking-widest text-charcoal-600">Stock Node</span>
                                        <input type="number" {...register(`variants.${index}.stock`)} className="w-full h-12 bg-charcoal-900 border border-white/5 rounded-xl px-4 text-xs font-black text-white outline-none" />
                                    </div>
                                    <div className="space-y-2 relative">
                                        <span className="text-[8px] font-black uppercase tracking-widest text-charcoal-600">Variant SKU</span>
                                        <input {...register(`variants.${index}.sku`)} className="w-full h-12 bg-charcoal-900 border border-white/5 rounded-xl px-4 text-xs font-black text-white outline-none" />
                                        <button type="button" onClick={() => remove(index)} className="absolute top-0 right-0 p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Status, Images, Price */}
                <div className="lg:col-span-4 space-y-12">
                    <section className="p-10 bg-[#141414] border border-white/5 rounded-[4rem] space-y-8 shadow-2xl">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-charcoal-500">Yield Configuration (INR)</label>
                            <input type="number" {...register('price')} className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 text-2xl font-display font-bold text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <span className="text-[8px] font-black uppercase tracking-widest text-charcoal-600">Comparison Yield</span>
                                <input type="number" {...register('comparePrice')} className="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-4 text-sm font-black text-white/40" />
                            </div>
                            <div className="space-y-2">
                                <span className="text-[8px] font-black uppercase tracking-widest text-charcoal-600">Direct Cost Pin</span>
                                <input type="number" {...register('costPrice')} className="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-4 text-sm font-black text-white/40" />
                            </div>
                        </div>
                    </section>

                    <section className="p-10 bg-[#141414] border border-white/5 rounded-[4rem] space-y-10 shadow-2xl">
                        <div className="flex items-center space-x-4">
                            <Globe className="w-6 h-6 text-brand-500" />
                            <h3 className="text-2xl font-display font-semibold text-white tracking-tighter uppercase italic leading-none text-white">SYNC <span className="text-brand-500 lowercase">status.</span></h3>
                        </div>
                        <select {...register('status')} className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 text-sm font-black uppercase tracking-widest text-white outline-none focus:ring-2 focus:ring-brand-500">
                            <option value="Active">Broadcast Active</option>
                            <option value="Draft">Node Draft</option>
                            <option value="Archived">Subject Archived</option>
                        </select>

                        <div className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-3xl">
                            <div className="space-y-1">
                                <span className="text-sm font-black italic text-white uppercase tracking-tighter">Artisan Choice</span>
                                <p className="text-[8px] font-black opacity-40 uppercase tracking-widest">Pin to Global Headline</p>
                            </div>
                            <div className="w-14 h-8 bg-charcoal-800 rounded-full relative p-1 cursor-pointer">
                                <div className="w-6 h-6 bg-brand-500 rounded-full shadow-lg" />
                            </div>
                        </div>
                    </section>

                    <section className="p-10 bg-[#141414] border border-white/5 rounded-[4rem] space-y-10 shadow-2xl relative overflow-hidden group">
                        <div className="flex items-center space-x-4">
                            <UploadCloud className="w-8 h-8 text-brand-500" />
                            <h3 className="text-2xl font-display font-semibold text-white tracking-tighter uppercase italic leading-none text-white">VISION <span className="text-brand-500 lowercase">probe.</span></h3>
                        </div>
                        <div className="aspect-[4/5] bg-white/5 border-2 border-dashed border-white/10 rounded-[3rem] flex flex-col items-center justify-center space-y-6 group-hover:border-brand-500 transition-all cursor-pointer">
                            <div className="w-20 h-20 bg-charcoal-900 rounded-[2rem] flex items-center justify-center text-charcoal-600 group-hover:text-brand-500 transition-all">
                                <Plus className="w-10 h-10" />
                            </div>
                            <div className="text-center">
                                <p className="text-xs font-black uppercase tracking-widest text-white">Inject Visual Node</p>
                                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-charcoal-600 mt-2">Max 25MB Broadcast</p>
                            </div>
                        </div>
                    </section>

                    <section className="p-10 bg-brand-950/20 border-2 border-brand-500/20 rounded-[4rem] space-y-10 shadow-2xl relative overflow-hidden">
                        <div className="flex items-center space-x-4">
                            <Zap className="w-8 h-8 text-brand-500" />
                            <h3 className="text-2xl font-display font-semibold text-white tracking-tighter uppercase italic leading-none text-white">3D <span className="text-brand-500 lowercase">link.</span></h3>
                        </div>
                        <input placeholder="https://cdn.akela.in/models/aviator.glb" className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-6 text-[10px] font-black text-brand-500 outline-none" />
                        <div className="aspect-video bg-charcoal-900 rounded-3xl border border-white/5 flex items-center justify-center overflow-hidden">
                            <Sparkles className="w-10 h-10 text-brand-500 opacity-20 animate-pulse" />
                        </div>
                    </section>
                </div>
            </div>
        </form>
    )
}

const MDEctor = ({ value, onChange, className }: any) => {
    return (
        <div className={className}>
            <MDEditor
                value={value}
                onChange={onChange}
                className="!bg-charcoal-900 !text-white !font-sans"
                height={400}
                preview="edit"
            />
        </div>
    )
}
