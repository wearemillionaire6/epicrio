'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface StudioVoiceReceptionistProps {
  isDark: boolean
}

interface DialogueItem {
  speaker: 'AI Receptionist' | 'Caller'
  text: string
}

interface Scenario {
  id: string
  title: string
  callerType: string
  dialogue: DialogueItem[]
}

const callScenarios: Scenario[] = [
  {
    id: 'booking',
    title: 'Appointment Booking',
    callerType: 'New Customer Calling In',
    dialogue: [
      {
        speaker: 'AI Receptionist',
        text: 'Thank you for calling Apex Services! This is Sarah. Are you calling to book a new appointment or inquiring about an existing job?',
      },
      {
        speaker: 'Caller',
        text: 'Hi Sarah, I would like to schedule a service consultation for this Thursday if possible.',
      },
      {
        speaker: 'AI Receptionist',
        text: 'I would be happy to help with that! We have an opening this Thursday at 10:00 AM or 2:30 PM. Which time fits your schedule better?',
      },
      {
        speaker: 'Caller',
        text: 'Thursday at 2:30 PM works perfectly.',
      },
      {
        speaker: 'AI Receptionist',
        text: 'Excellent! I have reserved Thursday at 2:30 PM for you. I just sent a confirmation text message to your phone with all the details. We look forward to seeing you!',
      },
    ],
  },
  {
    id: 'emergency',
    title: 'Emergency Call Routing',
    callerType: 'Urgent Weekend Customer',
    dialogue: [
      {
        speaker: 'AI Receptionist',
        text: 'Emergency dispatch line, this is Sarah. Please describe the urgent issue you are experiencing.',
      },
      {
        speaker: 'Caller',
        text: 'Our main AC compressor just failed and our server room temperature is rapidly climbing past 85 degrees!',
      },
      {
        speaker: 'AI Receptionist',
        text: 'I understand this is a critical priority. I am immediately alerting our on-call technician Marcus. He is currently 12 minutes away and will call your direct line right now.',
      },
      {
        speaker: 'Caller',
        text: 'Thank you so much Sarah, standing by for his call.',
      },
      {
        speaker: 'AI Receptionist',
        text: 'You are welcome. Marcus has received the alert and your facility address. Help is on the way.',
      },
    ],
  },
  {
    id: 'faq',
    title: 'Pricing & Service Inquiries',
    callerType: 'Curious Prospect',
    dialogue: [
      {
        speaker: 'AI Receptionist',
        text: 'Good morning! Thank you for calling Epicrio. How may I direct your call today?',
      },
      {
        speaker: 'Caller',
        text: 'Hi, what are your service hours and do you offer same-day on-site inspections?',
      },
      {
        speaker: 'AI Receptionist',
        text: 'We provide on-site inspections Monday through Saturday from 8 AM to 6 PM, with 24/7 emergency dispatch. Would you like me to book an inspection for your facility?',
      },
      {
        speaker: 'Caller',
        text: 'Yes please, can we schedule one for tomorrow morning?',
      },
      {
        speaker: 'AI Receptionist',
        text: 'Done! I have booked tomorrow at 9:00 AM. I have created your client file and sent the intake link to your phone via SMS.',
      },
    ],
  },
]

