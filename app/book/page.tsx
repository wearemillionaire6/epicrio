'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import EpicrioLogo from '@/components/studio/EpicrioLogo'

export default function BookAppointmentPage() {
  // Light Mode Only
  const isDark = false
  const [meetingType, setMeetingType] = useState<'15min' | '30min'>('15min')
  const [calUsername, setCalUsername] = useState('bhavesh-agency')
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Direct quick-form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    businessType: 'Trades & Home Services',
    preferredTime: 'Morning (9 AM - 12 PM)',
    notes: '',
  })

  // Cal.com embed URL (light mode)
  const calEmbedUrl = `https://cal.com/${calUsername}/${meetingType}?embed=true&theme=light`

  const [isSubmittingDirect, setIsSubmittingDirect] = useState(false)

  const handleSubmitDirectForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingDirect(true)
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          domain: formData.company,
          interest: `${formData.businessType} (Preferred: ${formData.preferredTime})`,
          notes: formData.notes,
          source: 'booking_direct_form',
        }),
      })
    } catch (err) {
      console.error('Lead post error:', err)
    } finally {
      setIsSubmittingDirect(false)
      setFormSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen font-sans selection:bg-zinc-950 selection:text-white bg-white text-zinc-900">
      {/* Top Floating Glass Navigation (Rounded Capsule Pill) */}
      <div className="fixed top-3 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
        <header className="pointer-events-auto w-full max-w-6xl rounded-full px-5 sm:px-7 py-2.5 sm:py-3 flex items-center justify-between gap-4 transition-all duration-200 bg-white/92 backdrop-blur-2xl border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] text-zinc-900">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs sm:text-[13px] font-medium flex items-center gap-1.5 text-zinc-600 hover:text-zinc-950 transition-colors"
            >
              <span>&larr;</span>
              <span>Back to Overview</span>
            </Link>
            <span className="opacity-20">|</span>
            <div className="flex items-center gap-2">
              <EpicrioLogo size={24} showWordmark={true} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200 font-semibold">
              CAL.COM CONNECTED
            </span>
          </div>
        </header>
      </div>

      {/* Main Content Area - Full Screen Responsive */}
      <main className="w-full max-w-[1536px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-24 sm:pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: What We Provide For Your Business (7 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-4 border border-black/10 bg-white shadow-xs">
                <span className="w-2 h-2 rounded-full bg-zinc-950 animate-pulse" />
                <span>15-Minute Operational Discovery</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
                See How Your Business Runs on Autopilot.
              </h1>
              <p className={`mt-3 text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Book a 1-on-1 strategy call with our automation team. We demonstrate our live 24/7 AI Voice Receptionist, audit your manual bottlenecks, and map out your custom all-in-one operations stack.
              </p>
            </div>

            {/* What We Provide Breakdown */}
            <div className={`rounded-3xl p-6 sm:p-7 border backdrop-blur-xl space-y-5 ${
              isDark
                ? 'bg-zinc-900/60 border-white/10 shadow-xl'
                : 'bg-white/80 border-black/10 shadow-md'
            }`}>
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-950 font-sans">
                What We Provide On This Call:
              </h2>

              <div className="space-y-4">
                {/* Item 1 */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 bg-zinc-100 text-zinc-900 border border-zinc-200">
                    01
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Live 24/7 AI Voice Receptionist Test</h3>
                    <p className={`text-xs mt-0.5 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      We dial your phone on speaker or call our test line live. You will hear our AI receptionist converse naturally with sub-300ms human latency and book an appointment into the calendar in real-time.
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-3.5 pt-3 border-t border-current/10">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 bg-zinc-100 text-zinc-900 border border-zinc-200">
                    02
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Manual Workload & Hours-Lost Audit</h3>
                    <p className={`text-xs mt-0.5 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      We review your current team workload: missed after-hours calls, copy-pasting customer details across apps, sending manual quotes, and chasing invoice payments.
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-start gap-3.5 pt-3 border-t border-current/10">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 bg-zinc-100 text-zinc-900 border border-zinc-200">
                    03
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Turnkey Automation Infrastructure</h3>
                    <p className={`text-xs mt-0.5 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      We show you how to replace 6 expensive point-solutions with one integrated suite: Voice + Central CRM + WhatsApp/Slack Dispatch + Stripe Invoicing.
                    </p>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="flex items-start gap-3.5 pt-3 border-t border-current/10">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 bg-zinc-100 text-zinc-900 border border-zinc-200">
                    04
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">7-Day Zero-Risk Pilot Blueprint</h3>
                    <p className={`text-xs mt-0.5 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      Learn how we launch your operational pilot within 48 hours without changing your existing phone number or interrupting daily operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call Guarantees & Social Proof */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className={`p-4 rounded-2xl border ${isDark ? 'bg-zinc-900/40 border-white/10' : 'bg-white border-zinc-200'}`}>
                <div className="font-semibold text-zinc-950">Zero Pressure Guarantee</div>
                <div className={`text-[11px] mt-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  No pushy sales reps. You speak directly with our automation systems engineer.
                </div>
              </div>
              <div className={`p-4 rounded-2xl border ${isDark ? 'bg-zinc-900/40 border-white/10' : 'bg-white border-zinc-200'}`}>
                <div className="font-semibold text-zinc-950">Full Roadmap Included</div>
                <div className={`text-[11px] mt-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  You receive the complete architecture blueprint and ROI estimate even if we don&apos;t work together.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cal.com Booking Widget & Direct Booking Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`rounded-3xl p-6 sm:p-8 border backdrop-blur-xl ${
              isDark
                ? 'bg-zinc-900/60 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]'
                : 'bg-white/90 border-black/10 shadow-xl'
            }`}>
              
              {/* Meeting Type Selector Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-current/10">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMeetingType('15min')}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      meetingType === '15min'
                        ? 'bg-zinc-950 text-white shadow-sm'
                        : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200'
                    }`}
                  >
                    ⚡ Book a Systems Call
                  </button>
                  <button
                    type="button"
                    onClick={() => setMeetingType('30min')}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      meetingType === '30min'
                        ? 'bg-zinc-950 text-white shadow-sm'
                        : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200'
                    }`}
                  >
                    🛠️ 30-Min Deep Architecture Call
                  </button>
                </div>

                {/* Cal.com Handle Configuration */}
                <div className="text-[11px] text-zinc-400 flex items-center gap-1.5 font-mono">
                  {isEditingUsername ? (
                    <div className="flex items-center gap-1">
                      <span>cal.com/</span>
                      <input
                        type="text"
                        value={calUsername}
                        onChange={(e) => setCalUsername(e.target.value)}
                        className="px-2 py-0.5 rounded bg-black/40 border border-white/20 text-xs w-28 text-white focus:outline-none focus:border-[#00FF88]"
                        placeholder="your-username"
                      />
                      <button
                        type="button"
                        onClick={() => setIsEditingUsername(false)}
                        className="text-[#00FF88] hover:underline text-[10px]"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <span>cal.com/{calUsername}</span>
                      <button
                        type="button"
                        onClick={() => setIsEditingUsername(true)}
                        className="text-zinc-500 hover:text-[#00FF88] ml-1"
                        title="Change Cal.com username"
                      >
                        [edit]
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Embedded Cal.com iFrame Container */}
              <div className="mt-5 rounded-2xl overflow-hidden border border-current/10 min-h-[520px] bg-black/10 relative">
                <iframe
                  src={calEmbedUrl}
                  width="100%"
                  height="540px"
                  frameBorder="0"
                  title="Cal.com Appointment Booking"
                  className="w-full h-[540px] rounded-2xl"
                  allow="camera; microphone; fullscreen; display-capture"
                />

                {/* Backup / Fallback Helper in case Cal.com account is pending */}
                <div className={`p-4 border-t text-xs flex flex-wrap items-center justify-between gap-3 ${
                  isDark ? 'bg-black/40 border-white/10 text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-600'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-zinc-950 animate-pulse" />
                    <span>Prefer an instant callback? Fill in the quick intake below:</span>
                  </div>
                  <a
                    href="#quick-form"
                    className="font-semibold underline text-zinc-950 hover:text-zinc-700"
                  >
                    Quick Booking Form ↓
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Direct Booking Form (Backup for Instant Callbacks) */}
            <div
              id="quick-form"
              className={`rounded-3xl p-6 sm:p-8 border backdrop-blur-xl ${
                isDark
                  ? 'bg-zinc-900/40 border-white/10 shadow-lg'
                  : 'bg-white/80 border-black/10 shadow-md'
              }`}
            >
              <div className="pb-4 border-b border-current/10">
                <h2 className="text-base font-bold">
                  Quick Callback &amp; Demo Request
                </h2>
                <p className={`text-xs mt-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Don&apos;t want to use the calendar? Leave your phone number and preferred time—our team will reach out directly.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-zinc-950 text-white flex items-center justify-center mx-auto text-xl font-bold shadow-sm">
                    ✓
                  </div>
                  <h3 className="text-sm font-semibold">Appointment Request Received!</h3>
                  <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    We will call you at {formData.phone || 'your phone number'} during {formData.preferredTime}. Expect a calendar confirmation email shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitDirectForm} className="mt-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1 opacity-80">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs border transition-colors ${
                          isDark
                            ? 'bg-black/30 border-white/10 text-white focus:border-[#00FF88]'
                            : 'bg-white border-zinc-300 text-zinc-900 focus:border-zinc-950'
                        } focus:outline-none`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 opacity-80">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs border transition-colors ${
                          isDark
                            ? 'bg-black/30 border-white/10 text-white focus:border-[#00FF88]'
                            : 'bg-white border-zinc-300 text-zinc-900 focus:border-zinc-950'
                        } focus:outline-none`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1 opacity-80">
                        Phone Number (For Live AI Call Test) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs border transition-colors ${
                          isDark
                            ? 'bg-black/30 border-white/10 text-white focus:border-[#00FF88]'
                            : 'bg-white border-zinc-300 text-zinc-900 focus:border-zinc-950'
                        } focus:outline-none`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 opacity-80">Industry / Business Type</label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs border transition-colors ${
                          isDark
                            ? 'bg-black/30 border-white/10 text-white focus:border-[#00FF88]'
                            : 'bg-white border-zinc-300 text-zinc-900 focus:border-zinc-950'
                        } focus:outline-none`}
                      >
                        <option value="Trades & Home Services">Trades &amp; Home Services (HVAC, Plumbing, Electrical)</option>
                        <option value="Healthcare & Specialty Clinics">Healthcare &amp; Dental Clinics</option>
                        <option value="Legal & Professional Services">Law Firm / Accounting / Advisory</option>
                        <option value="Real Estate & Property Management">Real Estate &amp; Property Management</option>
                        <option value="B2B Agencies & Tech">B2B Agency &amp; Consulting</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1 opacity-80">Preferred Call Window</label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs border transition-colors ${
                        isDark
                          ? 'bg-black/30 border-white/10 text-white focus:border-[#00FF88]'
                          : 'bg-white border-zinc-300 text-zinc-900 focus:border-zinc-950'
                      } focus:outline-none`}
                    >
                      <option value="Morning (9 AM - 12 PM EST)">Morning (9 AM - 12 PM EST)</option>
                      <option value="Afternoon (12 PM - 4 PM EST)">Afternoon (12 PM - 4 PM EST)</option>
                      <option value="Evening (4 PM - 7 PM EST)">Evening (4 PM - 7 PM EST)</option>
                      <option value="As Soon As Possible (Next 30 Mins)">As Soon As Possible (Next 30 Mins)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:shadow-xl bg-zinc-950 hover:bg-zinc-800 text-white cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <span>Request Instant Callback &amp; Demo</span>
                    <span>&rarr;</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
