'use client'

import { useState } from 'react'
import Link from 'next/link'
import CustomCursor from '@/components/CustomCursor'
import DynamicIslandNavbar from '@/components/DynamicIslandNavbar'
import TerminalFooter from '@/components/TerminalFooter'
import { sound } from '@/lib/sound'

export default function AuditPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    teamSize: '11–50 EMPLOYEES',
    leadVolume: '100–500 LEADS/MO',
    primaryCrm: 'HUBSPOT',
    telephonyNeeds: 'AI VOICE RECEPTIONIST (24/7)',
    notes: '',
  })
  const [inverted, setInverted] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const toggleInvert = () => {
    if (soundEnabled) sound.beep()
    setInverted((prev) => !prev)
  }

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sound.beep()
    setSubmitted(true)
  }

  return (
    <div className={`min-h-screen selection:bg-primary selection:text-black font-mono uppercase transition-colors ${
      inverted ? 'inverted bg-white text-black' : 'bg-black text-white'
    }`}>
      <CustomCursor />

      {/* Floating Glassmorphic Dynamic Island Navigation */}
      <DynamicIslandNavbar
        onToggleInvert={toggleInvert}
        inverted={inverted}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      <div className="pt-24 max-w-5xl mx-auto px-4 sm:px-8 py-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-muted mb-8 border-b border-[#222222] pb-3">
          <Link href="/" className="hover:text-primary transition-colors">
            HOME
          </Link>
          <span>/</span>
          <span className="text-white font-bold">SYSTEM AUDIT PROTOCOL</span>
        </div>

        {/* Hero Section */}
        <div className="mb-12 space-y-3">
          <div className="text-primary text-xs tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-primary inline-block" />
            <span>[INTAKE_PROTOCOL // SCOPING &amp; ARCHITECTURAL REVIEW]</span>
          </div>
          <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-wider">
            SYSTEMS AUDIT
          </h1>
          <p className="text-[#aaaaaa] text-xs sm:text-sm max-w-2xl leading-relaxed">
            COMPLETE THE SYSTEM PARAMETERS BELOW. OUR PRINCIPAL ARCHITECTS CONDUCT PRE-CALL RESEARCH ON YOUR PIPELINES AND PRESENT AN IMMUTABLE ARCHITECTURE SCHEMATIC.
          </p>
        </div>

        {/* Form Box */}
        <div className="border border-white/20 bg-[#070707] p-6 sm:p-10 mb-12">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#222222] text-xs">
                <span className="text-muted">PARAMETRIC COMMISSION APPLICATION:</span>
                <span className="text-primary text-[10px] font-bold">ALL FIELDS ENCRYPTED [*]</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 border border-[#222222] bg-black focus-within:border-primary transition-colors">
                  <label className="text-muted block text-[10px] font-bold mb-1">01 // FULL NAME *</label>
                  <input
                    required
                    type="text"
                    placeholder="BHAVESH WAGHMARE"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-none focus:outline-none text-white uppercase text-xs font-mono"
                  />
                </div>

                <div className="p-3 border border-[#222222] bg-black focus-within:border-primary transition-colors">
                  <label className="text-muted block text-[10px] font-bold mb-1">02 // WORK EMAIL *</label>
                  <input
                    required
                    type="email"
                    placeholder="BHAVESH@COMPANY.COM"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-none focus:outline-none text-white uppercase text-xs font-mono"
                  />
                </div>

                <div className="p-3 border border-[#222222] bg-black focus-within:border-primary transition-colors">
                  <label className="text-muted block text-[10px] font-bold mb-1">03 // COMPANY ENTITY *</label>
                  <input
                    required
                    type="text"
                    placeholder="ENTERPRISE CORP / HVAC-EQ"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-transparent border-none focus:outline-none text-white uppercase text-xs font-mono"
                  />
                </div>

                <div className="p-3 border border-[#222222] bg-black focus-within:border-primary transition-colors">
                  <label className="text-muted block text-[10px] font-bold mb-1">04 // DIRECT TELEPHONE *</label>
                  <input
                    required
                    type="tel"
                    placeholder="+1 (555) 234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-transparent border-none focus:outline-none text-white uppercase text-xs font-mono"
                  />
                </div>

                <div className="p-3 border border-[#222222] bg-black focus-within:border-primary transition-colors">
                  <label className="text-muted block text-[10px] font-bold mb-1">05 // ORGANIZATION SIZE</label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full bg-black text-white uppercase text-xs font-mono focus:outline-none border-none cursor-pointer"
                  >
                    <option value="1–10 EMPLOYEES">1–10 EMPLOYEES</option>
                    <option value="11–50 EMPLOYEES">11–50 EMPLOYEES</option>
                    <option value="51–250 EMPLOYEES">51–250 EMPLOYEES</option>
                    <option value="250+ EMPLOYEES">250+ EMPLOYEES</option>
                  </select>
                </div>

                <div className="p-3 border border-[#222222] bg-black focus-within:border-primary transition-colors">
                  <label className="text-muted block text-[10px] font-bold mb-1">06 // ESTIMATED MONTHLY LEADS / CALLS</label>
                  <select
                    value={formData.leadVolume}
                    onChange={(e) => setFormData({ ...formData, leadVolume: e.target.value })}
                    className="w-full bg-black text-white uppercase text-xs font-mono focus:outline-none border-none cursor-pointer"
                  >
                    <option value="UNDER 100 LEADS/MO">UNDER 100 LEADS/MO</option>
                    <option value="100–500 LEADS/MO">100–500 LEADS/MO</option>
                    <option value="500–2,000 LEADS/MO">500–2,000 LEADS/MO</option>
                    <option value="2,000+ LEADS/MO">2,000+ LEADS/MO</option>
                  </select>
                </div>

                <div className="p-3 border border-[#222222] bg-black focus-within:border-primary transition-colors">
                  <label className="text-muted block text-[10px] font-bold mb-1">07 // PRIMARY REVENUE CRM</label>
                  <select
                    value={formData.primaryCrm}
                    onChange={(e) => setFormData({ ...formData, primaryCrm: e.target.value })}
                    className="w-full bg-black text-white uppercase text-xs font-mono focus:outline-none border-none cursor-pointer"
                  >
                    <option value="HUBSPOT">HUBSPOT</option>
                    <option value="GOHIGHLEVEL">GOHIGHLEVEL</option>
                    <option value="SALESFORCE">SALESFORCE</option>
                    <option value="TWENTY CRM / CUSTOM DB">TWENTY CRM / CUSTOM DB</option>
                    <option value="SPREADSHEETS / AIRTABLE">SPREADSHEETS / AIRTABLE</option>
                  </select>
                </div>

                <div className="p-3 border border-[#222222] bg-black focus-within:border-primary transition-colors">
                  <label className="text-muted block text-[10px] font-bold mb-1">08 // TELEPHONY REQUIREMENT</label>
                  <select
                    value={formData.telephonyNeeds}
                    onChange={(e) => setFormData({ ...formData, telephonyNeeds: e.target.value })}
                    className="w-full bg-black text-white uppercase text-xs font-mono focus:outline-none border-none cursor-pointer"
                  >
                    <option value="AI VOICE RECEPTIONIST (24/7)">AI VOICE RECEPTIONIST (24/7)</option>
                    <option value="2-WAY WHATSAPP / SMS CONVERSATIONS">2-WAY WHATSAPP / SMS CONVERSATIONS</option>
                    <option value="CRM WORKFLOW ENGINE ONLY">CRM WORKFLOW ENGINE ONLY</option>
                    <option value="FULL UNIFIED SUITE">FULL UNIFIED SUITE</option>
                  </select>
                </div>
              </div>

              <div className="p-3 border border-[#222222] bg-black focus-within:border-primary transition-colors">
                <label className="text-muted block text-[10px] font-bold mb-1">09 // OPERATIONAL CONSTRAINTS OR GOALS</label>
                <textarea
                  rows={3}
                  placeholder="EXPLAIN CURRENT CHURN, SPREADSHEET BOTTLENECKS, OR GOALS FOR THE UPCOMING QUARTER..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-transparent border-none focus:outline-none text-white uppercase text-xs font-mono leading-relaxed"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-white text-black hover:bg-primary font-bold uppercase text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>SUBMIT ARCHITECTURE AUDIT APPLICATION</span>
                  <span className="text-black text-[8px]">■</span>
                  <span>-&gt;</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="text-primary font-bold text-base flex items-center justify-center gap-2">
                <span className="w-2.5 h-2.5 bg-primary rounded-none animate-ping" />
                <span>[ INTAKE LOGGED // DISPATCH CONFIRMED ]</span>
              </div>
              <h3 className="font-pixel text-xl sm:text-2xl text-white">
                AUDIT DOSSIER GENERATED FOR {formData.company || 'YOUR ENTITY'}
              </h3>
              <p className="text-[#aaaaaa] text-xs max-w-md mx-auto leading-relaxed">
                THANK YOU, {formData.name || 'THERE'}. OUR PRINCIPAL ARCHITECTS HAVE RECEIVED YOUR SCOPING PARAMETERS.
                AN INVITATION LINK HAS BEEN DISPATCHED TO {formData.email || 'YOUR EMAIL'} FOR A 30-MINUTE ARCHITECTURAL REVIEW.
              </p>
              <div className="pt-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-xs text-primary hover:text-white uppercase transition-colors"
                >
                  <span>&lt;- RETURN TO HOMEPAGE</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <TerminalFooter onToggleInvert={toggleInvert} />
      </div>
    </div>
  )
}
