import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { DJANGO_API } from '@/lib/api'

export async function GET(req: Request) {
    const session = await auth()
    if (!session || (session.user as any).role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const res = await fetch(`${DJANGO_API}/products/?${searchParams.toString()}`, {
        headers: { Authorization: `Bearer ${(session.user as any).accessToken}` },
    })
    const data = await res.json()
    return NextResponse.json(data)
}

export async function POST(req: Request) {
    const session = await auth()
    if (!session || (session.user as any).role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const body = await req.json()
    const res = await fetch(`${DJANGO_API}/products/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${(session.user as any).accessToken}`,
        },
        body: JSON.stringify(body),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
}
