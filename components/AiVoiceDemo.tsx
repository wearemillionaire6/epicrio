'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, PhoneOff, Mic, MicOff, Terminal, Activity, Volume2, ShieldCheck } from 'lucide-react'

interface VoiceScenario {
  id: string
  title: string
  caller: string
  assistant: string
  openingLine: string
  callerReply: string
  closingLine: string
}

const scenarios: VoiceScenario[] = [
  {
    id: 'legal',
    title: 'Commercial Law Firm',
    caller: 'Inbound Client',
    assistant: 'Elena // Legal Intake AI',
    openingLine: 'Good afternoon, Sterling & Vance Law. Are you calling regarding an existing case or a new consultation?',
    callerReply: 'Hi, I need an urgent consultation regarding a commercial lease dispute for our warehouse.',
    closingLine: 'I can reserve that with Senior Counsel David Vance tomorrow at 2:00 PM EST. I will send the intake confirmation to your mobile right away.',
  },
  {
    id: 'health',
    title: 'Specialty Medical Practice',
    caller: 'Patient',
    assistant: 'Aria // Clinic Coordinator',
    openingLine: 'Beacon Medical Clinic, this is Aria. Are you calling to schedule an appointment or speak with our nursing team?',
    callerReply: 'I have acute knee swelling following surgery and need to be seen today.',
    closingLine: 'Understood. I am flagging this as a priority postoperative review. Dr. Chen has an emergency slot at 3:15 PM today. Let me lock that in for you.',
  },
  {
    id: 'realty',
    title: 'Commercial Real Estate',
    caller: 'Commercial Broker',
    assistant: 'Marcus // Acquisitions AI',
    openingLine: 'Welcome to Skyline Commercial. Looking for property acquisitions, industrial leasing, or site walkthroughs?',
    callerReply: 'We are interested in viewing the 25,000 sq ft logistics facility on Airport Road.',
    closingLine: 'That facility features 4 high-dock bays and 30ft clear height. Our lead broker David is on site Thursday at 11 AM. Shall I add your team to the walkthrough register?',
  },
]

