'use client'

import { useState } from 'react'
import Link from 'next/link'
import CustomCursor from '@/components/CustomCursor'
import DynamicIslandNavbar from '@/components/DynamicIslandNavbar'
import Sectors from '@/components/Sectors'
import TerminalFooter from '@/components/TerminalFooter'
import { sound } from '@/lib/sound'

export default function SectorsPage() {
  const [inverted, setInverted] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const toggleInvert = () => {
    if (soundEnabled) sound.beep()
    setInverted((prev) => !prev)
  }

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-200 selection:bg-[#00FF88] selection:text-black font-mono uppercase ${
        inverted ? 'inverted bg-white text-black' : 'bg-black text-white'
      }`}
    >
      <CustomCursor />

      {/* Floating Glassmorphic Dynamic Island Navigation */}
      <DynamicIslandNavbar
        onToggleInvert={toggleInvert}
        inverted={inverted}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      <div className="pt-24 max-w-6xl mx-auto px-4 sm:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-muted mb-8 border-b border-[#222222] pb-3">
          <Link href="/" className="hover:text-primary transition-colors">
            HOME
          </Link>
          <span>/</span>
          <span className="text-white font-bold">SECTORS &amp; VERTICAL BLUEPRINTS</span>
        </div>

        {/* Sectors Command Hub Showcase */}
        <Sectors />

        {/* Multi-Page Navigation Jump Strip */}
        <div className="py-12 border-b border-[#222222] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <Link
            href="/solutions"
            className="p-4 border border-[#222222] bg-[#070707] hover:border-primary transition-colors flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] text-primary block">MODULE 01</span>
              <span className="font-bold text-white">6-PILLAR SOLUTIONS MATRIX</span>
            </div>
            <span className="text-primary">-&gt;</span>
          </Link>

          <Link
            href="/voice-agent"
            className="p-4 border border-[#222222] bg-[#070707] hover:border-primary transition-colors flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] text-primary block">MODULE 03</span>
              <span className="font-bold text-white">VOICE TELEPHONY LAB</span>
            </div>
            <span className="text-primary">-&gt;</span>
          </Link>

          <Link
            href="/audit"
            className="p-4 border border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-black transition-colors flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] block font-bold">MODULE 06</span>
              <span className="font-bold text-sm">COMMISSION SYSTEM AUDIT</span>
            </div>
            <span className="text-sm">■</span>
          </Link>
        </div>

        {/* Footer */}
        <TerminalFooter onToggleInvert={toggleInvert} />
      </div>
    </div>
  )
}
