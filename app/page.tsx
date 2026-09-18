'use client'

import { useState, useEffect } from 'react'
import TopNavbar from '@/components/TopNavbar'
import LiveTelemetryTicker from '@/components/LiveTelemetryTicker'
import PixelHeader from '@/components/PixelHeader'
import Biography from '@/components/Biography'
import MetricsCounter from '@/components/MetricsCounter'
import ProjectsArchitecture from '@/components/ProjectsArchitecture'
import ServicesList from '@/components/ServicesList'
import DataFlowVisualizer from '@/components/DataFlowVisualizer'
import VoiceTerminal from '@/components/VoiceTerminal'
import ProcessMethodology from '@/components/ProcessMethodology'
import Sectors from '@/components/Sectors'
import TechStackMatrix from '@/components/TechStackMatrix'
import ContactTerminal from '@/components/ContactTerminal'
import TerminalFooter from '@/components/TerminalFooter'
import CustomCursor from '@/components/CustomCursor'
import { sound } from '@/lib/sound'

export default function Home() {
  const [inverted, setInverted] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const toggleInvert = () => {
    if (soundEnabled) sound.beep()
    setInverted((prev) => !prev)
  }

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
      } else if (key === 'b') {
        if (soundEnabled) sound.click()
        document.getElementById('biography')?.scrollIntoView({ behavior: 'smooth' })
      } else if (key === 'p' || key === 'a') {
        if (soundEnabled) sound.click()
        document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' })
      } else if (key === 's') {
        if (soundEnabled) sound.click()
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
      } else if (key === 'v') {
        if (soundEnabled) sound.click()
        document.getElementById('voice')?.scrollIntoView({ behavior: 'smooth' })
      } else if (key === 'c') {
        if (soundEnabled) sound.click()
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      } else if (key === 'i') {
        toggleInvert()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [soundEnabled, inverted])

  return (
    <div
      id="home"
      className={`min-h-screen transition-colors duration-200 selection:bg-[#00FF88] selection:text-black ${
        inverted ? 'inverted bg-white text-black' : 'bg-black text-white'
      }`}
    >
      <CustomCursor />

      {/* Persistent Sticky Top Navigation Menu */}
      <TopNavbar
        onToggleInvert={toggleInvert}
        inverted={inverted}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      {/* Spacing compensation for sticky top navbar */}
      <div className="pt-12">
        {/* Real-time Streaming Telemetry Ticker */}
        <LiveTelemetryTicker />

        <main className="max-w-6xl mx-auto px-4 sm:px-8">
          {/* Top Pixel Header & Key Navigation */}
          <PixelHeader onToggleInvert={toggleInvert} inverted={inverted} />

          {/* Columnar Biography Manifesto */}
          <Biography />

          {/* Viewport-Animated Production Metrics & SLAs */}
          <MetricsCounter />

          {/* Projects / System Architecture Ledgers */}
          <ProjectsArchitecture />

          {/* Aligned Stepped Services Tree + Live Telemetry Console */}
          <ServicesList />

          {/* Interactive System Fabric Node Visualizer */}
          <DataFlowVisualizer />

          {/* Interactive Voice Receptionist Telephony Lab */}
          <VoiceTerminal />

          {/* 4-Stage Sprint Methodology */}
          <ProcessMethodology />

          {/* Interactive Sector Intelligence Command Center + ROI Calculator */}
          <Sectors />

          {/* Filterable Enterprise Tech Stack Matrix */}
          <TechStackMatrix />

          {/* Terminal Intake Application Form */}
          <ContactTerminal />

          {/* Keycaps Footer */}
          <TerminalFooter onToggleInvert={toggleInvert} />
        </main>
      </div>
    </div>
  )
}
