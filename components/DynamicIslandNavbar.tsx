'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { sound } from '@/lib/sound'
import { useTheme } from '@/components/ThemeProvider'

interface DynamicIslandNavbarProps {
  onToggleInvert?: () => void
  inverted?: boolean
  soundEnabled?: boolean
  onToggleSound?: () => void
}

const outboundTelemetryStates = [
  { label: 'OUTBOUND ENGINE: ACTIVE', icon: '●', color: 'text-primary', extra: '3,000 EMAILS/MO' },
  { label: 'INBOX PLACEMENT: 98.4%', icon: '⚡', color: 'text-primary', extra: 'PRIMARY INBOX' },
  { label: 'BOUNCE RATE: 1.1%', icon: '■', color: 'text-primary', extra: 'SPF/DKIM/DMARC' },
  { label: 'ACTIVE PILOTS: 4 LIVE', icon: '●', color: 'text-primary', extra: '7-DAY TRIAL' },
]

const mainNavLinks = [
  { label: 'INFRASTRUCTURE', href: '#infrastructure' },
  { label: 'SERVICES', href: '#services' },
  { label: 'CALCULATOR', href: '#calculator' },
  { label: 'METHODOLOGY', href: '#methodology' },
  { label: 'PRICING', href: '#pricing' },
]

