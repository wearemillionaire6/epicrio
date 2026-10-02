'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { PhoneCall, Users, Workflow, Mail, LayoutGrid, BarChart } from 'lucide-react'

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
    icon: PhoneCall,
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
    icon: Users,
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
    icon: Workflow,
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
    icon: Mail,
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
    icon: LayoutGrid,
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
    icon: BarChart,
  },
]

// Premium motion system
const EASE = [0.16, 1, 0.3, 1] as const
const blurReveal = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } }
}
const cardReveal = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } }
}

export default function StudioOdooSuite() {
  const [selectedModule, setSelectedModule] = useState(modules[0])
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="suite" className="py-32 md:py-40 bg-white border-b border-zinc-100">
      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } }
          }}
          className="mb-24"
        >
          <motion.div variants={blurReveal} className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-zinc-300" />
            <span className="text-[13px] font-sans font-medium text-zinc-400 uppercase tracking-[0.15em]">
              The Epicrio Platform
            </span>
          </motion.div>
          <motion.h2 variants={blurReveal} className="text-5xl md:text-6xl font-display tracking-tight text-[#0A0A0A] max-w-3xl">
            Six systems. One roof. Zero manual work.
          </motion.h2>
          <motion.p variants={blurReveal} className="mt-8 text-[17px] leading-relaxed text-zinc-500 font-sans max-w-2xl">
            Each module works independently or as a unified stack. Pick what you need now — expand when you're ready.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } }
          }}
        >
          {modules.map((mod) => {
            const isSelected = selectedModule.id === mod.id
            const Icon = mod.icon
            return (
              <motion.button
                key={mod.id}
                variants={cardReveal}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedModule(mod)}
                className={`text-left rounded-2xl p-8 border transition-all duration-300 group ${
                  isSelected
                    ? 'border-zinc-200 bg-[#FAFAFA] shadow-md ring-1 ring-zinc-100'
                    : 'border-[#F0F0F0] bg-white hover:border-zinc-300 hover:shadow-lg'
                }`}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-zinc-100 text-[#0A0A0A]' : 'bg-zinc-50 text-zinc-400 group-hover:text-zinc-600'}`}>
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <span className={`text-[12px] font-mono tracking-wider ${isSelected ? 'text-[#0A0A0A]' : 'text-zinc-500'}`}>
                    {mod.metric}
                  </span>
                </div>
                <h3 className="text-xl font-medium text-[#0A0A0A] mb-3 font-sans">
                  {mod.name}
                </h3>
                <p className="text-[15px] text-zinc-500 font-sans leading-relaxed">
                  {mod.subtitle}
                </p>
              </motion.button>
            )
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedModule.id}
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="rounded-3xl p-10 md:p-16 border border-[#F0F0F0] bg-[#FAFAFA]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <div>
                  <h3 className="text-4xl font-display text-[#0A0A0A] tracking-tight mb-4">
                    {selectedModule.name}
                  </h3>
                  <p className="text-[17px] text-zinc-500 font-sans">
                    {selectedModule.subtitle}
                  </p>
                </div>

                <p className="text-[17px] leading-relaxed text-zinc-500 font-sans max-w-lg">
                  {selectedModule.description}
                </p>

                <div className="pt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href="/book"
                    className="inline-flex items-center justify-center bg-[#0A0A0A] hover:bg-zinc-800 text-white rounded-full px-8 py-4 text-[15px] font-medium transition-colors"
                  >
                    Book a call
                  </Link>
                  <a
                    href="#voice-receptionist"
                    className="inline-flex items-center justify-center bg-transparent border border-[#F0F0F0] hover:border-zinc-300 text-zinc-700 rounded-full px-8 py-4 text-[15px] font-medium transition-colors"
                  >
                    See Details
                  </a>
                </div>
              </div>

              <div className="space-y-8 lg:pl-8 border-t lg:border-t-0 lg:border-l border-[#F0F0F0] pt-8 lg:pt-0">
                <div className="text-[13px] font-sans font-medium text-zinc-400 uppercase tracking-[0.15em]">
                  Key Capabilities
                </div>
                <ul className="space-y-5">
                  {selectedModule.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 mt-2 shrink-0" />
                      <span className="text-[17px] text-zinc-600 font-sans leading-relaxed">{feat}</span>
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
