'use client'

import Link from 'next/link'
import { sound } from '@/lib/sound'

interface PixelHeaderProps {
  onToggleInvert: () => void
  inverted: boolean
}

export default function PixelHeader({ onToggleInvert, inverted }: PixelHeaderProps) {
  return (
    <header className="pt-8 pb-10 border-b border-[#222222]">
      {/* Header Top Bar: Status Telemetry */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#222222] text-[10px]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-none animate-ping" />
          <span className="text-primary font-bold tracking-wider">
            [ENTERPRISE AUTOMATION INFRASTRUCTURE // HIGH-IMPACT ARCHITECTURE]
          </span>
        </div>
        <div className="flex items-center gap-3 text-muted">
          <span>LATENCY: &lt;300MS SLA</span>
          <span>•</span>
          <span className="text-white font-bold">24/7/365 ZERO-DOWNTIME</span>
        </div>
      </div>

      {/* Giant Pixelated Wordmark */}
      <div className="mb-8 overflow-hidden">
        <h1 className="font-pixel text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-widest text-white leading-none">
          AGENCY CO
        </h1>
      </div>

      {/* Hero Body: Clean 3-Column Brutalist Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {/* Card 1: Mandate */}
        <div className={`p-5 sm:p-6 border shadow-xl flex flex-col justify-between ${
          inverted ? 'bg-white/95 border-[#E2E8F0] text-black' : 'bg-black/80 border-[#222222] text-white'
        }`}>
          <div>
            <span className="text-primary text-[10px] font-bold block mb-2 tracking-wider">
              [01 // OPERATIONAL MANDATE]
            </span>
            <p className={`font-bold text-xs sm:text-sm leading-relaxed ${inverted ? 'text-black' : 'text-white'}`}>
              WE BUILD THE CONNECTED SYSTEMS BEHIND HIGH-STAKES MODERN BUSINESS.
            </p>
          </div>
          <p className="text-xs text-muted leading-relaxed mt-4">
            REPLACING BLOATED RETAINERS WITH DETERMINISTIC REASONING, LOW-LATENCY VOICE DISPATCHERS, AND HARDENED REDIS QUEUES.
          </p>
        </div>

        {/* Card 2: 4 Core Domains */}
        <div className={`p-5 sm:p-6 border shadow-xl flex flex-col justify-between ${
          inverted ? 'bg-white/95 border-[#E2E8F0] text-black' : 'bg-black/80 border-[#222222] text-white'
        }`}>
          <div>
            <span className="text-primary text-[10px] font-bold block mb-2 tracking-wider">
              [02 // OPERATIONAL CAPABILITIES]
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">01.</span>
                <span className={inverted ? 'text-slate-800 font-bold' : 'text-slate-200'}>CENTRAL CRM PIPELINE ARCHITECTURE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">02.</span>
                <span className={inverted ? 'text-slate-800 font-bold' : 'text-slate-200'}>SUB-300MS CONVERSATIONAL VOICE AI</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">03.</span>
                <span className={inverted ? 'text-slate-800 font-bold' : 'text-slate-200'}>RECURSIVE AUTONOMOUS WORKFLOWS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">04.</span>
                <span className={inverted ? 'text-slate-800 font-bold' : 'text-slate-200'}>ENTERPRISE KNOWLEDGE RAG AGENTS</span>
              </div>
            </div>
          </div>
          <span className="text-[10px] text-muted block mt-4">
            STANDARDS: TWILIO SIP • DEEPGRAM NOVA-2 • CLAUDE 3.5 SONNET
          </span>
        </div>

        {/* Card 3: Dossiers & Fast Routes */}
        <div className={`p-5 sm:p-6 border shadow-xl flex flex-col justify-between ${
          inverted ? 'bg-white/95 border-[#E2E8F0] text-black' : 'bg-black/80 border-[#222222] text-white'
        }`}>
          <div>
            <span className="text-primary text-[10px] font-bold block mb-2 tracking-wider">
              [03 // EXTENDED DOSSIERS]
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/architecture"
                onClick={() => sound.click()}
                className={`p-2.5 border border-[#333333] hover:border-primary transition-colors flex items-center justify-between ${
                  inverted ? 'bg-[#F4F4F6] text-black' : 'bg-[#080808] text-white'
                }`}
              >
                <span>SYS FABRIC</span>
                <span className="text-primary">-&gt;</span>
              </Link>
              <Link
                href="/solutions"
                onClick={() => sound.click()}
                className={`p-2.5 border border-[#333333] hover:border-primary transition-colors flex items-center justify-between ${
                  inverted ? 'bg-[#F4F4F6] text-black' : 'bg-[#080808] text-white'
                }`}
              >
                <span>SOLUTIONS</span>
                <span className="text-primary">-&gt;</span>
              </Link>
              <Link
                href="/voice-agent"
                onClick={() => sound.click()}
                className={`p-2.5 border border-[#333333] hover:border-primary transition-colors flex items-center justify-between ${
                  inverted ? 'bg-[#F4F4F6] text-black' : 'bg-[#080808] text-white'
                }`}
              >
                <span>VOICE LAB</span>
                <span className="text-primary">-&gt;</span>
              </Link>
              <Link
                href="/sectors"
                onClick={() => sound.click()}
                className={`p-2.5 border border-[#333333] hover:border-primary transition-colors flex items-center justify-between ${
                  inverted ? 'bg-[#F4F4F6] text-black' : 'bg-[#080808] text-white'
                }`}
              >
                <span>SECTORS</span>
                <span className="text-primary">-&gt;</span>
              </Link>
            </div>
          </div>
          <div className="text-[10px] text-muted mt-4">
            / USE KEYBOARD SHORTCUTS (H, B, A, S, V, C, T) TO JUMP INSTANTLY.
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
          className="border border-[#333333] hover:border-white p-2 flex flex-col justify-between transition-colors text-left cursor-pointer"
        >
          <span className="text-muted">^T</span>
          <span className="text-primary font-bold">{inverted ? 'MODE: LIGHT' : 'MODE: DARK'}</span>
        </button>
      </nav>
    </header>
  )
}
