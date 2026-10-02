'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const workflowSteps = [
  {
    number: '1',
    title: 'Instant Lead Capture',
    desc: 'When a customer calls your AI receptionist, submits a website form, or replies to an email, their details are immediately created in your CRM with zero manual typing.',
    icon: (
      <svg className="w-5 h-5 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    number: '2',
    title: 'Automated Quote & Contract',
    desc: 'Generate branded PDF proposals and contracts in seconds. Customers can sign on their phone with a single tap, with deposit invoices automatically sent via Stripe.',
    icon: (
      <svg className="w-5 h-5 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    number: '3',
    title: 'Team Dispatch & Notifications',
    desc: 'Your technicians, account reps, or clinic staff receive instant WhatsApp or Slack notifications with customer notes, address, and job requirements.',
    icon: (
      <svg className="w-5 h-5 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    number: '4',
    title: 'Automated Reviews & Re-Booking',
    desc: 'Once the service is completed, the system automatically sends a friendly review request, files the paid receipt, and schedules routine follow-ups.',
    icon: (
      <svg className="w-5 h-5 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )
  }
]

const EASE = [0.16, 1, 0.3, 1] as const
const blurReveal = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } }
}
const cardReveal = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } }
}

export default function StudioCrmWorkflows() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

  return (
    <motion.section 
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } }
      }}
      id="crm-workflows" 
      className="py-32 md:py-40 bg-[#FAFAFA] border-b border-zinc-100"
    >
      <div className="w-full max-w-4xl mb-24 px-4 sm:px-6 mx-auto text-center flex flex-col items-center">
        <motion.div variants={blurReveal} className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px bg-zinc-300" />
          <span className="text-[13px] font-sans font-medium text-zinc-400 uppercase tracking-[0.15em]">
            Autonomous Back-Office
          </span>
          <div className="w-8 h-px bg-zinc-300" />
        </motion.div>
        
        <motion.h2 variants={blurReveal} className="text-5xl md:text-6xl font-display tracking-tight text-[#0A0A0A]">
          From lead capture to invoice — fully hands-free.
        </motion.h2>
        
        <motion.p variants={blurReveal} className="mt-8 text-[17px] text-zinc-500 max-w-2xl mx-auto leading-relaxed font-sans">
          New leads flow into your CRM automatically. Quotes generate themselves. Contracts get signed digitally. Invoices fire through Stripe. Your team just shows up and does the work.
        </motion.p>
      </div>

      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative">
        {/* Decorative connecting line */}
        <div className="hidden lg:block absolute top-[45%] left-12 right-12 h-[1px] border-b border-dashed border-zinc-300 -z-10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {workflowSteps.map((step) => (
            <motion.div
              key={step.number}
              variants={cardReveal}
              whileHover={{ y: -6 }}
              className="relative rounded-3xl p-10 bg-white border border-[#F0F0F0] shadow-sm flex flex-col overflow-hidden"
            >
              {/* Massive Serif Watermark */}
              <div className="absolute -top-4 -right-4 text-8xl font-display text-zinc-50 opacity-50 select-none pointer-events-none">
                0{step.number}
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] flex items-center justify-center mb-8">
                  {step.icon}
                </div>
                
                <h3 className="text-xl font-medium text-[#0A0A0A] mb-4 font-sans">
                  {step.title}
                </h3>
                
                <p className="text-[15px] leading-relaxed text-zinc-500 font-sans">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mt-20">
        <motion.div 
          variants={blurReveal} 
          className="rounded-3xl p-10 bg-white border border-[#F0F0F0] flex flex-col md:flex-row items-center justify-between gap-10 shadow-sm"
        >
          <div className="flex-1">
            <h4 className="text-[17px] font-medium text-[#0A0A0A] mb-4">
              Compatible with your existing tools
            </h4>
            <div className="flex flex-wrap gap-3">
              {['HubSpot', 'Twenty CRM', 'GoHighLevel', 'Stripe', 'Google Workspace', 'WhatsApp', 'Slack', 'QuickBooks'].map((tool) => (
                <span key={tool} className="px-3 py-1.5 bg-[#FAFAFA] border border-[#F0F0F0] rounded-md text-[13px] font-mono text-zinc-600">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <motion.a
            href="#apply"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 text-[15px] font-medium rounded-full whitespace-nowrap bg-[#0A0A0A] text-white shadow-md"
          >
            Automate Your Workflows
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  )
}
