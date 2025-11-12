import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#800020',
          light: '#A0002F',
          dark: '#600018',
        },
        'light-blue': {
          DEFAULT: '#ADD8E6',
          light: '#D4EBEF',
          dark: '#87CEEB',
        },
        'off-white': {
          DEFAULT: '#FAF9F6',
          dark: '#F5F5F0',
        },
        'gold-yellow': {
          DEFAULT: '#FFD700',
          light: '#FFED4E',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
