import { NextResponse } from 'next/server'
import { DJANGO_API } from '@/lib/api'

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json()

        if (!token || !password) {
            return NextResponse.json({ message: 'Token and password are required' }, { status: 400 })
        }

        const res = await fetch(`${DJANGO_API}/auth/reset-password/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, password }),
        })

        const data = await res.json().catch(() => ({}))

        if (!res.ok) {
            return NextResponse.json(
                { message: data.detail || 'Password reset failed' },
                { status: res.status }
            )
        }

        return NextResponse.json({ message: 'Password reset successfully' })
    } catch (error) {
        console.error('Reset password error:', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}
