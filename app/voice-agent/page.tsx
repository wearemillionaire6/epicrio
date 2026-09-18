'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import CustomCursor from '@/components/CustomCursor'

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
    id: 'legal',
    name: 'LEGAL INTAKE & CONFLICT CHECK',
    intent: 'Commercial litigation & lease dispute',
    opening: 'Good morning, thank you for calling Sterling & Vance Law. Are you calling regarding an existing case or scheduling an initial partner consultation?',
    callerReply: 'Hi, we are dealing with an urgent commercial lease dispute and need senior representation this week.',
    closing: 'Understood. Attorney Vance has availability tomorrow at 2:00 PM or Thursday at 10:00 AM EST. Shall I secure the 2:00 PM slot for you?',
    latencyTarget: '240ms'
  },
  {
    id: 'clinic',
    name: 'SPECIALTY CLINIC TRIAGE',
    intent: 'Emergency post-operative appointment',
    opening: 'Beacon Health Partners, this is Aria. Are you calling to book a regular checkup or do you require immediate clinical assistance?',
    callerReply: 'I had knee surgery 3 days ago and developed sudden acute swelling and pain.',
    closing: 'I am immediately notifying our triage team. Dr. Chen has a priority postoperative opening at 3:15 PM today. I have reserved this for you.',
    latencyTarget: '210ms'
  },
  {
    id: 'realestate',
    name: 'COMMERCIAL REAL ESTATE BROKERAGE',
    intent: 'Industrial warehouse acquisition tour',
    opening: 'Welcome to Skyline Commercial Realty. Are you inquiring about property acquisitions, industrial leasing, or scheduling an asset walkthrough?',
    callerReply: 'We are reviewing the 25,000 square foot logistics facility on Airport Road.',
    closing: 'That asset features 4 dock-high loading bays and 30ft clear height. Our broker David is hosting tours this Thursday at 11 AM. Shall I register your team?',
    latencyTarget: '250ms'
  },
  {
    id: 'saas',
    name: 'B2B SAAS DEMO QUALIFICATION',
    intent: 'Enterprise software tier inquiry',
    opening: 'Thanks for calling HyperScale Cloud. Are you looking to schedule a live product architecture demo or discuss custom enterprise pricing?',
    callerReply: 'We have 400 engineering seats and want to discuss custom SSO and data residency guarantees.',
    closing: 'Perfect. For enterprise deployments over 250 seats, our VP of Solutions, Sarah, conducts the deep-dive. How does Wednesday at 3 PM EST look?',
    latencyTarget: '220ms'
  }
]

