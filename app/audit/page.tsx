'use client'

import { useState } from 'react'
import Link from 'next/link'
import CustomCursor from '@/components/CustomCursor'

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black font-mono">
      <CustomCursor />

      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-10">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-8 border-b border-[#222222] mb-12">
          <Link href="/" className="font-pixel text-xl sm:text-2xl text-white hover:text-primary transition-colors">
            AGENCY CO // AUDIT PROTOCOL
          </Link>
          <Link
            href="/"
            className="border border-[#333333] hover:border-white px-3 py-1 text-xs text-muted hover:text-white transition-colors"
          >
            [ ^H BACK TO HOME ]
          </Link>
        </div>

        {/* Hero */}
        <div className="mb-12 space-y-4">
          <div className="text-muted text-xs">
            [/&gt; INTAKE PROTOCOL // SCOPING &amp; PRE-CALL BLUEPRINT ]
          </div>
          <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-wider">
            SYSTEMS AUDIT INTAKE
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
            COMPLETE THE PARAMETERS BELOW. OUR SENIOR SYSTEMS ARCHITECTS WILL CONDUCT PRE-CALL RESEARCH ON YOUR WORKFLOWS
            AND PRESENT A TAILORED ARCHITECTURAL PROPOSAL.
          </p>
        </div>

        {/* Form Box */}
        <div className="border border-[#333333] bg-[#0A0A0A] p-6 sm:p-10">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-muted block text-[11px] mb-1">01 // YOUR FULL NAME *</label>
                  <input
                    required
                    type="text"
                    placeholder="BHAVESH WAGHMARE"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black border border-[#333333] focus:border-white focus:outline-none p-3 text-white uppercase text-xs"
                  />
                </div>

                <div>
                  <label className="text-muted block text-[11px] mb-1">02 // CORPORATE WORK EMAIL *</label>
                  <input
                    required
                    type="email"
                    placeholder="BHAVESH@COMPANY.COM"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black border border-[#333333] focus:border-white focus:outline-none p-3 text-white uppercase text-xs"
                  />
                </div>

                <div>
                  <label className="text-muted block text-[11px] mb-1">03 // COMPANY ENTITY NAME *</label>
                  <input
                    required
                    type="text"
                    placeholder="ACME CORPORATION"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-black border border-[#333333] focus:border-white focus:outline-none p-3 text-white uppercase text-xs"
                  />
                </div>

                <div>
                  <label className="text-muted block text-[11px] mb-1">04 // DIRECT PHONE / MOBILE *</label>
                  <input
                    required
                    type="tel"
                    placeholder="+1 (555) 234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-black border border-[#333333] focus:border-white focus:outline-none p-3 text-white uppercase text-xs"
                  />
                </div>
              </div>

              {/* Scoping Questions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-[#222222]">
                <div>
                  <label className="text-muted block text-[11px] mb-1">05 // ORGANIZATION TEAM SIZE</label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full bg-black border border-[#333333] focus:border-white focus:outline-none p-3 text-white uppercase text-xs"
                  >
                    <option value="1–10 EMPLOYEES">1–10 EMPLOYEES</option>
                    <option value="11–50 EMPLOYEES">11–50 EMPLOYEES</option>
                    <option value="51–200 EMPLOYEES">51–200 EMPLOYEES</option>
                    <option value="200+ ENTERPRISE">200+ ENTERPRISE</option>
                  </select>
                </div>

                <div>
                  <label className="text-muted block text-[11px] mb-1">06 // INBOUND MONTHLY LEAD VOLUME</label>
                  <select
                    value={formData.leadVolume}
                    onChange={(e) => setFormData({ ...formData, leadVolume: e.target.value })}
                    className="w-full bg-black border border-[#333333] focus:border-white focus:outline-none p-3 text-white uppercase text-xs"
                  >
                    <option value="UNDER 100 LEADS/MO">UNDER 100 LEADS/MO</option>
                    <option value="100–500 LEADS/MO">100–500 LEADS/MO</option>
                    <option value="500–2,000 LEADS/MO">500–2,000 LEADS/MO</option>
                    <option value="2,000+ LEADS/MO">2,000+ LEADS/MO</option>
                  </select>
                </div>

                <div>
                  <label className="text-muted block text-[11px] mb-1">07 // PRIMARY CRM IN USE</label>
                  <select
                    value={formData.primaryCrm}
                    onChange={(e) => setFormData({ ...formData, primaryCrm: e.target.value })}
                    className="w-full bg-black border border-[#333333] focus:border-white focus:outline-none p-3 text-white uppercase text-xs"
                  >
                    <option value="HUBSPOT">HUBSPOT</option>
                    <option value="GOHIGHLEVEL">GOHIGHLEVEL</option>
                    <option value="SALESFORCE">SALESFORCE</option>
                    <option value="TWENTY CRM / CUSTOM DB">TWENTY CRM / CUSTOM DB</option>
                    <option value="SPREADSHEETS / AIRTABLE">SPREADSHEETS / AIRTABLE</option>
                  </select>
                </div>

                <div>
                  <label className="text-muted block text-[11px] mb-1">08 // TELEPHONY REQUIREMENT</label>
                  <select
                    value={formData.telephonyNeeds}
                    onChange={(e) => setFormData({ ...formData, telephonyNeeds: e.target.value })}
                    className="w-full bg-black border border-[#333333] focus:border-white focus:outline-none p-3 text-white uppercase text-xs"
                  >
                    <option value="AI VOICE RECEPTIONIST (24/7)">AI VOICE RECEPTIONIST (24/7)</option>
                    <option value="2-WAY WHATSAPP / SMS CONVERSATIONS">2-WAY WHATSAPP / SMS CONVERSATIONS</option>
                    <option value="CRM WORKFLOW ENGINE ONLY">CRM WORKFLOW ENGINE ONLY</option>
                    <option value="FULL UNIFIED SUITE">FULL UNIFIED SUITE</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 border-t border-[#222222]">
                <label className="text-muted block text-[11px] mb-1">09 // OPERATIONAL CONSTRAINTS OR GOALS</label>
                <textarea
                  rows={3}
                  placeholder="EXPLAIN CURRENT CHURN, SPREADSHEET BOTTLENECKS, OR GOALS FOR THE UPCOMING QUARTER..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-black border border-[#333333] focus:border-white focus:outline-none p-3 text-white uppercase text-xs"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 border border-white hover:bg-white hover:text-black font-bold uppercase text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>SUBMIT ARCHITECTURE AUDIT APPLICATION</span>
                  <span className="text-primary text-[10px]">■</span>
                  <span>-&gt;</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="text-primary font-bold text-base">
                [ INTAKE LOGGED // DISPATCH CONFIRMED ]
              </div>
              <h3 className="font-pixel text-xl sm:text-2xl text-white">
                AUDIT DOSSIER GENERATED FOR {formData.company || 'YOUR ENTITY'}
              </h3>
              <p className="text-slate-400 text-xs max-w-md mx-auto leading-relaxed">
                THANK YOU, {formData.name || 'THERE'}. OUR SYSTEMS ARCHITECTURE LEAD HAS RECEIVED YOUR SCOPING PARAMETERS.
                AN INVITATION LINK HAS BEEN DISPATCHED TO {formData.email || 'YOUR EMAIL'} FOR A 30-MINUTE REVIEW SESSION.
              </p>
              <div className="pt-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-xs text-muted hover:text-white uppercase transition-colors"
                >
                  <span>&lt;- RETURN TO HOMEPAGE</span>
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
