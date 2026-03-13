'use client'

import { useSession, signIn, signOut } from "next-auth/react"

export const useAuth = () => {
    const { data: session, status } = useSession()

    const isLoading = status === 'loading'
    const isAuthenticated = status === 'authenticated'
    const user = session?.user
    const isAdmin = (user as any)?.role === 'ADMIN'

    return {
        user,
        isLoading,
        isAuthenticated,
        isAdmin,
        login: (options?: any) => signIn(undefined, options),
        logout: (options?: any) => signOut(options),
        register: () => { /* Logic is in/register/page.tsx or custom helper */ }
    }
}
