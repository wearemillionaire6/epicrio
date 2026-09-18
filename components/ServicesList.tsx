'use client'

import { useState } from 'react'

const services = [
  {
    name: 'CENTRAL CRM & PIPELINE ARCHITECTURE',
    desc: 'CUSTOM SALES PIPELINES, LEAD ROUTING, AND METRIC ATTRIBUTION IN HUBSPOT, SALESFORCE, AND GOHIGHLEVEL.',
    level: 0,
  },
  {
    name: 'AUTONOMOUS WORKFLOW ENGINES',
    desc: 'END-TO-END AUTOMATION OF BILLING, INVOICING, CLIENT ONBOARDING, AND CONTRACT GENERATION VIA SELF-HOSTED N8N.',
    level: 1,
  },
  {
    name: 'SUB-300MS AI VOICE RECEPTIONIST',
    desc: '24/7 HUMAN-GRADE CONVERSATIONAL TELEPHONY POWERED BY VAPI, TWILIO SIP, AND REALTIME CALENDAR SYNCHRONIZATION.',
    level: 2,
  },
  {
    name: 'ENTERPRISE KNOWLEDGE RAG AGENTS',
    desc: 'INTERNAL AI CO-PILOTS TIED DIRECTLY TO REGULATORY LEDGERS, COMPANY SOPS, AND HISTORICAL TICKET ARCHIVES.',
    level: 3,
  },
  {
    name: 'UNIFIED API CONDUITS & INTEGRATIONS',
    desc: 'STATEFUL WEBHOOK MIDDLEWARE CONNECTING LEGACY DATABASES, WHATSAPP, STRIPE, AND PROPRIETARY SOFTWARE.',
    level: 4,
  },
  {
    name: 'CUSTOM OPERATING PORTALS & DASHBOARDS',
    desc: 'BESPOKE NEXT.JS 15 CLIENT PORTALS AND EXECUTIVE TELEMETRY CONSOLES ENGINEERED FOR PROPRIETARY WORKFLOWS.',
    level: 5,
  },
]

export default function ServicesList() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <section id="services" className="py-20 border-b border-[#222222]">
      {/* Section Title in Pixel Font */}
      <h2 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-widest mb-10">
        SERVICES
      </h2>

      {/* Terminal prompt header */}
      <div className="font-mono text-muted text-xs sm:text-sm mb-6">
        [/&gt; : ]
      </div>

      {/* Indented Staircase Tree Layout matching Yannick's design */}
      <div className="space-y-4 font-mono text-xs sm:text-sm md:text-base">
        {services.map((svc, idx) => {
          const indentClass =
            idx === 0
              ? 'pl-0'
              : idx === 1
              ? 'pl-4 sm:pl-8'
              : idx === 2
              ? 'pl-8 sm:pl-16'
              : idx === 3
              ? 'pl-12 sm:pl-24'
              : idx === 4
              ? 'pl-16 sm:pl-32'
              : 'pl-20 sm:pl-40'

          return (
            <div
              key={svc.name}
              className={`${indentClass} transition-all`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors group cursor-pointer"
              >
                <span className="text-muted group-hover:text-primary">_</span>
                <span className="font-semibold tracking-wider">{svc.name}</span>
                <span className="text-muted group-hover:text-primary transition-transform group-hover:translate-x-1">
                  -&gt;
                </span>
              </a>

              {/* Expanded description on hover */}
              {hoveredIdx === idx && (
                <div className="mt-2 text-[11px] text-muted max-w-xl leading-relaxed">
                  {svc.desc}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
