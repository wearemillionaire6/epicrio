'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const modules = [
  {
    id: 'voice',
    name: '24/7 AI Voice Receptionist',
    subtitle: 'Never miss an inbound customer call again',
    description:
      'Answers your company phone lines instantly with a natural, conversational human voice. Answers customer FAQs, screens spam callers, schedules appointments directly into Google Calendar or Cal.com, and sends instant SMS summaries to your phone.',
    features: [
      'Answers within 2 rings, 24 hours a day, 365 days a year',
      'Fluent in Hindi, English, Spanish, and 30+ languages with auto-detection',
      'Books appointments and checks calendar availability in real time',
      'Sends instant SMS confirmations to the caller and alert to your team',
      'Routes urgent emergencies to your personal mobile immediately',
    ],
    metric: '100% Call Answer Rate',
  },
  {
    id: 'crm',
    name: 'Central CRM & Pipeline Automation',
    subtitle: 'Every lead organized with zero manual data entry',
    description:
      'Whether a client calls, fills out a web form, or replies to an email, their details are automatically saved into your custom CRM (HubSpot, Twenty, or GoHighLevel) with call recordings, notes, and deal stages updated automatically.',
    features: [
      'Zero manual copy-pasting of customer phone numbers or notes',
      'Automatic follow-up emails and SMS reminders to prevent dropped deals',
      'Clear visual pipeline stages from First Inquiry to Completed Job',
      'Full customer history and call recordings accessible in one click',
    ],
    metric: 'Zero Lost Opportunities',
  },
  {
    id: 'workflows',
    name: 'Autonomous Back-Office Workflows',
    subtitle: 'Put invoices, contracts, and team alerts on autopilot',
    description:
      'Eliminate tedious daily admin tasks. When a job is booked, contracts are automatically created and sent for e-signature, Stripe invoices are triggered, and your team is instantly notified in Slack or WhatsApp.',
    features: [
      'One-click or automated digital contract generation & e-signature',
      'Automated Stripe billing, payment tracking, and receipt delivery',
      'Instant team alerts on Slack or WhatsApp for every new booking',
      'Automatic sync between your banking, spreadsheets, and calendar',
    ],
    metric: '80% Less Admin Workload',
  },
  {
    id: 'outbound',
    name: 'Managed Gmail & Client Outreach',
    subtitle: 'Steady stream of high-ticket B2B client meetings',
    description:
      'We set up safe, secondary Gmail inboxes, find active business owners who need your exact service, and send friendly, human-written messages that consistently book qualified sales meetings on your calendar.',
    features: [
      'Dedicated secondary domains (your main company email is 100% safe)',
      'Double-verified prospect lists (zero bounced emails or spam traps)',
      'Short, polite peer-to-peer messages that get 15% to 25% reply rates',
      'Interested replies automatically pushed to your calendar and CRM',
    ],
    metric: '10–30 Booked Calls / mo',
  },
  {
    id: 'integrations',
    name: 'Custom Tech Integrations & Portals',
    subtitle: 'Make all your existing software talk to each other',
    description:
      'No more disconnected spreadsheets or apps that don\'t sync. We connect your website, WhatsApp, Stripe, Google Workspace, and internal software into one unified, synchronized system.',
    features: [
      'Connects WhatsApp, Website Forms, Gmail, and Stripe into one flow',
      'Custom client portals where customers can view their status and pay',
      'Replaces 5 expensive Zapier subscriptions with reliable self-hosted automations',
      'Automated data backups and error monitoring running 24/7',
    ],
    metric: 'Unified Company Brain',
  },
  {
    id: 'dashboard',
    name: 'Executive Operations Dashboard',
    subtitle: 'Complete bird’s-eye visibility over your business',
    description:
      'A clean, custom dashboard showing you today\'s inbound calls, booked appointments, active client jobs, and incoming revenue in real time on desktop or mobile.',
    features: [
      'Live view of all answered phone calls and transcript summaries',
      'Real-time revenue attribution and pipeline velocity tracking',
      'Team task assignments and completed automated workflows',
      'Accessible on your phone, tablet, or desktop anywhere',
    ],
    metric: '100% Operational Visibility',
  },
]

export default function StudioOdooSuite() {
  const [selectedModule, setSelectedModule] = useState(modules[0])
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const } }
  }

  return (
    <section id="suite" className="py-20 lg:py-28 border-b border-zinc-100/80 bg-white">
      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 font-medium text-xs mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            The Epicrio platform
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-medium tracking-[-0.03em] text-[#0A0A0A] max-w-2xl">
            Six systems. One roof. Zero manual work.
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-zinc-500 font-sans max-w-xl">
            Each module works independently or as a unified stack. Pick what you need now — expand when you're ready.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {modules.map((mod) => {
            const isSelected = selectedModule.id === mod.id
            return (
              <motion.button
                key={mod.id}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedModule(mod)}
                className={`text-left rounded-2xl p-8 border transition-all duration-200 group ${
                  isSelected
                    ? 'border-zinc-200 bg-white shadow-sm ring-1 ring-zinc-100'
                    : 'border-zinc-100 bg-white hover:border-zinc-200 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.04)]'
                }`}
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-zinc-800' : 'bg-zinc-200 group-hover:bg-zinc-300 transition-colors'}`} />
                  <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                    {mod.metric}
                  </span>
                </div>
                <h3 className="text-base font-medium text-[#0A0A0A] mb-2 font-sans">
                  {mod.name}
                </h3>
                <p className="text-sm text-zinc-500 font-sans leading-relaxed">
                  {mod.subtitle}
                </p>
              </motion.button>
            )
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedModule.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] as const }}
            className="rounded-2xl p-8 md:p-10 border border-zinc-100 bg-white shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-display font-medium text-[#0A0A0A] tracking-[-0.03em] mb-2">
                    {selectedModule.name}
                  </h3>
                  <p className="text-[15px] text-zinc-500 font-sans">
                    {selectedModule.subtitle}
                  </p>
                </div>

                <p className="text-[15px] leading-relaxed text-zinc-500 font-sans">
                  {selectedModule.description}
                </p>

                <div className="pt-4 flex items-center gap-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/book"
                      className="inline-flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 text-white rounded-full px-6 py-3 text-sm font-medium transition-colors"
                    >
                      Book a call
                    </Link>
                  </motion.div>
                  <motion.a
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    href="#voice-receptionist"
                    className="inline-flex items-center justify-center bg-transparent border border-zinc-200 hover:border-zinc-300 text-zinc-700 rounded-full px-6 py-3 text-sm font-medium transition-colors"
                  >
                    See Details
                  </motion.a>
                </div>
              </div>

              <div className="space-y-6">
                <div className="text-sm font-medium text-[#0A0A0A]">
                  Key Capabilities
                </div>
                <ul className="space-y-4">
                  {selectedModule.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[15px] text-zinc-500 font-sans leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