export default function AiVoiceDemo() {
  const [activeScenario, setActiveScenario] = useState<VoiceScenario>(scenarios[0])
  const [status, setStatus] = useState<'idle' | 'calling' | 'connected'>('idle')
  const [isMuted, setIsMuted] = useState(false)
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    let interval: any
    if (status === 'connected') {
      interval = setInterval(() => setDuration((d) => d + 1), 1000)
    } else {
      setDuration(0)
    }
    return () => clearInterval(interval)
  }, [status])

  const speak = (text: string, onDone?: () => void) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utt = new SpeechSynthesisUtterance(text)
      utt.rate = 1.05
      utt.pitch = 1.0
      utt.onstart = () => setIsSpeaking(true)
      utt.onend = () => {
        setIsSpeaking(false)
        if (onDone) onDone()
      }
      utt.onerror = () => {
        setIsSpeaking(false)
        if (onDone) onDone()
      }
      window.speechSynthesis.speak(utt)
    } else {
      setIsSpeaking(true)
      setTimeout(() => {
        setIsSpeaking(false)
        if (onDone) onDone()
      }, 3000)
    }
  }

  const startCall = () => {
    setStatus('calling')
    setDialogueIndex(0)
    setTimeout(() => {
      setStatus('connected')
      setDialogueIndex(1)
      speak(activeScenario.openingLine, () => {
        setTimeout(() => {
          setDialogueIndex(2)
          setTimeout(() => {
            setDialogueIndex(3)
            speak(activeScenario.closingLine)
          }, 1800)
        }, 1200)
      })
    }, 1400)
  }

  const endCall = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setStatus('idle')
    setDialogueIndex(0)
    setIsSpeaking(false)
  }

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60)
    const secs = s % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <section id="ai-voice-demo" className="py-28 bg-[#070B14] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-white/[0.1] text-xs font-mono text-primary mb-4">
            <span>VOICE TELEPHONY // § 15</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-display mb-4">
            Sub-300ms conversational voice agents.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Zero synthetic delay. Zero robotic pauses. High-fidelity SIP telephony that conducts contextual phone intake and schedules appointments straight into your calendar.
          </p>
        </div>

        {/* Audio Console Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Preset Selector & Specs (Left: 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="font-mono text-xs text-slate-500 uppercase tracking-wider">
              Select Vertical Scenario
            </div>

            <div className="space-y-2">
              {scenarios.map((sc) => {
                const isSelected = activeScenario.id === sc.id
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => {
                      endCall()
                      setActiveScenario(sc)
                    }}
                    className={`w-full p-4 rounded-xl border text-left transition-all duration-150 ${
                      isSelected
                        ? 'bg-[#0D1424] border-primary shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                        : 'bg-[#0A0F1D] border-white/[0.08] text-slate-400 hover:border-white/[0.16] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white font-display">
                        {sc.title}
                      </span>
                      <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                        ACTIVE
                      </span>
                    </div>
                    <div className="font-mono text-xs text-slate-500 mt-1">
                      {sc.assistant}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Architecture Telemetry Box */}
            <div className="bg-[#0A0F1D] border border-white/[0.08] rounded-xl p-5 font-mono text-xs space-y-2.5 text-slate-400">
              <div className="flex justify-between">
                <span className="text-slate-500">Telephony Engine:</span>
                <span className="text-slate-200">Twilio SIP Trunking</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ASR Transcriber:</span>
                <span className="text-slate-200">Deepgram Nova-2 (Streaming)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Orchestrator:</span>
                <span className="text-slate-200">Vapi.ai / Custom WebSocket</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Measured Latency:</span>
                <span className="text-primary">264ms end-to-end</span>
              </div>
            </div>
          </div>

          {/* Virtual Telephony Station (Right: 7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#0D1424] border border-white/[0.12] rounded-xl p-6 sm:p-8">
              
              {/* Top Station Bar */}
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-black/40 border border-white/[0.1] flex items-center justify-center font-mono text-xs text-primary font-bold">
                    SIP
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white font-display">
                      {activeScenario.assistant}
                    </div>
                    <div className="font-mono text-xs text-slate-400 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${status === 'connected' ? 'bg-primary animate-pulse' : 'bg-slate-600'}`} />
                      <span>{status === 'connected' ? `CONNECTED // ${formatTimer(duration)}` : status === 'calling' ? 'NEGOTIATING SIP...' : 'STATION READY'}</span>
                    </div>
                  </div>
                </div>

                <div className="font-mono text-xs text-slate-400 bg-black/40 px-3 py-1 rounded border border-white/[0.08]">
                  OPUS 48kHz
                </div>
              </div>

              {/* Waveform / Visualizer */}
              <div className="py-8 flex flex-col items-center justify-center min-h-[160px]">
                {status === 'idle' && (
                  <div className="text-center space-y-2">
                    <p className="text-xs font-mono text-slate-400">
                      Press below to initiate interactive SIP voice simulation
                    </p>
                  </div>
                )}

                {status === 'calling' && (
                  <div className="text-center space-y-2">
                    <Activity className="w-8 h-8 text-primary animate-pulse mx-auto" />
                    <span className="font-mono text-xs text-primary">
                      Establishing low-latency WebRTC audio stream...
                    </span>
                  </div>
                )}

                {status === 'connected' && (
                  <div className="w-full space-y-6">
                    {/* Audio Bars */}
                    <div className="flex items-center justify-center gap-1 h-14">
                      {[...Array(24)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            height: isSpeaking
                              ? [8, Math.sin(i * 0.4) * 28 + 20, 8]
                              : [4, 10, 4],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: isSpeaking ? 0.35 + (i % 6) * 0.08 : 1.4,
                            ease: 'easeInOut',
                          }}
                          className={`w-1 rounded-full ${
                            isSpeaking ? 'bg-primary' : 'bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Dialogue Transcript Stream */}
                    <div className="space-y-3 bg-[#070B14] p-4 rounded-lg border border-white/[0.08] font-mono text-xs">
                      {dialogueIndex >= 1 && (
                        <div className="flex gap-2">
                          <span className="text-primary font-semibold">AI:</span>
                          <span className="text-slate-200">{activeScenario.openingLine}</span>
                        </div>
                      )}
                      {dialogueIndex >= 2 && (
                        <div className="flex gap-2">
                          <span className="text-slate-500 font-semibold">Caller:</span>
                          <span className="text-slate-300">{activeScenario.callerReply}</span>
                        </div>
                      )}
                      {dialogueIndex >= 3 && (
                        <div className="flex gap-2">
                          <span className="text-primary font-semibold">AI:</span>
                          <span className="text-slate-200">{activeScenario.closingLine}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="pt-4 border-t border-white/[0.08]">
                {status === 'idle' ? (
                  <button
                    type="button"
                    onClick={startCall}
                    className="w-full py-3.5 bg-primary hover:bg-primaryHover text-[#070B14] font-semibold rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Initiate Voice Simulation</span>
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      className={`py-3 rounded-lg border font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                        isMuted
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-[#070B14] border-white/[0.12] text-slate-300 hover:text-white'
                      }`}
                    >
                      {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={endCall}
                      className="py-3 bg-primary/90 hover:bg-primary text-black rounded-lg font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-bold"
                    >
                      <PhoneOff className="w-4 h-4" />
                      <span>Terminate Call</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
