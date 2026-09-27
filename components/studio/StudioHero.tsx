'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface StudioHeroProps {
  isDark?: boolean
}

export default function StudioHero({ isDark = false }: StudioHeroProps) {
  return (
    <section id="hero" className="pt-24 sm:pt-28 pb-12 sm:pb-16 lg:min-h-[82vh] flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center w-full">
        {/* Left: Direct Value Proposition (Editorial & High Taste) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Eyebrow Live Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 bg-white/80 shadow-sm text-xs font-medium text-zinc-800">
            <span className="w-2 h-2 rounded-full bg-zinc-950 animate-pulse" />
            <span>Operations Automation Infrastructure</span>
          </div>

          {/* Primary Statement */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-slate-900 font-sans">
            We automate the work your team shouldn't be doing manually.
          </h1>

          {/* Non-Technical Outcome Description */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
            From 24/7 AI phone reception to autonomous CRM pipelines and back-office invoicing — one integrated system, zero manual data entry.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/book"
              className="px-7 py-3.5 text-sm font-semibold rounded-full transition-all duration-150 shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:shadow-xl bg-zinc-950 hover:bg-zinc-800 text-white active:scale-[0.98] cursor-pointer flex items-center gap-2"
            >
              <span>Book a 20-Min Systems Audit</span>
              <span>&rarr;</span>
            </Link>
            <a
              href="#suite"
              className="px-6 py-3.5 text-sm font-medium rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-900 hover:border-zinc-400 transition-all duration-150 shadow-sm active:scale-[0.98] cursor-pointer"
            >
              See how it works
            </a>
          </div>

          {/* Live Metric Proof Strip */}
          <div className="pt-4 border-t border-black/10 grid grid-cols-3 gap-4 text-xs">
            <div>
              <div className="font-semibold text-base text-slate-900 font-sans">100%</div>
              <div className="text-zinc-500 text-[11px] mt-0.5">Call answer rate</div>
            </div>
            <div>
              <div className="font-semibold text-base text-slate-900 font-sans">35h</div>
              <div className="text-zinc-500 text-[11px] mt-0.5">Saved weekly</div>
            </div>
            <div>
              <div className="font-semibold text-base text-slate-900 font-sans">48hrs</div>
              <div className="text-zinc-500 text-[11px] mt-0.5">To deployment</div>
            </div>
          </div>
        </motion.div>

        {/* Right: The Operations Transformation Cockpit */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5 rounded-3xl p-7 sm:p-8 space-y-6 backdrop-blur-xl border border-black/[0.06] bg-white/90 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)]"
        >
          <div className="pb-3 border-b border-black/10 flex items-center justify-between">
            <span className="text-sm font-bold text-zinc-900 tracking-tight font-sans">
              The Epicrio Effect
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-zinc-950 text-white shadow-xs">
              AUTOPILOT
            </span>
          </div>

          <div className="space-y-4">
            {/* Card 1: Phone Calls */}
            <div className="p-4 rounded-2xl border border-black/5 bg-zinc-50/70 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-rose-600 flex items-center gap-1.5">
                  <span>✕</span>
                  <span>Before Epicrio:</span>
                </span>
                <span className="text-[11px] text-zinc-400 font-sans">Before</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Reps stuck answering 40 repetitive phone calls a day, missing late-night emergency inquiries, and scribbling appointments on desk paper.
              </p>

              <div className="pt-2 border-t border-black/5 flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-950 flex items-center gap-1.5">
                  <span className="text-zinc-950 font-bold">✓</span>
                  <span>With Epicrio:</span>
                </span>
                <span className="text-[11px] text-zinc-900 bg-zinc-200/60 px-2 py-0.5 rounded font-medium font-sans">After</span>
              </div>
              <p className="text-xs text-zinc-900 font-medium leading-relaxed">
                AI Voice Receptionist answers 24/7 in 2 rings, answers common questions, and books confirmed slots directly into Google Calendar.
              </p>
            </div>

            {/* Card 2: CRM & Paperwork */}
            <div className="p-4 rounded-2xl border border-black/5 bg-zinc-50/70 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-rose-600 flex items-center gap-1.5">
                  <span>✕</span>
                  <span>Before Epicrio:</span>
                </span>
                <span className="text-[11px] text-zinc-400 font-sans">Before</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Staff losing 3 hours daily copy-pasting customer names across spreadsheets, chasing signatures, and manually billing on Stripe.
              </p>

              <div className="pt-2 border-t border-black/5 flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-950 flex items-center gap-1.5">
                  <span className="text-zinc-950 font-bold">✓</span>
                  <span>With Epicrio:</span>
                </span>
                <span className="text-[11px] text-zinc-900 bg-zinc-200/60 px-2 py-0.5 rounded font-medium font-sans">After</span>
              </div>
              <p className="text-xs text-zinc-900 font-medium leading-relaxed">
                Autonomous back-office creates contracts, triggers Stripe invoices, logs details in CRM, and alerts your team in Slack/WhatsApp.
              </p>
            </div>
          </div>

          <div className="pt-1">
            <Link
              href="/book"
              className="w-full py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200/60 transition-all duration-150 cursor-pointer shadow-xs active:scale-[0.99]"
            >
              <span>See it live on your business</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
