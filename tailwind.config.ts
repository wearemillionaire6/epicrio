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
        background: '#070B14', // Deep obsidian canvas
        surface: '#0D1424', // Technical dark slate
        surfaceElevated: '#131C31',
        primary: '#10B981', // Crisp emerald
        primaryHover: '#059669',
        borderSoft: 'rgba(255, 255, 255, 0.08)',
        borderFirm: 'rgba(255, 255, 255, 0.16)',
        muted: '#94A3B8',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Bricolage Grotesque', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'Manrope', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'DM Mono', 'Menlo', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'data-flow': 'dataFlow 2.4s linear infinite',
      },
      keyframes: {
        dataFlow: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '30%': { opacity: '1' },
          '70%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
