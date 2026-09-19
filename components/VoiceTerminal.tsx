'use client'

import { useState, useEffect } from 'react'
import { sound } from '@/lib/sound'

interface Scenario {
  id: string
  code: string
  name: string
  caller: string
  agent: string
  opening: string
  callerReply: string
  closing: string
}

const scenarios: Scenario[] = [
  {
    id: 'hvac',
    code: 'SCENARIO 01',
    name: 'COMMERCIAL HVAC DISPATCH',
    caller: 'FACILITIES DIRECTOR',
    agent: 'KAI // DISPATCH AI',
    opening: 'METRO MECHANICAL 24/7 DISPATCH. ARE YOU REPORTING AN ACTIVE SYSTEM FAULT OR SCHEDULING ROUTINE CHILLER SERVICE?',
    callerReply: 'CRITICAL HEAD PRESSURE ALARM ON OUR 50-TON ROOFTOP UNIT. SERVERS ARE OVERHEATING.',
    closing: 'PRIORITY 1 ESCALATION LOGGED. SENIOR TECHNICIAN DEREK IS 11 MINUTES AWAY WITH OEM SENSORS. SMS DISPATCH SENT.',
  },
  {
    id: 'legal',
    code: 'SCENARIO 02',
    name: 'COMMERCIAL LITIGATION INTAKE',
    caller: 'CORPORATE COUNSEL',
    agent: 'ELENA // INTAKE AI',
    opening: 'STERLING & VANCE LAW. ARE YOU CALLING REGARDING AN ACTIVE INJUNCTION OR SCHEDULING A SENIOR PARTNER CONSULTATION?',
    callerReply: 'URGENT BREACH OF CONTRACT AND EMERGENCY TEMPORARY RESTRAINING ORDER.',
    closing: 'CONFLICT CHECK AUTOMATICALLY CLEARED. SECURED MANAGING PARTNER DAVID VANCE FOR 8:30 AM TOMORROW. NDA DISPATCHED.',
  },
  {
    id: 'medical',
    code: 'SCENARIO 03',
    name: 'SURGICAL SPECIALTY CLINIC',
    caller: 'PATIENT',
    agent: 'ARIA // COORDINATOR AI',
    opening: 'BEACON SURGICAL SUITES. ARE YOU CALLING TO SCHEDULE A CONSULTATION OR DISCUSS POST-OP PROTOCOLS?',
    callerReply: 'I HAVE POST-OPERATIVE SWELLING AND NEED TO SEE DR. REYES IMMEDIATELY.',
    closing: 'CLINICAL TRIAGE CHART UPDATED. RESERVED EMERGENCY SLOT WITH DR. REYES AT 2:15 PM TODAY. DIRECTIONS TEXTED.',
  },
]

