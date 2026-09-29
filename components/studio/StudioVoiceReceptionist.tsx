'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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
    title: 'Pricing & Service',
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
  {
    id: 'hindi',
    title: 'Multilingual (Hindi / English)',
    callerType: 'Bilingual Caller (Hindi / Hinglish)',
    dialogue: [
      {
        speaker: 'AI Receptionist',
        text: 'नमस्ते! Thank you for calling Epicrio. मैं आपकी क्या सहायता कर सकती हूँ?',
      },
      {
        speaker: 'Caller',
        text: 'नमस्ते! मुझे अपने बिज़नेस के लिए ऑटोमेशन और वॉइस रिसेप्शनिस्ट के बारे में बात करनी है। क्या कल कोई स्लॉट खाली है?',
      },
      {
        speaker: 'AI Receptionist',
        text: 'जी बिल्कुल! हमारे पास कल दोपहर 2:00 बजे और शाम 4:30 बजे का समय उपलब्ध है। आपके लिए कौन सा समय बेहतर रहेगा?',
      },
      {
        speaker: 'Caller',
        text: 'कल दोपहर 2:00 बजे का स्लॉट सही रहेगा।',
      },
      {
        speaker: 'AI Receptionist',
        text: 'बहुत बढ़िया! आपकी मीटिंग कल दोपहर 2:00 बजे शेड्यूल कर दी गई है। मैंने आपके फ़ोन नंबर पर SMS कन्फर्मेशन भेज दिया है। धन्यवाद!',
      },
    ],
  },
]

