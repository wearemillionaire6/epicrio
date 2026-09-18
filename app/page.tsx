'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import DynamicIslandNavbar from '@/components/DynamicIslandNavbar'
import LiveTelemetryTicker from '@/components/LiveTelemetryTicker'
import PixelHeader from '@/components/PixelHeader'
import Biography from '@/components/Biography'
import MetricsCounter from '@/components/MetricsCounter'
import InteractiveCliSandbox from '@/components/InteractiveCliSandbox'
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
import PacmanNetflixLoader from '@/components/PacmanNetflixLoader'
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
      className={`min-h-screen transition-colors duration-200 selection:bg-[#FF3333] selection:text-black font-mono uppercase ${
        inverted ? 'inverted bg-white text-black' : 'bg-black text-white'
      }`}
    >
      <CustomCursor />
      <PacmanNetflixLoader />

      {/* Floating Luxury Glassmorphic Navigation with Dynamic Island in the Middle */}
      <DynamicIslandNavbar
        onToggleInvert={toggleInvert}
        inverted={inverted}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      {/* Spacing compensation for floating dynamic island navbar */}
      <div className="pt-20">
        {/* Real-time Streaming Telemetry Ticker */}
        <LiveTelemetryTicker />

        <main className="max-w-6xl mx-auto px-4 sm:px-8">
          {/* Top Pixel Header & Key Navigation */}
          <PixelHeader onToggleInvert={toggleInvert} inverted={inverted} />

          {/* Multi-Page Portals Gateway Strip */}
          <div className="my-8 p-4 border border-white/20 bg-[#070707]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#222222] text-[10px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-none animate-ping" />
                <span className="text-primary font-bold tracking-wider">
                  [MULTI-PAGE ARCHITECTURE SYSTEM // DEDICATED MODULE PORTALS]
                </span>
              </div>
              <span className="text-muted hidden sm:inline">6 DEPLOYED PRODUCTION ROUTES</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
              <Link
                href="/solutions"
                className="p-2.5 border border-[#222222] bg-black hover:border-primary text-white hover:text-primary transition-all flex flex-col justify-between min-h-[60px]"
              >
                <span className="text-[9px] text-primary font-bold">[01]</span>
                <span className="font-bold text-[11px] truncate">SOLUTIONS</span>
              </Link>
              <Link
                href="/architecture"
                className="p-2.5 border border-[#222222] bg-black hover:border-primary text-white hover:text-primary transition-all flex flex-col justify-between min-h-[60px]"
              >
                <span className="text-[9px] text-primary font-bold">[02]</span>
                <span className="font-bold text-[11px] truncate">SYSTEM FABRIC</span>
              </Link>
              <Link
                href="/voice-agent"
                className="p-2.5 border border-[#222222] bg-black hover:border-primary text-white hover:text-primary transition-all flex flex-col justify-between min-h-[60px]"
              >
                <span className="text-[9px] text-primary font-bold">[03]</span>
                <span className="font-bold text-[11px] truncate">VOICE LAB</span>
              </Link>
              <Link
                href="/sectors"
                className="p-2.5 border border-[#222222] bg-black hover:border-primary text-white hover:text-primary transition-all flex flex-col justify-between min-h-[60px]"
              >
                <span className="text-[9px] text-primary font-bold">[04]</span>
                <span className="font-bold text-[11px] truncate">SECTORS & ROI</span>
              </Link>
              <Link
                href="/methodology"
                className="p-2.5 border border-[#222222] bg-black hover:border-primary text-white hover:text-primary transition-all flex flex-col justify-between min-h-[60px]"
              >
                <span className="text-[9px] text-primary font-bold">[05]</span>
                <span className="font-bold text-[11px] truncate">30-DAY CUTOVER</span>
              </Link>
              <Link
                href="/audit"
                className="p-2.5 border border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-black transition-all flex flex-col justify-between min-h-[60px] font-bold"
              >
                <span className="text-[9px]">[06]</span>
                <span className="text-[11px] truncate">COMMISSION ■</span>
              </Link>
            </div>
          </div>

          {/* Columnar Biography Manifesto */}
          <Biography />

          {/* Viewport-Animated Production Metrics & SLAs */}
          <MetricsCounter />

          {/* NEW DISTINCT SECTION: Interactive Live CLI Sandbox & Command Deck */}
          <InteractiveCliSandbox />

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
