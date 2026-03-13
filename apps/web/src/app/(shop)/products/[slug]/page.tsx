import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ProductImages from '@/components/product/ProductImages'
import ProductInfo from '@/components/product/ProductInfo'
import ProductTabs from '@/components/product/ProductTabs'
import ReviewsList from '@/components/product/ReviewsList'
import RelatedProducts from '@/components/product/RelatedProducts'
import RecentlyViewed from '@/components/product/RecentlyViewed'

interface PageProps {
    params: { slug: string }
}

async function getProduct(slug: string) {
    try {
        const res = await fetch(`http://127.0.0.1:8000/api/products/${slug}/`, {
            next: { revalidate: 3600 }
        })
        if (!res.ok) return null
        return res.json()
    } catch (e) {
        return null
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const product = await getProduct(params.slug)
    if (!product) return { title: 'Product Not Found' }

    return {
        title: `${product.name} | AKELA EYEWEAR`,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: [product.images[0]?.url || ''],
        },
    }
}

export default async function ProductPage({ params }: PageProps) {
    const product = await getProduct(params.slug)
    if (!product) notFound()

    // Fetch related products (same category) from DRF
    let relatedProducts = []
    try {
        const relatedRes = await fetch(`http://127.0.0.1:8000/api/products/?category=${product.category}&limit=4`)
        if (relatedRes.ok) {
            const data = await relatedRes.json()
            relatedProducts = data.results || []
        }
    } catch (e) { }

    return (
        <div className="bg-white min-h-screen pt-24">
            {/* Product Main Section */}
            <div className="container-app py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
                    <div className="sticky top-24">
                        <ProductImages images={product.images} />
                    </div>
                    <div>
                        <ProductInfo product={product} />
                    </div>
                </div>
            </div>

            <ProductTabs product={product} />

            <ReviewsList reviews={product.reviews || []} />

            <RelatedProducts products={relatedProducts} />

            <RecentlyViewed />
        </div>
    )
}
