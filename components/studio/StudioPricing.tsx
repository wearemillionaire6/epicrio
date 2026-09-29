'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const packages = [
  {
    name: 'Essentials Ops',
    setup: '$2,500',
    retainer: '$997 / mo',
    target: 'Best for small businesses wanting 24/7 call answering & clean CRM',
    deliverables: [
      '24/7 AI Voice Receptionist (up to 500 call minutes/mo)',
      'Custom Central CRM Setup (HubSpot, Twenty, or GoHighLevel)',
      'Instant Calendar Booking (Google Calendar / Cal.com)',
      'Automated SMS confirmations to callers',
      'Instant team alerts on Slack or WhatsApp',
      'Expected: 100% answered calls & 15+ hours saved weekly',
    ],
    highlight: false,
  },
  {
    name: 'Complete Business OS',
    setup: '$3,500',
    retainer: '$1,500 / mo',
    target: 'All-in-one suite: Voice receptionist, CRM, invoices, & outreach',
    deliverables: [
      '24/7 AI Voice Receptionist (up to 1,500 call minutes/mo)',
      'Central CRM with automated follow-ups & pipeline stages',
      'Managed Cold Email Client Outreach (15 Gmails, 3,000 leads/mo)',
      'Automated Stripe invoices & digital e-signature contracts',
      'Zero manual data entry across phone, email, and billing',
      'Expected: 20–30 booked client meetings & 35+ hours saved weekly',
    ],
    highlight: true,
  },
  {
    name: 'Enterprise Scale',
    setup: '$5,000',
    retainer: '$2,500 / mo',
    target: 'For established firms needing custom portals & high-volume systems',
    deliverables: [
      'Unlimited AI Voice Receptionist phone lines',
      'Custom Executive Dashboard & Client Operating Portal',
      'Full Outbound Email Engine (30+ inboxes, 6,000+ leads/mo)',
      'Complete API integration with QuickBooks, WhatsApp, & ERP',
      'Dedicated systems engineer with priority 24/7 support',
      'Expected: Full operations running automatically on autopilot',
    ],
    highlight: false,
  },
]

export default function StudioPricing() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const, staggerChildren: 0.1 }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const } }
  }

  return (
    <motion.section 
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      id="investment" 
      className="py-20 lg:py-28 border-b border-zinc-100/80 bg-white"
    >
      <div className="w-full max-w-4xl mb-16 px-4 sm:px-6 mx-auto text-center">
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 font-medium text-xs mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
          <span>Pricing</span>
        </motion.div>
        
        <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-display font-medium tracking-[-0.03em] text-[#0A0A0A]">
          Simple, predictable pricing. No surprises.
        </motion.h2>
        
        <motion.p variants={itemVariants} className="mt-6 text-[15px] text-zinc-500 max-w-2xl mx-auto leading-relaxed font-sans">
          One setup fee builds your infrastructure. A monthly retainer covers management, software, and voice minutes. Cancel anytime.
        </motion.p>
      </div>

      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {packages.map((pkg) => (
          <motion.div
            key={pkg.name}
            variants={itemVariants}
            className={`rounded-2xl p-8 flex flex-col justify-between bg-white ${
              pkg.highlight
                ? 'border-2 border-zinc-900 shadow-sm'
                : 'border border-zinc-100 shadow-[0_0_0_1px_rgba(0,0,0,0.04)]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-6">
                <span className="font-medium text-[16px] text-[#0A0A0A]">{pkg.name}</span>
                {pkg.highlight && (
                  <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-zinc-100 text-zinc-700">
                    Popular
                  </span>
                )}
              </div>

              <div className="space-y-2 mb-6">
                <div className="text-4xl font-display font-medium tracking-tight text-[#0A0A0A]">
                  {pkg.setup}
                </div>
                <div className="text-[13px] text-zinc-500">
                  One-time buildout, then {pkg.retainer}
                </div>
              </div>

              <p className="text-[14px] mb-8 pb-6 border-b border-zinc-100 text-zinc-600">
                {pkg.target}
              </p>

              <ul className="space-y-4 text-[14px]">
                {pkg.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-600 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-6 border-t border-zinc-100">
              <motion.a
                href="#apply"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 text-sm font-medium rounded-full flex items-center justify-center transition-colors ${
                  pkg.highlight
                    ? 'bg-zinc-900 text-white hover:bg-zinc-800'
                    : 'bg-transparent border border-zinc-200 text-zinc-700 hover:border-zinc-300'
                }`}
              >
                Select {pkg.name}
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
