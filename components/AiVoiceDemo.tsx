'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, PhoneOff, Mic, MicOff, Volume2, Sparkles, Bot, Clock, Shield, CheckCircle } from 'lucide-react'

interface Scenario {
  id: string
  title: string
  industry: string
  agentName: string
  firstMessage: string
  callerMessage: string
  responseMessage: string
}

const scenarios: Scenario[] = [
  {
    id: 'legal',
    title: 'High-Ticket Legal Firm',
    industry: 'Legal',
    agentName: 'Elena (Legal Intake AI)',
    firstMessage: "Good morning, thank you for calling Sterling & Vance Law. How may I direct your legal inquiry today?",
    callerMessage: "I need to schedule an urgent consultation regarding commercial property lease disputes.",
    responseMessage: "I can prioritize that for you. Attorney Vance has availability tomorrow at 2:00 PM or Thursday at 10:00 AM EST. Would you like me to reserve the 2:00 PM slot and send the intake confirmation to your phone?"
  },
  {
    id: 'dental',
    title: 'Private Healthcare Clinic',
    industry: 'Healthcare',
    agentName: 'Aria (Clinic Coordinator AI)',
    firstMessage: "Hello! You've reached Beacon Dental & Orthodontics. Are you calling to book a visit or do you have an inquiry?",
    callerMessage: "Hi, I have a broken crown and need to see Dr. Miller as soon as possible.",
    responseMessage: "I'm sorry to hear that. For emergency restorative visits, Dr. Miller has a priority opening today at 3:30 PM. I'll secure that for you now. Can I verify your date of birth?"
  },
  {
    id: 'realestate',
    title: 'Commercial Real Estate',
    industry: 'Real Estate',
    agentName: 'Marcus (Property Advisor AI)',
    firstMessage: "Welcome to Skyline Commercial Realty. Looking for property acquisitions, leasing, or scheduling a site tour?",
    callerMessage: "I'm interested in viewing the 12,000 sq ft warehouse on Industrial Parkway.",
    responseMessage: "Excellent. That property features 3 loading docks and 24ft clearance. Our commercial lead, David, is conducting tours this Wednesday at 11 AM. Shall I add your team to the tour roster?"
  }
]

