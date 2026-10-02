'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    step: '1',
    title: 'We set up fresh, dedicated Gmail accounts',
    desc: 'We purchase separate, lookalike web addresses and create official Google Workspace inboxes for your business. We slowly warm up each account so Google trusts them completely.',
  },
  {
    step: '2',
    title: 'We find verified decision-makers',
    desc: 'We carefully identify the exact founders, directors, and executives who can afford your service, and double-check their real work email so zero emails bounce.',
  },
  {
    step: '3',
    title: 'We send friendly emails & deliver replies',
    desc: 'We write simple, polite messages that sound like a thoughtful peer reaching out. When prospects reply, we send them straight to your calendar to book a call.',
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
            How we fill your calendar without you lifting a finger.
          </motion.h2>
          <motion.p variants={blurReveal} className="mt-8 text-[17px] leading-relaxed text-zinc-500 font-sans max-w-2xl">
            You do not need to learn complex software or spend hours prospecting. We handle the entire email setup, list building, and message sending from start to finish.
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
