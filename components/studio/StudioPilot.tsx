'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

const valuePillars = [
  {
    title: 'Every Missed Call Goes Straight to Your Competitor',
    desc: 'Over 80% of customers who reach a voicemail do not leave a message—they immediately dial the next company on the list. Capturing just 2 to 3 service calls or clients a month pays for your entire infrastructure many times over.',
    badge: 'Revenue Capture',
  },
  {
    title: 'Under 10% the Cost of Human Front-Desk Payroll',
    desc: 'A full-time in-house receptionist costs $3,500 to $4,500 every month—yet only works 8 hours a day, 5 days a week. Epicrio provides instant, polite 24/7/365 coverage including weekends and late nights for a fraction of that cost.',
    badge: 'Overhead Reduction',
  },
  {
    title: 'Reclaim 25+ Hours of Lost Staff Bandwidth Weekly',
    desc: 'Your experienced staff shouldn\'t lose hours to repetitive scheduling calls, manual spreadsheet copy-pasting, sending calendar links, and chasing invoice signatures. Put routine back-office friction on autonomous autopilot.',
    badge: 'Operational Leverage',
  },
  {
    title: 'Our Accountability: Exact Engineering Delivery',
    desc: 'You know your business and your clients best. Our accountability is to deliver the exact, battle-tested operational system you ask for—tested on staging, seamlessly integrated with your calendar and CRM, and built to run reliably.',
    badge: 'Delivery Standard',
  },
]

export default function StudioPilot() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="why-invest"
      className="py-20 lg:py-28 border-b border-zinc-100/80 bg-white flex flex-col items-center text-center w-full"
    >
      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col items-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const }}
          className="flex flex-col items-center w-full"
        >
          {/* Section Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 font-medium text-xs mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            The Business Case
          </div>

          {/* Section Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-[-0.03em] text-[#0A0A0A] mb-5 max-w-3xl leading-[1.12]">
            The real cost isn't the software. It's the calls and hours you lose every week.
          </h2>

          {/* Subtitle */}
          <p className="text-[15px] sm:text-base leading-relaxed text-zinc-500 font-sans max-w-2xl mb-12">
            You don't need another generic dashboard. You need dependable operational infrastructure that protects your revenue and frees your team to focus on high-value client work.
          </p>

          {/* 4 Value Pillars (2x2 Grid) */}
          <div className="bg-zinc-50/70 border border-zinc-200/80 rounded-3xl p-6 sm:p-10 w-full max-w-5xl text-left mb-10 shadow-2xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {valuePillars.map((pillar, idx) => (
                <div key={idx} className="flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-200/60 text-zinc-800 font-sans">
                        {pillar.badge}
                      </span>
                      <span className="text-xs font-mono text-zinc-400">0{idx + 1}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-zinc-950 font-sans tracking-tight mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-[14px] text-zinc-600 leading-relaxed font-sans">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/book">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center bg-zinc-950 hover:bg-zinc-800 text-white rounded-full px-8 py-3.5 sm:py-4 text-[14px] font-medium transition-colors shadow-sm cursor-pointer"
              >
                <span>Book a 20-Min Systems Audit</span>
                <span className="ml-2">&rarr;</span>
              </motion.button>
            </Link>
            <a
              href="#investment"
              className="text-[14px] font-medium text-zinc-600 hover:text-zinc-950 transition-colors px-6 py-3.5"
            >
              Review transparent pricing
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
