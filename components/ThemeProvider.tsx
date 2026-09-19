'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { sound } from '@/lib/sound'

export type ThemeMode = 'dark' | 'light'

interface ThemeContextType {
  theme: ThemeMode
  isDark: boolean
  toggleTheme: () => void
  setTheme: (t: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  isDark: true,
  toggleTheme: () => {},
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('dark')
  const [mounted, setMounted] = useState(false)

  const applyThemeToDOM = (t: ThemeMode) => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    const body = document.body

    if (t === 'light') {
      root.classList.add('light', 'inverted')
      root.classList.remove('dark')
      if (body) {
        body.classList.add('light', 'inverted')
        body.classList.remove('dark')
      }
      root.style.colorScheme = 'light'
    } else {
      root.classList.add('dark')
      root.classList.remove('light', 'inverted')
      if (body) {
        body.classList.add('dark')
        body.classList.remove('light', 'inverted')
      }
      root.style.colorScheme = 'dark'
    }
  }

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('agency_co_theme') as ThemeMode | null
    if (saved === 'light' || saved === 'dark') {
      setThemeState(saved)
      applyThemeToDOM(saved)
    } else {
      applyThemeToDOM('dark')
    }
  }, [])

  const setTheme = (t: ThemeMode) => {
    setThemeState(t)
    try {
      localStorage.setItem('agency_co_theme', t)
    } catch {
      // ignore
    }
    applyThemeToDOM(t)
  }

  const toggleTheme = () => {
    const next: ThemeMode = theme === 'dark' ? 'light' : 'dark'
    try {
      sound.beep()
    } catch {
      // ignore
    }
    setTheme(next)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return
      }
      if (e.key.toLowerCase() === 't' || e.key.toLowerCase() === 'i') {
        toggleTheme()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === 'dark',
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
