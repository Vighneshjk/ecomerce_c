import { NextResponse } from 'next/server'
import { DJANGO_API } from '@/lib/api'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const params = new URLSearchParams()

        const page = searchParams.get('page') || '1'
        const limit = searchParams.get('limit') || '12'
        params.set('page', page)
        params.set('page_size', limit)

        const q = searchParams.get('q')
        if (q) params.set('search', q)

        searchParams.getAll('category').forEach(v => params.append('category', v))
        searchParams.getAll('shape').forEach(v => params.append('frame_shape', v))
        searchParams.getAll('material').forEach(v => params.append('frame_material', v))
        searchParams.getAll('rimType').forEach(v => params.append('rim_type', v))
        searchParams.getAll('gender').forEach(v => params.append('gender', v))

        if (searchParams.get('featured') === 'true') params.set('is_featured', 'true')
        if (searchParams.get('newArrival') === 'true') params.set('is_new_arrival', 'true')

        const minPrice = searchParams.get('minPrice')
        const maxPrice = searchParams.get('maxPrice')
        if (minPrice) params.set('minPrice', minPrice)
        if (maxPrice) params.set('maxPrice', maxPrice)

        const sort = searchParams.get('sort') || 'featured'
        if (sort === 'price-low') params.set('ordering', 'price')
        else if (sort === 'price-high') params.set('ordering', '-price')
        else if (sort === 'featured') params.set('ordering', '-is_featured,-created_at')
        else params.set('ordering', '-created_at')

        const res = await fetch(`${DJANGO_API}/products/?${params.toString()}`)
        const data = await res.json()

        return NextResponse.json({
            products: data.results ?? data,
            total: data.count ?? 0,
            page: parseInt(page),
            totalPages: Math.ceil((data.count ?? 0) / parseInt(limit)),
        })
    } catch (error) {
        console.error('Products API error:', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}
