import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { DJANGO_API } from '@/lib/api'

export async function GET() {
    const session = await auth()
    if (!session || (session.user as any).role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    try {
        const res = await fetch(`${DJANGO_API}/admin/analytics/`, {
            headers: { Authorization: `Bearer ${(session.user as any).accessToken}` },
        })
        const data = await res.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Analytics proxy error:', error)
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
    }
}
