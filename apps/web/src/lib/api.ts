const DJANGO_API = process.env.DJANGO_API_URL || 'http://127.0.0.1:8000/api'

export async function djangoFetch(
    path: string,
    options: RequestInit = {},
    token?: string
): Promise<Response> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    }
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }
    return fetch(`${DJANGO_API}${path}`, { ...options, headers })
}

export { DJANGO_API }
