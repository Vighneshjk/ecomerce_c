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
                    50: '#FFFEF0',
                    100: '#FFFBD9',
                    200: '#FFF3A3',
                    300: '#FFEB6D',
                    400: '#FFE137',
                    500: '#FFD700',
                    600: '#CCAC00',
                    700: '#998100',
                    800: '#665600',
                    900: '#332B00',
                    950: '#1A1600',
                },
                charcoal: {
                    50: '#F2F2F2',
                    100: '#E6E6E6',
                    200: '#CCCCCC',
                    300: '#B3B3B3',
                    400: '#999999',
                    500: '#808080',
                    600: '#666666',
                    700: '#4D4D4D',
                    800: '#333333',
                    900: '#1A1A1A',
                    950: '#0D0D0D',
                },
            },
            fontFamily: {
                display: ['var(--font-cormorant)', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;
