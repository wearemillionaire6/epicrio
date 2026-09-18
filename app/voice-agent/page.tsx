'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import CustomCursor from '@/components/CustomCursor'
import DynamicIslandNavbar from '@/components/DynamicIslandNavbar'
import TerminalFooter from '@/components/TerminalFooter'
import { sound } from '@/lib/sound'

interface VoiceStudioScenario {
  id: string
  name: string
  intent: string
  opening: string
  callerReply: string
  closing: string
  latencyTarget: string
}

const studioScenarios: VoiceStudioScenario[] = [
  {
    id: 'hvac',
    name: 'COMMERCIAL HVAC & REFRIGERATION EMERGENCY',
    intent: 'CRITICAL RTU BREAKDOWN & ROOFTOP CHILLER ALARM',
    opening: 'METRO MECHANICAL 24/7 DISPATCH. ARE YOU REPORTING AN ACTIVE SYSTEM FAULT OR SCHEDULING ROUTINE CHILLER SERVICE?',
    callerReply: 'CRITICAL HEAD PRESSURE ALARM ON OUR 50-TON ROOFTOP UNIT. SERVERS ARE OVERHEATING.',
    closing: 'PRIORITY 1 ESCALATION LOGGED. SENIOR TECHNICIAN DEREK IS 11 MINUTES AWAY WITH OEM SENSORS. SMS DISPATCH SENT.',
    latencyTarget: '230MS'
  },
  {
    id: 'legal',
    name: 'LEGAL INTAKE & CONFLICT CHECK',
    intent: 'COMMERCIAL LITIGATION & LEASE DISPUTE',
    opening: 'GOOD MORNING, THANK YOU FOR CALLING STERLING & VANCE LAW. ARE YOU CALLING REGARDING AN EXISTING CASE OR SCHEDULING AN INITIAL PARTNER CONSULTATION?',
    callerReply: 'HI, WE ARE DEALING WITH AN URGENT COMMERCIAL LEASE DISPUTE AND NEED SENIOR REPRESENTATION THIS WEEK.',
    closing: 'UNDERSTOOD. ATTORNEY VANCE HAS AVAILABILITY TOMORROW AT 2:00 PM OR THURSDAY AT 10:00 AM EST. SHALL I SECURE THE 2:00 PM SLOT FOR YOU?',
    latencyTarget: '240MS'
  },
  {
    id: 'clinic',
    name: 'SPECIALTY CLINIC TRIAGE',
    intent: 'EMERGENCY POST-OPERATIVE APPOINTMENT',
    opening: 'BEACON HEALTH PARTNERS, THIS IS ARIA. ARE YOU CALLING TO BOOK A REGULAR CHECKUP OR DO YOU REQUIRE IMMEDIATE CLINICAL ASSISTANCE?',
    callerReply: 'I HAD KNEE SURGERY 3 DAYS AGO AND DEVELOPED SUDDEN ACUTE SWELLING AND PAIN.',
    closing: 'I AM IMMEDIATELY NOTIFYING OUR TRIAGE TEAM. DR. CHEN HAS A PRIORITY POSTOPERATIVE OPENING AT 3:15 PM TODAY. I HAVE RESERVED THIS FOR YOU.',
    latencyTarget: '210MS'
  },
  {
    id: 'realestate',
    name: 'COMMERCIAL REAL ESTATE BROKERAGE',
    intent: 'INDUSTRIAL WAREHOUSE ACQUISITION TOUR',
    opening: 'WELCOME TO SKYLINE COMMERCIAL REALTY. ARE YOU INQUIRING ABOUT PROPERTY ACQUISITIONS, INDUSTRIAL LEASING, OR SCHEDULING AN ASSET WALKTHROUGH?',
    callerReply: 'WE ARE REVIEWING THE 25,000 SQUARE FOOT LOGISTICS FACILITY ON AIRPORT ROAD.',
    closing: 'THAT ASSET FEATURES 4 DOCK-HIGH LOADING BAYS AND 30FT CLEAR HEIGHT. OUR BROKER DAVID IS HOSTING TOURS THIS THURSDAY AT 11 AM. SHALL I REGISTER YOUR TEAM?',
    latencyTarget: '250MS'
  }
]

