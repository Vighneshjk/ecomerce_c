import { NextResponse } from 'next/server'
import { DJANGO_API } from '@/lib/api'

export async function POST(req: Request) {
    try {
        const { email } = await req.json()

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 })
        }

        const res = await fetch(`${DJANGO_API}/auth/forgot-password/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        })

        if (!res.ok && res.status !== 404) {
            const data = await res.json().catch(() => ({}))
            return NextResponse.json(
                { message: data.detail || 'Failed to send reset email' },
                { status: res.status }
            )
        }

        return NextResponse.json({ message: 'If that email exists, a reset link has been sent.' })
    } catch (error) {
        console.error('Forgot password error:', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}
