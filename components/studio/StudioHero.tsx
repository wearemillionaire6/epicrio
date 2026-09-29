'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

export default function StudioHero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  }

  return (
    <section
      ref={ref}
      id="hero"
      className="w-full min-h-[92vh] flex items-center pt-28 pb-16 lg:py-24 border-b border-zinc-100/80 bg-white"
    >
      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center w-full">
          {/* Left: Direct Value Proposition (Editorial & High Taste) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="lg:col-span-7 space-y-7 sm:space-y-8"
          >
            {/* Eyebrow Live Badge */}
            <motion.div variants={itemVariants} className="inline-flex">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200/80 bg-zinc-50/80 shadow-xs text-xs font-medium text-zinc-700">
                <span className="w-2 h-2 rounded-full bg-zinc-950 animate-pulse" />
                <span>Autonomous Operations Infrastructure</span>
              </div>
            </motion.div>

            {/* Primary Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-display font-semibold tracking-[-0.035em] leading-[1.08] text-zinc-950"
            >
              Automate the work your team{' '}
              <span className="text-zinc-400 font-normal">shouldn't be doing.</span>
            </motion.h1>

            {/* Outcome Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-zinc-500 leading-relaxed max-w-2xl font-normal font-sans"
            >
              From 24/7 AI phone reception to autonomous CRM pipelines and back-office invoicing — one integrated system, zero manual data entry.
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              variants={itemVariants}
              className="pt-2 flex flex-wrap items-center gap-4 sm:gap-5"
            >
              <Link href="/book">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-7 sm:px-8 py-3.5 sm:py-4 text-sm font-medium rounded-full bg-zinc-950 hover:bg-zinc-800 text-white shadow-sm transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>Book a 20-Min Systems Audit</span>
                  <span>&rarr;</span>
                </motion.button>
              </Link>
              <a
                href="#suite"
                className="px-6 sm:px-7 py-3.5 sm:py-4 text-sm font-medium rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 transition-colors cursor-pointer shadow-xs"
              >
                See how it works
              </a>
            </motion.div>

            {/* Live Metric Proof Strip */}
            <motion.div
              variants={itemVariants}
              className="pt-6 sm:pt-8 border-t border-zinc-100 grid grid-cols-3 gap-6 sm:gap-8 text-left"
            >
              <div>
                <div className="font-semibold text-2xl sm:text-3xl text-zinc-950 font-display">
                  100%
                </div>
                <div className="text-zinc-500 text-xs sm:text-[13px] mt-1 font-sans">
                  Call answer rate
                </div>
              </div>
              <div>
                <div className="font-semibold text-2xl sm:text-3xl text-zinc-950 font-display">
                  35+ hrs
                </div>
                <div className="text-zinc-500 text-xs sm:text-[13px] mt-1 font-sans">
                  Saved weekly
                </div>
              </div>
              <div>
                <div className="font-semibold text-2xl sm:text-3xl text-zinc-950 font-display">
                  48 hrs
                </div>
                <div className="text-zinc-500 text-xs sm:text-[13px] mt-1 font-sans">
                  To deployment
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: The Operations Transformation Cockpit (Fills screen proportionately) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.98, y: 20 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] as const }}
            className="lg:col-span-5 rounded-3xl p-6 sm:p-8 space-y-5 bg-zinc-50/70 border border-zinc-200/70 shadow-sm backdrop-blur-xl w-full"
          >
            <div className="pb-3 border-b border-zinc-200/80 flex items-center justify-between">
              <span className="text-sm font-semibold text-zinc-900 tracking-tight font-sans">
                The Epicrio Effect
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-zinc-950 text-white shadow-xs">
                AUTOPILOT
              </span>
            </div>

            <div className="space-y-4">
              {/* Card 1: Inbound Calls */}
              <div className="p-4 sm:p-5 rounded-2xl border border-zinc-200/80 bg-white space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-rose-600 flex items-center gap-1.5">
                    <span>✕</span>
                    <span>Before Epicrio:</span>
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono uppercase">Before</span>
                </div>
                <p className="text-xs sm:text-[13px] text-zinc-500 leading-relaxed font-sans">
                  Staff answering 40 repetitive phone calls a day, missing late-night emergency inquiries, and scribbling appointments on desk paper.
                </p>

                <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-950 flex items-center gap-1.5">
                    <span>✓</span>
                    <span>With Epicrio:</span>
                  </span>
                  <span className="text-[10px] text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded font-medium font-mono uppercase">
                    After
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-zinc-950 font-medium leading-relaxed font-sans">
                  AI Voice Receptionist answers 24/7 in 2 rings, answers FAQs, and books confirmed appointments directly into Google Calendar or Cal.com.
                </p>
              </div>

              {/* Card 2: CRM & Paperwork */}
              <div className="p-4 sm:p-5 rounded-2xl border border-zinc-200/80 bg-white space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-rose-600 flex items-center gap-1.5">
                    <span>✕</span>
                    <span>Before Epicrio:</span>
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono uppercase">Before</span>
                </div>
                <p className="text-xs sm:text-[13px] text-zinc-500 leading-relaxed font-sans">
                  Staff losing 3 hours daily copy-pasting customer names across spreadsheets, chasing signatures, and manually billing on Stripe.
                </p>

                <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-950 flex items-center gap-1.5">
                    <span>✓</span>
                    <span>With Epicrio:</span>
                  </span>
                  <span className="text-[10px] text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded font-medium font-mono uppercase">
                    After
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-zinc-950 font-medium leading-relaxed font-sans">
                  Autonomous back-office creates contracts, triggers Stripe invoices, logs details in CRM, and alerts your team in Slack or WhatsApp.
                </p>
              </div>
            </div>

            <div className="pt-1">
              <Link
                href="/book"
                className="w-full py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white transition-colors cursor-pointer shadow-xs"
              >
                <span>See it live on your business</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
