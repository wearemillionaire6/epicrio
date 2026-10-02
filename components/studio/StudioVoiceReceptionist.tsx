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
    title: 'Emergency Routing',
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
    title: 'Multilingual Support',
    callerType: 'Bilingual Caller',
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

const EASE = [0.16, 1, 0.3, 1] as const
const blurReveal = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } }
}

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
    }, 1500)

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

  return (
    <motion.section 
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } }
      }}
      id="voice-receptionist" 
      className="py-32 md:py-40 bg-white border-b border-zinc-100"
    >
      <div className="w-full max-w-4xl mb-24 px-4 sm:px-6 mx-auto text-center flex flex-col items-center">
        <motion.div variants={blurReveal} className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px bg-zinc-300" />
          <span className="text-[13px] font-sans font-medium text-zinc-400 uppercase tracking-[0.15em]">
            AI Voice Receptionist
          </span>
          <div className="w-8 h-px bg-zinc-300" />
        </motion.div>
        
        <motion.h2 variants={blurReveal} className="text-5xl md:text-6xl font-display tracking-tight text-[#0A0A0A]">
          Every call answered. Every appointment booked.
        </motion.h2>
        
        <motion.p variants={blurReveal} className="mt-8 text-[17px] text-zinc-500 max-w-2xl mx-auto leading-relaxed font-sans">
          Your AI receptionist picks up in two rings, speaks fluently in multiple global languages, answers questions with natural warmth, and books directly into your calendar — 24/7.
        </motion.p>
      </div>

      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Chat Simulation */}
        <motion.div variants={blurReveal} className="lg:col-span-7 bg-[#FAFAFA] rounded-3xl p-10 border border-[#F0F0F0] shadow-sm">
          <div className="flex flex-wrap gap-6 mb-10 border-b border-zinc-200">
            {callScenarios.map((sc, idx) => {
              const isSelected = activeScenarioIndex === idx
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => handleSelectScenario(idx)}
                  className={`pb-4 text-[15px] font-medium transition-all border-b-2 relative top-[1px] ${
                    isSelected
                      ? 'border-[#0A0A0A] text-[#0A0A0A]'
                      : 'border-transparent text-zinc-400 hover:text-zinc-600'
                  }`}
                >
                  {sc.title}
                </button>
              )
            })}
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between pb-8">
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-mono text-zinc-400 uppercase tracking-widest">
                  Live Scenario:
                </span>
                <span className="text-[14px] font-medium text-zinc-700">
                  {activeScenario.callerType}
                </span>
              </div>
              <div className="flex items-center gap-1.5 h-4">
                {/* Waveform Visualization */}
                {[1, 2, 3, 4, 5].map((bar) => (
                  <motion.div
                    key={bar}
                    animate={
                      isTyping 
                        ? { height: ['4px', '14px', '4px'] } 
                        : { height: '4px' }
                    }
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: bar * 0.1,
                      ease: "easeInOut"
                    }}
                    className="w-1 bg-zinc-300 rounded-full"
                  />
                ))}
              </div>
            </div>

            <div
              ref={chatContainerRef}
              className="min-h-[450px] max-h-[550px] overflow-y-auto space-y-8 pr-4 pb-4 scrollbar-hide"
            >
              {currentDialogue.slice(0, currentMessageIndex + 1).map((item, idx) => {
                const isAI = item.speaker === 'AI Receptionist'
                
                return (
                  <motion.div
                    key={`${activeScenario.id}-${idx}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className={`flex flex-col ${isAI ? 'items-start' : 'items-end'}`}
                  >
                    <div className="text-[12px] font-medium tracking-wide text-zinc-400 mb-2 px-2 uppercase">
                      {item.speaker}
                    </div>

                    <div
                      className={`max-w-[80%] rounded-2xl p-5 text-[16px] leading-relaxed font-sans shadow-sm ${
                        isAI
                          ? 'bg-white text-zinc-800 rounded-tl-sm border border-zinc-100'
                          : 'bg-[#0A0A0A] text-white rounded-tr-sm'
                      }`}
                    >
                      {item.text}
                    </div>
                  </motion.div>
                )
              })}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-start"
                >
                  <div className="text-[12px] font-medium tracking-wide text-zinc-400 mb-2 px-2 uppercase">
                    {currentDialogue[currentMessageIndex + 1]?.speaker || 'AI Receptionist'}
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-sm p-5 border border-zinc-100 shadow-sm flex gap-2 items-center h-[56px]">
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-zinc-400" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-zinc-400" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-zinc-400" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                  </div>
                </motion.div>
              )}
            </div>
            
            <div className="pt-8 mt-4 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4">
              <span className="text-[13px] font-mono text-zinc-400">
                {isFinished ? 'SIMULATION_COMPLETE' : 'STREAMING_AUDIO...'}
              </span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleSelectScenario(activeScenarioIndex)}
                  className="text-[14px] font-medium text-zinc-500 hover:text-[#0A0A0A] transition-colors"
                >
                  Restart
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A0A0A] hover:bg-zinc-800 text-white text-[14px] font-medium transition-all shadow-md active:scale-95"
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>Talk Live to AI</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: What Happens */}
        <motion.div variants={blurReveal} className="lg:col-span-5 bg-white rounded-3xl p-10 border border-[#F0F0F0] shadow-sm h-full flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-display text-[#0A0A0A] mb-12">
              Automatic Post-Call Workflow
            </h3>

            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="font-display text-4xl text-zinc-200 mt-[-4px]">
                  1
                </div>
                <div>
                  <h4 className="text-[17px] font-medium text-[#0A0A0A]">Instant Calendar Booking</h4>
                  <p className="text-[15px] mt-2 leading-relaxed text-zinc-500 font-sans">
                    The slot is reserved directly in your Google Calendar or Cal.com without double-bookings.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="font-display text-4xl text-zinc-200 mt-[-4px]">
                  2
                </div>
                <div>
                  <h4 className="text-[17px] font-medium text-[#0A0A0A]">SMS Text to Customer</h4>
                  <p className="text-[15px] mt-2 leading-relaxed text-zinc-500 font-sans">
                    The caller immediately gets a branded text message with appointment time, location, and instructions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="font-display text-4xl text-zinc-200 mt-[-4px]">
                  3
                </div>
                <div>
                  <h4 className="text-[17px] font-medium text-[#0A0A0A]">Instant Team Alert</h4>
                  <p className="text-[15px] mt-2 leading-relaxed text-zinc-500 font-sans">
                    Your phone, WhatsApp, or Slack gets a concise summary and audio recording so your team is prepared.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="font-display text-4xl text-zinc-200 mt-[-4px]">
                  4
                </div>
                <div>
                  <h4 className="text-[17px] font-medium text-[#0A0A0A]">Logged in Your CRM</h4>
                  <p className="text-[15px] mt-2 leading-relaxed text-zinc-500 font-sans">
                    Customer name, phone number, and conversation notes are automatically filed into your CRM with zero manual typing.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-12 mt-8 border-t border-[#F0F0F0]">
            <motion.a
              href="#apply"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 text-[15px] font-medium rounded-full bg-[#0A0A0A] text-white flex items-center justify-center gap-2"
            >
              Get your AI receptionist
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
