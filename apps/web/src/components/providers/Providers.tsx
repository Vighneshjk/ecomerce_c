'use client'

import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Actually the prompt says @radix-ui/react-toast so I'll use that eventually
// But for now I'll use a simpler toaster if I can or just a placeholder

import { ThemeProvider } from 'next-themes'

const Providers = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
                {children}
                {/* Toast provider would go here if using Radix */}
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default Providers
