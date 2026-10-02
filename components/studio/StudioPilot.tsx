'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { containerVariants, itemVariants } from '@/lib/motion'

const valuePillars = [
  {
    title: 'Every Missed Call Goes Straight to Your Competitor',
    desc: <>Over <span className="font-semibold text-zinc-900">80%</span> of customers who reach a voicemail do not leave a message—they immediately dial the next company on the list. Capturing just <span className="font-semibold text-zinc-900">2 to 3</span> service calls or clients a month pays for your entire infrastructure many times over.</>,
    badge: 'Revenue Capture',
  },
  {
    title: 'Under 10% the Cost of Human Front-Desk Payroll',
    desc: <>A full-time in-house receptionist costs <span className="font-semibold text-zinc-900">$3,500</span> to <span className="font-semibold text-zinc-900">$4,500</span> every month—yet only works 8 hours a day, 5 days a week. Epicrio provides instant, polite <span className="font-semibold text-zinc-900">24/7/365</span> coverage including weekends and late nights for a fraction of that cost.</>,
    badge: 'Overhead Reduction',
  },
  {
    title: 'Reclaim 25+ Hours of Lost Staff Bandwidth Weekly',
    desc: <>Your experienced staff shouldn't lose hours to repetitive scheduling calls, manual spreadsheet copy-pasting, sending calendar links, and chasing invoice signatures. Put routine back-office friction on autonomous autopilot.</>,
    badge: 'Operational Leverage',
  },
  {
    title: 'Our Accountability: Exact Engineering Delivery',
    desc: <>You know your business and your clients best. Our accountability is to deliver the exact, battle-tested operational system you ask for—tested on staging, seamlessly integrated with your calendar and CRM, and built to run reliably.</>,
    badge: 'Delivery Standard',
  },
]

export default function StudioPilot() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="why-invest"
      className="py-32 md:py-40 bg-white flex flex-col items-center text-center w-full"
    >
      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col items-center">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
          }}
          className="flex flex-col items-center w-full"
        >
          {/* Section Badge */}
          <motion.div variants={{ hidden: { opacity: 0, y: 40, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-zinc-300" />
            <span className="uppercase tracking-[0.15em] text-zinc-400 text-[13px] font-sans font-medium">The Business Case</span>
          </motion.div>

          {/* Section Heading */}
          <motion.h2 variants={{ hidden: { opacity: 0, y: 40, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-tight text-[#0A0A0A] mb-6 max-w-3xl leading-[1.1]">
            The real cost isn't the software. It's the calls and hours you lose every week.
          </motion.h2>

          {/* Subtitle */}
          <motion.p variants={{ hidden: { opacity: 0, y: 40, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="text-[17px] leading-relaxed text-zinc-500 font-sans max-w-2xl mb-20">
            You don't need another generic dashboard. You need dependable operational infrastructure that protects your revenue and frees your team to focus on high-value client work.
          </motion.p>

          {/* 4 Value Pillars Grid */}
          <div className="w-full max-w-5xl text-left mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {valuePillars.map((pillar, idx) => (
                <motion.div 
                  key={idx} 
                  variants={{ hidden: { opacity: 0, y: 60, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} 
                  className="relative flex flex-col justify-start pb-10 border-b border-zinc-100"
                >
                  <div className="absolute -top-6 -left-4 text-6xl text-zinc-100 font-display z-0 select-none pointer-events-none">
                    0{idx + 1}
                  </div>
                  <div className="relative z-10">
                    <div className="mb-4">
                      <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 font-sans">
                        {pillar.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-medium text-[#0A0A0A] font-sans tracking-tight mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-[15px] text-zinc-500 leading-relaxed font-sans">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <motion.div variants={{ hidden: { opacity: 0, y: 40, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/book">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center bg-[#0A0A0A] hover:bg-zinc-800 text-white rounded-full px-8 py-4 text-[15px] font-medium transition-colors shadow-sm cursor-pointer"
              >
                <span>Book a 20-Min Systems Audit</span>
                <span className="ml-2">&rarr;</span>
              </motion.button>
            </Link>
            <a
              href="#investment"
              className="text-[15px] font-medium text-zinc-500 hover:text-[#0A0A0A] transition-colors py-4"
            >
              Review transparent pricing
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
