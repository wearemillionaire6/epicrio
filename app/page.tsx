'use client'

import { useState, useEffect } from 'react'
import PixelHeader from '@/components/PixelHeader'
import Biography from '@/components/Biography'
import ProjectsArchitecture from '@/components/ProjectsArchitecture'
import ServicesList from '@/components/ServicesList'
import VoiceTerminal from '@/components/VoiceTerminal'
import ProcessMethodology from '@/components/ProcessMethodology'
import Sectors from '@/components/Sectors'
import ContactTerminal from '@/components/ContactTerminal'
import TerminalFooter from '@/components/TerminalFooter'
import CustomCursor from '@/components/CustomCursor'
import { sound } from '@/lib/sound'

export default function Home() {
  const [inverted, setInverted] = useState(false)

  const toggleInvert = () => {
    sound.beep()
    setInverted((prev) => !prev)
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
        sound.click()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (key === 'b') {
        sound.click()
        document.getElementById('biography')?.scrollIntoView({ behavior: 'smooth' })
      } else if (key === 'p' || key === 'a') {
        sound.click()
        document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' })
      } else if (key === 's') {
        sound.click()
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
      } else if (key === 'v') {
        sound.click()
        document.getElementById('voice')?.scrollIntoView({ behavior: 'smooth' })
      } else if (key === 'c') {
        sound.click()
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      } else if (key === 'i') {
        toggleInvert()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div
      id="home"
      className={`min-h-screen transition-colors duration-200 selection:bg-[#00FF88] selection:text-black ${
        inverted ? 'inverted bg-white text-black' : 'bg-black text-white'
      }`}
    >
      <CustomCursor />

      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        {/* Top Pixel Header & Key Navigation */}
        <PixelHeader onToggleInvert={toggleInvert} inverted={inverted} />

        {/* Columnar Biography Manifesto */}
        <Biography />

        {/* Projects / System Architecture */}
        <ProjectsArchitecture />

        {/* Services Staircase Tree */}
        <ServicesList />

        {/* Interactive Voice Receptionist Station */}
        <VoiceTerminal />

        {/* 4-Stage Sprint Process */}
        <ProcessMethodology />

        {/* Sector Ledgers */}
        <Sectors />

        {/* Intake Protocol Contact Form */}
        <ContactTerminal />

        {/* Bottom Keycaps Footer */}
        <TerminalFooter onToggleInvert={toggleInvert} />
      </div>
    </div>
  )
}
