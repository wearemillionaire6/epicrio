'use client'

import { useState } from 'react'

const sectors = [
  {
    code: '01',
    name: 'LEGAL & LAW FIRMS',
    metric: '+48% RETAINERS SIGNED',
    friction: 'AFTER-HOURS INBOUND CALLS DROPPING OFF DURING PAPER QUESTIONNAIRES.',
    solution: '24/7 VOICE AI INTAKE, CONFLICT CHECKS, AND SENIOR COUNSEL CALENDAR BOOKING.',
  },
  {
    code: '02',
    name: 'MEDICAL & DENTAL PRACTICES',
    metric: '-62% DROP IN NO-SHOWS',
    friction: 'OVERBURDENED FRONT DESK RESULTING IN ABANDONED CALLS AND COSTLY GAPS.',
    solution: '2-WAY SMS/VOICE CONFIRMATIONS AND SELF-SERVICE TRIAGE RESCHEDULING.',
  },
  {
    code: '03',
    name: 'COMMERCIAL REAL ESTATE',
    metric: '10X SPEED-TO-LEAD',
    friction: 'BUYER/TENANT INQUIRIES DELAYED FOR HOURS, LOSING DEALS TO FAST COMPETITORS.',
    solution: 'SUB-60S QUALIFICATION, INSTANT WHATSAPP BROCHURE DISPATCH, TOUR ROSTERING.',
  },
  {
    code: '04',
    name: 'B2B TECH & ADVISORY',
    metric: '3.4X SALES VELOCITY',
    friction: 'MANUAL DEMO QUALIFICATION, DISJOINTED STRIPE/HUBSPOT RECORDS, SLOW CONTRACTS.',
    solution: 'AUTOMATIC FORM ENRICHMENT, INSTANT SCHEDULING, AND STRIPE WEBHOOK HOOKS.',
  },
  {
    code: '05',
    name: 'COMMERCIAL FIELD SERVICES',
    metric: '15+ HRS SAVED / PM',
    friction: 'PROJECT MANAGERS TIED UP WITH MANUAL QUOTE FOLLOW-UPS AND TECHNICIAN ROUTING.',
    solution: 'AUTOMATED QUOTE ENGINES, DISPATCH PUSH ALERTS, AND AUTO REVIEW GENERATION.',
  },
  {
    code: '06',
    name: 'WEALTH & ASSET MANAGEMENT',
    metric: '100% KYC AUDIT TRAIL',
    friction: 'MANUAL KYC ONBOARDING DELAYS AND COMPLIANCE RECORD FRAGMENTATION.',
    solution: 'SECURE DIGITAL CLIENT INTAKE PORTALS AND REAL-TIME CRM DOCUMENT SYNC.',
  },
]

export default function Sectors() {
  const [activeCode, setActiveCode] = useState<string | null>(null)

  return (
    <section id="sectors" className="py-20 border-b border-[#222222]">
      {/* Section Title in Pixel Font */}
      <h2 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-widest mb-10">
        SECTORS
      </h2>

      {/* Terminal prompt */}
      <div className="font-mono text-muted text-xs sm:text-sm mb-8">
        [/&gt; VERTICAL SPECIALIZATIONS ]
      </div>

      <div className="space-y-4 font-mono text-xs sm:text-sm">
        {sectors.map((sec) => {
          const isSelected = activeCode === sec.code

          return (
            <div
              key={sec.code}
              className="border border-[#222222] p-4 hover:border-white transition-colors cursor-pointer"
              onClick={() => setActiveCode(isSelected ? null : sec.code)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-muted">[/&gt; {sec.code}]</span>
                  <span className="text-white font-bold tracking-wider">{sec.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">{sec.metric}</span>
                  <span className="text-muted">-&gt;</span>
                </div>
              </div>

              {isSelected && (
                <div className="mt-4 pt-3 border-t border-[#222222] text-xs space-y-2 text-slate-300">
                  <div>
                    <span className="text-muted block text-[10px]">FRICTION:</span>
                    <span>{sec.friction}</span>
                  </div>
                  <div>
                    <span className="text-primary block text-[10px]">ENGINEERED SOLUTION:</span>
                    <span>{sec.solution}</span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
