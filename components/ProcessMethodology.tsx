'use client'

import { sound } from '@/lib/sound'

interface OutboundPhase {
  code: string
  timeline: string
  title: string
  mandate: string
  deliverables: string
  gate: string
}

const outboundPhases: OutboundPhase[] = [
  {
    code: 'PHASE // 01',
    timeline: 'DAYS 01–03',
    title: 'SECONDARY DOMAINS & DNS HARDENING',
    mandate: 'PROCURE 5-15 ISOLATED SECONDARY DOMAINS. CONFIGURE HARDENED SPF, DKIM (2048-BIT), DMARC (P=REJECT), AND CUSTOM TRACKING CNAME RECORDS. PROVISION GOOGLE WORKSPACE MAILBOXES.',
    deliverables: '15-45 ISOLATED SENDING MAILBOXES • VERIFIED MXTOOLBOX PASS ON ALL DOMAINS',
    gate: 'GATE 1: 100% PASSING DNS & ZERO SHARED PRIMARY DOMAIN REPUTATION',
  },
  {
    code: 'PHASE // 02',
    timeline: 'DAYS 04–07',
    title: 'ICP SOURCING, CLAY WATERFALL & COPYWRITING',
    mandate: '60-MIN ICP DISCOVERY WORKSHOP. BUILD TRIGGER SEARCHES IN APOLLO & SALES NAVIGATOR. ASSEMBLE CLAY CASCADING WATERFALL TABLES. WRITE 4-TOUCH HUMANIZED PEER-TO-PEER SEQUENCES WITH A/B VARIANTS.',
    deliverables: '1,500 - 3,000 VERIFIED PROSPECT LEADS • TESTED <80-WORD COPY • HEYREACH LINKEDIN CAMPAIGN',
    gate: 'GATE 2: CLIENT SIGNS OFF ON AUDIENCE FILTERS & BRAND VOICE SAMPLE',
  },
  {
    code: 'PHASE // 03',
    timeline: 'DAYS 08–28',
    title: 'MANDATORY 28-DAY AUTOMATED WARMUP',
    mandate: 'INBOXES ARE CONNECTED TO OUR DELIVERABILITY WARMUP CLUSTER (SMARTLEAD / INSTANTLY). AUTOMATED PEER-TO-PEER ENGAGEMENT, GRADUAL VOLUME RAMP, AND INBOX PLACEMENT TESTING. ZERO COLD EMAILS SENT UNTIL HEALTH IS 100%.',
    deliverables: '4-WEEK REPUTATION SEEDING • N8N REPLY CLASSIFIER BUILT • CAL.COM INTEGRATION TESTED',
    gate: 'GATE 3: 5 PERSONAL INBOX TESTS PASS (GMAIL, OUTLOOK, APPLE, YAHOO, PROTON)',
  },
  {
    code: 'PHASE // 04',
    timeline: 'DAYS 29+',
    title: 'SOFT LAUNCH, SCALE TO VOLUME & CALENDAR COMMIT',
    mandate: 'DAY 29 SOFT LAUNCH AT 25-50 EMAILS/DAY. DAY 35 RAMP TO FULL TARGET VOLUME (100-200/DAY). REAL-TIME SLACK WAR-ROOM ALERTS ON POSITIVE REPLIES. WEEKLY LOOM REPORTS & CONTINUOUS A/B COPY REWRITES.',
    deliverables: '10-30 QUALIFIED MEETINGS BOOKED MONTHLY • AUTOMATED CRM TWO-WAY SYNC • WEEKLY LOOM DIGEST',
    gate: 'GATE 4: <1.5% BOUNCE RATE, >98% PRIMARY INBOX PLACEMENT, 30-DAY REFUND GUARANTEE',
  },
]

export default function ProcessMethodology() {
  return (
    <section id="methodology" className="py-20 border-b border-[#222222] font-mono">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#222222] gap-4">
        <div>
          <div className="text-primary text-xs tracking-widest uppercase mb-1 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary" />
            <span>[DELIVERY_ROADMAP // 30-DAY WARMUP TO SCALE]</span>
          </div>
          <h2 className="font-pixel text-3xl sm:text-5xl text-white tracking-widest">
            METHODOLOGY
          </h2>
        </div>
        <div className="text-right text-xs text-muted">
          <span>ZERO SHORTCUTS IN DELIVERABILITY</span>
          <br />
          <span className="text-white">QUALITY GATES AT EVERY STAGE</span>
        </div>
      </div>

      {/* 4 Phases Stack */}
      <div className="space-y-4 mb-8">
        {outboundPhases.map((phase) => (
          <div
            key={phase.code}
            className="border border-[#222222] bg-[#070707] p-5 sm:p-6 hover:border-primary/50 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-[#222222] gap-2">
              <div className="flex items-center gap-3">
                <span className="text-primary text-xs font-bold font-pixel">
                  {phase.code}
                </span>
                <span className="text-muted">|</span>
                <h3 className="font-bold text-sm sm:text-base text-white tracking-wide">
                  {phase.title}
                </h3>
              </div>
              <span className="text-[10px] text-primary bg-primary/10 border border-primary/30 px-2 py-0.5 font-bold self-start sm:self-auto">
                {phase.timeline}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {phase.mandate}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] pt-3 border-t border-[#222222]">
              <div>
                <span className="text-muted text-[10px] block mb-0.5">KEY DELIVERABLES:</span>
                <span className="text-white font-medium">{phase.deliverables}</span>
              </div>
              <div>
                <span className="text-primary text-[10px] block mb-0.5">COMPLIANCE QUALITY GATE:</span>
                <span className="text-primary font-bold">{phase.gate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-black border border-[#222222] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold">✓ 30-DAY HARD LAUNCH PROMISE:</span>
          <span className="text-muted">No vanity metrics, no fake warmup, no burned domains.</span>
        </div>
        <a
          href="#pilot"
          onClick={() => sound.click()}
          className="text-primary hover:text-white transition-colors underline font-bold"
        >
          APPLY FOR 7-DAY PILOT -&gt;
        </a>
      </div>
    </section>
  )
}