export default function DynamicIslandNavbar({
  onToggleInvert,
  inverted = false,
  soundEnabled = true,
  onToggleSound,
}: DynamicIslandNavbarProps) {
  const themeContext = useTheme()
  const isDark = themeContext ? themeContext.isDark : !inverted
  const toggleTheme = themeContext ? themeContext.toggleTheme : (onToggleInvert || (() => {}))

  const [telemetryIdx, setTelemetryIdx] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [timeStr, setTimeStr] = useState('')
  const islandRef = useRef<HTMLDivElement | null>(null)

  // Cycle outbound status
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setTelemetryIdx((prev) => (prev + 1) % outboundTelemetryStates.length)
    }, 4000)

    const clockInterval = setInterval(() => {
      const now = new Date()
      setTimeStr(now.toISOString().substring(11, 19) + ' UTC')
    }, 1000)

    return () => {
      clearInterval(cycleInterval)
      clearInterval(clockInterval)
    }
  }, [])

  // Close island on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (islandRef.current && !islandRef.current.contains(e.target as Node)) {
        setIsExpanded(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentTelem = outboundTelemetryStates[telemetryIdx]

  const handleIslandToggle = () => {
    if (soundEnabled) sound.click()
    setIsExpanded((prev) => !prev)
  }

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none font-mono text-xs select-none">
      {/* Outer Floating Glassmorphism Pill Container */}
      <nav className={`pointer-events-auto w-full max-w-6xl backdrop-blur-2xl border rounded-full px-3 sm:px-5 py-2 sm:py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(0,255,136,0.06)] flex items-center justify-between gap-2 sm:gap-4 transition-colors ${
        isDark ? 'bg-black/85 border-white/15 text-white' : 'bg-white/95 border-black/15 shadow-xl text-black'
      }`}>
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          <a
            href="#home"
            onClick={() => soundEnabled && sound.click()}
            className="flex items-center gap-1.5 sm:gap-2 group cursor-pointer"
          >
            <span className={`font-pixel text-xs sm:text-sm md:text-base font-extrabold tracking-wider group-hover:text-primary transition-colors ${
              isDark ? 'text-white' : 'text-black'
            }`}>
              AGENCY.CO
            </span>
            <span className={`text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full border hidden sm:inline ${
              isDark ? 'text-muted border-[#333333] bg-black' : 'text-zinc-600 border-zinc-300 bg-zinc-100'
            }`}>
              OUTBOUND
            </span>
          </a>
        </div>

        {/* Center: THE DYNAMIC ISLAND */}
        <div ref={islandRef} className="relative flex-1 max-w-[210px] sm:max-w-xs md:max-w-sm mx-auto flex justify-center min-w-0">
          {/* Collapsed Dynamic Island Pill */}
          <button
            type="button"
            onClick={handleIslandToggle}
            className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border transition-all duration-200 flex items-center justify-between gap-1.5 sm:gap-2.5 cursor-pointer w-full overflow-hidden ${
              isExpanded
                ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(0,255,136,0.3)]'
                : isDark
                ? 'border-white/20 bg-black/80 hover:border-primary/60 hover:bg-black'
                : 'border-zinc-300 bg-zinc-100 hover:border-primary hover:bg-white text-black'
            }`}
          >
            {/* Animated Equalizer Waveform */}
            <div className="flex items-end gap-0.5 h-3 flex-shrink-0">
              <span className="w-0.5 h-3 bg-primary animate-pulse" />
              <span className="w-0.5 h-1.5 bg-primary animate-ping" />
              <span className="w-0.5 h-2 bg-primary animate-pulse" />
            </div>

            {/* Cycling Telemetry Message */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden whitespace-nowrap text-[10px] sm:text-[11px]">
              <span className={`font-bold ${currentTelem.color}`}>
                {currentTelem.icon}
              </span>
              <span className={`font-bold tracking-tight truncate ${
                isDark ? 'text-white' : 'text-black'
              }`}>
                {currentTelem.label}
              </span>
              <span className="text-[9px] text-muted hidden xl:inline">
                [{currentTelem.extra}]
              </span>
            </div>

            {/* Dropdown Chevron Indicator */}
            <span
              className={`text-[9px] text-primary transition-transform duration-200 flex-shrink-0 ${
                isExpanded ? 'rotate-180' : 'rotate-0'
              }`}
            >
              ▼
            </span>
          </button>

          {/* Expanded Dynamic Island HUD Dropdown */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute top-12 left-1/2 -translate-x-1/2 w-[92vw] sm:w-[480px] bg-black/95 backdrop-blur-3xl border border-primary/50 rounded-2xl p-5 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(0,255,136,0.18)] z-50 text-white font-mono space-y-4"
              >
                {/* HUD Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#222222] text-[10px]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
                    <span className="text-primary font-bold tracking-wider">
                      [OUTBOUND INFRASTRUCTURE // LIVE TELEMETRY]
                    </span>
                  </div>
                  <span className="text-muted">{timeStr || 'LIVE UTC'}</span>
                </div>

                {/* 4 Outbound Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 border border-[#222222] bg-[#0c0c0c] rounded-lg">
                    <span className="text-[9px] text-muted block mb-0.5">INBOX PLACEMENT</span>
                    <span className="text-primary font-bold">98.4% PRIMARY</span>
                  </div>
                  <div className="p-2.5 border border-[#222222] bg-[#0c0c0c] rounded-lg">
                    <span className="text-[9px] text-muted block mb-0.5">BOUNCE THRESHOLD</span>
                    <span className="text-white font-bold">&lt; 1.5% GUARANTEED</span>
                  </div>
                  <div className="p-2.5 border border-[#222222] bg-[#0c0c0c] rounded-lg">
                    <span className="text-[9px] text-muted block mb-0.5">ACTIVE MAILBOX POOL</span>
                    <span className="text-white font-bold">45 WARMD DOMAINS</span>
                  </div>
                  <div className="p-2.5 border border-[#222222] bg-[#0c0c0c] rounded-lg">
                    <span className="text-[9px] text-muted block mb-0.5">SIGNAL REPLY RATE</span>
                    <span className="text-primary font-bold">15 - 25% RANGE</span>
                  </div>
                </div>

                {/* Quick Section Navigation Matrix */}
                <div>
                  <span className="text-[9px] text-muted uppercase font-bold block mb-2 tracking-wider">
                    SYSTEM MODULES:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px]">
                    <a
                      href="#infrastructure"
                      onClick={() => setIsExpanded(false)}
                      className="p-2 border border-[#222222] hover:border-primary rounded bg-black text-white hover:text-primary transition-colors flex items-center justify-between"
                    >
                      <span>DOMAINS & DNS</span>
                      <span className="text-[9px] text-muted">-&gt;</span>
                    </a>
                    <a
                      href="#services"
                      onClick={() => setIsExpanded(false)}
                      className="p-2 border border-[#222222] hover:border-primary rounded bg-black text-white hover:text-primary transition-colors flex items-center justify-between"
                    >
                      <span>5 PILLARS</span>
                      <span className="text-[9px] text-muted">-&gt;</span>
                    </a>
                    <a
                      href="#calculator"
                      onClick={() => setIsExpanded(false)}
                      className="p-2 border border-[#222222] hover:border-primary rounded bg-black text-white hover:text-primary transition-colors flex items-center justify-between"
                    >
                      <span>ROI SIMULATOR</span>
                      <span className="text-[9px] text-muted">-&gt;</span>
                    </a>
                    <a
                      href="#methodology"
                      onClick={() => setIsExpanded(false)}
                      className="p-2 border border-[#222222] hover:border-primary rounded bg-black text-white hover:text-primary transition-colors flex items-center justify-between"
                    >
                      <span>30-DAY CUT</span>
                      <span className="text-[9px] text-muted">-&gt;</span>
                    </a>
                    <a
                      href="#pricing"
                      onClick={() => setIsExpanded(false)}
                      className="p-2 border border-[#222222] hover:border-primary rounded bg-black text-white hover:text-primary transition-colors flex items-center justify-between"
                    >
                      <span>PACKAGES</span>
                      <span className="text-[9px] text-muted">-&gt;</span>
                    </a>
                    <a
                      href="#pilot"
                      onClick={() => setIsExpanded(false)}
                      className="p-2 border border-primary/40 bg-primary/10 rounded text-primary font-bold flex items-center justify-between"
                    >
                      <span>7-DAY PILOT</span>
                      <span className="text-[9px]">■</span>
                    </a>
                  </div>
                </div>

                {/* Quick Controls Bar */}
                <div className="pt-3 border-t border-[#222222] flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-2">
                    {onToggleSound && (
                      <button
                        type="button"
                        onClick={() => {
                          onToggleSound()
                          if (!soundEnabled) sound.click()
                        }}
                        className={`px-2 py-1 border rounded text-[10px] cursor-pointer ${
                          soundEnabled
                            ? 'border-primary text-primary bg-primary/10'
                            : 'border-[#333333] text-muted'
                        }`}
                      >
                        SOUND:{soundEnabled ? 'ON' : 'OFF'}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="px-2.5 py-1 border border-[#333333] hover:border-primary rounded text-[10px] text-white hover:text-primary transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="text-primary font-bold">{isDark ? '☾' : '☼'}</span>
                      <span>MODE: {isDark ? 'DARK' : 'LIGHT'} [^T]</span>
                    </button>
                  </div>

                  <span className="text-[9px] text-muted">
                    CLICK OUTSIDE TO CLOSE
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Multi-Page Links, Theme Toggle & Action CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          <div className="hidden xl:flex items-center gap-1.5 text-[10px]">
            {mainNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => soundEnabled && sound.click()}
                className={`px-2 py-0.5 rounded-full transition-all tracking-wider ${
                  isDark
                    ? 'text-muted hover:text-white hover:bg-white/5'
                    : 'text-zinc-600 hover:text-black hover:bg-black/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Dark / Light Mode Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            title={`Toggle Theme Mode [^T] (Current: ${isDark ? 'Dark' : 'Light'})`}
            className={`px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full border text-[9px] sm:text-[10px] font-bold transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer flex-shrink-0 select-none ${
              isDark
                ? 'border-white/20 bg-black/60 text-white hover:border-primary hover:text-primary'
                : 'border-zinc-300 bg-zinc-100 text-zinc-900 hover:border-primary hover:text-primary shadow-sm'
            }`}
          >
            <span className="text-primary text-[11px]">{isDark ? '☾' : '☼'}</span>
            <span className="hidden sm:inline">{isDark ? 'DARK' : 'LIGHT'}</span>
          </button>

          {/* Primary Pilot CTA Button */}
          <a
            href="#pilot"
            onClick={() => soundEnabled && sound.click()}
            className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 font-bold text-[10px] sm:text-[11px] rounded-full transition-colors flex items-center gap-1 sm:gap-1.5 cursor-pointer shadow-md flex-shrink-0 ${
              isDark
                ? 'bg-white text-black hover:bg-primary'
                : 'bg-black text-white hover:bg-primary hover:text-black'
            }`}
          >
            <span>7-DAY PILOT</span>
            <span className="text-[8px]">■</span>
            <span>-&gt;</span>
          </a>
        </div>

      </nav>
    </div>
  )
}
