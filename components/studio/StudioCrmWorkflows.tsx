'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const workflowSteps = [
  {
    number: '01',
    title: 'Instant Lead Capture',
    desc: 'When a customer calls your AI receptionist, submits a website form, or replies to an email, their details are immediately created in your CRM with zero manual typing.',
    icon: (
      <svg className="w-5 h-5 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    number: '02',
    title: 'Automated Quote & Contract',
    desc: 'Generate branded PDF proposals and contracts in seconds. Customers can sign on their phone with a single tap, with deposit invoices automatically sent via Stripe.',
    icon: (
      <svg className="w-5 h-5 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    number: '03',
    title: 'Team Dispatch & Notifications',
    desc: 'Your technicians, account reps, or clinic staff receive instant WhatsApp or Slack notifications with customer notes, address, and job requirements.',
    icon: (
      <svg className="w-5 h-5 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    number: '04',
    title: 'Automated Reviews & Re-Booking',
    desc: 'Once the service is completed, the system automatically sends a friendly review request, files the paid receipt, and schedules routine follow-ups.',
    icon: (
      <svg className="w-5 h-5 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )
  }
]

export default function StudioCrmWorkflows() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const, staggerChildren: 0.08 }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const } }
  }

  return (
    <motion.section 
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      id="crm-workflows" 
      className="py-20 lg:py-28 border-b border-zinc-100/80 bg-white"
    >
      <div className="w-full max-w-4xl mb-16 px-4 sm:px-6 mx-auto text-center">
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 font-medium text-xs mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
          <span>Autonomous back-office</span>
        </motion.div>
        
        <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-display font-medium tracking-[-0.03em] text-[#0A0A0A]">
          From lead capture to invoice — fully hands-free.
        </motion.h2>
        
        <motion.p variants={itemVariants} className="mt-6 text-[15px] text-zinc-500 max-w-2xl mx-auto leading-relaxed font-sans">
          New leads flow into your CRM automatically. Quotes generate themselves. Contracts get signed digitally. Invoices fire through Stripe. Your team just shows up and does the work.
        </motion.p>
      </div>

      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {workflowSteps.map((step) => (
          <motion.div
            key={step.number}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="rounded-2xl p-8 bg-white border border-zinc-100 shadow-sm flex flex-col"
          >
            <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center mb-6">
              {step.icon}
            </div>
            
            <h3 className="text-[16px] font-medium text-[#0A0A0A] mb-3">
              {step.title}
            </h3>
            
            <p className="text-[14px] leading-relaxed text-zinc-500">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 mt-12">
        <motion.div 
          variants={itemVariants} 
          className="rounded-2xl p-8 bg-zinc-50 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h4 className="text-[15px] font-medium text-[#0A0A0A] mb-1">
              Compatible with your existing tools
            </h4>
            <p className="text-[14px] text-zinc-500">
              We seamlessly connect HubSpot, Twenty CRM, GoHighLevel, Stripe, Google Workspace, WhatsApp, Slack, and QuickBooks.
            </p>
          </div>

          <motion.a
            href="#apply"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 text-sm font-medium rounded-full whitespace-nowrap bg-zinc-900 text-white"
          >
            Automate Your Workflows
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  )
}
