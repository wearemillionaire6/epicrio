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

export default function StudioThesis() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const } }
  }

  return (
    <section id="how-it-works" className="py-20 lg:py-28 border-b border-zinc-100/80 bg-white">
      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const }}
          className="max-w-2xl mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 font-medium text-xs mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            How it works
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-medium tracking-[-0.03em] text-[#0A0A0A]">
            How we fill your calendar without you lifting a finger.
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-zinc-500 font-sans">
            You do not need to learn complex software or spend hours prospecting. We handle the entire email setup, list building, and message sending from start to finish.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-8 left-8 right-8 h-px bg-zinc-100 -z-10" />

          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              variants={itemVariants}
              className="relative bg-white"
            >
              <div className="text-4xl font-display font-medium text-zinc-200 mb-6">
                0{item.step}
              </div>
              <h3 className="text-base font-medium text-[#0A0A0A] mb-3 font-sans">
                {item.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-zinc-500 font-sans">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
