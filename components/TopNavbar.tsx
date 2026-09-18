'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { sound } from '@/lib/sound'

interface TopNavbarProps {
  onToggleInvert: () => void
  inverted: boolean
  soundEnabled: boolean
  onToggleSound: () => void
}

export default function TopNavbar({
  onToggleInvert,
  inverted,
  soundEnabled,
  onToggleSound,
}: TopNavbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [timeStr, setTimeStr] = useState('')
  const [latency, setLatency] = useState(14)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100)
      }
    }

    const updateClock = () => {
      const now = new Date()
      setTimeStr(
        now.toISOString().substring(11, 19) + ' UTC'
      )
    }

    updateClock()
    const clockInterval = setInterval(updateClock, 1000)

    // Simulate minor realistic latency jitter
    const latencyInterval = setInterval(() => {
      setLatency(Math.floor(12 + Math.random() * 6))
    }, 4000)

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(clockInterval)
      clearInterval(latencyInterval)
    }
  }, [])

  const navLinks = [
    { label: 'ARCH', href: '#architecture', keyNum: '01' },
    { label: 'SERVICES', href: '#services', keyNum: '02' },
    { label: 'SECTORS', href: '#sectors', keyNum: '03' },
    { label: 'VOICE LAB', href: '#voice', keyNum: '04' },
    { label: 'PROCESS', href: '#process', keyNum: '05' },
    { label: 'AUDIT', href: '#contact', keyNum: '06' },
  ]

  const subpages = [
    { label: 'ARCH SPEC', href: '/architecture' },
    { label: 'SOLUTIONS', href: '/solutions' },
    { label: 'VOICE STUDIO', href: '/voice-agent' },
    { label: 'METHODOLOGY', href: '/methodology' },
    { label: 'AUDIT INTAKE', href: '/audit' },
  ]

  const handleNavClick = (href: string) => {
    if (soundEnabled) sound.click()
    setIsMobileMenuOpen(false)
    if (href.startsWith('#')) {
      const elem = document.querySelector(href)
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#222222] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between text-xs font-mono">
        {/* Left: Brand + Status */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            onClick={() => soundEnabled && sound.click()}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="font-pixel text-sm sm:text-base font-extrabold tracking-wider text-white group-hover:text-primary transition-colors">
              AGENCY.CO
            </span>
            <span className="text-[10px] text-muted hidden sm:inline">
              // SYS.01
            </span>
          </Link>

          <div className="h-3 w-[1px] bg-[#333333] hidden sm:block" />

          {/* Live Pulse LED */}
          <div className="hidden md:flex items-center gap-2 text-[11px] text-muted">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-primary font-bold text-[10px] tracking-wide">
              ONLINE
            </span>
            <span className="text-[#555555]">|</span>
            <span className="text-[#888888] font-mono text-[10px]">{timeStr || 'LIVE UTC'}</span>
            <span className="text-[#555555]">|</span>
            <span className="text-[10px] text-muted">PING: {latency}MS</span>
          </div>
        </div>

        {/* Center: Desktop Section Anchors */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(item.href)
              }}
              className="px-2.5 py-1 text-muted hover:text-white hover:bg-white/5 transition-all text-[11px] tracking-wider flex items-center gap-1 group cursor-pointer"
            >
              <span className="text-primary text-[9px] opacity-70 group-hover:opacity-100">
                {item.keyNum}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Right: Controls & CTA */}
        <div className="flex items-center gap-2">
          {/* Subpages Quick Dropdown/Link */}
          <div className="hidden xl:flex items-center gap-1 text-[10px] border-r border-[#333333] pr-2">
            <Link
              href="/architecture"
              className="text-muted hover:text-primary transition-colors px-1 py-0.5"
            >
              [DOCS -&gt;]
            </Link>
          </div>

          {/* Audio FX Toggle */}
          <button
            onClick={() => {
              onToggleSound()
              if (!soundEnabled) sound.click()
            }}
            title="Toggle Mechanical Key Sound FX"
            className={`px-2 py-1 border text-[10px] transition-colors cursor-pointer ${
              soundEnabled
                ? 'border-primary/50 text-primary bg-primary/5'
                : 'border-[#333333] text-muted hover:text-white'
            }`}
          >
            FX:{soundEnabled ? 'ON' : 'OFF'}
          </button>

          {/* Invert Mode Toggle */}
          <button
            onClick={onToggleInvert}
            title="Toggle Invert Contrast Mode (Key: I)"
            className="px-2 py-1 border border-[#333333] text-muted hover:text-white hover:border-white transition-colors text-[10px] cursor-pointer"
          >
            ^I
          </button>

          {/* Primary CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#contact')
            }}
            className="px-2.5 sm:px-3 py-1 bg-white text-black font-bold text-[10px] sm:text-[11px] tracking-wider hover:bg-primary transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>AUDIT</span>
            <span className="text-[7px]">■</span>
            <span>-&gt;</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              if (soundEnabled) sound.click()
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }}
            className="lg:hidden px-2 py-1 border border-[#333333] text-white text-[10px] cursor-pointer"
          >
            {isMobileMenuOpen ? '[CLOSE]' : '[MENU]'}
          </button>
        </div>
      </div>

      {/* Real-time Scroll Progress Bar */}
      <div className="w-full h-[1px] bg-transparent overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black border-b border-[#222222] px-6 py-6 space-y-4 font-mono text-xs">
          <div className="text-muted text-[10px] border-b border-[#222222] pb-2 flex justify-between">
            <span>[/&gt; DIRECT TERMINAL NAVIGATION]</span>
            <span className="text-primary">ONLINE</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
                className="p-2 border border-[#222222] hover:border-primary text-white flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-primary text-[10px]">{item.keyNum}</span>
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-[#222222]">
            <span className="text-[10px] text-muted block mb-2">SYSTEM SPECIFICATIONS:</span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {subpages.map((sp) => (
                <Link
                  key={sp.label}
                  href={sp.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-muted hover:text-primary transition-colors py-1"
                >
                  _ {sp.label} -&gt;
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
