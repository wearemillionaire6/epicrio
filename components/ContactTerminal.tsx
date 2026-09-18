'use client'

import { useState } from 'react'
import { sound } from '@/lib/sound'

export default function ContactTerminal() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    bottleneck: 'LEAD ROUTING & RESPONSE TIME',
    notes: '',
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
            <span>[COMMISSION_PIPELINE // MODULE 06]</span>
          </div>
          <h2 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-widest">
            CONTACT
          </h2>
        </div>
        <div className="text-right text-xs text-muted">
          <span>SYSTEM AUDIT INTAKE PROTOCOL</span>
          <br />
          <span className="text-white">ENCRYPTED TELEMETRY TRANSMISSION</span>
        </div>
      </div>

      {/* Terminal Prompt Header */}
      <div className="text-muted text-xs sm:text-sm mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-primary">[/&gt; AUDIT_INTAKE_PARAMETERS : ]</span>
          <span className="text-white">TRANSMIT CREDENTIALS TO SCHEDULE 1-ON-1 ARCHITECTURE REVIEW</span>
        </div>
        <span className="text-[11px] text-primary hidden md:inline">
          SLA: 2-HOUR RESPONSE
        </span>
      </div>

      {/* Boxed Intake Form Console */}
      <div className="border border-white/20 bg-[#070707] p-6 sm:p-8">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#222222] text-xs">
              <span className="text-muted">ENTERPRISE AUDIT APPLICATION:</span>
              <span className="text-primary text-[10px] font-bold">ALL FIELDS MANDATORY [*]</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Field 01: Full Name */}
              <div className="p-3 border border-[#222222] bg-black focus-within:border-primary transition-colors">
                <label className="text-[9px] text-muted block mb-1 font-bold uppercase tracking-wider">
                  01 // FULL NAME *
                </label>
                <input
                  required
                  type="text"
                  placeholder="BHAVESH WAGHMARE"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-none focus:outline-none text-white text-xs font-mono uppercase"
                />
              </div>

              {/* Field 02: Work Email */}
              <div className="p-3 border border-[#222222] bg-black focus-within:border-primary transition-colors">
                <label className="text-[9px] text-muted block mb-1 font-bold uppercase tracking-wider">
                  02 // WORK EMAIL *
                </label>
                <input
                  required
                  type="email"
                  placeholder="BHAVESH@COMPANY.COM"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-none focus:outline-none text-white text-xs font-mono uppercase"
                />
              </div>

              {/* Field 03: Company Entity */}
              <div className="p-3 border border-[#222222] bg-black focus-within:border-primary transition-colors">
                <label className="text-[9px] text-muted block mb-1 font-bold uppercase tracking-wider">
                  03 // COMPANY ENTITY *
                </label>
                <input
                  required
                  type="text"
                  placeholder="HVAC-EQ / ENTERPRISE CORP"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-transparent border-none focus:outline-none text-white text-xs font-mono uppercase"
                />
              </div>

              {/* Field 04: Direct Mobile */}
              <div className="p-3 border border-[#222222] bg-black focus-within:border-primary transition-colors">
                <label className="text-[9px] text-muted block mb-1 font-bold uppercase tracking-wider">
                  04 // DIRECT MOBILE *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+1 (555) 234-5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-transparent border-none focus:outline-none text-white text-xs font-mono uppercase"
                />
              </div>
            </div>

            {/* Field 05: Primary Bottleneck */}
            <div className="p-3 border border-[#222222] bg-black focus-within:border-primary transition-colors">
              <label className="text-[9px] text-muted block mb-1 font-bold uppercase tracking-wider">
                05 // PRIMARY OPERATIONAL BOTTLENECK *
              </label>
              <select
                value={formData.bottleneck}
                onChange={(e) => setFormData({ ...formData, bottleneck: e.target.value })}
                className="w-full bg-black text-white text-xs font-mono uppercase focus:outline-none border-none cursor-pointer"
              >
                <option value="COMMERCIAL HVAC & DISPATCH FIELD AUTOMATION">COMMERCIAL HVAC & DISPATCH FIELD AUTOMATION</option>
                <option value="LEAD ROUTING & SUB-300MS VOICE RECEPTIONIST">LEAD ROUTING & SUB-300MS VOICE RECEPTIONIST</option>
                <option value="DISCONNECTED CRM & MANUAL RE-ENTRY FRAGMENTATION">DISCONNECTED CRM & MANUAL RE-ENTRY FRAGMENTATION</option>
                <option value="MULTI-STEP BILLING, INVOICING & CONTRACT DISPATCH">MULTI-STEP BILLING, INVOICING & CONTRACT DISPATCH</option>
                <option value="ENTERPRISE RAG CO-PILOT OVER REGULATORY ARCHIVES">ENTERPRISE RAG CO-PILOT OVER REGULATORY ARCHIVES</option>
                <option value="PROPRIETARY NEXT.JS EXECUTIVE CONSOLE & PORTAL">PROPRIETARY NEXT.JS EXECUTIVE CONSOLE & PORTAL</option>
              </select>
            </div>

            {/* Field 06: Scope Notes */}
            <div className="p-3 border border-[#222222] bg-black focus-within:border-primary transition-colors">
              <label className="text-[9px] text-muted block mb-1 font-bold uppercase tracking-wider">
                06 // ARCHITECTURE SCOPE & EXISTING STACK (OPTIONAL)
              </label>
              <textarea
                rows={3}
                placeholder="SPECIFY TOOLS IN USE (HUBSPOT, SALESFORCE, STRIPE, N8N) OR ESTIMATED CALL/LEAD VOLUMES..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-transparent border-none focus:outline-none text-white text-xs font-mono uppercase leading-relaxed"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-white text-black hover:bg-primary transition-colors uppercase font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>TRANSMIT SYSTEM AUDIT REQUEST</span>
                <span className="text-black text-[8px]">■</span>
                <span>-&gt;</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="py-8 space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <span className="w-2 h-2 bg-primary rounded-none animate-ping" />
              <span>[ INTAKE TRANSMISSION COMMITTED // 200 OK ]</span>
            </div>

            <div className="p-4 bg-black border border-primary/40 text-xs text-white leading-relaxed space-y-2">
              <p>
                SYSTEM AUDIT PAYLOAD AUTHENTICATED FOR <span className="text-primary font-bold">{formData.company || 'YOUR ENTITY'}</span>.
              </p>
              <p className="text-[#aaaaaa]">
                OUR PRINCIPAL ARCHITECT (BHAVESH WAGHMARE) WILL REVIEW YOUR STACK AND DISPATCH DIRECT CALENDAR SCHEDULING COORDINATES TO <span className="text-white font-bold">{formData.email}</span> WITHIN 2 HOURS.
              </p>
            </div>

            <div className="p-3 bg-black border border-[#222222] text-[10px] text-muted flex items-center justify-between">
              <span>// PROTOCOL: MUTUAL NON-DISCLOSURE ENFORCED</span>
              <span className="text-primary font-bold">ENCRYPTED AT REST</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Identity bar matching Yannick's footer */}
      <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs text-muted">
        <div>
          <span className="text-white block font-bold">AGENCY CO</span>
          <span>© {new Date().getFullYear()}</span>
        </div>

        <div>
          <span className="text-muted block">EMAIL</span>
          <a href="mailto:architect@agency.co" className="text-white hover:text-primary">
            ARCHITECT@AGENCY.CO
          </a>
        </div>

        <div>
          <span className="text-muted block">NETWORK</span>
          <span className="text-white">@AGENCYCO</span>
        </div>

        <div>
          <span className="text-muted block">SYSTEM HEALTH</span>
          <span className="text-primary font-bold">ALL 6 PODS ONLINE</span>
        </div>
      </div>
    </section>
  )
}
