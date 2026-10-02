'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { containerVariants, itemVariants } from '@/lib/motion'

export interface PricingPackage {
  id: string
  categoryKey: 'voice' | 'backoffice' | 'enterprise'
  categoryLabel: string
  name: string
  setup: string
  retainer: string
  isCustomQuote?: boolean
  target: string
  idealFor: string
  deliverables: string[]
  highlight: boolean
  inquiryValue: string
  ctaType: 'select' | 'mail'
  mailSubject?: string
}

const packages: PricingPackage[] = [
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
    ctaType: 'select',
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
    ctaType: 'select',
  },
  {
    id: 'custom-enterprise',
    categoryKey: 'enterprise',
    categoryLabel: 'Custom Enterprise',
    name: 'Custom Enterprise',
    setup: 'Custom Scope',
    retainer: 'Tailored Scope',
    isCustomQuote: true,
    target: 'Custom architecture, high-capacity phone lines, ERP/SAP integration & private LLMs',
    idealFor: 'Multi-location clinic chains, regional enterprises, & high-volume operations',
    deliverables: [
      'Unified Voice AI + Back-Office + Central CRM continuous operational pipeline',
      'High-capacity multi-line telephony with carrier SIP trunks & unlimited concurrency',
      'Custom brand voice cloning & specialized industry lexicon fine-tuning',
      'Deep bi-directional API integration with QuickBooks, NetSuite, SAP or custom ERP',
      'Outbound Growth Engine with 15+ warmed domains & automated sequences',
      'Dedicated on-premise / private LLM deployment for strict data compliance (HIPAA / SOC2)',
      'Dedicated Automation Engineer with direct Slack channel & 1-hour priority SLA',
    ],
    highlight: true,
    inquiryValue: 'Custom Enterprise (Tailored Scope)',
    ctaType: 'mail',
    mailSubject: 'Custom Enterprise Operations Inquiry - Epicrio',
  },
]

