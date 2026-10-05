'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    step: '1',
    title: 'Telephony & call-forwarding setup',
    desc: 'We configure a dedicated Twilio phone line or set up 2-ring call forwarding from your existing business number — zero downtime, no number changes, no carrier hassle.',
  },
  {
    step: '2',
    title: 'Voice AI training & knowledge base',
    desc: 'We train your AI receptionist on your specific pricing, FAQs, booking availability, and service area. It sounds like your best front-desk hire — warm, accurate, and always on.',
  },
  {
    step: '3',
    title: 'CRM & back-office integration',
    desc: 'We connect your calendar, Stripe invoicing, CRM pipeline, and team alerts on Slack or WhatsApp. Every call flows into a fully automated operational pipeline.',
  },
]

const EASE = [0.16, 1, 0.3, 1] as const
const blurReveal = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } }
}
const cardReveal = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } }
}

export default function StudioThesis() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="how-it-works" className="py-32 md:py-40 bg-white border-b border-zinc-100">
      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } }
          }}
          className="max-w-3xl mb-32"
        >
          <motion.div variants={blurReveal} className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-zinc-300" />
            <span className="text-[13px] font-sans font-medium text-zinc-400 uppercase tracking-[0.15em]">
              How it works
            </span>
          </motion.div>
          <motion.h2 variants={blurReveal} className="text-5xl md:text-6xl font-display tracking-tight text-[#0A0A0A]">
            Live in 48 hours. No disruption to your daily operations.
          </motion.h2>
          <motion.p variants={blurReveal} className="mt-8 text-[17px] leading-relaxed text-zinc-500 font-sans max-w-2xl">
            We handle the entire setup from carrier configuration to CRM integration. You keep running your business while we build the system around it.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 relative"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } }
          }}
        >
          {/* Animated Connecting line for desktop */}
          <motion.div 
            className="hidden md:block absolute top-12 left-12 right-12 h-px bg-[#F0F0F0] -z-10 origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, ease: EASE, delay: 0.2 }}
          />

          {steps.map((item) => (
            <motion.div
              key={item.step}
              variants={cardReveal}
              className="relative bg-white pt-8"
            >
              <div className="absolute -top-12 -left-6 text-9xl font-display text-[#FAFAFA] opacity-80 select-none pointer-events-none -z-10">
                0{item.step}
              </div>
              <h3 className="text-xl font-medium text-[#0A0A0A] mb-4 font-sans relative z-10">
                {item.title}
              </h3>
              <p className="text-[17px] leading-relaxed text-zinc-500 font-sans relative z-10">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
