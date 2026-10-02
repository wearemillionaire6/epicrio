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
        background: '#FFFFFF',
        foreground: '#0A0A0A',
        surface: '#FAFAFA',
        muted: '#A1A1AA',
        border: '#F0F0F0',
      },
      fontFamily: {
        sans: ['Satoshi', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['var(--font-mono)', 'SF Mono', 'Fira Code', 'monospace'],
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'blur-up': {
          from: { opacity: '0', transform: 'translateY(40px)', filter: 'blur(8px)' },
          to: { opacity: '1', transform: 'translateY(0)', filter: 'blur(0px)' },
        },
        'draw-line': {
          from: { width: '0' },
          to: { width: '2rem' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'blur-up': 'blur-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'draw-line': 'draw-line 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
      },
    },
  },
  plugins: [],
}

export default config
