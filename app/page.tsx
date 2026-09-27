'use client'

import { useState, useEffect } from 'react'
import DynamicIslandNavbar from '@/components/DynamicIslandNavbar'
import PixelHeader from '@/components/PixelHeader'
import FreeTrialPilot from '@/components/FreeTrialPilot'
import ServicesList from '@/components/ServicesList'
import ProjectsArchitecture from '@/components/ProjectsArchitecture'
import Sectors from '@/components/Sectors'
import ProcessMethodology from '@/components/ProcessMethodology'
import PricingPackages from '@/components/PricingPackages'
import Biography from '@/components/Biography'
import ContactTerminal from '@/components/ContactTerminal'
import TerminalFooter from '@/components/TerminalFooter'
import MovablePixelBackground from '@/components/MovablePixelBackground'
import { sound } from '@/lib/sound'
import { useTheme } from '@/components/ThemeProvider'

export default function Home() {
  const { isDark, toggleTheme } = useTheme()
  const [soundEnabled, setSoundEnabled] = useState(true)

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev)
  }

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when typing inside input / textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return
      }

      const key = e.key.toLowerCase()

      if (key === 'h') {
        if (soundEnabled) sound.click()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (key === 'i') {
        if (soundEnabled) sound.click()
        document.getElementById('infrastructure')?.scrollIntoView({ behavior: 'smooth' })
      } else if (key === 's') {
        if (soundEnabled) sound.click()
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
      } else if (key === 'c') {
        if (soundEnabled) sound.click()
        document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })
      } else if (key === 'm') {
        if (soundEnabled) sound.click()
        document.getElementById('methodology')?.scrollIntoView({ behavior: 'smooth' })
      } else if (key === 'p') {
        if (soundEnabled) sound.click()
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
      } else if (key === 'l' || key === 't') {
        if (soundEnabled) sound.click()
        document.getElementById('pilot')?.scrollIntoView({ behavior: 'smooth' })
      } else if (key === 'a') {
        if (soundEnabled) sound.click()
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [soundEnabled])

  return (
    <div
      id="home"
      className={`min-h-screen selection:bg-primary selection:text-black font-mono uppercase ${
        !isDark ? 'inverted bg-white text-black' : 'bg-black text-white'
      }`}
    >
      {/* Ambient Moving Retro Pixel Background Theme */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <MovablePixelBackground opacity={!isDark ? 0.12 : 0.22} inverted={!isDark} />
      </div>

      {/* Floating Glassmorphic Navigation with Dynamic Island in the Middle */}
      <DynamicIslandNavbar
        onToggleInvert={toggleTheme}
        inverted={!isDark}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      {/* Spacing compensation for floating dynamic island navbar */}
      <div className="pt-20 relative z-10">
        <main className="max-w-7xl w-full mx-auto px-4 sm:px-8 xl:px-12 relative z-10">
          {/* Top Pixel Header & Key Navigation */}
          <PixelHeader onToggleInvert={toggleTheme} inverted={!isDark} />

          {/* 1. Free 7-Day Outbound Pilot ("Show, Don't Tell" Proof-of-Fit) */}
          <FreeTrialPilot />

          {/* 2. 5 Productized Outbound Pillars */}
          <ServicesList />

          {/* 3. Outbound Infrastructure & Humanized Copy Lab */}
          <ProjectsArchitecture />

          {/* 4. Target ICPs & Interactive Outbound Pipeline Calculator */}
          <Sectors />

          {/* 5. 30-Day Onboarding & 4-Week Warmup Methodology */}
          <ProcessMethodology />

          {/* 6. Transparent Productized Pricing Tiers & Setup Fee Math */}
          <PricingPackages />

          {/* 7. Outbound Manifesto & Systems Architect Ledger */}
          <Biography />

          {/* 8. Outbound Commission & Discovery Application Terminal */}
          <ContactTerminal />

          {/* 9. Minimalist Keycaps Terminal Footer */}
          <TerminalFooter onToggleInvert={toggleTheme} />
        </main>
      </div>
    </div>
  )
}