export default function VoiceTerminal() {
  const [activeScenario, setActiveScenario] = useState<Scenario>(scenarios[0])
  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected'>('idle')
  const [dialogueStep, setDialogueStep] = useState(0)
  const [timer, setTimer] = useState(0)

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
    setDialogueStep(0)
    setTimeout(() => {
      setCallState('connected')
      setDialogueStep(1)
      speak(activeScenario.opening, () => {
        setTimeout(() => {
          setDialogueStep(2)
          setTimeout(() => {
            setDialogueStep(3)
            speak(activeScenario.closing)
          }, 1600)
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
    setDialogueStep(0)
  }

  return (
    <section id="voice" className="py-20 border-b border-[#222222] font-mono">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#222222] gap-4">
        <div>
          <div className="text-primary text-xs tracking-widest uppercase mb-1 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary" />
            <span>[TELEPHONY_LAB // MODULE 03]</span>
          </div>
          <h2 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-widest">
            VOICE DEMO
          </h2>
        </div>
        <div className="text-right text-xs text-muted">
          <span>HUMAN-GRADE TELEPHONY LAB</span>
          <br />
          <span className="text-white">TWILIO SIP • &lt;280MS FIRST-TOKEN LATENCY</span>
        </div>
      </div>

      {/* Terminal Prompt Header */}
      <div className="text-muted text-xs sm:text-sm mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-primary">[/&gt; VOICE_BENCHMARK_STATION : ]</span>
          <span className="text-white">CLICK INITIATE TO TRIGGER WEBRTC AUDIO SYNTHESIS</span>
        </div>
        <span className="text-[11px] text-primary hidden md:inline">
          STATUS: READY
        </span>
      </div>

      {/* Box-Style Main Telephony Console */}
      <div className="border border-white/20 bg-[#070707] p-6 sm:p-8 space-y-6">
        
        {/* Preset Selector Box Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pb-4 border-b border-[#222222]">
          {scenarios.map((sc) => {
            const isSel = activeScenario.id === sc.id
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => {
                  sound.click()
                  endCall()
                  setActiveScenario(sc)
                }}
                className={`p-3 border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                  isSel
                    ? 'border-primary bg-primary/10 text-white shadow-[0_0_10px_rgba(0,255,136,0.15)]'
                    : 'border-[#222222] bg-black text-muted hover:border-white hover:text-white'
                }`}
              >
                <div>
                  <span className="text-[9px] text-primary font-bold block">[{sc.code}]</span>
                  <span className="font-bold text-xs text-white mt-0.5 block">{sc.name}</span>
                </div>
                {isSel && <span className="text-primary font-bold">■</span>}
              </button>
            )
          })}
        </div>

        {/* 4 Boxed Telemetry Spec Cells */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 border border-[#222222] bg-black">
            <span className="text-[9px] text-muted block mb-1">CARRIER INFRASTRUCTURE</span>
            <span className="text-white font-bold block">TWILIO SIP TRUNK</span>
          </div>

          <div className="p-3 border border-[#222222] bg-black">
            <span className="text-[9px] text-muted block mb-1">MEASURED TTFT</span>
            <span className="text-primary font-bold block">264MS LATENCY</span>
          </div>

          <div className="p-3 border border-[#222222] bg-black">
            <span className="text-[9px] text-muted block mb-1">AUDIO COMPRESSION</span>
            <span className="text-white font-bold block">OPUS 48KHZ STEREO</span>
          </div>

          <div className="p-3 border border-[#222222] bg-black">
            <span className="text-[9px] text-muted block mb-1">SESSION STATE</span>
            <span className={`font-bold block ${callState === 'connected' ? 'text-primary' : 'text-white'}`}>
              {callState === 'connected' ? `LIVE (${timer}S)` : callState === 'calling' ? 'CONNECTING...' : 'DISCONNECTED'}
            </span>
          </div>
        </div>

        {/* Waveform & Dialogue Monitor */}
        <div className="p-5 border border-[#222222] bg-black text-center font-mono min-h-[150px] flex flex-col justify-center">
          {callState === 'idle' && (
            <div className="text-muted text-xs py-4 space-y-2">
              <div className="tracking-widest text-[#444444]">
                ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
              </div>
              <div className="text-white font-bold text-xs sm:text-sm">
                READY FOR INBOUND TELEPHONY SIMULATION
              </div>
              <div className="text-[10px] text-muted">
                SELECT SCENARIO ABOVE AND CLICK INITIATE TO HEAR NEURAL TTS SYNTHESIS
              </div>
            </div>
          )}

          {callState === 'calling' && (
            <div className="text-primary text-xs py-6 animate-pulse font-bold space-y-2">
              <div>░▒▓█ NEGOTIATING WEBRTC HANDSHAKE // CARRIER ACKNOWLEDGED █▓▒░</div>
              <div className="text-[10px] text-muted">ROUTING INBOUND SIP STREAM TO NEURAL RUNTIME...</div>
            </div>
          )}

          {callState === 'connected' && (
            <div className="space-y-4 text-left w-full">
              <div className="text-primary text-center tracking-widest text-sm overflow-x-hidden animate-pulse">
                ░▒▓██▓▒░░▒▓████▓▒░░▒▓██▓▒░░▒▓████▓▒░░▒▓██▓▒░
              </div>

              {/* Dialogue Transcript in Boxed Frame */}
              <div className="space-y-3 text-xs bg-[#070707] p-4 border border-[#222222]">
                {dialogueStep >= 1 && (
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-bold text-[10px] px-1.5 py-0.2 border border-primary/40 bg-primary/10 flex-shrink-0">
                      AI RECEPTIONIST
                    </span>
                    <p className="text-white leading-relaxed">{activeScenario.opening}</p>
                  </div>
                )}
                {dialogueStep >= 2 && (
                  <div className="flex items-start gap-2">
                    <span className="text-muted font-bold text-[10px] px-1.5 py-0.2 border border-[#333333] bg-black flex-shrink-0">
                      INBOUND CALLER
                    </span>
                    <p className="text-[#aaaaaa] leading-relaxed">{activeScenario.callerReply}</p>
                  </div>
                )}
                {dialogueStep >= 3 && (
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-bold text-[10px] px-1.5 py-0.2 border border-primary/40 bg-primary/10 flex-shrink-0">
                      AI RECEPTIONIST
                    </span>
                    <p className="text-white leading-relaxed">{activeScenario.closing}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Button Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          {callState === 'idle' ? (
            <button
              type="button"
              onClick={startCall}
              className="px-6 py-3 bg-white text-black hover:bg-primary transition-colors uppercase font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>INITIATE VOICE SIMULATION</span>
              <span className="text-[8px]">■</span>
              <span>-&gt;</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={endCall}
              className="px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-black transition-colors uppercase font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>TERMINATE CALL SESSION [ESC] -&gt;</span>
            </button>
          )}

          <span className="text-[10px] text-muted">
            CARRIER CERTIFIED • WEBRTC V2.1 • ZERO CLOUD DROP RATE
          </span>
        </div>

      </div>
    </section>
  )
}
