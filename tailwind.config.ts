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
        background: '#000000',
        foreground: '#FFFFFF',
        surface: '#0A0A0A',
        primary: '#00FF88', // Terminal cyber green accent
        muted: '#777777',
        borderMuted: '#222222',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'var(--font-outfit)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-outfit)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        pixel: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
