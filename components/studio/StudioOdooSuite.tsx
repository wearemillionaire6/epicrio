'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface StudioOdooSuiteProps {
  isDark?: boolean
}

const modules = [
  {
    id: 'voice',
    icon: '📞',
    name: '24/7 AI Voice Receptionist',
    subtitle: 'Never miss an inbound customer call again',
    description:
      'Answers your company phone lines instantly with a natural, conversational human voice. Answers customer FAQs, screens spam callers, schedules appointments directly into Google Calendar or Cal.com, and sends instant SMS summaries to your phone.',
    features: [
      'Answers within 2 rings, 24 hours a day, 365 days a year',
      'Books appointments and checks calendar availability in real time',
      'Sends instant SMS confirmations to the caller and alert to your team',
      'Routes urgent emergencies to your personal mobile immediately',
    ],
    metric: '100% Call Answer Rate',
  },
  {
    id: 'crm',
    icon: '🗂️',
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
    icon: '⚡',
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
    icon: '✉️',
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
    icon: '🔗',
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
    icon: '📊',
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

export default function StudioOdooSuite({ isDark = false }: StudioOdooSuiteProps) {
  const [selectedModule, setSelectedModule] = useState(modules[0])

  return (
    <section id="suite" className="py-20 border-t border-black/[0.06]">
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/[0.06] bg-white text-xs font-semibold text-zinc-800 mb-3.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-zinc-950" />
          <span>The Epicrio platform</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950">
          Six systems. One roof. Zero manual work.
        </h2>
        <p className="mt-3.5 text-base leading-relaxed text-zinc-600 font-normal">
          Each module works independently or as a unified stack. Pick what you need now — expand when you're ready.
        </p>
      </div>

      {/* Grid of All 6 Modular Apps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {modules.map((mod) => {
          const isSelected = selectedModule.id === mod.id
          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => setSelectedModule(mod)}
              className={`rounded-2xl p-6 text-left border transition-all duration-150 cursor-pointer ${
                isSelected
                  ? 'bg-white border-zinc-950 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.02)] ring-1 ring-zinc-950 scale-[1.01]'
                  : 'bg-white/80 border-black/[0.06] hover:border-black/25 shadow-sm hover:shadow hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-zinc-950 text-white'
                      : 'bg-zinc-100 text-zinc-700'
                  }`}
                >
                  {mod.metric}
                </span>
              </div>
              <h3 className="text-base font-bold text-zinc-950 mb-1 tracking-tight">
                {mod.name}
              </h3>
              <p className="text-xs leading-relaxed text-zinc-600">
                {mod.subtitle}
              </p>
            </button>
          )
        })}
      </div>

      {/* Selected Module Spotlight Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedModule.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl p-7 sm:p-10 border border-black/[0.06] bg-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.02)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-2xl font-bold text-zinc-950 tracking-tight">
                    {selectedModule.name}
                  </h3>
                  <p className="text-xs text-zinc-600 font-medium">
                    {selectedModule.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-zinc-600 font-normal">
                {selectedModule.description}
              </p>

              <div className="pt-2 flex items-center gap-3">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-zinc-950 text-white hover:bg-zinc-800 shadow-sm transition-all active:scale-[0.98]"
                >
                  <span>Book a call</span>
                  <span>&rarr;</span>
                </Link>
                <a
                  href="#voice-receptionist"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-medium border border-black/[0.06] text-zinc-700 hover:text-black hover:bg-zinc-50 transition-colors"
                >
                  See Voice AI &darr;
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl p-6 border border-zinc-200 bg-zinc-50/70 space-y-3 shadow-inner">
              <div className="font-semibold text-xs uppercase tracking-wider text-zinc-500 pb-2 border-b border-black/5 font-sans">
                Key Capabilities:
              </div>
              <ul className="space-y-2.5 text-xs">
                {selectedModule.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-zinc-950 font-bold text-sm leading-none mt-0.5">
                      ✓
                    </span>
                    <span className="text-zinc-700 font-normal">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
