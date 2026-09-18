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
        primary: '#00FF88', // Terminal mint/emerald accent
        muted: '#777777',
        borderMuted: '#222222',
      },
      fontFamily: {
        pixel: ['Doto', 'Silkscreen', 'VT323', 'monospace'],
        mono: ['Space Mono', 'DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
