import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B132B', // Deep Navy
        surface: '#111827', // Dark Slate
        primary: '#10B981', // Emerald Accent
        primaryHover: '#059669',
        borderGlow: 'rgba(16, 185, 129, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-panel': 'linear-gradient(180deg, rgba(17, 24, 39, 0.7) 0%, rgba(11, 19, 43, 0.9) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'data-flow': 'dataFlow 2s linear infinite',
      },
      keyframes: {
        dataFlow: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
export default config
