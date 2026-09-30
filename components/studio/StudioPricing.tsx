'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

export interface PricingPackage {
  id: string
  categoryKey: 'voice' | 'backoffice' | 'suite'
  categoryLabel: string
  name: string
  setup: string
  retainer: string
  target: string
  idealFor: string
  deliverables: string[]
  highlight: boolean
  inquiryValue: string
}

const packages: PricingPackage[] = [
  {
    id: 'voice-ai',
    categoryKey: 'voice',
    categoryLabel: 'Front-Desk & Voice AI',
    name: 'Dedicated Voice AI Receptionist',
    setup: '$490',
    retainer: '$290 / mo',
    target: 'Pure 24/7 front-desk phone coverage & automated appointment booking',
    idealFor: 'Clinics, dental, med spas, salons, legal, real estate, & contractors',
    deliverables: [
      '24/7 Inbound Voice AI Receptionist in English, Hindi, Spanish & 30+ languages',
      'Direct Calendar Booking with Google Calendar, Cal.com & Calendly',
      'Instant SMS confirmations & location reminders texted directly to callers',
      'Automated spam screening & urgent call routing to on-call staff',
      'Instant team alerts on WhatsApp & Email for every booked appointment',
      'Detailed call recordings, searchable transcripts & sentiment summaries',
      'Carrier call-forwarding setup & dedicated Twilio phone line included',
    ],
    highlight: false,
    inquiryValue: 'Dedicated Voice AI Receptionist',
  },
  {
    id: 'back-office',
    categoryKey: 'backoffice',
    categoryLabel: 'Workflows & Operations',
    name: 'Autonomous Back-Office & CRM',
    setup: '$790',
    retainer: '$390 / mo',
    target: 'Hands-off invoicing, contracts, and zero manual data entry across systems',
    idealFor: 'B2B agencies, consultancies, professional services, & high-volume firms',
    deliverables: [
      'Central CRM Pipeline Architecture (HubSpot, GoHighLevel, or Twenty)',
      'Automated Stripe Invoicing, recurring billing & digital payment links',
      'Digital contract e-signature generation & workflow (DocuSign / PandaDoc)',
      'Zero manual data entry: website inquiries, contracts & payments auto-synced',
      'Internal team war-room alerts on Slack & WhatsApp on deal milestones',
      'Automated customer onboarding intake & document collection sequences',
      'Continuous webhook monitoring, API uptime maintenance & schema support',
    ],
    highlight: false,
    inquiryValue: 'Autonomous Back-Office & CRM',
  },
  {
    id: 'complete-os',
    categoryKey: 'suite',
    categoryLabel: 'Unified Autonomous Stack',
    name: 'Complete Business OS',
    setup: '$1,450',
    retainer: '$690 / mo',
    target: 'The unified engine: Front-Desk Voice AI + Central CRM + Automated Billing',
    idealFor: 'Growing companies wanting total operational leverage & zero admin',
    deliverables: [
      'Everything in Dedicated Voice AI (unlimited concurrent lines, 1,200 mins/mo included)',
      'Everything in Autonomous Back-Office (Stripe, Contracts, CRM sync, Slack alerts)',
      'Unified Pipeline: Inbound Call → Calendar Booking → CRM Lead → E-Sign → Stripe Invoice',
      'Outbound Lead Re-engagement Engine (automated SMS & Email reactivation sequences)',
      'Executive Operations Dashboard with real-time conversion & call analytics',
      'Dedicated automation engineer with 2-hour priority support SLA',
      'Weekly prompt optimization, live conversation reviews & workflow tuning',
    ],
    highlight: true,
    inquiryValue: 'Complete Business OS (All-in-One)',
  },
]

const filterTabs = [
  { key: 'all', label: 'All Packages' },
  { key: 'voice', label: 'Voice AI Only' },
  { key: 'backoffice', label: 'Back-Office & CRM' },
  { key: 'suite', label: 'Complete OS' },
] as const

type FilterTabKey = typeof filterTabs[number]['key']

