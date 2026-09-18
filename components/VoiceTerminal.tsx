'use client'

import { useState, useEffect } from 'react'

interface Scenario {
  id: string
  name: string
  caller: string
  agent: string
  opening: string
  callerReply: string
  closing: string
}

const scenarios: Scenario[] = [
  {
    id: 'legal',
    name: 'COMMERCIAL LAW INTAKE',
    caller: 'INBOUND CLIENT',
    agent: 'ELENA // INTAKE AI',
    opening: 'STERLING & VANCE LAW. ARE YOU CALLING REGARDING AN EXISTING MATTER OR SCHEDULING A SENIOR PARTNER CONSULTATION?',
    callerReply: 'URGENT LEASE DISPUTE REGARDING OUR COMMERCIAL WAREHOUSE.',
    closing: 'RESERVING TOMORROW AT 2:00 PM EST WITH SENIOR COUNSEL DAVID VANCE. CONFIRMATION SENT VIA SMS.',
  },
  {
    id: 'medical',
    name: 'PRIVATE MEDICAL CLINIC',
    caller: 'PATIENT',
    agent: 'ARIA // COORDINATOR AI',
    opening: 'BEACON CLINIC. ARE YOU CALLING TO SCHEDULE AN APPOINTMENT OR SPEAK WITH CLINICAL TRIAGE?',
    callerReply: 'I HAVE POST-OPERATIVE SWELLING AND NEED TO SEE DR. CHEN TODAY.',
    closing: 'FLAGGED FOR PRIORITY REVIEW. SECURING DR. CHEN AT 3:15 PM TODAY. DIRECTIONS SENT TO YOUR MOBILE.',
  },
  {
    id: 'realty',
    name: 'COMMERCIAL REAL ESTATE',
    caller: 'ACQUISITION LEAD',
    agent: 'MARCUS // ADVISOR AI',
    opening: 'SKYLINE REALTY. ARE YOU CALLING REGARDING ASSET LEASING OR SCHEDULING A SITE TOUR?',
    callerReply: 'INTERESTED IN THE 25,000 SQ FT WAREHOUSE ON INDUSTRIAL PARKWAY.',
    closing: 'FACILITY INCLUDES 4 DOCK BAYS. LEAD BROKER ON SITE THURSDAY AT 11 AM. ADDING YOUR TEAM TO THE ROSTER.',
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
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setCallState('idle')
    setDialogueStep(0)
  }

  return (
    <section id="voice" className="py-20 border-b border-[#222222]">
      {/* Section Title in Pixel Font */}
      <h2 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-widest mb-10">
        VOICE DEMO
      </h2>

      {/* Terminal prompt */}
      <div className="font-mono text-muted text-xs sm:text-sm mb-8">
        [/&gt; SIP TRUNKING // &lt;300MS LATENCY ]
      </div>

      <div className="border border-[#333333] bg-[#0A0A0A] p-6 font-mono text-xs sm:text-sm space-y-6">
        
        {/* Preset Selector */}
        <div className="flex flex-wrap gap-3 pb-4 border-b border-[#222222]">
          {scenarios.map((sc) => {
            const isSel = activeScenario.id === sc.id
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => {
                  endCall()
                  setActiveScenario(sc)
                }}
                className={`px-3 py-1.5 border text-xs uppercase transition-colors ${
                  isSel
                    ? 'border-white bg-white text-black font-bold'
                    : 'border-[#333333] text-muted hover:border-slate-500 hover:text-white'
                }`}
              >
                [ {sc.name} ]
              </button>
            )
          })}
        </div>

        {/* Telemetry Stream */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-muted">
          <div>
            <span>TELEPHONY:</span> <span className="text-white">TWILIO SIP</span>
          </div>
          <div>
            <span>LATENCY:</span> <span className="text-primary">264MS TTFT</span>
          </div>
          <div>
            <span>CODEC:</span> <span className="text-white">OPUS 48KHZ</span>
          </div>
          <div>
            <span>STATUS:</span>{' '}
            <span className={callState === 'connected' ? 'text-primary' : 'text-slate-400'}>
              {callState === 'connected' ? `LIVE (${timer}S)` : callState === 'calling' ? 'CONNECTING' : 'IDLE'}
            </span>
          </div>
        </div>

        {/* ASCII Waveform Display */}
        <div className="py-6 border-y border-[#222222] text-center font-mono">
          {callState === 'idle' && (
            <div className="text-muted text-xs">
              ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
              <div className="mt-2 text-white font-bold">READY FOR INBOUND CALL SIMULATION</div>
            </div>
          )}

          {callState === 'calling' && (
            <div className="text-primary text-xs animate-pulse">
              ░▒▓█ NEGOTIATING WEBRTC HANDSHAKE // ROUTING PACKETS █▓▒░
            </div>
          )}

          {callState === 'connected' && (
            <div className="space-y-4 text-left">
              <div className="text-primary text-center tracking-widest text-sm overflow-x-hidden">
                ░▒▓██▓▒░░▒▓████▓▒░░▒▓██▓▒░░▒▓████▓▒░░▒▓██▓▒░
              </div>

              {/* Dialogue Transcript */}
              <div className="space-y-2 text-xs bg-black p-4 border border-[#222222]">
                {dialogueStep >= 1 && (
                  <div>
                    <span className="text-primary font-bold">AI:</span> {activeScenario.opening}
                  </div>
                )}
                {dialogueStep >= 2 && (
                  <div className="text-muted">
                    <span className="text-slate-400 font-bold">CALLER:</span> {activeScenario.callerReply}
                  </div>
                )}
                {dialogueStep >= 3 && (
                  <div>
                    <span className="text-primary font-bold">AI:</span> {activeScenario.closing}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Call Action Button */}
        <div>
          {callState === 'idle' ? (
            <button
              type="button"
              onClick={startCall}
              className="w-full sm:w-auto px-6 py-3 border border-white hover:bg-white hover:text-black transition-colors uppercase font-bold flex items-center justify-center gap-2"
            >
              <span>INITIATE VOICE SIMULATION</span>
              <span className="text-primary text-[10px]">■</span>
              <span>-&gt;</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={endCall}
              className="w-full sm:w-auto px-6 py-3 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors uppercase font-bold flex items-center justify-center gap-2"
            >
              <span>TERMINATE CALL SESSION -&gt;</span>
            </button>
          )}
        </div>

      </div>
    </section>
  )
}
