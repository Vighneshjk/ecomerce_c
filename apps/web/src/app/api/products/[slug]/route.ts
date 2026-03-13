import { NextResponse } from 'next/server'
import { DJANGO_API } from '@/lib/api'

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params
        const res = await fetch(`${DJANGO_API}/products/${slug}/`)

        if (!res.ok) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 })
        }

        const product = await res.json()
        return NextResponse.json(product)
    } catch (error) {
        console.error('Product detail API error:', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}
