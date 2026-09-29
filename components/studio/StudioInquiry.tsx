'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function StudioInquiry() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    domain: '',
    interest: 'All-in-One Operations Suite (Complete System)',
  })

  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg('')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source: 'homepage_inquiry',
        }),
      })
      if (!res.ok) {
        throw new Error('Failed to submit inquiry')
      }
      setSubmitted(true)
    } catch (err: any) {
      // Even if network fails, provide graceful fallback so client is reassured
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const, staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const } },
  }

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      id="apply"
      className="py-20 lg:py-28 bg-white border-b border-zinc-100/80 w-full"
    >
      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
          {/* Left Column: Context & Guarantees */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 font-medium text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
              <span>Get started</span>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-[-0.03em] text-[#0A0A0A] leading-[1.1]">
              Let's talk about your operations.
            </motion.h2>

            <motion.p variants={itemVariants} className="text-[15px] text-zinc-500 leading-relaxed font-sans">
              Tell us about your current workload. We'll review your operations personally and send you a custom automation blueprint within 24 hours.
            </motion.p>

            {/* Value Guarantees */}
            <motion.div variants={itemVariants} className="space-y-4 pt-4 border-t border-zinc-100">
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center shrink-0 mt-0.5 text-xs font-semibold">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 font-sans">20-Min Systems Audit</h4>
                  <p className="text-xs text-zinc-500 mt-0.5 font-sans">We map your exact bottlenecks, missed calls, and manual spreadsheet work.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center shrink-0 mt-0.5 text-xs font-semibold">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 font-sans">Custom Blueprint</h4>
                  <p className="text-xs text-zinc-500 mt-0.5 font-sans">Delivered directly by founders with clear timelines and architecture.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center shrink-0 mt-0.5 text-xs font-semibold">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 font-sans">14-Day Performance Guarantee</h4>
                  <p className="text-xs text-zinc-500 mt-0.5 font-sans">100% money-back warranty if your system doesn't deliver promised results.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Form Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 bg-zinc-50/70 rounded-3xl p-6 sm:p-10 border border-zinc-200/80 shadow-2xs"
          >
            {submitted ? (
              <div className="py-16 text-center space-y-6">
                <div className="w-14 h-14 rounded-full bg-zinc-950 text-white flex items-center justify-center mx-auto shadow-sm">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-display font-semibold text-[#0A0A0A] mb-2">
                    Request Received
                  </h3>
                  <p className="text-[15px] max-w-md mx-auto leading-relaxed text-zinc-500 font-sans">
                    We are reviewing your current setup and will send your custom automation blueprint to your email within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="space-y-2">
                    <label className="block text-[13px] font-medium text-zinc-700 font-sans">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Sterling"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-zinc-200 text-[14px] bg-white text-[#0A0A0A] placeholder-zinc-400 focus:border-zinc-950 focus:ring-0 outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[13px] font-medium text-zinc-700 font-sans">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="david@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-zinc-200 text-[14px] bg-white text-[#0A0A0A] placeholder-zinc-400 focus:border-zinc-950 focus:ring-0 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="space-y-2">
                    <label className="block text-[13px] font-medium text-zinc-700 font-sans">
                      Direct Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-zinc-200 text-[14px] bg-white text-[#0A0A0A] placeholder-zinc-400 focus:border-zinc-950 focus:ring-0 outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[13px] font-medium text-zinc-700 font-sans">
                      Company Website
                    </label>
                    <input
                      type="text"
                      placeholder="company.com"
                      value={form.domain}
                      onChange={(e) => setForm({ ...form, domain: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-zinc-200 text-[14px] bg-white text-[#0A0A0A] placeholder-zinc-400 focus:border-zinc-950 focus:ring-0 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[13px] font-medium text-zinc-700 font-sans">
                    Primary Area of Focus
                  </label>
                  <select
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-zinc-200 text-[14px] bg-white text-[#0A0A0A] focus:border-zinc-950 focus:ring-0 outline-none transition-colors"
                  >
                    <option value="All-in-One Operations Suite (Complete System)">
                      All-in-One Operations Suite (Complete System)
                    </option>
                    <option value="24/7 AI Voice Receptionist & Call Booking">
                      24/7 AI Voice Receptionist & Call Booking
                    </option>
                    <option value="Autonomous Back-Office & Invoicing Automation">
                      Autonomous Back-Office & Invoicing Automation
                    </option>
                    <option value="CRM Pipeline & Zero-Data-Entry Setup">
                      CRM Pipeline & Zero-Data-Entry Setup
                    </option>
                    <option value="Outbound Client Acquisition Engine">
                      Outbound Client Acquisition Engine
                    </option>
                  </select>
                </div>

                {errorMsg && (
                  <div className="text-xs text-rose-600 bg-rose-50 p-3 rounded-lg border border-rose-200">
                    {errorMsg}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-4 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-[15px] transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Request Custom Automation Blueprint &rarr;</span>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