export default function StudioPricing() {
  const [activeTab, setActiveTab] = useState<FilterTabKey>('all')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

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

  const handleSelectPackage = (pkg: PricingPackage) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('epicrio-select-plan', { detail: pkg.inquiryValue }))
    }
  }

  const visiblePackages = activeTab === 'all' 
    ? packages 
    : packages.filter(p => p.categoryKey === activeTab)

  return (
    <motion.section 
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      id="investment" 
      className="py-20 lg:py-28 border-b border-zinc-100/80 bg-white"
    >
      <div className="w-full max-w-4xl mb-12 px-4 sm:px-6 mx-auto text-center">
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 font-medium text-xs mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
          <span>Tailored Investment Packages</span>
        </motion.div>
        
        <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium tracking-[-0.03em] text-[#0A0A0A]">
          Segregated by what your business actually needs.
        </motion.h2>
        
        <motion.p variants={itemVariants} className="mt-5 text-[15px] text-zinc-500 max-w-2xl mx-auto leading-relaxed font-sans">
          Only pay for what solves your exact operational bottleneck. Choose between dedicated phone answering, back-office billing &amp; CRM automation, or our complete unified stack.
        </motion.p>

        {/* Category Filter Pills */}
        <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-950 text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </motion.div>
      </div>

      {/* Pricing Cards Grid */}
      <div className={`w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 grid gap-6 lg:gap-8 items-stretch ${
        visiblePackages.length === 1 
          ? 'grid-cols-1 max-w-xl mx-auto' 
          : 'grid-cols-1 md:grid-cols-3'
      }`}>
        <AnimatePresence mode="popLayout">
          {visiblePackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
              className={`rounded-2xl p-7 sm:p-8 flex flex-col justify-between bg-white relative ${
                pkg.highlight
                  ? 'border-2 border-zinc-950 shadow-md ring-1 ring-zinc-950/5'
                  : 'border border-zinc-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
              }`}
            >
              <div>
                {/* Header Category & Popular Pill */}
                <div className="flex items-center justify-between gap-2 pb-5 border-b border-zinc-100">
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-zinc-100 text-zinc-700 font-medium">
                    {pkg.categoryLabel}
                  </span>
                  {pkg.highlight && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-zinc-950 text-white font-sans shadow-2xs">
                      Most Popular
                    </span>
                  )}
                </div>

                {/* Title & Target */}
                <div className="pt-6">
                  <h3 className="font-display font-medium text-[21px] text-[#0A0A0A] leading-snug">
                    {pkg.name}
                  </h3>
                  <p className="mt-2 text-[13px] text-zinc-500 font-sans leading-relaxed min-h-[38px]">
                    {pkg.target}
                  </p>
                </div>

                {/* Pricing Number */}
                <div className="mt-6 mb-6 pt-5 border-t border-zinc-100/80">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-display font-medium tracking-tight text-[#0A0A0A]">
                      {pkg.setup}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">one-time buildout</span>
                  </div>
                  <div className="text-[13px] text-zinc-600 mt-1.5 font-sans">
                    then <span className="font-semibold text-zinc-950">{pkg.retainer}</span>
                  </div>
                </div>

                {/* Target Audience Pill Box */}
                <div className="py-2.5 px-3 rounded-xl bg-zinc-50/80 border border-zinc-100 mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-0.5">Ideal For</span>
                  <span className="text-[12px] text-zinc-700 font-medium leading-snug block">{pkg.idealFor}</span>
                </div>

                {/* Deliverables List */}
                <div className="space-y-3.5 text-[13px] text-zinc-600 font-sans">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Included Deliverables</div>
                  <ul className="space-y-3">
                    {pkg.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <svg className="w-4 h-4 text-zinc-900 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="leading-snug text-zinc-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="mt-10 pt-6 border-t border-zinc-100">
                <motion.a
                  href="#apply"
                  onClick={() => handleSelectPackage(pkg)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3.5 text-xs font-semibold rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    pkg.highlight
                      ? 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-sm'
                      : 'bg-transparent border border-zinc-300 text-zinc-800 hover:border-zinc-900 hover:text-zinc-950'
                  }`}
                >
                  <span>Select {pkg.name}</span>
                  <span className="ml-1.5">&rarr;</span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Enterprise Custom Scope Callout */}
      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mt-12">
        <div className="rounded-2xl border border-zinc-200/90 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-zinc-50/60">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-medium text-[15px] text-[#0A0A0A]">Need custom enterprise architecture or high-capacity multi-line telephony?</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-zinc-200 text-zinc-700 font-semibold">Custom Scope</span>
            </div>
            <p className="text-[13px] text-zinc-500 max-w-3xl font-sans leading-relaxed">
              For multi-location clinic chains, custom ERP/SAP workflows, private on-premise LLMs, or dedicated voice cloning and carrier SIP trunking.
            </p>
          </div>
          <a
            href="#apply"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('epicrio-select-plan', { detail: 'Custom Enterprise Architecture' }))
              }
            }}
            className="whitespace-nowrap px-6 py-3 rounded-full border border-zinc-300 text-zinc-800 text-xs font-semibold hover:border-zinc-950 hover:text-zinc-950 transition-colors shrink-0 cursor-pointer bg-white"
          >
            Talk to Solutions Architect &rarr;
          </a>
        </div>
      </div>
    </motion.section>
  )
}
