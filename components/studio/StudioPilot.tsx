'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const guarantees = [
  {
    title: '14-Day Full Money-Back Guarantee',
    desc: 'If our AI receptionist doesn\'t capture 100% of your calls and save your team 15+ hours in the first two weeks, receive an immediate 100% refund.',
  },
  {
    title: 'Private Staging Line in 48 Hours',
    desc: 'Test your custom AI voice agent on a private test number with your staff first. Review call quality and calendar sync before routing live customers.',
  },
  {
    title: 'Zero Business Disruption',
    desc: 'Your existing company numbers, website, and daily operations continue running seamlessly with zero downtime or complex IT migration.',
  },
  {
    title: 'Weekly Audio & Prompt Calibration',
    desc: 'Our engineers review call transcripts and continuously optimize your AI receptionist\'s conversational responses every single week.',
  },
]

export default function StudioPilot() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="guarantee"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 font-medium text-xs mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            Performance Warranty
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-[-0.03em] text-[#0A0A0A] mb-5 max-w-3xl">
            100% Risk-Free Guarantee. We deliver or you don't pay.
          </h2>

          <p className="text-[15px] leading-relaxed text-zinc-500 font-sans max-w-2xl mb-12">
            We don't ask you to take on any risk. Every Epicrio deployment includes private staging verification in 48 hours and an ironclad 14-day performance warranty.
          </p>

          <div className="bg-zinc-50/70 border border-zinc-200/80 rounded-3xl p-6 sm:p-10 w-full max-w-4xl text-left mb-10 shadow-2xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {guarantees.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-zinc-950 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-950 font-sans mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-zinc-600 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/book"
            className="inline-flex items-center justify-center bg-zinc-950 hover:bg-zinc-800 text-white rounded-full px-8 py-3.5 sm:py-4 text-[14px] font-medium transition-colors shadow-sm cursor-pointer"
          >
            Claim Your Guaranteed Implementation &rarr;
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