export default function StudioPricing() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const handleSelectPackage = (pkg: PricingPackage) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('epicrio-select-plan', { detail: pkg.inquiryValue }))
    }
  }

  return (
    <motion.section 
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
      }}
      id="investment" 
      className="py-32 md:py-40 bg-white"
    >
      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mb-20 px-4 sm:px-6 md:px-8 lg:px-12 mx-auto">
        <div className="max-w-3xl">
          <motion.div variants={{ hidden: { opacity: 0, y: 40, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-zinc-300" />
            <span className="uppercase tracking-[0.15em] text-zinc-400 text-[13px] font-sans font-medium">Transparent Investment</span>
          </motion.div>
          
          <motion.h2 variants={{ hidden: { opacity: 0, y: 40, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-tight text-[#0A0A0A] mb-8">
            Engineered for your exact operations.
          </motion.h2>
          
          <motion.p variants={{ hidden: { opacity: 0, y: 40, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="text-[17px] text-zinc-500 max-w-2xl leading-relaxed font-sans">
            Choose the exact infrastructure tier your business requires. From dedicated voice front-desk automation to custom enterprise orchestration with dedicated architecture support.
          </motion.p>
        </div>
      </div>

      {/* Pricing Cards Grid - 3 Columns Side By Side */}
      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {packages.map((pkg) => (
          <motion.div
            key={pkg.id}
            variants={{ hidden: { opacity: 0, y: 60, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
            className={`rounded-3xl p-10 sm:p-12 flex flex-col justify-between bg-[#FAFAFA] ${
              pkg.highlight
                ? 'border-2 border-[#0A0A0A] shadow-xl'
                : 'border border-zinc-200'
            }`}
          >
            <div>
              {/* Header Category & Popular Pill */}
              <div className="flex items-center justify-between gap-2 pb-6 border-b border-zinc-200">
                <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                  {pkg.categoryLabel}
                </span>
                {pkg.highlight ? (
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#0A0A0A] text-white font-sans">
                    Enterprise Tier
                  </span>
                ) : (
                  <span className="text-[11px] font-mono text-zinc-400">
                    Standard Tier
                  </span>
                )}
              </div>

              {/* Title & Target */}
              <div className="pt-8">
                <h3 className="font-display text-3xl text-[#0A0A0A] leading-snug">
                  {pkg.name}
                </h3>
                <p className="mt-3 text-[15px] text-zinc-500 font-sans leading-relaxed min-h-[48px]">
                  {pkg.target}
                </p>
              </div>

              {/* Pricing Block */}
              <div className="mt-8 mb-8 pt-8 border-t border-zinc-200">
                {pkg.isCustomQuote ? (
                  <div>
                    <div className="text-4xl sm:text-5xl font-display text-[#0A0A0A]">
                      Custom Scope
                    </div>
                    <div className="text-[14px] text-zinc-500 mt-2 font-sans">
                      Inquire for tailored architectural proposal
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl sm:text-5xl font-display text-[#0A0A0A]">
                        {pkg.setup}
                      </span>
                      <span className="text-[13px] text-zinc-400 font-mono">one-time buildout</span>
                    </div>
                    <div className="text-[14px] text-zinc-500 mt-2 font-sans">
                      then <span className="font-semibold text-[#0A0A0A]">{pkg.retainer}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Target Audience Pill Box */}
              <div className="py-4 px-5 rounded-2xl bg-white border border-zinc-200 mb-8">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">Ideal For</span>
                <span className="text-[14px] text-zinc-700 font-medium leading-snug block">{pkg.idealFor}</span>
              </div>

              {/* Deliverables List */}
              <div className="space-y-4 text-[14px] text-zinc-600 font-sans">
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Included Deliverables</div>
                <ul className="space-y-4">
                  {pkg.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-zinc-300 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="leading-snug text-zinc-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Action Button */}
            <div className="mt-12 pt-8 border-t border-zinc-200">
              {pkg.ctaType === 'mail' ? (
                <div className="space-y-3">
                  <motion.a
                    href={`mailto:hello@epicrio.com?subject=${encodeURIComponent(pkg.mailSubject || 'Custom Enterprise Inquiry')}&body=${encodeURIComponent('Hi Epicrio Team,\n\nWe are interested in a Custom Enterprise deployment. Here is an overview of our operational requirements:\n- Organization Name:\n- Primary Systems (CRM/ERP/Telecom):\n- Estimated Monthly Call/Transaction Volume:\n- Key Automation Goals:\n\nBest regards,')}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 text-[14px] font-medium rounded-full flex items-center justify-center transition-all cursor-pointer bg-[#0A0A0A] text-white hover:bg-zinc-800"
                  >
                    <span>Email Solutions Team</span>
                    <span className="ml-2">&rarr;</span>
                  </motion.a>

                  <button
                    type="button"
                    onClick={() => handleSelectPackage(pkg)}
                    className="w-full py-2 text-[12px] font-mono text-zinc-400 hover:text-[#0A0A0A] transition-colors cursor-pointer text-center block"
                  >
                    <a href="#apply">or submit inquiry form below &darr;</a>
                  </button>
                </div>
              ) : (
                <motion.a
                  href="#apply"
                  onClick={() => handleSelectPackage(pkg)}
                  whileHover={{ scale: 1.02, backgroundColor: '#0A0A0A', color: '#FFFFFF' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 text-[14px] font-medium rounded-full flex items-center justify-center transition-all cursor-pointer bg-transparent border border-zinc-300 text-[#0A0A0A]"
                >
                  <span>Select {pkg.name}</span>
                  <span className="ml-2">&rarr;</span>
                </motion.a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enterprise Custom Scope Callout */}
      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mt-16">
        <motion.div variants={{ hidden: { opacity: 0, y: 40, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="rounded-3xl border border-zinc-200 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 bg-[#FAFAFA]">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-medium text-[17px] text-[#0A0A0A]">Need custom enterprise architecture or multi-location deployment?</span>
              <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-zinc-200 text-zinc-700 font-semibold">Custom Scope</span>
            </div>
            <p className="text-[15px] text-zinc-500 max-w-3xl font-sans leading-relaxed">
              Email our engineering team directly for bespoke clinic chains, custom SAP/ERP migrations, or dedicated carrier SIP trunks.
            </p>
          </div>
          <a
            href="mailto:hello@epicrio.com?subject=Custom%20Enterprise%20Operations%20Inquiry%20-%20Epicrio"
            className="whitespace-nowrap px-8 py-4 rounded-full border border-zinc-300 text-[#0A0A0A] text-[15px] font-medium hover:bg-[#0A0A0A] hover:text-white transition-all shrink-0 cursor-pointer bg-white"
          >
            Email Solutions Architect &rarr;
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}
