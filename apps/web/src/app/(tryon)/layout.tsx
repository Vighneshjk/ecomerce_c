import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'VIRTUAL TRY-ON | AKELA EYEWEAR',
    description: 'Experience your prospective vision in real-time with AKELA Aura Link.',
}

export default function TryOnLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="bg-charcoal-900 overflow-hidden h-screen selection:bg-brand-500 selection:text-black">
            {children}
        </section>
    )
}
