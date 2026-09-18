'use client'

import { useState } from 'react'

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
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-20 border-b border-[#222222]">
      {/* Section Title in Pixel Font */}
      <h2 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-widest mb-10">
        CONTACT
      </h2>

      {/* Terminal prompt */}
      <div className="font-mono text-muted text-xs sm:text-sm mb-8">
        [/&gt; INTAKE PROTOCOL // SYSTEMS AUDIT ]
      </div>

      <div className="border border-[#333333] bg-[#0A0A0A] p-6 sm:p-8 font-mono text-xs sm:text-sm max-w-3xl">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-muted text-xs pb-3 border-b border-[#222222]">
              FILL IN PARAMETERS TO SCHEDULE A 1-ON-1 SYSTEM ARCHITECTURE AUDIT:
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-muted block text-[11px] mb-1">01 // FULL NAME *</label>
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
                <label className="text-muted block text-[11px] mb-1">02 // WORK EMAIL *</label>
                <input
                  required
                  type="email"
                  placeholder="BHAVESH@COMPANY.COM"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black border border-[#333333] focus:border-white focus:outline-none p-3 text-white uppercase text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-muted block text-[11px] mb-1">03 // COMPANY ENTITY *</label>
                  <input
                    required
                    type="text"
                    placeholder="ACME GLOBAL CORP"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-black border border-[#333333] focus:border-white focus:outline-none p-3 text-white uppercase text-xs"
                  />
                </div>

                <div>
                  <label className="text-muted block text-[11px] mb-1">04 // DIRECT MOBILE *</label>
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

              <div>
                <label className="text-muted block text-[11px] mb-1">05 // PRIMARY BOTTLENECK</label>
                <select
                  value={formData.bottleneck}
                  onChange={(e) => setFormData({ ...formData, bottleneck: e.target.value })}
                  className="w-full bg-black border border-[#333333] focus:border-white focus:outline-none p-3 text-white uppercase text-xs"
                >
                  <option value="LEAD ROUTING & RESPONSE TIME">LEAD ROUTING & RESPONSE TIME</option>
                  <option value="MISSED PHONE CALLS / NEED VOICE AI">MISSED PHONE CALLS / NEED VOICE AI</option>
                  <option value="DISCONNECTED CRM & REPETITIVE SPREADSHEETS">DISCONNECTED CRM & REPETITIVE SPREADSHEETS</option>
                  <option value="MANUAL INVOICING & CONTRACT DISPATCH">MANUAL INVOICING & CONTRACT DISPATCH</option>
                  <option value="NEED PROPRIETARY DASHBOARD OR PORTAL">NEED PROPRIETARY DASHBOARD OR PORTAL</option>
                </select>
              </div>

              <div>
                <label className="text-muted block text-[11px] mb-1">06 // SCOPE NOTES (OPTIONAL)</label>
                <textarea
                  rows={3}
                  placeholder="SPECIFY TOOLS IN USE (HUBSPOT, SALESFORCE, STRIPE) OR ESTIMATED CALL/LEAD VOLUMES..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-black border border-[#333333] focus:border-white focus:outline-none p-3 text-white uppercase text-xs"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 border border-white hover:bg-white hover:text-black transition-colors uppercase font-bold text-xs flex items-center justify-center gap-2"
              >
                <span>SUBMIT SYSTEM AUDIT REQUEST</span>
                <span className="text-primary text-[10px]">■</span>
                <span>-&gt;</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="py-8 space-y-3">
            <div className="text-primary font-bold text-sm">
              [ INTAKE LOGGED // 200 OK ]
            </div>
            <p className="text-white text-xs leading-relaxed">
              CONFIRMATION DISPATCHED FOR {formData.company || 'YOUR ENTITY'}. OUR SYSTEMS ARCHITECT WILL CONTACT {formData.email || 'YOU'} WITHIN 2 HOURS WITH CALENDAR SCHEDULING DETAILS.
            </p>
            <div className="text-muted text-[11px] pt-2">
              // NDA PROTECTED INTAKE PROTOCOL
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
          <span className="text-muted block">STATUS</span>
          <span className="text-primary font-bold">ALL SYSTEMS LIVE</span>
        </div>
      </div>
    </section>
  )
}
