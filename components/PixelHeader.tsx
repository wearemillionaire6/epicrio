'use client'

import Link from 'next/link'
import { sound } from '@/lib/sound'
import MovablePixelBackground from '@/components/MovablePixelBackground'

interface PixelHeaderProps {
  onToggleInvert: () => void
  inverted: boolean
}

export default function PixelHeader({ onToggleInvert, inverted }: PixelHeaderProps) {
  return (
    <header className="pt-8 pb-10 border-b border-[#222222]">
      {/* Giant Pixelated Wordmark */}
      <div className="mb-10 overflow-hidden">
        <h1 className="font-pixel text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-widest text-white leading-none">
          AGENCY CO
        </h1>
      </div>

      {/* Hero Body: Left Dithered Graphic + Right Meta Copy */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10">
        
        {/* Left Dithered Graphic: Interactive Movable Constellation */}
        <div className="md:col-span-5 flex flex-col justify-start">
          <div className="border border-[#333333] hover:border-primary/60 p-1.5 bg-black transition-colors shadow-2xl relative">
            {/* Top Telemetry Header */}
            <div className="flex items-center justify-between px-2 py-1 border-b border-[#222222] text-[9px] text-muted mb-1 bg-[#050505]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
                <span className="text-primary font-bold">[KINETIC CONSTELLATION]</span>
              </div>
              <span className="text-[8px] border border-primary/30 px-1 py-0.2 text-primary font-bold">
                DRAG / TILT
              </span>
            </div>

            {/* Smooth Movable Canvas Viewport */}
            <div className="w-full h-[180px] sm:h-[210px] relative overflow-hidden bg-black border border-[#1A1A1A]">
              <MovablePixelBackground
                interactive={true}
                opacity={1}
                inverted={inverted}
                standalone={true}
              />
            </div>

            {/* Bottom Telemetry Footer */}
            <div className="flex items-center justify-between px-2 py-1 border-t border-[#222222] text-[9px] text-muted mt-1 bg-[#050505]">
              <span>60FPS DAMPED LERP</span>
              <span className="text-white font-bold">500x344 MATRIX</span>
            </div>
          </div>
        </div>

        {/* Right Editorial Copy */}
        <div className="md:col-span-7 space-y-4 text-xs sm:text-sm font-mono leading-relaxed bg-black/70 backdrop-blur-[2px] p-5 sm:p-6 border border-[#222222] shadow-xl">
          <div>
            <span className="text-muted block mb-1">/ SYSTEM ARCHITECT &amp; AUTOMATION INFRASTRUCTURE</span>
            <p className="text-white font-bold text-sm sm:text-base">
              WE BUILD THE CONNECTED SYSTEMS BEHIND HIGH-STAKES MODERN BUSINESS.
            </p>
          </div>

          <div>
            <span className="text-muted block mb-1">/ OPERATIONAL DOMAINS</span>
            <p className="text-slate-300">
              CRM • SUB-300MS VOICE AI • RECURSIVE WORKFLOWS • KNOWLEDGE RAG
            </p>
          </div>

          <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            <span className="text-muted">/ EXTENDED DOSSIERS:</span>
            <Link href="/architecture" className="text-white hover:text-primary underline">
              ARCHITECTURE SPEC -&gt;
            </Link>
            <Link href="/solutions" className="text-white hover:text-primary underline">
              SOLUTIONS CATALOG -&gt;
            </Link>
            <Link href="/voice-agent" className="text-white hover:text-primary underline">
              VOICE STUDIO -&gt;
            </Link>
            <Link href="/methodology" className="text-white hover:text-primary underline">
              METHODOLOGY -&gt;
            </Link>
          </div>

          <div className="text-[11px] text-muted">
            / USE YOUR KEYBOARD TO NAVIGATE (H, B, A, S, V, C, I) .
          </div>
        </div>

      </div>

      {/* Keyboard Shortcuts Nav Bar */}
      <nav className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-6 border-t border-[#222222] font-mono text-[11px]">
        <a
          href="#home"
          onClick={() => sound.click()}
          className="border border-[#333333] hover:border-white p-2 flex flex-col justify-between transition-colors"
        >
          <span className="text-muted">^H</span>
          <span className="text-white font-bold">HOME</span>
        </a>

        <a
          href="#biography"
          onClick={() => sound.click()}
          className="border border-[#333333] hover:border-white p-2 flex flex-col justify-between transition-colors"
        >
          <span className="text-muted">^B</span>
          <span className="text-white font-bold">MANIFESTO</span>
        </a>

        <a
          href="#architecture"
          onClick={() => sound.click()}
          className="border border-[#333333] hover:border-white p-2 flex flex-col justify-between transition-colors"
        >
          <span className="text-muted">^A</span>
          <span className="text-white font-bold">ARCHITECTURE</span>
        </a>

        <a
          href="#services"
          onClick={() => sound.click()}
          className="border border-[#333333] hover:border-white p-2 flex flex-col justify-between transition-colors"
        >
          <span className="text-muted">^S</span>
          <span className="text-white font-bold">SERVICES</span>
        </a>

        <a
          href="#voice"
          onClick={() => sound.click()}
          className="border border-[#333333] hover:border-white p-2 flex flex-col justify-between transition-colors"
        >
          <span className="text-muted">^V</span>
          <span className="text-white font-bold">VOICE DEMO</span>
        </a>

        <a
          href="#contact"
          onClick={() => sound.click()}
          className="border border-[#333333] hover:border-white p-2 flex flex-col justify-between transition-colors"
        >
          <span className="text-muted">^C</span>
          <span className="text-white font-bold">CONTACT</span>
        </a>

        <button
          type="button"
          onClick={() => {
            sound.beep()
            onToggleInvert()
          }}
          className="border border-[#333333] hover:border-white p-2 flex flex-col justify-between transition-colors text-left"
        >
          <span className="text-muted">^I</span>
          <span className="text-primary font-bold">INVERT</span>
        </button>
      </nav>
    </header>
  )
}