export default function VoiceAgentStudioPage() {
  const [activeScenario, setActiveScenario] = useState<VoiceStudioScenario>(studioScenarios[0])
  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected'>('idle')
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [timer, setTimer] = useState(0)
  const [inverted, setInverted] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const toggleInvert = () => {
    if (soundEnabled) sound.beep()
    setInverted((prev) => !prev)
  }

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev)
  }

  useEffect(() => {
    let interval: any
    if (callState === 'connected') {
      interval = setInterval(() => setTimer((t) => t + 1), 1000)
    } else {
      setTimer(0)
    }
    return () => clearInterval(interval)
  }, [callState])

  const speak = (text: string, onEnd?: () => void) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utt = new SpeechSynthesisUtterance(text)
      utt.rate = 1.05
      utt.onend = () => { if (onEnd) onEnd() }
      utt.onerror = () => { if (onEnd) onEnd() }
      window.speechSynthesis.speak(utt)
    } else {
      setTimeout(() => { if (onEnd) onEnd() }, 2500)
    }
  }

  const startCall = () => {
    sound.beep()
    setCallState('calling')
    setDialogueIndex(0)
    setTimeout(() => {
      setCallState('connected')
      setDialogueIndex(1)
      speak(activeScenario.opening, () => {
        setTimeout(() => {
          setDialogueIndex(2)
          setTimeout(() => {
            setDialogueIndex(3)
            speak(activeScenario.closing)
          }, 1800)
        }, 1200)
      })
    }, 1200)
  }

  const endCall = () => {
    sound.click()
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setCallState('idle')
    setDialogueIndex(0)
  }

  return (
    <div className={`min-h-screen selection:bg-primary selection:text-black font-mono uppercase transition-colors ${
      inverted ? 'inverted bg-white text-black' : 'bg-black text-white'
    }`}>
      <CustomCursor />

      {/* Floating Glassmorphic Dynamic Island Navigation */}
      <DynamicIslandNavbar
        onToggleInvert={toggleInvert}
        inverted={inverted}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />
      
      <div className="pt-24 max-w-6xl mx-auto px-4 sm:px-8 py-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-muted mb-8 border-b border-[#222222] pb-3">
          <Link href="/" className="hover:text-primary transition-colors">
            HOME
          </Link>
          <span>/</span>
          <span className="text-white font-bold">VOICE TELEPHONY LAB</span>
        </div>

        {/* Hero Section */}
        <div className="mb-12 space-y-3">
          <div className="text-primary text-xs tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-primary inline-block" />
            <span>[TELEPHONY_STUDIO // &lt;300MS FIRST-TOKEN LATENCY]</span>
          </div>
          <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-wider">
            VOICE LAB
          </h1>
          <p className="text-[#aaaaaa] text-xs sm:text-sm max-w-3xl leading-relaxed">
            INTERACTIVE VOICE TESTING STATION. TEST HUMAN-GRADE INBOUND CONVERSATIONAL TELEPHONY POWERED BY DEEPGRAM NOVA-2, CLAUDE 3.5 SONNET, AND CARTESIA SONIC.
          </p>
        </div>

        {/* Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          
          {/* Left: Scenarios Selector */}
          <div className="lg:col-span-5 space-y-2">
            <span className="text-muted text-[10px] uppercase font-bold block mb-2 tracking-wider">
              SELECT BENCHMARK SCENARIO:
            </span>
            {studioScenarios.map((sc) => {
              const isSelected = activeScenario.id === sc.id
              return (
                <button
                  key={sc.id}
                  onClick={() => {
                    sound.click()
                    endCall()
                    setActiveScenario(sc)
                  }}
                  className={`w-full p-4 border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-primary bg-primary/10 text-white shadow-[0_0_10px_rgba(255,51,51,0.15)]'
                      : 'border-[#222222] bg-[#070707] text-muted hover:border-white hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="text-primary font-bold">LATENCY TARGET: {sc.latencyTarget}</span>
                    {isSelected && <span className="text-primary">■</span>}
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-white tracking-wide mb-1">
                    {sc.name}
                  </h3>
                  <div className="text-[10px] text-[#888888] truncate">
                    {sc.intent}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right: Studio Console */}
          <div className="lg:col-span-7 border border-white/20 bg-[#070707] p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#222222] text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${callState === 'connected' ? 'bg-primary animate-pulse' : 'bg-[#444444]'}`} />
                <span className="text-white font-bold">{activeScenario.name}</span>
              </div>
              <span className="text-muted text-[11px]">
                {callState === 'connected' ? `SESSION: ${timer}S` : 'STANDBY'}
              </span>
            </div>

            {/* Audio Waveform Visualization */}
            <div className="py-8 border border-[#222222] bg-black text-center font-mono">
              {callState === 'idle' && (
                <div className="text-muted text-xs space-y-2">
                  <div className="tracking-widest text-[#444444]">░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░</div>
                  <p className="text-white font-bold">CLICK BELOW TO TEST CALL FLOW</p>
                </div>
              )}

              {callState === 'calling' && (
                <div className="text-primary text-xs animate-pulse font-bold">
                  ░▒▓█ CONNECTING LOW-LATENCY SIP TRUNK... █▓▒░
                </div>
              )}

              {callState === 'connected' && (
                <div className="space-y-4 px-4 text-left">
                  <div className="text-primary text-center text-sm tracking-widest overflow-hidden animate-pulse">
                    ░▒▓██▓▒░░▒▓████▓▒░░▒▓██▓▒░░▒▓████▓▒░░▒▓██▓▒░
                  </div>

                  {/* Dialogue Stream */}
                  <div className="space-y-2.5 text-xs bg-[#0A0A0A] p-3.5 border border-[#222222]">
                    {dialogueIndex >= 1 && (
                      <p><span className="text-primary font-bold">[AI AGENT]:</span> {activeScenario.opening}</p>
                    )}
                    {dialogueIndex >= 2 && (
                      <p className="text-[#aaaaaa]"><span className="text-muted font-bold">[INBOUND CALLER]:</span> {activeScenario.callerReply}</p>
                    )}
                    {dialogueIndex >= 3 && (
                      <p><span className="text-primary font-bold">[AI AGENT]:</span> {activeScenario.closing}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div>
              {callState === 'idle' ? (
                <button
                  onClick={startCall}
                  className="w-full py-3.5 bg-white text-black hover:bg-primary font-bold uppercase text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>TEST VOICE TELEPHONY AGENT</span>
                  <span className="text-black text-[8px]">■</span>
                  <span>-&gt;</span>
                </button>
              ) : (
                <button
                  onClick={endCall}
                  className="w-full py-3.5 border border-red-500 text-red-400 hover:bg-red-500 hover:text-white font-bold uppercase text-xs transition-colors cursor-pointer"
                >
                  TERMINATE CALL SESSION -&gt;
                </button>
              )}
            </div>

            <div className="pt-3 border-t border-[#222222] text-[10px] text-muted flex items-center justify-between">
              <span>TWILIO SIP CARRIER • WEBRTC V2.1</span>
              <span className="text-primary font-bold">&lt;300MS GUARANTEE</span>
            </div>
          </div>

        </div>

        {/* Multi-Page Jump Strip */}
        <div className="py-8 border-b border-[#222222] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <Link
            href="/solutions"
            className="p-3.5 border border-[#222222] bg-[#070707] hover:border-primary text-white flex items-center justify-between"
          >
            <span>SOLUTIONS MATRIX</span>
            <span className="text-primary">-&gt;</span>
          </Link>
          <Link
            href="/sectors"
            className="p-3.5 border border-[#222222] bg-[#070707] hover:border-primary text-white flex items-center justify-between"
          >
            <span>VERTICAL BLUEPRINTS</span>
            <span className="text-primary">-&gt;</span>
          </Link>
          <Link
            href="/audit"
            className="p-3.5 border border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-black flex items-center justify-between font-bold"
          >
            <span>COMMISSION VOICE AGENT</span>
            <span>■</span>
          </Link>
        </div>

        {/* Footer */}
        <TerminalFooter onToggleInvert={toggleInvert} />
      </div>
    </div>
  )
}
