'use client'

import { useState } from 'react'
import { sound } from '@/lib/sound'

export default function ContactTerminal() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    currentStatus: 'NO OUTBOUND CURRENTLY // 100% REFERRALS',
    packageTier: 'FREE 7-DAY PILOT (100 SENDS)',
    icpNotes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sound.beep()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-20 border-b border-[#222222] font-mono">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#222222] gap-4">
        <div>
          <div className="text-primary text-xs tracking-widest uppercase mb-1 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary" />
            <span>[COMMISSION_APPLICATION // DIRECT DISCOVERY]</span>
          </div>
          <h2 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-widest">
            COMMISSION
          </h2>
        </div>
        <div className="text-right text-xs text-muted">
          <span>SCHEDULE 30-MIN DISCOVERY CALL</span>
          <br />
          <span className="text-white">BHAVESH WAGHMARE // LEAD ARCHITECT</span>
        </div>
      </div>

      {/* Terminal Prompt Header */}
      <div className="text-muted text-xs sm:text-sm mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-primary">[/&gt; OUTBOUND_INTAKE_PARAMETERS : ]</span>
          <span className="text-white">QUALIFY FOR 7-DAY PILOT OR PRODUCTION SETUP</span>
        </div>
        <span className="text-[11px] text-primary hidden md:inline">
          RESPONSE SLA: &lt; 4 HOURS
        </span>
      </div>

      {submitted ? (
        <div className="border border-primary bg-primary/[0.04] p-8 text-center space-y-4">
          <div className="w-12 h-12 border-2 border-primary text-primary text-2xl flex items-center justify-center mx-auto">
            ✓
          </div>
          <h3 className="font-pixel text-xl sm:text-2xl text-white tracking-wide">
            OUTBOUND APPLICATION TRANSMITTED
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Thank you, <span className="text-primary font-bold">{formData.name || 'Partner'}</span>. Your ICP parameters for <span className="text-white font-bold">{formData.company || 'your company'}</span> have been logged. Bhavesh Waghmare will review your offer and email your Cal.com scheduling link within 4 hours.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                sound.click()
                setSubmitted(false)
              }}
              className="px-4 py-2 border border-[#333333] hover:border-primary text-xs text-white"
            >
              TRANSMIT ANOTHER APPLICATION
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="border border-[#222222] bg-[#070707] p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-muted uppercase font-bold block mb-1">
                01 // FULL NAME *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="SARAH JENKINS"
                className="w-full p-3 bg-black border border-[#222222] text-xs text-white focus:border-primary outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-[10px] text-muted uppercase font-bold block mb-1">
                02 // WORK EMAIL *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="SARAH@FLEETSCALE.COM"
                className="w-full p-3 bg-black border border-[#222222] text-xs text-white focus:border-primary outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-muted uppercase font-bold block mb-1">
                03 // COMPANY NAME &amp; WEBSITE URL *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="FLEETSCALE // HTTPS://FLEETSCALE.COM"
                className="w-full p-3 bg-black border border-[#222222] text-xs text-white focus:border-primary outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-[10px] text-muted uppercase font-bold block mb-1">
                04 // SELECT PACKAGE OR TRIAL *
              </label>
              <select
                value={formData.packageTier}
                onChange={(e) => setFormData({ ...formData, packageTier: e.target.value })}
                className="w-full p-3 bg-black border border-[#222222] text-xs text-white focus:border-primary outline-none transition-colors"
              >
                <option value="FREE 7-DAY PILOT (100 SENDS)">FREE 7-DAY PILOT (100 SENDS TO ICP)</option>
                <option value="GROWTH ($3,500 SETUP + $1,500/MO)">GROWTH ($3,500 SETUP + $1,500/MO) — POPULAR</option>
                <option value="STARTER ($2,500 SETUP + $997/MO)">STARTER ($2,500 SETUP + $997/MO)</option>
                <option value="ENTERPRISE ($5,000 SETUP + $2,500/MO)">ENTERPRISE ($5,000 SETUP + $2,500/MO)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] text-muted uppercase font-bold block mb-1">
              05 // CURRENT OUTBOUND SITUATION
            </label>
            <select
              value={formData.currentStatus}
              onChange={(e) => setFormData({ ...formData, currentStatus: e.target.value })}
              className="w-full p-3 bg-black border border-[#222222] text-xs text-white focus:border-primary outline-none transition-colors"
            >
              <option value="NO OUTBOUND CURRENTLY // 100% REFERRALS">NO OUTBOUND CURRENTLY // 100% RELIANT ON REFERRALS</option>
              <option value="TRIED HIRING SDRS // TOO EXPENSIVE OR HIGH TURNOVER">TRIED HIRING SDRS // TOO EXPENSIVE OR HIGH TURNOVER</option>
              <option value="RUNNING IN-HOUSE SMARTLEAD / INSTANTLY // BURNING DOMAINS">RUNNING IN-HOUSE SMARTLEAD / INSTANTLY // BURNING DOMAINS</option>
              <option value="NEED TO SCALE TO 3,000+ MULTI-CHANNEL TOUCHES/MO">NEED TO SCALE TO 3,000+ MULTI-CHANNEL TOUCHES/MO</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] text-muted uppercase font-bold block mb-1">
              06 // TARGET ICP, AVERAGE DEAL SIZE &amp; CORE VALUE PROPOSITION
            </label>
            <textarea
              rows={4}
              required
              value={formData.icpNotes}
              onChange={(e) => setFormData({ ...formData, icpNotes: e.target.value })}
              placeholder="e.g. Target B2B SaaS VP of Sales with 10-50 reps. Deal size: $12k ACV. We replace manual contract redlining with automated AI audit pipelines..."
              className="w-full p-3 bg-black border border-[#222222] text-xs text-white focus:border-primary outline-none transition-colors resize-none"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              type="submit"
              className="px-8 py-3.5 bg-primary text-black font-bold text-xs hover:bg-white transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              <span>SUBMIT APPLICATION &amp; REQUEST PILOT</span>
              <span>-&gt;</span>
            </button>
            <span className="text-[10px] text-muted">
              Direct founder review • 4-hour confirmation SLA
            </span>
          </div>
        </form>
      )}
    </section>
  )
}
