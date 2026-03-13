import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    session: { strategy: "jwt" },
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data

                    try {
                        const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ username: email, password }),
                        });

                        if (!response.ok) return null;

                        const data = await response.json();

                        // Fetch user info with the access token
                        const userRes = await fetch("http://127.0.0.1:8000/api/users/me/", {
                            headers: { Authorization: `Bearer ${data.access}` },
                        });

                        if (!userRes.ok) return null;

                        const userData = await userRes.json();

                        return {
                            ...userData,
                            accessToken: data.access,
                            refreshToken: data.refresh,
                        };
                    } catch (error) {
                        return null;
                    }
                }

                return null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = (user as any).role
                token.accessToken = (user as any).accessToken
                token.refreshToken = (user as any).refreshToken
            }
            return token
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
                (session.user as any).accessToken = token.accessToken;
            }
            return session
        },
    },
})
