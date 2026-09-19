'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { sound } from '@/lib/sound'
import { useTheme } from '@/components/ThemeProvider'

interface DynamicIslandNavbarProps {
  onToggleInvert?: () => void
  inverted?: boolean
  soundEnabled?: boolean
  onToggleSound?: () => void
}

const telemetryStates = [
  { label: 'VOICE TTFT: 264MS', icon: '●', color: 'text-primary', extra: 'OPUS 48KHZ' },
  { label: 'CRM PIPELINE: SYNCED', icon: '⚡', color: 'text-primary', extra: '99.99% SLA' },
  { label: '6 PODS ONLINE (UTC)', icon: '●', color: 'text-white', extra: 'DOCKER CLUSTER' },
  { label: 'HVAC EMERGENCY TRIAGE: ACTIVE', icon: '■', color: 'text-primary', extra: '11M DISPATCH' },
]

const mainNavLinks = [
  { label: 'SOLUTIONS', href: '/solutions' },
  { label: 'ARCHITECTURE', href: '/architecture' },
  { label: 'VOICE LAB', href: '/voice-agent' },
  { label: 'SECTORS', href: '/sectors' },
  { label: 'METHODOLOGY', href: '/methodology' },
]

export default function DynamicIslandNavbar({
  onToggleInvert,
  inverted = false,
  soundEnabled = true,
  onToggleSound,
}: DynamicIslandNavbarProps) {
  const pathname = usePathname()
  const themeContext = useTheme()
  const isDark = themeContext ? themeContext.isDark : !inverted
  const toggleTheme = themeContext ? themeContext.toggleTheme : (onToggleInvert || (() => {}))

  const [telemetryIdx, setTelemetryIdx] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [timeStr, setTimeStr] = useState('')
  const islandRef = useRef<HTMLDivElement | null>(null)

  // Cycle telemetry
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setTelemetryIdx((prev) => (prev + 1) % telemetryStates.length)
    }, 3500)

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

  const currentTelem = telemetryStates[telemetryIdx]

  const handleIslandToggle = () => {
    if (soundEnabled) sound.click()
    setIsExpanded((prev) => !prev)
  }

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none font-mono text-xs select-none">
      {/* Outer Floating Glassmorphism Pill Container */}
      <nav className={`pointer-events-auto w-full max-w-5xl backdrop-blur-2xl border rounded-full px-4 py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(0,255,136,0.06)] flex items-center justify-between gap-2 sm:gap-4 transition-colors ${
        isDark ? 'bg-black/80 border-white/15' : 'bg-white/85 border-black/15 shadow-xl text-black'
      }`}>
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <Link
            href="/"
            onClick={() => soundEnabled && sound.click()}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="font-pixel text-sm sm:text-base font-extrabold tracking-wider text-white group-hover:text-primary transition-colors">
              AGENCY.CO
            </span>
            <span className="text-[9px] text-muted hidden md:inline border border-[#333333] px-1.5 py-0.5 rounded-full bg-black">
              SYS.01
            </span>
          </Link>
        </div>

        {/* Center: THE DYNAMIC ISLAND */}
        <div ref={islandRef} className="relative flex-1 max-w-md mx-auto flex justify-center">
          {/* Collapsed Dynamic Island Pill */}
          <button
            type="button"
            onClick={handleIslandToggle}
            className={`px-3 sm:px-4 py-1.5 rounded-full border transition-all duration-200 flex items-center justify-between gap-2.5 cursor-pointer max-w-full overflow-hidden ${
              isExpanded
                ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(0,255,136,0.3)]'
                : 'border-white/20 bg-black/80 hover:border-primary/60 hover:bg-black'
            }`}
          >
            {/* Animated Equalizer Waveform */}
            <div className="flex items-end gap-0.5 h-3 flex-shrink-0">
              <span className="w-0.5 h-3 bg-primary animate-pulse" />
              <span className="w-0.5 h-1.5 bg-primary animate-ping" />
              <span className="w-0.5 h-2 bg-primary animate-pulse" />
            </div>

            {/* Cycling Telemetry Message */}
            <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-[11px]">
              <span className={`font-bold ${currentTelem.color}`}>
                {currentTelem.icon}
              </span>
              <span className="text-white font-bold tracking-tight truncate">
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
                      [DYNAMIC ISLAND // SYSTEM TELEMETRY HUD]
                    </span>
                  </div>
                  <span className="text-muted">{timeStr || 'LIVE UTC'}</span>
                </div>

                {/* 4 Telemetry Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 border border-[#222222] bg-[#0c0c0c] rounded-lg">
                    <span className="text-[9px] text-muted block mb-0.5">VOICE TTFT LATENCY</span>
                    <span className="text-primary font-bold">264MS [SUB-300MS]</span>
                  </div>
                  <div className="p-2.5 border border-[#222222] bg-[#0c0c0c] rounded-lg">
                    <span className="text-[9px] text-muted block mb-0.5">WORKFLOW UPTIME</span>
                    <span className="text-white font-bold">99.98% AUDITED</span>
                  </div>
                  <div className="p-2.5 border border-[#222222] bg-[#0c0c0c] rounded-lg">
                    <span className="text-[9px] text-muted block mb-0.5">ACTIVE DISPATCH PODS</span>
                    <span className="text-white font-bold">6 HARDENED PODS</span>
                  </div>
                  <div className="p-2.5 border border-[#222222] bg-[#0c0c0c] rounded-lg">
                    <span className="text-[9px] text-muted block mb-0.5">MONTHLY OPERATIONS</span>
                    <span className="text-primary font-bold">182,490 EXECS</span>
                  </div>
                </div>

                {/* Quick Subpage Routing Matrix */}
                <div>
                  <span className="text-[9px] text-muted uppercase font-bold block mb-2 tracking-wider">
                    DEDICATED MODULE PORTALS:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px]">
                    <Link
                      href="/solutions"
                      onClick={() => setIsExpanded(false)}
                      className="p-2 border border-[#222222] hover:border-primary rounded bg-black text-white hover:text-primary transition-colors flex items-center justify-between"
                    >
                      <span>SOLUTIONS</span>
                      <span className="text-[9px] text-muted">-&gt;</span>
                    </Link>
                    <Link
                      href="/architecture"
                      onClick={() => setIsExpanded(false)}
                      className="p-2 border border-[#222222] hover:border-primary rounded bg-black text-white hover:text-primary transition-colors flex items-center justify-between"
                    >
                      <span>ARCH SPEC</span>
                      <span className="text-[9px] text-muted">-&gt;</span>
                    </Link>
                    <Link
                      href="/voice-agent"
                      onClick={() => setIsExpanded(false)}
                      className="p-2 border border-[#222222] hover:border-primary rounded bg-black text-white hover:text-primary transition-colors flex items-center justify-between"
                    >
                      <span>VOICE LAB</span>
                      <span className="text-[9px] text-muted">-&gt;</span>
                    </Link>
                    <Link
                      href="/sectors"
                      onClick={() => setIsExpanded(false)}
                      className="p-2 border border-[#222222] hover:border-primary rounded bg-black text-white hover:text-primary transition-colors flex items-center justify-between"
                    >
                      <span>SECTORS</span>
                      <span className="text-[9px] text-muted">-&gt;</span>
                    </Link>
                    <Link
                      href="/methodology"
                      onClick={() => setIsExpanded(false)}
                      className="p-2 border border-[#222222] hover:border-primary rounded bg-black text-white hover:text-primary transition-colors flex items-center justify-between"
                    >
                      <span>30-DAY CUT</span>
                      <span className="text-[9px] text-muted">-&gt;</span>
                    </Link>
                    <Link
                      href="/audit"
                      onClick={() => setIsExpanded(false)}
                      className="p-2 border border-primary/40 bg-primary/10 rounded text-primary font-bold flex items-center justify-between"
                    >
                      <span>COMMISSION</span>
                      <span className="text-[9px]">■</span>
                    </Link>
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
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="hidden lg:flex items-center gap-2 text-[11px]">
            {mainNavLinks.slice(0, 4).map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => soundEnabled && sound.click()}
                  className={`px-2.5 py-1 rounded-full transition-all tracking-wider ${
                    isActive
                      ? 'bg-white/15 text-white font-bold'
                      : 'text-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Dark / Light Mode Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            title={`Toggle Theme Mode [^T] (Current: ${isDark ? 'Dark' : 'Light'})`}
            className={`px-2.5 sm:px-3 py-1.5 rounded-full border text-[10px] sm:text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0 select-none ${
              isDark
                ? 'border-white/20 bg-black/60 text-white hover:border-primary hover:text-primary'
                : 'border-black/20 bg-white/90 text-black hover:border-primary hover:text-primary shadow-sm'
            }`}
          >
            <span className="text-primary text-xs">{isDark ? '☾' : '☼'}</span>
            <span className="hidden sm:inline">{isDark ? 'DARK' : 'LIGHT'}</span>
          </button>

          {/* Primary Audit CTA Button */}
          <Link
            href="/audit"
            onClick={() => soundEnabled && sound.click()}
            className="px-3 sm:px-4 py-1.5 bg-white text-black font-bold text-[11px] rounded-full hover:bg-primary transition-colors flex items-center gap-1.5 cursor-pointer shadow-md flex-shrink-0"
          >
            <span>AUDIT</span>
            <span className="text-[8px]">■</span>
            <span>-&gt;</span>
          </Link>
        </div>

      </nav>
    </div>
  )
}
