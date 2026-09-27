'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface StudioEveryBusinessProps {
  isDark?: boolean
}

const industries = [
  {
    id: 'trades',
    icon: '🛠️',
    title: 'Trade & Home Services',
    subtitle: 'HVAC, Plumbing, Electrical, Roofing',
    heavyWork: 'Technicians on roofs or under sinks miss customer calls. Late-night emergency inquiries go straight to voicemail. Reps spend evenings writing paper estimates and chasing unpaid invoices.',
    automatedWork: '24/7 AI Voice Receptionist answers on the 1st ring, qualifies customer urgency, books service dispatch directly onto technicians’ calendars, sends SMS updates, and sends Stripe invoice links automatically.',
    hoursSaved: '20+ hours saved every week',
    badge: 'Never miss another emergency job',
  },
  {
    id: 'clinics',
    icon: '🏥',
    title: 'Healthcare & Specialty Clinics',
    subtitle: 'Dental, Physical Therapy, Dermatology, Wellness',
    heavyWork: 'Front-desk staff overwhelmed with ringing phones while checking in in-person patients. High patient no-show rates from missed reminders. Manual typing of patient intake forms into software.',
    automatedWork: 'AI receptionist handles inbound scheduling and routine inquiries 24/7. Automated 24-hour and 2-hour SMS reminders slash no-shows by 85%. Intake questionnaires sync straight to your clinic records.',
    hoursSaved: '25+ hours saved every week',
    badge: '85% fewer appointment no-shows',
  },
  {
    id: 'legal',
    icon: '⚖️',
    title: 'Legal & Professional Services',
    subtitle: 'Law Firms, Accounting, Advisory, Consultants',
    heavyWork: 'Partners interrupted by non-qualified prospects. Hours wasted playing phone tag to find consultation times. Manually drafting engagement agreements and tracking billing payments.',
    automatedWork: 'AI receptionist screens prospective clients with customized intake questions, books initial consultations directly into partner calendars, and auto-generates retainer agreements via e-sign.',
    hoursSaved: '15+ billable hours saved weekly',
    badge: 'Pre-screened consultations only',
  },
  {
    id: 'realestate',
    icon: '🏢',
    title: 'Real Estate & Property Management',
    subtitle: 'Brokers, Leasing Agents, Property Managers',
    heavyWork: 'Answering hundreds of repetitive "is this property still available?" calls. Coordinating weekend tour schedules manually. Urgent tenant water-leak tickets lost in cluttered email inboxes.',
    automatedWork: 'Instant lead qualification, automated walkthrough booking via calendar links, and priority routing for urgent tenant maintenance emergencies directly to on-call contractors.',
    hoursSaved: '30+ hours saved every week',
    badge: 'Instant tour scheduling 24/7',
  },
  {
    id: 'agencies',
    icon: '💼',
    title: 'B2B Agencies & Software Firms',
    subtitle: 'Marketing, Design, Development, Consulting',
    heavyWork: 'Manual lead prospecting, copy-pasting client data into spreadsheets, sending manual invoices on Stripe, and manually chasing contract signatures and onboardings.',
    automatedWork: 'Outbound Gmail engine runs automatically, CRM tracks deal stages, contracts are generated and sent for e-signature with deposit links, and team is notified in Slack.',
    hoursSaved: '35+ hours saved every week',
    badge: '10–30 booked client meetings/mo',
  },
]

export default function StudioEveryBusiness({ isDark = false }: StudioEveryBusinessProps) {
  const [activeTab, setActiveTab] = useState(industries[0])

  return (
    <section id="industries" className="py-20 border-t border-black/[0.06]">
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/[0.06] bg-white text-xs font-semibold text-zinc-800 mb-3.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-zinc-950" />
          <span>Who we work with</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950">
          Built for businesses that run on appointments and service calls.
        </h2>
        <p className="mt-3.5 text-base leading-relaxed text-zinc-600 font-normal">
          Whether you're dispatching HVAC technicians or managing a dental practice — if your team loses hours to phone tag, spreadsheets, and manual follow-ups, we fix that.
        </p>
      </div>

      {/* Industry Filter Pills */}
      <div className="flex flex-wrap gap-2.5 mb-8">
        {industries.map((ind) => {
          const isSelected = activeTab.id === ind.id
          return (
            <button
              key={ind.id}
              type="button"
              onClick={() => setActiveTab(ind)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                isSelected
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'bg-white border border-black/[0.06] text-zinc-700 hover:text-black hover:border-black/25 shadow-sm hover:bg-zinc-50'
              }`}
            >
              <span>{ind.title}</span>
            </button>
          )
        })}
      </div>

      {/* Selected Industry Transformation Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl p-7 sm:p-10 border border-black/[0.06] bg-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.02)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left: Industry Overview */}
            <div className="lg:col-span-4 space-y-3">
              <h3 className="text-2xl font-bold tracking-tight text-zinc-950">
                {activeTab.title}
              </h3>
              <p className="text-xs text-zinc-600 font-medium">
                {activeTab.subtitle}
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <span className="inline-block text-xs font-semibold px-3 py-1.5 rounded-xl bg-zinc-100 text-zinc-900 border border-black/5 w-fit">
                  ⏱️ {activeTab.hoursSaved}
                </span>
                <span className="inline-block text-xs font-medium px-3 py-1.5 rounded-xl bg-zinc-100 text-zinc-800 border border-zinc-200 w-fit">
                  ⚡ {activeTab.badge}
                </span>
              </div>
              <div className="pt-4">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-950 hover:underline"
                >
                  <span>Book a systems call</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Right: The Contrast (Before & After) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Heavy Manual Work (Before) */}
              <div className="rounded-2xl p-6 border border-rose-200 bg-rose-50/60 space-y-2.5 shadow-sm">
                <div className="text-xs font-bold text-rose-600 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span>✕</span>
                    <span>Before</span>
                  </span>
                  <span className="text-[10px] uppercase font-sans px-2 py-0.5 rounded bg-rose-200/50 text-rose-700">
                    [BEFORE]
                  </span>
                </div>
                <p className="text-xs text-zinc-700 leading-relaxed font-normal">
                  {activeTab.heavyWork}
                </p>
              </div>

              {/* Easy Automated Work (After) */}
              <div className="rounded-2xl p-6 border border-zinc-200 bg-zinc-50/70 space-y-2.5 shadow-sm">
                <div className="text-xs font-bold text-zinc-950 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="font-bold">✓</span>
                    <span>After</span>
                  </span>
                  <span className="text-[10px] uppercase font-sans px-2 py-0.5 rounded bg-zinc-950 text-white font-medium">
                    [WITH EPICRIO]
                  </span>
                </div>
                <p className="text-xs text-zinc-950 font-medium leading-relaxed">
                  {activeTab.automatedWork}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
