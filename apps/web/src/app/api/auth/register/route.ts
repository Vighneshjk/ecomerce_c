import { NextResponse } from 'next/server'
import { DJANGO_API } from '@/lib/api'

export async function POST(req: Request) {
    try {
        const { email, password, name, phone } = await req.json()

        if (!email || !password || !name) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
        }

        const res = await fetch(`${DJANGO_API}/auth/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                username: email,
                password,
                name,
                phone: phone || '',
            }),
        })

        const data = await res.json()

        if (!res.ok) {
            const message =
                data.email?.[0] ||
                data.username?.[0] ||
                data.password?.[0] ||
                data.detail ||
                'Registration failed'
            return NextResponse.json({ message }, { status: res.status })
        }

        return NextResponse.json(data, { status: 201 })
    } catch (error) {
        console.error('Registration error:', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}
