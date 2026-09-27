'use client'

import { useState } from 'react'

interface StudioInquiryProps {
  isDark: boolean
}

export default function StudioInquiry({ isDark }: StudioInquiryProps) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    domain: '',
    interest: 'All-in-One Operations Suite (Complete System)',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="apply" className="py-20 border-t border-current/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Simple, Lucid Description */}
        <div className="lg:col-span-5 space-y-6">
          <div className="text-zinc-400 font-medium tracking-wider uppercase text-xs mb-3 font-mono">
            Get started
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight ${
            isDark ? 'text-white' : 'text-zinc-950'
          }`}>
            Let's map your operations and show you what to automate.
          </h2>
          <p className={`text-base leading-relaxed ${
            isDark ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            Tell us about your current workload. We'll review your operations personally and send you a custom automation blueprint within 24 hours.
          </p>

          <div className="pt-2 space-y-3 text-sm">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 flex-shrink-0" />
              <span>24-Hour Operations Feasibility Review</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 flex-shrink-0" />
              <span>Free Live AI Receptionist Test On Your Phone</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 flex-shrink-0" />
              <span>Zero obligation or high-pressure sales</span>
            </div>
          </div>
        </div>

        {/* Right: Clean, Beautiful Form */}
        <div className={`lg:col-span-7 rounded-3xl p-8 sm:p-10 border backdrop-blur-md transition-all ${
          isDark ? 'bg-zinc-900/40 border-white/10 shadow-xl' : 'bg-white/70 border-black/[0.06] shadow-sm'
        }`}>
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-zinc-950 text-white flex items-center justify-center mx-auto shadow-sm">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className={`text-2xl font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}>
                Thank You! Request Received.
              </h3>
              <p className={`text-sm max-w-md mx-auto leading-relaxed ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                We are reviewing your current setup and will send your custom automation blueprint within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-zinc-400">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Sterling"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full h-11 px-4 rounded-xl border text-sm transition-all outline-none ${
                      isDark
                        ? 'bg-zinc-800/60 border-white/10 text-white focus:border-white'
                        : 'bg-white border-zinc-200 text-black focus:border-zinc-950'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-zinc-400">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="david@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full h-11 px-4 rounded-xl border text-sm transition-all outline-none ${
                      isDark
                        ? 'bg-zinc-800/60 border-white/10 text-white focus:border-white'
                        : 'bg-white border-zinc-200 text-black focus:border-zinc-950'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-zinc-400">
                    Company Website *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="company.com"
                    value={form.domain}
                    onChange={(e) => setForm({ ...form, domain: e.target.value })}
                    className={`w-full h-11 px-4 rounded-xl border text-sm transition-all outline-none ${
                      isDark
                        ? 'bg-zinc-800/60 border-white/10 text-white focus:border-white'
                        : 'bg-white border-zinc-200 text-black focus:border-zinc-950'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-zinc-400">
                    Phone Number (To Test AI Receptionist)
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={`w-full h-11 px-4 rounded-xl border text-sm transition-all outline-none ${
                      isDark
                        ? 'bg-zinc-800/60 border-white/10 text-white focus:border-white'
                        : 'bg-white border-zinc-200 text-black focus:border-zinc-950'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-zinc-400">
                  What primary workload do you want to automate?
                </label>
                <select
                  value={form.interest}
                  onChange={(e) => setForm({ ...form, interest: e.target.value })}
                  className={`w-full h-11 px-4 rounded-xl border text-sm transition-all outline-none ${
                    isDark
                      ? 'bg-zinc-800/60 border-white/10 text-white focus:border-white'
                      : 'bg-white border-zinc-200 text-black focus:border-zinc-950'
                  }`}
                >
                  <option>All-in-One Operations Suite (Complete System)</option>
                  <option>24/7 AI Voice Receptionist (Phone Answering &amp; Booking)</option>
                  <option>CRM &amp; Workflow Automation (Contracts, Invoices, Sync)</option>
                  <option>Managed Cold Email Outreach (15+ Inboxes, B2B Leads)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-12 text-sm font-semibold rounded-full transition-all cursor-pointer shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:shadow-xl bg-zinc-950 hover:bg-zinc-800 text-white active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <span>Request your blueprint</span>
                  <span>&rarr;</span>
                </button>
              </div>

              <p className="text-xs text-center text-zinc-500">
                Guaranteed response within 24 hours. Zero sales spam.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