export default function VoiceAgentStudioPage() {
  const [activeScenario, setActiveScenario] = useState<VoiceStudioScenario>(studioScenarios[0])
  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected'>('idle')
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [timer, setTimer] = useState(0)
  const [customPrompt, setCustomPrompt] = useState('')

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
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setCallState('idle')
    setDialogueIndex(0)
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black font-mono">
      <CustomCursor />
      
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-8 border-b border-[#222222] mb-12">
          <Link href="/" className="font-pixel text-xl sm:text-2xl text-white hover:text-primary transition-colors">
            AGENCY CO // VOICE STUDIO
          </Link>
          <Link
            href="/"
            className="border border-[#333333] hover:border-white px-3 py-1 text-xs text-muted hover:text-white transition-colors"
          >
            [ ^H BACK TO HOME ]
          </Link>
        </div>

        {/* Hero */}
        <div className="mb-14 space-y-4">
          <div className="text-muted text-xs">
            [/&gt; INTERACTIVE TELEPHONY SUITE // PRD § 15 AUDIO ENGINE ]
          </div>
          <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-wider">
            VOICE AGENT TESTING STUDIO
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
            EXPERIENCE ULTRA-LOW LATENCY CONVERSATIONAL SIP TELEPHONY.
            BENCHMARKED AT &lt;260MS TIME-TO-FIRST-TOKEN (TTFT) WITH NATURAL VOICE REASONING AND DIRECT CALENDAR RESERVATION.
          </p>
        </div>

        {/* Console Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Presets & Telemetry */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            <span className="text-muted block text-[10px] uppercase tracking-wider">SELECT INDUSTRY TELEPHONY PRESET:</span>
            
            <div className="space-y-2">
              {studioScenarios.map((sc) => {
                const isSel = activeScenario.id === sc.id
                return (
                  <button
                    key={sc.id}
                    onClick={() => {
                      endCall()
                      setActiveScenario(sc)
                    }}
                    className={`w-full p-3.5 border text-left transition-colors uppercase ${
                      isSel
                        ? 'border-white bg-white text-black font-bold'
                        : 'border-[#222222] text-muted hover:border-slate-500 hover:text-white'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] mb-1">
                      <span>{sc.latencyTarget} TTFT</span>
                      <span className="text-primary font-bold">ACTIVE</span>
                    </div>
                    <div className="text-xs">{sc.name}</div>
                  </button>
                )
              })}
            </div>

            {/* Architecture Telemetry */}
            <div className="border border-[#222222] p-4 bg-[#0A0A0A] space-y-2 text-[11px] text-slate-400">
              <div className="text-white font-bold pb-2 border-b border-[#222222]">
                // TELEPHONY PIPELINE BENCHMARKS
              </div>
              <div className="flex justify-between">
                <span>SIP Provider:</span> <span className="text-white">Twilio Media Streams</span>
              </div>
              <div className="flex justify-between">
                <span>ASR Model:</span> <span className="text-white">Deepgram Nova-2 (Streaming)</span>
              </div>
              <div className="flex justify-between">
                <span>LLM Engine:</span> <span className="text-white">Claude 3.5 Sonnet</span>
              </div>
              <div className="flex justify-between">
                <span>TTS Model:</span> <span className="text-white">Cartesia Sonic (48kHz)</span>
              </div>
              <div className="flex justify-between">
                <span>Total Latency:</span> <span className="text-primary font-bold">242ms Roundtrip</span>
              </div>
            </div>
          </div>

          {/* Right: Studio Console */}
          <div className="lg:col-span-7 border border-[#333333] bg-[#0A0A0A] p-6 space-y-6">
            
            {/* Top Status */}
            <div className="flex items-center justify-between pb-4 border-b border-[#222222] text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${callState === 'connected' ? 'bg-primary animate-pulse' : 'bg-slate-600'}`} />
                <span className="text-white font-bold">{activeScenario.name}</span>
              </div>
              <span className="text-muted">
                {callState === 'connected' ? `SESSION: ${timer}S` : 'STATUS: STANDBY'}
              </span>
            </div>

            {/* Audio Waveform Visualization */}
            <div className="py-8 border border-[#222222] bg-black text-center font-mono">
              {callState === 'idle' && (
                <div className="text-muted text-xs space-y-2">
                  <div className="tracking-widest">░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░</div>
                  <p className="text-white">CLICK BELOW TO TEST CALL FLOW</p>
                </div>
              )}

              {callState === 'calling' && (
                <div className="text-primary text-xs animate-pulse">
                  ░▒▓█ CONNECTING LOW-LATENCY SIP TRUNK... █▓▒░
                </div>
              )}

              {callState === 'connected' && (
                <div className="space-y-4 px-4 text-left">
                  <div className="text-primary text-center text-sm tracking-widest overflow-hidden">
                    ░▒▓██▓▒░░▒▓████▓▒░░▒▓██▓▒░░▒▓████▓▒░░▒▓██▓▒░
                  </div>

                  {/* Dialogue Stream */}
                  <div className="space-y-2 text-xs bg-[#0A0A0A] p-3 border border-[#222222]">
                    {dialogueIndex >= 1 && (
                      <p><span className="text-primary font-bold">AI AGENT:</span> {activeScenario.opening}</p>
                    )}
                    {dialogueIndex >= 2 && (
                      <p className="text-muted"><span className="text-slate-400 font-bold">INBOUND CALLER:</span> {activeScenario.callerReply}</p>
                    )}
                    {dialogueIndex >= 3 && (
                      <p><span className="text-primary font-bold">AI AGENT:</span> {activeScenario.closing}</p>
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
                  className="w-full py-3.5 border border-white hover:bg-white hover:text-black font-bold uppercase text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>TEST VOICE TELEPHONY AGENT</span>
                  <span className="text-primary text-[10px]">■</span>
                  <span>-&gt;</span>
                </button>
              ) : (
                <button
                  onClick={endCall}
                  className="w-full py-3.5 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold uppercase text-xs transition-colors"
                >
                  TERMINATE CALL SESSION -&gt;
                </button>
              )}
            </div>

            {/* Custom Intent Field */}
            <div className="pt-4 border-t border-[#222222] text-xs space-y-2">
              <span className="text-muted block text-[10px]">DEPLOY WITH YOUR OWN BACKEND:</span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Compatible with Vapi, Bland.ai, Retell AI, or direct custom WebSockets. Includes pre-built cal.com hooks and CRM webhook dispatches.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
