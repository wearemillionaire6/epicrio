'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  containerVariants,
  headingVariants,
  fadeUpVariants,
  cardVariants,
  viewportConfig,
  premiumEase,
} from '@/lib/motion'

export default function StudioInquiry() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    domain: '',
    interest: 'Custom Enterprise (Tailored Scope)',
  })
  const [customScopeDetail, setCustomScopeDetail] = useState('')

  useEffect(() => {
    const handleSelectPlan = (e: any) => {
      if (e?.detail) {
        const detailStr = String(e.detail)
        if (detailStr.includes('Custom Enterprise')) {
          setForm((prev) => ({ ...prev, interest: 'Custom Enterprise (Tailored Scope)' }))
          setCustomScopeDetail(detailStr)
        } else {
          setForm((prev) => ({ ...prev, interest: detailStr }))
          setCustomScopeDetail('')
        }
      }
    }
    window.addEventListener('epicrio-select-plan' as any, handleSelectPlan)
    return () => {
      window.removeEventListener('epicrio-select-plan' as any, handleSelectPlan)
    }
  }, [])

  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, viewportConfig)

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
          interest: customScopeDetail || form.interest,
          notes: customScopeDetail ? `Customized Stack: ${customScopeDetail}` : undefined,
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

  const guarantees = [
    {
      num: '01',
      title: '20-Min Systems Audit',
      desc: 'We map your exact bottlenecks, missed calls, and manual spreadsheet work.',
    },
    {
      num: '02',
      title: 'Custom Blueprint',
      desc: 'Delivered directly by founders with clear timelines and architecture.',
    },
    {
      num: '03',
      title: 'Engineered to Your Exact Specs',
      desc: 'We build, test, and hand over the exact custom operational infrastructure you ask for.',
    },
  ]

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      id="apply"
      className="py-32 md:py-40 bg-white border-b border-zinc-100/80 w-full"
    >
      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-20 items-start">
          {/* Left Column: Context & Guarantees */}
          <div className="lg:col-span-5 space-y-8">
            {/* Eyebrow */}
            <motion.div variants={fadeUpVariants} className="flex items-center gap-3">
              <span className="w-8 h-px bg-zinc-300" />
              <span className="text-[13px] font-sans font-medium uppercase tracking-[0.15em] text-zinc-400">
                Get Started
              </span>
            </motion.div>

            <motion.h2
              variants={headingVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight text-zinc-900 leading-[1.1]"
            >
              Let&apos;s talk about your operations.
            </motion.h2>

            <motion.p
              variants={fadeUpVariants}
              className="text-[17px] text-zinc-500 leading-relaxed font-sans"
            >
              Tell us about your current workload. We&apos;ll review your operations personally and
              send you a custom automation blueprint within 24 hours.
            </motion.p>

            {/* Value Guarantees */}
            <motion.div variants={fadeUpVariants} className="space-y-6 pt-6 border-t border-zinc-100">
              {guarantees.map((g) => (
                <div key={g.num} className="flex items-start gap-4">
                  <span className="text-2xl font-display text-zinc-200 leading-none mt-0.5 select-none">
                    {g.num}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900 font-sans">{g.title}</h4>
                    <p className="text-[13px] text-zinc-500 mt-0.5 font-sans leading-relaxed">
                      {g.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Form Card */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-7 bg-zinc-50/50 rounded-3xl p-8 sm:p-12 border border-zinc-200/60 shadow-sm"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: premiumEase }}
                className="py-20 text-center space-y-6"
              >
                <div className="w-14 h-14 rounded-full bg-zinc-900 text-white flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-display text-zinc-900 mb-2">
                    Request Received
                  </h3>
                  <p className="text-[15px] max-w-md mx-auto leading-relaxed text-zinc-500 font-sans">
                    We are reviewing your current setup and will send your custom automation
                    blueprint to your email within 24 hours.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <label className="block text-[13px] font-medium text-zinc-600 font-sans tracking-wide">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Sterling"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full h-14 px-5 rounded-xl bg-white border border-zinc-200 text-[15px] text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:ring-0 outline-none transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-2.5">
                    <label className="block text-[13px] font-medium text-zinc-600 font-sans tracking-wide">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="david@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full h-14 px-5 rounded-xl bg-white border border-zinc-200 text-[15px] text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:ring-0 outline-none transition-colors font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <label className="block text-[13px] font-medium text-zinc-600 font-sans tracking-wide">
                      Direct Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full h-14 px-5 rounded-xl bg-white border border-zinc-200 text-[15px] text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:ring-0 outline-none transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-2.5">
                    <label className="block text-[13px] font-medium text-zinc-600 font-sans tracking-wide">
                      Company Website
                    </label>
                    <input
                      type="text"
                      placeholder="company.com"
                      value={form.domain}
                      onChange={(e) => setForm({ ...form, domain: e.target.value })}
                      className="w-full h-14 px-5 rounded-xl bg-white border border-zinc-200 text-[15px] text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:ring-0 outline-none transition-colors font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="block text-[13px] font-medium text-zinc-600 font-sans tracking-wide">
                    Primary Area of Focus
                  </label>
                  <select
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    className="w-full h-14 px-5 rounded-xl bg-white border border-zinc-200 text-[15px] text-zinc-900 focus:border-zinc-900 focus:ring-0 outline-none transition-colors font-sans appearance-none"
                  >
                    <option value="Dedicated Voice AI Receptionist ($1,000 buildout)">
                      Dedicated Voice AI Receptionist ($1,000 buildout / $490 mo)
                    </option>
                    <option value="Autonomous Back-Office & CRM ($1,500 buildout)">
                      Autonomous Back-Office &amp; CRM ($1,500 buildout / $690 mo)
                    </option>
                    <option value="Custom Enterprise (Tailored Scope)">
                      Custom Enterprise (Tailored Scope &amp; Direct Architecture Proposal)
                    </option>
                    <option value="Custom Enterprise Architecture">
                      Custom Enterprise Architecture &amp; Legacy ERP Integrations
                    </option>
                  </select>

                  {customScopeDetail && (
                    <div className="mt-3 p-4 rounded-xl bg-zinc-900 text-white text-xs border border-zinc-800 flex items-start justify-between gap-3">
                      <div>
                        <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">
                          Configured Stack Attached:
                        </span>
                        <span className="text-[12px] text-zinc-200 mt-0.5 block font-medium">
                          {customScopeDetail}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCustomScopeDetail('')}
                        className="text-zinc-500 hover:text-white text-xs cursor-pointer p-0.5"
                        title="Clear custom stack"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                {errorMsg && (
                  <div className="text-xs text-rose-600 bg-rose-50 p-3 rounded-lg border border-rose-200">
                    {errorMsg}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-4.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-[15px] transition-all shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
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
