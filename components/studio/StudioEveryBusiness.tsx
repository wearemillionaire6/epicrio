'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { containerVariants, itemVariants } from '@/lib/motion'

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

  return (
    <section ref={ref} id="industries" className="py-32 md:py-40 bg-white">
      <motion.div 
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
        }}
        className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 40, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="max-w-3xl mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-zinc-300" />
            <span className="uppercase tracking-[0.15em] text-zinc-400 text-[13px] font-sans font-medium">Who We Work With</span>
          </div>
          
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0A0A0A] mb-8">
            Built for businesses that run on appointments and service calls.
          </h2>
          
          <p className="font-sans text-[17px] leading-relaxed text-zinc-500 max-w-2xl">
            Whether you're dispatching HVAC technicians or managing a dental practice — if your team loses hours to phone tag, spreadsheets, and manual follow-ups, we fix that.
          </p>
        </motion.div>

        {/* Industry Filter Tabs */}
        <motion.div variants={{ hidden: { opacity: 0, y: 40, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="flex overflow-x-auto hide-scrollbar gap-8 mb-16 border-b border-zinc-100 pb-px">
          {industries.map((ind) => {
            const isSelected = activeTab.id === ind.id
            return (
              <button
                key={ind.id}
                type="button"
                onClick={() => setActiveTab(ind)}
                className={`relative whitespace-nowrap pb-4 text-[15px] font-medium transition-colors ${
                  isSelected ? 'text-[#0A0A0A]' : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                {ind.title}
                {isSelected && (
                  <motion.div
                    layoutId="activeIndustry"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A0A0A]"
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            )
          })}
        </motion.div>

        {/* Selected Industry Transformation Card */}
        <motion.div variants={{ hidden: { opacity: 0, y: 60, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#FAFAFA] border border-zinc-100 rounded-3xl p-8 sm:p-12 lg:p-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                {/* Left: Industry Overview */}
                <div className="lg:col-span-5 space-y-10">
                  <div>
                    <h3 className="font-display text-4xl lg:text-5xl text-[#0A0A0A] mb-4">
                      {activeTab.title}
                    </h3>
                    <p className="text-[17px] text-zinc-500 font-sans">
                      {activeTab.subtitle}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <span className="inline-block text-[13px] font-mono tracking-tight px-4 py-2 bg-white border border-zinc-200 text-zinc-600 rounded-full w-fit">
                      {activeTab.hoursSaved}
                    </span>
                    <span className="inline-block text-[13px] font-mono tracking-tight px-4 py-2 bg-white border border-zinc-200 text-zinc-600 rounded-full w-fit">
                      {activeTab.badge}
                    </span>
                  </div>

                  <div className="pt-4">
                    <Link
                      href="/book"
                      className="inline-flex items-center text-[15px] font-medium text-[#0A0A0A] hover:opacity-70 transition-opacity"
                    >
                      Book a systems call &rarr;
                    </Link>
                  </div>
                </div>

                {/* Right: The Contrast (Before & After) */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Before */}
                  <div className="bg-white border-t-2 border-rose-200 border-x border-b border-zinc-100 p-8 rounded-2xl flex flex-col h-full">
                    <div className="mb-6">
                      <span className="text-[11px] text-zinc-400 uppercase tracking-widest font-sans font-medium">
                        Before
                      </span>
                    </div>
                    <p className="text-[15px] text-zinc-500 leading-relaxed font-sans">
                      {activeTab.heavyWork}
                    </p>
                  </div>

                  {/* After */}
                  <div className="bg-[#0A0A0A] text-white p-8 rounded-2xl flex flex-col h-full shadow-xl">
                    <div className="mb-6">
                      <span className="text-[11px] text-zinc-400 uppercase tracking-widest font-sans font-medium">
                        With Epicrio
                      </span>
                    </div>
                    <p className="text-[15px] text-zinc-100 leading-relaxed font-sans">
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
