'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
  'No setup fee, no credit card required upfront',
  'We identify and verify 100 ideal prospects for you',
  'Emails are sent safely without touching your main domain',
  'Only launch the full system if you are thrilled with the replies',
]

export default function StudioPilot() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="pilot"
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
            Zero-risk pilot
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-[-0.03em] text-[#0A0A0A] mb-5 max-w-3xl">
            Try us for 7 days before paying a dollar.
          </h2>

          <p className="text-[15px] leading-relaxed text-zinc-500 font-sans max-w-2xl mb-12">
            We don't ask you to pay on blind faith. We test 100 real prospect communications and workflow automations first so you can experience the response quality with zero risk.
          </p>

          <div className="bg-zinc-50/70 border border-zinc-200/80 rounded-3xl p-6 sm:p-10 w-full max-w-3xl text-left mb-10 shadow-2xs">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-zinc-950 shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-[14px] text-zinc-700 font-sans font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/book"
            className="inline-flex items-center justify-center bg-zinc-950 hover:bg-zinc-800 text-white rounded-full px-8 py-3.5 sm:py-4 text-[14px] font-medium transition-colors shadow-sm cursor-pointer"
          >
            Start your pilot &rarr;
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
