import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import CategoryStrip from '@/components/home/CategoryStrip'
import FeaturedFrames from '@/components/home/FeaturedFrames'
import TryOnBanner from '@/components/home/TryOnBanner'
import BrandStory from '@/components/home/BrandStory'
import NewArrivals from '@/components/home/NewArrivals'
import ReviewsSection from '@/components/home/ReviewsSection'
import InstagramFeed from '@/components/home/InstagramFeed'
import NewsletterSection from '@/components/home/NewsletterSection'

export const metadata: Metadata = {
    metadataBase: new URL('https://akela.in'),
    title: {
        template: '%s | AKELA Eyewear',
        default: 'AKELA — Premium Eyewear India | 3D Trial',
    },
    description: 'Shop premium handcrafted eyewear online. Experience real-time virtual 3D try-on, polarized UV400 sunglasses, and prescription eyeglasses. Free delivery across India.',
    keywords: ['eyewear', 'sunglasses', 'eyeglasses', 'buy glasses online', 'India', 'UV400', 'Virtual Try-On'],
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        siteName: 'AKELA Eyewear',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'AKELA Eyewear' }],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@akelaeyewear',
    },
    robots: {
        index: true,
        follow: true,
    }
}

export default function HomePage() {
    return (
        <div className="bg-white overflow-x-hidden">
            <HeroSection />
            <CategoryStrip />
            <FeaturedFrames />
            <TryOnBanner />
            <BrandStory />
            <NewArrivals />
            <ReviewsSection />
            <InstagramFeed />
            <NewsletterSection />
        </div>
    )
}