export default function StudioVoiceReceptionist() {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

  const activeScenario = callScenarios[activeScenarioIndex]
  const currentDialogue = activeScenario.dialogue

  const handleSelectScenario = (index: number) => {
    setActiveScenarioIndex(index)
    setCurrentMessageIndex(0)
    setIsFinished(false)
    setIsTyping(true)
  }

  useEffect(() => {
    if (isFinished) return

    setIsTyping(true)
    const typeTimeout = setTimeout(() => {
      setIsTyping(false)
      
      if (currentMessageIndex < currentDialogue.length - 1) {
        const pauseTimeout = setTimeout(() => {
          setCurrentMessageIndex((prev) => prev + 1)
        }, 800)
        return () => clearTimeout(pauseTimeout)
      } else {
        setIsFinished(true)
      }
    }, 1500) // Simulated delay per message

    return () => clearTimeout(typeTimeout)
  }, [currentMessageIndex, currentDialogue, isFinished])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [currentMessageIndex, isTyping])

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const, staggerChildren: 0.08 }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const } }
  }

  return (
    <motion.section 
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      id="voice-receptionist" 
      className="py-20 lg:py-28 border-b border-zinc-100/80 bg-white"
    >
      <div className="w-full max-w-4xl mb-16 px-4 sm:px-6 mx-auto text-center">
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 font-medium text-xs mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />
          <span>AI Voice Receptionist</span>
        </motion.div>
        
        <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-display font-medium tracking-[-0.03em] text-[#0A0A0A]">
          Every call answered. Every appointment booked.
        </motion.h2>
        
        <motion.p variants={itemVariants} className="mt-6 text-[15px] text-zinc-500 max-w-2xl mx-auto leading-relaxed font-sans">
          Your AI receptionist picks up in two rings, speaks fluently in Hindi, English, Spanish, and 30+ global languages, answers questions with natural warmth, and books directly into your calendar — 24/7.
        </motion.p>
      </div>

      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Chat Simulation */}
        <motion.div variants={itemVariants} className="lg:col-span-7 bg-white rounded-2xl p-8 border border-zinc-100 shadow-[0_0_0_1px_rgba(0,0,0,0.04)]">
          <div className="flex flex-wrap gap-2 mb-6">
            {callScenarios.map((sc, idx) => {
              const isSelected = activeScenarioIndex === idx
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => handleSelectScenario(idx)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-zinc-900 text-white'
                      : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100'
                  }`}
                >
                  {sc.title}
                </button>
              )
            })}
          </div>

          <div className="border-t border-zinc-100 pt-6">
            <div className="flex items-center justify-between text-xs text-zinc-400 pb-4">
              <span className="flex items-center gap-2">
                <span>Live scenario: <strong className="text-zinc-600 font-medium">{activeScenario.callerType}</strong></span>
              </span>
              <span className="hidden sm:inline">Sub-300ms response</span>
            </div>

            <div
              ref={chatContainerRef}
              className="min-h-[400px] max-h-[450px] overflow-y-auto space-y-6 pr-4 pb-4 scrollbar-hide"
            >
              {currentDialogue.slice(0, currentMessageIndex + 1).map((item, idx) => {
                const isAI = item.speaker === 'AI Receptionist'
                
                return (
                  <motion.div
                    key={`${activeScenario.id}-${idx}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex flex-col ${isAI ? 'items-start' : 'items-end'}`}
                  >
                    <div className="text-[11px] text-zinc-400 mb-1.5 px-1">
                      {item.speaker}
                    </div>

                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-[14px] leading-relaxed ${
                        isAI
                          ? 'bg-zinc-50 text-zinc-700 rounded-tl-sm'
                          : 'bg-zinc-900 text-white rounded-tr-sm'
                      }`}
                    >
                      {item.text}
                    </div>
                  </motion.div>
                )
              })}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-start"
                >
                  <div className="text-[11px] text-zinc-400 mb-1.5 px-1">
                    {currentDialogue[currentMessageIndex + 1]?.speaker || 'AI Receptionist'}
                  </div>
                  <div className="bg-zinc-50 rounded-2xl rounded-tl-sm p-4 py-5 flex gap-1.5 items-center">
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-zinc-400" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-zinc-400" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-zinc-400" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                  </div>
                </motion.div>
              )}
            </div>
            
            <div className="pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-zinc-400">
                {isFinished ? 'Simulation finished' : 'Simulating live conversation...'}
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleSelectScenario(activeScenarioIndex)}
                  className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
                >
                  ↺ Replay
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const widget = document.querySelector('elevenlabs-convai')
                    if (widget) {
                      const btn = widget.shadowRoot?.querySelector('button') || widget
                      ;(btn as HTMLElement)?.click()
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Talk Live to Sarah (Mic Test)</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: What Happens */}
        <motion.div variants={itemVariants} className="lg:col-span-5 bg-white rounded-2xl p-8 border border-zinc-100 shadow-[0_0_0_1px_rgba(0,0,0,0.04)] h-full flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-medium text-[#0A0A0A] mb-8">
              What happens automatically after every call:
            </h3>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-zinc-50 text-zinc-500 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-[15px] font-medium text-[#0A0A0A]">Instant Calendar Booking</h4>
                  <p className="text-[14px] mt-1.5 leading-relaxed text-zinc-500">
                    The slot is reserved directly in your Google Calendar or Cal.com without double-bookings.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-zinc-50 text-zinc-500 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-[15px] font-medium text-[#0A0A0A]">SMS Text to Customer</h4>
                  <p className="text-[14px] mt-1.5 leading-relaxed text-zinc-500">
                    The caller immediately gets a branded text message with appointment time, location, and instructions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-zinc-50 text-zinc-500 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-[15px] font-medium text-[#0A0A0A]">Instant Team Alert</h4>
                  <p className="text-[14px] mt-1.5 leading-relaxed text-zinc-500">
                    Your phone, WhatsApp, or Slack gets a concise summary and audio recording so your team is prepared.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-zinc-50 text-zinc-500 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="text-[15px] font-medium text-[#0A0A0A]">Logged in Your CRM</h4>
                  <p className="text-[14px] mt-1.5 leading-relaxed text-zinc-500">
                    Customer name, phone number, and conversation notes are automatically filed into your CRM with zero manual typing.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-10">
            <motion.a
              href="#apply"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 text-sm font-medium rounded-full bg-zinc-900 text-white flex items-center justify-center gap-2"
            >
              Get your AI receptionist
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
