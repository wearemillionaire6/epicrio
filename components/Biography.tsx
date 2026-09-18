'use client'

import { sound } from '@/lib/sound'

interface PrincipleBox {
  code: string
  title: string
  subhead: string
  status: string
  body: string
  metric: string
}

const principles: PrincipleBox[] = [
  {
    code: 'PRIN.01',
    title: 'CALM OVER CHAOS',
    subhead: 'ASYNC ARCHITECTURE',
    status: 'DETERMINISTIC',
    body: 'ZERO FRANTIC SLACK ESCALATIONS. ASYNCHRONOUS PRIORITY QUEUES BUFFER TRAFFIC WHILE MULTI-STEP TRANSACTIONS COMMIT WITH ATOMIC IDEMPOTENCY.',
    metric: '100% IDEMPOTENT EXECUTION',
  },
  {
    code: 'PRIN.02',
    title: 'DETERMINISTIC OVER MANUAL',
    subhead: 'ELIMINATE HUMAN LEAKAGE',
    status: 'ZERO COPY-PASTE',
    body: 'HUMAN WORKERS SHOULD NEVER RETYPE DATA BETWEEN HUBSPOT, STRIPE, AND INVOICES. IF AN ACTION REPEATS TWICE, WE CODIFY IT INTO AN IMMUTABLE PIPELINE.',
    metric: '0.00% DATA RE-ENTRY',
  },
  {
    code: 'PRIN.03',
    title: 'SYSTEMS FOCUSED AUTONOMOUS',
    subhead: 'CODE-FIRST RESILIENCE',
    status: 'AIR-GAPPED',
    body: 'BESPOKE AUTOMATION RUNTIMES ENGINEERED DIRECTLY AROUND YOUR REVENUE MECHANICS. ZERO FRAGILE NO-CODE CHAINS, ZERO RANDOM SILENT FAILURES.',
    metric: 'HARDENED LINUX PODS',
  },
  {
    code: 'PRIN.04',
    title: 'PIPELINES OVER SLACK',
    subhead: '24/7/365 OPERATIONAL TRUTH',
    status: 'HIGH-AVAILABILITY',
    body: 'SELF-HEALING WORKFLOW FABRIC OPERATING 24/7/365 WITH AUTOMATIC EXPONENTIAL RETRIES, DEAD-LETTER QUEUE ALERTING, AND TWO-WAY CRM HARMONIZATION.',
    metric: '99.98% RUNTIME SLA',
  },
]

export default function Biography() {
  return (
    <section id="biography" className="py-20 border-b border-[#222222] font-mono">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#222222] gap-4">
        <div>
          <div className="text-primary text-xs tracking-widest uppercase mb-1 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary" />
            <span>[PHILOSOPHY // MODULE 01]</span>
          </div>
          <h2 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-widest">
            BIOGRAPHY
          </h2>
        </div>
        <div className="text-right text-xs text-muted">
          <span>SYSTEMS ARCHITECT SPECIFICATION</span>
          <br />
          <span className="text-white">BHAVESH WAGHMARE // FOUNDER HVACEQ.COM</span>
        </div>
      </div>

      {/* Terminal Prompt Header */}
      <div className="text-muted text-xs sm:text-sm mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-primary">[/&gt; OPERATIONAL_POSTULATES : ]</span>
          <span className="text-white">4 CORE PILLARS OF HIGH-RELIABILITY AUTOMATION</span>
        </div>
        <span className="text-primary text-[10px] hidden md:inline">
          STATUS: VERIFIED
        </span>
      </div>

      {/* 4 Box-Style Principle Modules (2x2 Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {principles.map((p) => (
          <div
            key={p.code}
            onMouseEnter={() => sound.click()}
            className="p-5 border border-[#222222] bg-[#070707] hover:border-primary/60 transition-all group flex flex-col justify-between"
          >
            <div>
              {/* Box Top Header Bar */}
              <div className="flex items-center justify-between text-[10px] pb-3 mb-3 border-b border-[#1A1A1A]">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">[{p.code}]</span>
                  <span className="text-muted">{p.subhead}</span>
                </div>
                <span className="text-primary border border-primary/30 px-1.5 py-0.2 bg-primary/5 text-[9px] font-bold">
                  {p.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-base text-white tracking-wide mb-3 group-hover:text-primary transition-colors">
                {p.title}
              </h3>

              {/* Body in Unified Monospace Font */}
              <p className="text-xs text-[#aaaaaa] leading-relaxed mb-4">
                {p.body}
              </p>
            </div>

            {/* Box Metric Footer */}
            <div className="pt-3 border-t border-[#1A1A1A] flex items-center justify-between text-[10px]">
              <span className="text-muted">DELIVERED STANDARD:</span>
              <span className="text-white font-bold tracking-wider">{p.metric}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Boxed Architect Profile & Credential Ledger */}
      <div className="border border-white/20 bg-[#070707] p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-[#222222] gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-none" />
            <span className="font-bold text-xs sm:text-sm text-white tracking-wider">
              [SYSTEMS ARCHITECT LEDGER // PROFILE]
            </span>
          </div>
          <span className="text-[10px] text-primary border border-primary/40 px-2 py-0.5 bg-primary/10">
            ENTERPRISE VERIFIED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs mb-5">
          <div className="p-3 border border-[#222222] bg-black">
            <span className="text-[9px] text-muted block mb-1">LEAD ARCHITECT</span>
            <span className="font-bold text-white block">BHAVESH WAGHMARE</span>
            <span className="text-[10px] text-primary block mt-0.5">FOUNDER HVACEQ.COM</span>
          </div>

          <div className="p-3 border border-[#222222] bg-black">
            <span className="text-[9px] text-muted block mb-1">CORE DISCIPLINE</span>
            <span className="font-bold text-white block">CRM & TELEPHONY</span>
            <span className="text-[10px] text-muted block mt-0.5">AUTONOMOUS DISPATCH</span>
          </div>

          <div className="p-3 border border-[#222222] bg-black">
            <span className="text-[9px] text-muted block mb-1">PRODUCTION STACK</span>
            <span className="font-bold text-white block">N8N • TWILIO • VAPI</span>
            <span className="text-[10px] text-muted block mt-0.5">POSTGRES • CLAUDE 3.5</span>
          </div>

          <div className="p-3 border border-[#222222] bg-black">
            <span className="text-[9px] text-muted block mb-1">DELIVERY GUARANTEE</span>
            <span className="font-bold text-primary block">30-DAY CUTOVER</span>
            <span className="text-[10px] text-muted block mt-0.5">ZERO REVENUE LEAKAGE</span>
          </div>
        </div>

        <div className="p-3 bg-black border border-[#222222] text-[11px] text-[#cccccc] leading-relaxed">
          <span className="text-primary font-bold mr-2">&gt;</span>
          WE BUILD THE CONNECTED NERVOUS SYSTEM BEHIND HIGH-VALUATION ENTERPRISES. CRM PIPELINES, SUB-300MS AI VOICE RECEPTIONISTS, AND HARDENED WORKFLOW ENGINES ENGINEERED INTO ONE IMMUTABLE OPERATING SYSTEM.
        </div>
      </div>
    </section>
  )
}
