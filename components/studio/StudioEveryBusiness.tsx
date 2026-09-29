'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const industries = [
  {
    id: 'trades',
    title: 'Trade & Home Services',
    subtitle: 'HVAC, Plumbing, Electrical, Roofing',
    heavyWork: 'Technicians on roofs or under sinks miss customer calls. Late-night emergency inquiries go straight to voicemail. Reps spend evenings writing paper estimates and chasing unpaid invoices.',
    automatedWork: '24/7 AI Voice Receptionist answers on the 1st ring, qualifies customer urgency, books service dispatch directly onto technicians’ calendars, sends SMS updates, and sends Stripe invoice links automatically.',
    hoursSaved: '20+ hours saved every week',
    badge: 'Never miss another emergency job',
  },
  {
    id: 'clinics',
    title: 'Healthcare & Specialty Clinics',
    subtitle: 'Dental, Physical Therapy, Dermatology, Wellness',
    heavyWork: 'Front-desk staff overwhelmed with ringing phones while checking in in-person patients. High patient no-show rates from missed reminders. Manual typing of patient intake forms into software.',
    automatedWork: 'AI receptionist handles inbound scheduling and routine inquiries 24/7. Automated 24-hour and 2-hour SMS reminders slash no-shows by 85%. Intake questionnaires sync straight to your clinic records.',
    hoursSaved: '25+ hours saved every week',
    badge: '85% fewer appointment no-shows',
  },
  {
    id: 'legal',
    title: 'Legal & Professional Services',
    subtitle: 'Law Firms, Accounting, Advisory, Consultants',
    heavyWork: 'Partners interrupted by non-qualified prospects. Hours wasted playing phone tag to find consultation times. Manually drafting engagement agreements and tracking billing payments.',
    automatedWork: 'AI receptionist screens prospective clients with customized intake questions, books initial consultations directly into partner calendars, and auto-generates retainer agreements via e-sign.',
    hoursSaved: '15+ billable hours saved weekly',
    badge: 'Pre-screened consultations only',
  },
  {
    id: 'realestate',
    title: 'Real Estate & Property Management',
    subtitle: 'Brokers, Leasing Agents, Property Managers',
    heavyWork: 'Answering hundreds of repetitive "is this property still available?" calls. Coordinating weekend tour schedules manually. Urgent tenant water-leak tickets lost in cluttered email inboxes.',
    automatedWork: 'Instant lead qualification, automated walkthrough booking via calendar links, and priority routing for urgent tenant maintenance emergencies directly to on-call contractors.',
    hoursSaved: '30+ hours saved every week',
    badge: 'Instant tour scheduling 24/7',
  },
  {
    id: 'agencies',
    title: 'B2B Agencies & Software Firms',
    subtitle: 'Marketing, Design, Development, Consulting',
    heavyWork: 'Manual lead prospecting, copy-pasting client data into spreadsheets, sending manual invoices on Stripe, and manually chasing contract signatures and onboardings.',
    automatedWork: 'Outbound Gmail engine runs automatically, CRM tracks deal stages, contracts are generated and sent for e-signature with deposit links, and team is notified in Slack.',
    hoursSaved: '35+ hours saved every week',
    badge: '10–30 booked client meetings/mo',
  },
]

export default function StudioEveryBusiness() {
  const [activeTab, setActiveTab] = useState(industries[0])
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const }
    }
  }

  return (
    <section ref={ref} id="industries" className="py-20 lg:py-28 border-b border-zinc-100/80 bg-white">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12"
      >
        <motion.div variants={itemVariants} className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            Who we work with
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-zinc-900 mb-6">
            Built for businesses that run on appointments and service calls.
          </h2>
          <p className="font-sans text-[15px] leading-relaxed text-zinc-500">
            Whether you're dispatching HVAC technicians or managing a dental practice — if your team loses hours to phone tag, spreadsheets, and manual follow-ups, we fix that.
          </p>
        </motion.div>

        {/* Industry Filter Pills */}
        <motion.div variants={itemVariants} className="flex overflow-x-auto hide-scrollbar gap-3 mb-12 pb-2">
          {industries.map((ind) => {
            const isSelected = activeTab.id === ind.id
            return (
              <button
                key={ind.id}
                type="button"
                onClick={() => setActiveTab(ind)}
                className={`whitespace-nowrap flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? 'bg-zinc-900 text-white'
                    : 'bg-transparent text-zinc-500 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-300'
                }`}
              >
                {ind.title}
              </button>
            )
          })}
        </motion.div>

        {/* Selected Industry Transformation Card */}
        <motion.div variants={itemVariants}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] as const }}
              className="border border-zinc-100 rounded-2xl p-8 bg-white shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left: Industry Overview */}
                <div className="lg:col-span-5 space-y-8">
                  <div>
                    <h3 className="font-display text-2xl font-medium tracking-tight text-zinc-900 mb-2">
                      {activeTab.title}
                    </h3>
                    <p className="text-[15px] text-zinc-500">
                      {activeTab.subtitle}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <span className="inline-block text-xs font-medium px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-600 w-fit">
                      {activeTab.hoursSaved}
                    </span>
                    <span className="inline-block text-xs font-medium px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-600 w-fit">
                      {activeTab.badge}
                    </span>
                  </div>

                  <div>
                    <Link
                      href="/book"
                      className="inline-flex items-center text-sm font-medium text-zinc-900 hover:underline"
                    >
                      Book a systems call &rarr;
                    </Link>
                  </div>
                </div>

                {/* Right: The Contrast (Before & After) */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Before */}
                  <div className="border border-zinc-100 bg-white p-6 rounded-xl flex flex-col h-full">
                    <div className="mb-4">
                      <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                        Before
                      </span>
                    </div>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      {activeTab.heavyWork}
                    </p>
                  </div>

                  {/* After */}
                  <div className="border border-zinc-900 bg-zinc-900 text-white p-6 rounded-xl flex flex-col h-full shadow-[0_0_0_1px_rgba(0,0,0,0.04)]">
                    <div className="mb-4">
                      <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                        With Epicrio
                      </span>
                    </div>
                    <p className="text-sm text-zinc-100 leading-relaxed">
                      {activeTab.automatedWork}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  )
}