export default function StudioVoiceReceptionist({ isDark }: StudioVoiceReceptionistProps) {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0)
  // Which message index is currently being typed (or has been typed)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  // Number of characters displayed for currentMessageIndex
  const [typedChars, setTypedChars] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const activeScenario = callScenarios[activeScenarioIndex]
  const currentDialogue = activeScenario.dialogue

  // Reset typewriter when switching tabs
  const handleSelectScenario = (index: number) => {
    setActiveScenarioIndex(index)
    setCurrentMessageIndex(0)
    setTypedChars(0)
    setIsFinished(false)
  }

  // Typewriter text animation loop
  useEffect(() => {
    if (isFinished) return

    const targetText = currentDialogue[currentMessageIndex]?.text || ''

    // If still typing the current message
    if (typedChars < targetText.length) {
      const typeTimeout = setTimeout(() => {
        // Advance 2-3 characters at a time for brisk, natural typewriter cadence
        setTypedChars((prev) => Math.min(prev + 2, targetText.length))
      }, 22)
      return () => clearTimeout(typeTimeout)
    }

    // Current message is fully typed: pause, then move to next message
    if (typedChars >= targetText.length) {
      if (currentMessageIndex < currentDialogue.length - 1) {
        const pauseTimeout = setTimeout(() => {
          setCurrentMessageIndex((prev) => prev + 1)
          setTypedChars(0)
        }, 550)
        return () => clearTimeout(pauseTimeout)
      } else {
        // All messages in this section finished typing
        setIsFinished(true)
      }
    }
  }, [typedChars, currentMessageIndex, currentDialogue, isFinished])

  // Auto-scroll chat box smoothly as text expands
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [currentMessageIndex, typedChars])

  return (
    <section id="voice-receptionist" className="py-20 border-t border-current/10">
      <div className="max-w-3xl mb-14">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-3.5 shadow-sm ${
          isDark ? 'border-white/10 bg-zinc-900/50 text-zinc-300' : 'border-black/[0.06] bg-white text-zinc-800'
        }`}>
          <span className="w-2 h-2 rounded-full bg-zinc-950" />
          <span>AI voice receptionist</span>
        </div>
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-zinc-950'
          }`}
        >
          Every call answered. Every appointment booked.
        </h2>
        <p
          className={`mt-4 text-base leading-relaxed ${
            isDark ? 'text-zinc-400' : 'text-zinc-600'
          }`}
        >
          Your AI receptionist picks up in two rings, answers questions with warmth, and books directly into your calendar — 24/7, including holidays and weekends.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Text Animation Dialogue Preview (All 3 Sections) */}
        <div
          className={`lg:col-span-7 rounded-3xl p-6 sm:p-8 border backdrop-blur-xl space-y-6 ${
            isDark
              ? 'bg-zinc-900/60 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]'
              : 'bg-white/85 border-black/10 shadow-xl'
          }`}
        >
          {/* Top 3 Scenario Selection Tabs */}
          <div className="flex flex-wrap gap-2.5">
            {callScenarios.map((sc, idx) => {
              const isSelected = activeScenarioIndex === idx
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => handleSelectScenario(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer select-none ${
                    isSelected
                      ? 'bg-zinc-950 text-white shadow-sm'
                      : isDark
                      ? 'bg-white/10 text-zinc-300 hover:text-white hover:bg-white/15'
                      : 'bg-zinc-100 text-zinc-700 hover:text-black hover:bg-zinc-200'
                  }`}
                >
                  {sc.title}
                </button>
              )
            })}
          </div>

          <div className="border-t border-current/10 pt-4">
            {/* Header info matching screenshot */}
            <div className="flex items-center justify-between text-xs text-zinc-400 pb-3 font-sans">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-950 animate-pulse" />
                <span>
                  Live call preview: <strong className="text-zinc-950 font-bold uppercase">{activeScenario.callerType}</strong>
                </span>
              </span>
              <span className="hidden sm:inline opacity-75">Sub-300ms response</span>
            </div>

            {/* Chat Box Container with Text Typewriter Animation */}
            <div
              ref={chatContainerRef}
              className={`rounded-2xl p-5 border min-h-[350px] max-h-[440px] overflow-y-auto space-y-4 ${
                isDark ? 'bg-black/40 border-white/10' : 'bg-zinc-50 border-zinc-200 shadow-inner'
              }`}
            >
              {currentDialogue.slice(0, currentMessageIndex + 1).map((item, idx) => {
                const isAI = item.speaker === 'AI Receptionist'
                const isCurrentlyTyping = idx === currentMessageIndex && !isFinished
                const displayText = isCurrentlyTyping
                  ? item.text.slice(0, typedChars)
                  : item.text

                return (
                  <motion.div
                    key={`${activeScenario.id}-${idx}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex flex-col ${isAI ? 'items-start' : 'items-end'}`}
                  >
                    <div className="text-[11px] font-semibold text-zinc-400 mb-1 px-1 font-sans uppercase tracking-wider">
                      {item.speaker}
                    </div>

                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-[13px] leading-relaxed transition-colors ${
                        isAI
                          ? isDark
                            ? 'bg-zinc-800 text-white rounded-tl-sm border border-white/10'
                            : 'bg-white text-zinc-900 rounded-tl-sm border border-zinc-200 shadow-sm'
                          : 'bg-zinc-950 text-white font-medium rounded-tr-sm shadow-sm'
                      }`}
                    >
                      <span>{displayText}</span>
                      {/* Blinking cursor while this message is actively typing */}
                      {isCurrentlyTyping && (
                        <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle bg-current animate-pulse" />
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-3 text-xs">
              <span className={`text-[11px] ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {isFinished ? '✓ Conversation completed' : 'Streaming live conversation...'}
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleSelectScenario(activeScenarioIndex)}
                  className={`text-xs font-semibold cursor-pointer transition-colors ${
                    isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  ↺ Replay Animation
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSelectScenario((activeScenarioIndex + 1) % callScenarios.length)
                  }
                  className="text-xs font-semibold cursor-pointer transition-colors text-zinc-950 hover:underline"
                >
                  Next Section &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: What Happens Automatically Behind The Scenes */}
        <div
          className={`lg:col-span-5 rounded-3xl p-6 sm:p-8 space-y-6 border backdrop-blur-xl ${
            isDark
              ? 'bg-zinc-900/40 border-white/10 shadow-lg'
              : 'bg-white/80 border-black/10 shadow-lg'
          }`}
        >
          <div className="pb-3 border-b border-current/10">
            <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              What happens automatically after every call:
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200 flex items-center justify-center font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                  Instant Calendar Booking
                </h4>
                <p className={`text-xs mt-0.5 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  The slot is reserved directly in your Google Calendar or Cal.com without double-bookings.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-current/10">
              <div className="w-8 h-8 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200 flex items-center justify-center font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                  SMS Text to Customer
                </h4>
                <p className={`text-xs mt-0.5 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  The caller immediately gets a branded text message with appointment time, location, and instructions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-current/10">
              <div className="w-8 h-8 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200 flex items-center justify-center font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                  Instant Team Alert
                </h4>
                <p className={`text-xs mt-0.5 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Your phone, WhatsApp, or Slack gets a concise summary and audio recording so your team is prepared.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-current/10">
              <div className="w-8 h-8 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200 flex items-center justify-center font-bold text-sm flex-shrink-0">
                4
              </div>
              <div>
                <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                  Logged in Your CRM
                </h4>
                <p className={`text-xs mt-0.5 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Customer name, phone number, and conversation notes are automatically filed into your CRM with zero manual typing.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="#apply"
              className="w-full py-3.5 text-xs font-semibold rounded-full flex items-center justify-center gap-2 transition-all shadow-sm bg-zinc-950 text-white hover:bg-zinc-800 active:scale-[0.99] cursor-pointer"
            >
              <span>Get your AI receptionist</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
