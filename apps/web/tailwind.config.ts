import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#fdfaf5',
                    100: '#f5f0e8',
                    200: '#e8dcc8',
                    300: '#d4c4a0',
                    400: '#c9a96e',
                    500: '#b8924f',
                    600: '#9a7840',
                    700: '#7a5f32',
                    800: '#5c4726',
                    900: '#3d2f1a',
                },
                charcoal: {
                    50: '#f5f5f5',
                    100: '#e8e8e8',
                    200: '#d1d1d1',
                    300: '#aaaaaa',
                    400: '#888888',
                    500: '#555555',
                    600: '#333333',
                    700: '#222222',
                    800: '#141414',
                    900: '#0a0a0a',
                },
                accent: {
                    rose: '#c98a8a',
                    sage: '#8aac96',
                    sky: '#8aacc9',
                },
            },
            fontFamily: {
                display: ['var(--font-display)', 'serif'],
                sans: ['var(--font-sans)', 'sans-serif'],
                mono: ['var(--font-mono)', 'monospace'],
            },
            spacing: {
                18: '4.5rem',
                22: '5.5rem',
                26: '6.5rem',
            },
            animation: {
                'fade-in': 'fadeIn 0.4s ease forwards',
                'slide-up': 'slideUp 0.5s ease forwards',
                'shimmer': 'shimmer 1.5s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                shimmer: {
                    '100%': { transform: 'translateX(100%)' },
                },
            },
        },
    },
    plugins: [],
};
export default config;