export default function AiVoiceDemo() {
  const [activeScenario, setActiveScenario] = useState<Scenario>(scenarios[0])
  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected'>('idle')
  const [isMuted, setIsMuted] = useState(false)
  const [chatStep, setChatStep] = useState<number>(0)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [seconds, setSeconds] = useState(0)

  // Timer
  useEffect(() => {
    let timer: any
    if (callState === 'connected') {
      timer = setInterval(() => {
        setSeconds((s) => s + 1)
      }, 1000)
    } else {
      setSeconds(0)
    }
    return () => clearInterval(timer)
  }, [callState])

  const speakMessage = (text: string, onEnd?: () => void) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.05
      utterance.pitch = 1.0
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => {
        setIsSpeaking(false)
        if (onEnd) onEnd()
      }
      utterance.onerror = () => {
        setIsSpeaking(false)
        if (onEnd) onEnd()
      }
      window.speechSynthesis.speak(utterance)
    } else {
      setIsSpeaking(true)
      setTimeout(() => {
        setIsSpeaking(false)
        if (onEnd) onEnd()
      }, 3000)
    }
  }

  const startCall = () => {
    setCallState('calling')
    setChatStep(0)
    setTimeout(() => {
      setCallState('connected')
      setChatStep(1)
      speakMessage(activeScenario.firstMessage, () => {
        // After AI speaks, simulate caller responding after 1.5s
        setTimeout(() => {
          setChatStep(2)
          setTimeout(() => {
            setChatStep(3)
            speakMessage(activeScenario.responseMessage)
          }, 1800)
        }, 1500)
      })
    }, 1500)
  }

  const endCall = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setCallState('idle')
    setChatStep(0)
    setIsSpeaking(false)
  }

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <section id="ai-voice-demo" className="py-28 bg-background relative overflow-hidden border-t border-gray-900">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs font-mono text-primary mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE VOICE SIMULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Experience the <span className="text-primary">Sub-300ms</span> AI Voice Receptionist
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Zero robot tone. Zero frustrating delay. Natural, contextual phone conversations that triage inquiries and sync straight to your CRM.
          </p>
        </div>

        {/* Demo Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Scenario Selectors & Benefits */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-mono text-gray-400 tracking-wider">Select Industry Scenario</span>
              <div className="space-y-3">
                {scenarios.map((sc) => {
                  const isSelected = activeScenario.id === sc.id
                  return (
                    <button
                      key={sc.id}
                      onClick={() => {
                        endCall()
                        setActiveScenario(sc)
                      }}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                        isSelected
                          ? 'bg-surface/90 border-primary shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                          : 'bg-surface/40 border-gray-800 hover:border-gray-700 hover:bg-surface/60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">{sc.title}</span>
                        <span className="text-[10px] font-mono uppercase bg-primary/10 text-primary px-2 py-0.5 rounded">
                          {sc.industry}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">{sc.agentName}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="p-5 rounded-2xl bg-surface/40 border border-gray-800/80 space-y-3">
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                <span>Instant Google Calendar & CRM booking</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                <span>Real-time Twilio, Vapi & Bland.ai telephony</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                <span>Warm transfer to human staff for VIP clients</span>
              </div>
            </div>
          </div>

          {/* Right Column: Virtual Smartphone / Calling Terminal */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-glass-panel border border-gray-800 p-6 md:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
              
              {/* Header inside phone console */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{activeScenario.agentName}</div>
                    <div className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${callState === 'connected' ? 'bg-primary animate-pulse' : 'bg-gray-500'}`} />
                      <span>{callState === 'connected' ? `Live • ${formatTime(seconds)}` : callState === 'calling' ? 'Connecting...' : 'Ready to Test'}</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs font-mono px-3 py-1 rounded-full bg-surface border border-gray-800 text-gray-400">
                  Latency: 280ms
                </div>
              </div>

              {/* Waveform / Audio Visualizer Display */}
              <div className="py-8 flex flex-col items-center justify-center min-h-[180px]">
                {callState === 'idle' && (
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-surface border border-gray-800 flex items-center justify-center mx-auto text-primary">
                      <Phone className="w-7 h-7" />
                    </div>
                    <p className="text-sm text-gray-400">Click below to start a live audio simulation with the AI Receptionist</p>
                  </div>
                )}

                {callState === 'calling' && (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto animate-pulse text-primary">
                      <Phone className="w-7 h-7" />
                    </div>
                    <span className="text-sm font-mono text-primary">Establishing low-latency SIP connection...</span>
                  </div>
                )}

                {callState === 'connected' && (
                  <div className="w-full space-y-6">
                    {/* Animated Waveform Bars */}
                    <div className="flex items-center justify-center gap-1.5 h-16">
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            height: isSpeaking
                              ? [10, Math.sin(i * 0.5) * 35 + 25, 12]
                              : [6, 12, 6],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: isSpeaking ? 0.4 + (i % 5) * 0.1 : 1.2,
                            ease: 'easeInOut',
                          }}
                          className={`w-1.5 rounded-full ${
                            isSpeaking ? 'bg-primary' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Dialogue Transcript Stream */}
                    <div className="space-y-3 bg-surface/60 rounded-xl p-4 border border-gray-800 text-xs font-sans max-h-48 overflow-y-auto">
                      {chatStep >= 1 && (
                        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
                          <span className="font-bold text-primary shrink-0">AI:</span>
                          <span className="text-gray-200">{activeScenario.firstMessage}</span>
                        </motion.div>
                      )}
                      {chatStep >= 2 && (
                        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
                          <span className="font-bold text-gray-400 shrink-0">Caller:</span>
                          <span className="text-gray-300 italic">{activeScenario.callerMessage}</span>
                        </motion.div>
                      )}
                      {chatStep >= 3 && (
                        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
                          <span className="font-bold text-primary shrink-0">AI:</span>
                          <span className="text-gray-200">{activeScenario.responseMessage}</span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Controls */}
              <div className="pt-6 border-t border-gray-800/80 flex items-center justify-center gap-4">
                {callState === 'idle' ? (
                  <button
                    onClick={startCall}
                    className="w-full py-4 bg-primary hover:bg-primaryHover text-background font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.45)] active:scale-95"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call AI Receptionist Now</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-4 w-full">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`flex-1 py-3.5 rounded-xl border flex items-center justify-center gap-2 text-sm font-medium transition-all ${
                        isMuted
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-surface border-gray-700 text-gray-300 hover:text-white'
                      }`}
                    >
                      {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                    </button>
                    
                    <button
                      onClick={endCall}
                      className="flex-1 py-3.5 bg-red-600/90 hover:bg-red-600 text-white rounded-xl flex items-center justify-center gap-2 text-sm font-bold shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all active:scale-95"
                    >
                      <PhoneOff className="w-4 h-4" />
                      <span>End Call</span>
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
