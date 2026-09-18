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
    subhead: 'KARPATHY LLM-WIKI SPEC',
    status: 'DETERMINISTIC',
    body: 'ZERO FRANTIC SLACK ESCALATIONS. IMPLEMENTING THE 3-LAYER KARPATHY AGENT MEMORY PATTERN: IMMUTABLE RAW INGESTION, APPEND-ONLY CITATION WIKIS, AND MACHINE-VERIFIED SCHEMA LINTING.',
    metric: '3-LAYER LLM-WIKI PATTERN',
  },
  {
    code: 'PRIN.02',
    title: 'ZERO DOUBLE-REASONING LATENCY',
    subhead: 'ADR-005 TELEPHONY STANDARD',
    status: '<260MS TTFT',
    body: 'STRICTLY NO LLMS INSIDE THE SYNCHRONOUS CALL PATH. VOICE AGENTS LIVE IN VAPI/RETELL WHILE TOOL CALLS EXECUTE AS RIGID PYTHON/PYDANTIC SYNC HANDLERS IN A PAPERCLIP WORKER POOL. ELIMINATES 3-5 SECONDS OF DEAD AIR.',
    metric: 'SUB-300MS LATENCY BUDGET',
  },
  {
    code: 'PRIN.03',
    title: '12-FACTOR AGENT FABRIC',
    subhead: 'TYPED REDUCER ARCHITECTURE',
    status: 'ZERO RUNAWAY LOOPS',
    body: 'STRICT ADHERENCE TO 12-FACTOR AGENT LAWS: TYPED TOOL CALLS (FACTOR 4), SELF-OWNED CONTROL FLOW (FACTOR 8), AND STATELESS REDUCER RUNTIMES (FACTOR 12). RESILIENT AGAINST EXPENSIVE TOKEN RE-DERIVATIONS.',
    metric: '12-FACTOR SPECIFICATION',
  },
  {
    code: 'PRIN.04',
    title: 'SPEED-TO-LEAD 100X MULTIPLIER',
    subhead: '24/7 AUTONOMOUS INTAKE',
    status: '100% CALL CAPTURE',
    body: 'MIT BENCHMARKS CONFIRM CONTACTING INBOUND LEADS WITHIN 5 MINUTES YIELDS 100X HIGHER CONVERSIONS VS 30-MINUTE DELAYS. OUR SYSTEMS ANSWER WITHIN 1 RING, RESOLVE FAQS, AND DIRECTLY COMMIT BOOKINGS.',
    metric: '100X SPEED-TO-LEAD CONVERSION',
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
            <span className="font-bold text-white block">BHAVESH ASHOK WAGHMARE</span>
            <span className="text-[10px] text-primary block mt-0.5">AGENT OS & HVACEQ FOUNDER</span>
          </div>

          <div className="p-3 border border-[#222222] bg-black">
            <span className="text-[9px] text-muted block mb-1">SPECIALIZATION</span>
            <span className="font-bold text-white block">VOICE AGENTS & PIPELINES</span>
            <span className="text-[10px] text-muted block mt-0.5">24/7 AUTONOMOUS DISPATCH</span>
          </div>

          <div className="p-3 border border-[#222222] bg-black">
            <span className="text-[9px] text-muted block mb-1">CORE TECH STACK</span>
            <span className="font-bold text-white block">RETELL • VAPI • PAPERCLIP</span>
            <span className="text-[10px] text-muted block mt-0.5">SUPABASE • N8N • LITELLM</span>
          </div>

          <div className="p-3 border border-[#222222] bg-black">
            <span className="text-[9px] text-muted block mb-1">DELIVERY CONTRACT</span>
            <span className="font-bold text-primary block">$2,000 LIFETIME / $2.5K SETUP</span>
            <span className="text-[10px] text-muted block mt-0.5">30-DAY CUTOVER SLA</span>
          </div>
        </div>

        <div className="p-3 bg-black border border-[#222222] text-[11px] text-[#cccccc] leading-relaxed">
          <span className="text-primary font-bold mr-2">&gt;</span>
          WE ARCHITECT HARDENED NERVOUS SYSTEMS FOR HIGH-VALUATION ENTERPRISES. REPLACING BLOATED $4,000/MO AGENCY RETAINERS WITH DETERMINISTIC VOICE DISPATCHERS, ZERO-DOUBLE-REASONING TELEPHONY, AND HIGH-THROUGHPUT PIPELINES ANCHORED IN KARPATHY LLM-WIKI MEMORY SPECIFICATIONS.
        </div>
      </div>
    </section>
  )
}
