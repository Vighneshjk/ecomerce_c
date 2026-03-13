import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth")
    const isAuthRoute = ["/login", "/register", "/forgot-password", "/reset-password"].includes(
        nextUrl.pathname
    )
    const isProtectedRoute =
        nextUrl.pathname.startsWith("/account") ||
        nextUrl.pathname.startsWith("/admin") ||
        nextUrl.pathname === "/checkout"

    if (isApiAuthRoute) return null

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/account/profile", nextUrl))
        }
        return null
    }

    if (!isLoggedIn && isProtectedRoute) {
        return NextResponse.redirect(new URL("/login", nextUrl))
    }

    // Admin protection
    if (isLoggedIn && nextUrl.pathname.startsWith("/admin")) {
        const isAdmin = (req.auth?.user as any).role === "ADMIN"
        if (!isAdmin) {
            return NextResponse.redirect(new URL("/", nextUrl))
        }
    }

    return null
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
