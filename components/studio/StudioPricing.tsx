'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'

export interface StandardPackage {
  id: string
  categoryKey: 'voice' | 'backoffice'
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

export interface EnterpriseAddOn {
  id: string
  name: string
  shortDesc: string
  setupDelta: number
  retainerDelta: number
}

const standardPackages: StandardPackage[] = [
  {
    id: 'voice-ai',
    categoryKey: 'voice',
    categoryLabel: 'Front-Desk & Voice AI',
    name: 'Dedicated Voice AI Receptionist',
    setup: '$1,000',
    retainer: '$490 / mo',
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
    inquiryValue: 'Dedicated Voice AI Receptionist ($1,000 buildout)',
  },
  {
    id: 'back-office',
    categoryKey: 'backoffice',
    categoryLabel: 'Workflows & Operations',
    name: 'Autonomous Back-Office & CRM',
    setup: '$1,500',
    retainer: '$690 / mo',
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
    inquiryValue: 'Autonomous Back-Office & CRM ($1,500 buildout)',
  },
]

const enterpriseAddOns: EnterpriseAddOn[] = [
  {
    id: 'multi-line',
    name: 'Multi-Line Telephony (3,000 Mins)',
    shortDesc: 'Multi-line concurrent call handling with SIP trunks',
    setupDelta: 500,
    retainerDelta: 200,
  },
  {
    id: 'voice-clone',
    name: 'Custom Voice Clone & Lexicon',
    shortDesc: 'Brand voice cloning with industry vocabulary training',
    setupDelta: 400,
    retainerDelta: 100,
  },
  {
    id: 'erp-sync',
    name: 'Bi-Directional ERP / SAP Sync',
    shortDesc: 'Deep API sync with QuickBooks, NetSuite, SAP or custom ERP',
    setupDelta: 800,
    retainerDelta: 300,
  },
  {
    id: 'outbound-engine',
    name: 'Outbound Growth Engine (15+ Inboxes)',
    shortDesc: 'Warmed domains, verified lead sourcing & automated sequences',
    setupDelta: 600,
    retainerDelta: 250,
  },
  {
    id: 'private-llm',
    name: 'Private On-Premise LLM / HIPAA Shield',
    shortDesc: 'Isolated private LLM deployment for strict data compliance',
    setupDelta: 1200,
    retainerDelta: 400,
  },
  {
    id: 'priority-sla',
    name: '1-Hour Priority SLA Engineer',
    shortDesc: 'Direct Slack channel with dedicated automation architect',
    setupDelta: 500,
    retainerDelta: 250,
  },
]

const filterTabs = [
  { key: 'all', label: 'All Packages' },
  { key: 'voice', label: 'Voice AI ($1,000+)' },
  { key: 'backoffice', label: 'Back-Office & CRM ($1,500+)' },
  { key: 'custom', label: 'Bespoke Customizer ($2,500+)' },
] as const

type FilterTabKey = typeof filterTabs[number]['key']

export default function StudioPricing() {
  const [activeTab, setActiveTab] = useState<FilterTabKey>('all')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  // Customizer state for the most premium package
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'multi-line',
    'erp-sync',
  ])

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // Dynamic calculations for the premium package (starting at $2,500 setup & $990/mo)
  const baseSetup = 2500
  const baseRetainer = 990

  const dynamicSetup = baseSetup + selectedAddons.reduce((sum, id) => {
    const item = enterpriseAddOns.find(a => a.id === id)
    return sum + (item ? item.setupDelta : 0)
  }, 0)

  const dynamicRetainer = baseRetainer + selectedAddons.reduce((sum, id) => {
    const item = enterpriseAddOns.find(a => a.id === id)
    return sum + (item ? item.retainerDelta : 0)
  }, 0)

  const selectedModuleNames = selectedAddons.map(
    (id) => enterpriseAddOns.find((a) => a.id === id)?.name || id
  )

  const customBookingQueryUrl = `/book?plan=custom&setup=${encodeURIComponent('$' + dynamicSetup.toLocaleString())}&retainer=${encodeURIComponent('$' + dynamicRetainer.toLocaleString() + ' / mo')}&modules=${encodeURIComponent(selectedModuleNames.join('||'))}`

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

  const handleSelectStandard = (pkg: StandardPackage) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('epicrio-select-plan', { detail: pkg.inquiryValue }))
    }
  }

  const handleSelectCustomStack = () => {
    if (typeof window !== 'undefined') {
      const summary = `Bespoke Enterprise OS ($${dynamicSetup.toLocaleString()} Setup / $${dynamicRetainer.toLocaleString()} mo): ${selectedModuleNames.join(', ')}`
      window.dispatchEvent(new CustomEvent('epicrio-select-plan', { detail: summary }))
    }
  }

  const showVoice = activeTab === 'all' || activeTab === 'voice'
  const showBackoffice = activeTab === 'all' || activeTab === 'backoffice'
  const showCustom = activeTab === 'all' || activeTab === 'custom'

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
          <span>Transparent Systems Investment</span>
        </motion.div>
        
        <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium tracking-[-0.03em] text-[#0A0A0A]">
          Engineered for your exact operations.
        </motion.h2>
        
        <motion.p variants={itemVariants} className="mt-5 text-[15px] text-zinc-500 max-w-2xl mx-auto leading-relaxed font-sans">
          Choose the exact infrastructure tier your business requires. From dedicated voice front-desk automation to bespoke enterprise orchestration with live modular customization.
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
      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        <AnimatePresence mode="popLayout">
          {/* Card 1: Dedicated Voice AI */}
          {showVoice && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
              className="rounded-2xl p-7 sm:p-8 flex flex-col justify-between bg-white border border-zinc-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-5 border-b border-zinc-100">
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-zinc-100 text-zinc-700 font-medium">
                    {standardPackages[0].categoryLabel}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">Entry Tier</span>
                </div>

                <div className="pt-6">
                  <h3 className="font-display font-medium text-[21px] text-[#0A0A0A] leading-snug">
                    {standardPackages[0].name}
                  </h3>
                  <p className="mt-2 text-[13px] text-zinc-500 font-sans leading-relaxed min-h-[38px]">
                    {standardPackages[0].target}
                  </p>
                </div>

                <div className="mt-6 mb-6 pt-5 border-t border-zinc-100/80">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-display font-medium tracking-tight text-[#0A0A0A]">
                      {standardPackages[0].setup}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">one-time buildout</span>
                  </div>
                  <div className="text-[13px] text-zinc-600 mt-1.5 font-sans">
                    then <span className="font-semibold text-zinc-950">{standardPackages[0].retainer}</span>
                  </div>
                </div>

                <div className="py-2.5 px-3 rounded-xl bg-zinc-50/80 border border-zinc-100 mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-0.5">Ideal For</span>
                  <span className="text-[12px] text-zinc-700 font-medium leading-snug block">{standardPackages[0].idealFor}</span>
                </div>

                <div className="space-y-3.5 text-[13px] text-zinc-600 font-sans">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Included Deliverables</div>
                  <ul className="space-y-3">
                    {standardPackages[0].deliverables.map((item, idx) => (
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

              <div className="mt-10 pt-6 border-t border-zinc-100">
                <motion.a
                  href="#apply"
                  onClick={() => handleSelectStandard(standardPackages[0])}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 text-xs font-semibold rounded-full flex items-center justify-center transition-colors cursor-pointer bg-transparent border border-zinc-300 text-zinc-800 hover:border-zinc-900 hover:text-zinc-950"
                >
                  <span>Select {standardPackages[0].name}</span>
                  <span className="ml-1.5">&rarr;</span>
                </motion.a>
              </div>
            </motion.div>
          )}

          {/* Card 2: Autonomous Back-Office & CRM */}
          {showBackoffice && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
              className="rounded-2xl p-7 sm:p-8 flex flex-col justify-between bg-white border border-zinc-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-5 border-b border-zinc-100">
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-zinc-100 text-zinc-700 font-medium">
                    {standardPackages[1].categoryLabel}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">Operations Tier</span>
                </div>

                <div className="pt-6">
                  <h3 className="font-display font-medium text-[21px] text-[#0A0A0A] leading-snug">
                    {standardPackages[1].name}
                  </h3>
                  <p className="mt-2 text-[13px] text-zinc-500 font-sans leading-relaxed min-h-[38px]">
                    {standardPackages[1].target}
                  </p>
                </div>

                <div className="mt-6 mb-6 pt-5 border-t border-zinc-100/80">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-display font-medium tracking-tight text-[#0A0A0A]">
                      {standardPackages[1].setup}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">one-time buildout</span>
                  </div>
                  <div className="text-[13px] text-zinc-600 mt-1.5 font-sans">
                    then <span className="font-semibold text-zinc-950">{standardPackages[1].retainer}</span>
                  </div>
                </div>

                <div className="py-2.5 px-3 rounded-xl bg-zinc-50/80 border border-zinc-100 mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-0.5">Ideal For</span>
                  <span className="text-[12px] text-zinc-700 font-medium leading-snug block">{standardPackages[1].idealFor}</span>
                </div>

                <div className="space-y-3.5 text-[13px] text-zinc-600 font-sans">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Included Deliverables</div>
                  <ul className="space-y-3">
                    {standardPackages[1].deliverables.map((item, idx) => (
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

              <div className="mt-10 pt-6 border-t border-zinc-100">
                <motion.a
                  href="#apply"
                  onClick={() => handleSelectStandard(standardPackages[1])}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 text-xs font-semibold rounded-full flex items-center justify-center transition-colors cursor-pointer bg-transparent border border-zinc-300 text-zinc-800 hover:border-zinc-900 hover:text-zinc-950"
                >
                  <span>Select {standardPackages[1].name}</span>
                  <span className="ml-1.5">&rarr;</span>
                </motion.a>
              </div>
            </motion.div>
          )}

          {/* Card 3: The Most Premium Package (Distinct Obsidian Dark Luxury Style with Interactive Customizer) */}
          {showCustom && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
              className="rounded-2xl p-7 sm:p-8 flex flex-col justify-between bg-[#0C0D0E] text-white border-2 border-zinc-700/80 shadow-2xl relative overflow-hidden ring-1 ring-white/10"
            >
              {/* Subtle Ambient Radial Lighting */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-zinc-700/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                {/* Header Category & Standout Badge */}
                <div className="flex items-center justify-between gap-2 pb-5 border-b border-zinc-800">
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-zinc-800 text-zinc-200 font-medium">
                    Bespoke Enterprise Stack
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-white text-zinc-950 font-sans shadow-sm">
                    Interactive Customizer
                  </span>
                </div>

                {/* Title & Description */}
                <div className="pt-6">
                  <h3 className="font-display font-medium text-[22px] text-white leading-snug">
                    Bespoke Enterprise OS
                  </h3>
                  <p className="mt-2 text-[13px] text-zinc-400 font-sans leading-relaxed min-h-[38px]">
                    Fully modular architecture: Voice AI, ERP workflows &amp; dedicated engineering.
                  </p>
                </div>

                {/* Real-Time Dynamically Calculated Pricing */}
                <div className="mt-6 mb-5 pt-5 border-t border-zinc-800/90">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-display font-medium tracking-tight text-white">
                      ${dynamicSetup.toLocaleString()}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">calculated buildout</span>
                  </div>
                  <div className="text-[13px] text-zinc-300 mt-1.5 font-sans">
                    then <span className="font-semibold text-white">${dynamicRetainer.toLocaleString()} / mo</span>
                  </div>
                  <div className="mt-2 text-[11px] font-mono text-zinc-400">
                    Includes Base OS + {selectedAddons.length} customized enterprise modules
                  </div>
                </div>

                {/* Interactive Customization Selector */}
                <div className="mt-6 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                      Configure Modules (Click to Toggle)
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {selectedAddons.length} of {enterpriseAddOns.length} active
                    </span>
                  </div>

                  <div className="space-y-2">
                    {enterpriseAddOns.map((addon) => {
                      const isSelected = selectedAddons.includes(addon.id)
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() => toggleAddon(addon.id)}
                          className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs cursor-pointer ${
                            isSelected
                              ? 'bg-zinc-800/90 border-zinc-600 text-white shadow-xs'
                              : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 pr-2">
                            <span
                              className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors ${
                                isSelected ? 'bg-white text-zinc-950' : 'border border-zinc-700 text-transparent'
                              }`}
                            >
                              ✓
                            </span>
                            <span className="font-medium text-[12px] leading-tight line-clamp-1">{addon.name}</span>
                          </div>
                          <span className="text-[11px] font-mono text-zinc-400 shrink-0">
                            +${addon.setupDelta}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Base Core Included Stack */}
                <div className="space-y-2 text-[12px] text-zinc-400 font-sans pt-3 border-t border-zinc-800/70">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Also Always Included</div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <span className="text-zinc-400">✓</span> Dedicated Automation Engineer with 1-hr SLA
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <span className="text-zinc-400">✓</span> Central Executive BI Dashboard &amp; Full Data Ownership
                  </div>
                </div>
              </div>

              {/* Action Buttons for Custom Package: Book via Query */}
              <div className="mt-8 pt-6 border-t border-zinc-800 relative z-10 space-y-2.5">
                <Link href={customBookingQueryUrl}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 text-xs font-semibold rounded-full flex items-center justify-center transition-all cursor-pointer bg-white text-zinc-950 hover:bg-zinc-200 shadow-lg"
                  >
                    <span>Book Strategy Call for This Stack</span>
                    <span className="ml-1.5">&rarr;</span>
                  </motion.button>
                </Link>

                <button
                  type="button"
                  onClick={handleSelectCustomStack}
                  className="w-full py-2 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer text-center block"
                >
                  <a href="#apply">or query pricing in inquiry form below &darr;</a>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enterprise Custom Scope Callout */}
      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mt-12">
        <div className="rounded-2xl border border-zinc-200/90 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-zinc-50/60">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-medium text-[15px] text-[#0A0A0A]">Need multi-location practice routing or dedicated SIP trunking?</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-zinc-200 text-zinc-700 font-semibold">Custom Scope</span>
            </div>
            <p className="text-[13px] text-zinc-500 max-w-3xl font-sans leading-relaxed">
              For hospital chains, multi-location clinics, private LLMs on AWS GovCloud/Azure, or bespoke ERP migrations. Minimum engagement starts at $1,000.
            </p>
          </div>
          <Link
            href="/book?plan=custom&setup=$2,500&retainer=$990%20%2F%20mo&modules=Custom%20Enterprise%20Architecture"
            className="whitespace-nowrap px-6 py-3 rounded-full border border-zinc-300 text-zinc-800 text-xs font-semibold hover:border-zinc-950 hover:text-zinc-950 transition-colors shrink-0 cursor-pointer bg-white"
          >
            Talk to Solutions Architect &rarr;
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
