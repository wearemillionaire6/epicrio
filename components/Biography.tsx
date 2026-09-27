'use client'

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
    title: 'PRECISION OVER VOLUME',
    subhead: '2026 OUTBOUND BENCHMARK',
    status: '15-25% REPLY RATE',
    body: 'BLASTING 20,000 GENERIC EMAILS BURNS DOMAINS AND GETS BANNED BY GMAIL. WE RUN SURGICAL, SIGNAL-BASED CAMPAIGNS TARGETING ACCOUNTS WITH ACTIVE HIRING, TECH STACK EXPANSION, OR FUNDING TRIGGERS.',
    metric: '5X INDUSTRY BENCHMARK',
  },
  {
    code: 'PRIN.02',
    title: 'DOMAIN ISOLATION & SAFETY',
    subhead: 'MULTI-INBOX ARCHITECTURE',
    status: '100% PRIMARY INBOX',
    body: 'YOUR PRIMARY DOMAIN NEVER TOUCHES COLD OUTBOUND. WE CONFIGURE 5 TO 15 SECONDARY DOMAINS WITH 2048-BIT DKIM, STRICT DMARC REJECTION, AND AUTOMATED 28-DAY REPUTATION WARMUP BEFORE SENDING.',
    metric: '< 1.5% BOUNCE RATE SLA',
  },
  {
    code: 'PRIN.03',
    title: 'ZERO AI SLOP & PEER-TO-PEER COPY',
    subhead: 'HUMANIZED COPYWRITING',
    status: '< 80 WORDS / EMAIL',
    body: '47% OF B2B BUYERS TRASH OBVIOUS AI OUTREACH. WE WRITE PLAIN-TEXT, RESEARCH-ANCHORED SEQUENCES WITH A SINGLE CLEAR CTA. NO CORPORATE BUZZWORDS, NO MARKETING TEMPLATES, NO TRACKING BLOAT.',
    metric: '100% PLAIN-TEXT ONLY',
  },
  {
    code: 'PRIN.04',
    title: 'AUTONOMOUS REPLY TRIAGE',
    subhead: 'SPEED-TO-LEAD CONVERSION',
    status: '< 3 MIN TURNAROUND',
    body: 'WHEN AN INTERESTED PROSPECT REPLIES, N8N WEBHOOKS INSTANTLY PAUSE OUTBOUND CADENCES ACROSS EMAIL AND LINKEDIN, CREATE CRM DEALS IN HUBSPOT, AND ALERT YOUR SALES TEAM IN SLACK WITH CAL.COM LINKS.',
    metric: 'ZERO MISSED PIPELINE',
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
            <span>[OPERATIONAL_MANIFESTO // PRINCIPLES]</span>
          </div>
          <h2 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-widest">
            MANIFESTO
          </h2>
        </div>
        <div className="text-right text-xs text-muted">
          <span>OUTBOUND ARCHITECT SPECIFICATION</span>
          <br />
          <span className="text-white">BHAVESH WAGHMARE // CES ARCHITECT</span>
        </div>
      </div>

      {/* Prompt Header */}
      <div className="text-muted text-xs sm:text-sm mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-primary">[/&gt; OPERATIONAL_POSTULATES : ]</span>
          <span className="text-white">4 LAWS OF MODERN B2B COLD EMAIL DELIVERABILITY</span>
        </div>
        <span className="text-primary text-[10px] hidden md:inline">
          STATUS: PRODUCTION VALIDATED
        </span>
      </div>

      {/* 4 Brutalist Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {principles.map((p) => (
          <div
            key={p.code}
            className="p-5 sm:p-6 border border-[#222222] bg-[#070707] hover:border-primary/50 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#222222] text-[10px]">
                <span className="text-primary font-bold font-pixel">{p.code}</span>
                <span className="text-muted">{p.subhead}</span>
                <span className="text-primary font-bold border border-primary/30 px-1.5 py-0.5 bg-primary/5">
                  {p.status}
                </span>
              </div>
              <h3 className="font-bold text-sm sm:text-base text-white tracking-wide mb-2">
                {p.title}
              </h3>
              <p className="text-xs text-[#aaaaaa] leading-relaxed">
                {p.body}
              </p>
            </div>
            <div className="pt-4 border-t border-[#222222] mt-4 flex items-center justify-between text-[10px]">
              <span className="text-muted">DELIVERED BENCHMARK:</span>
              <span className="text-white font-bold">{p.metric}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Architect Profile Box */}
      <div className="border border-[#222222] bg-[#070707] p-5 sm:p-6">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#222222] text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary" />
            <span className="font-bold text-white tracking-wider">
              OPERATOR LEDGER: BHAVESH ASHOK WAGHMARE
            </span>
          </div>
          <span className="text-[10px] text-primary">COLD OUTBOUND SYSTEM (CES)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10px] text-muted block mb-1">ROLE &amp; FOCUS</span>
            <span className="text-white font-bold block">Systems Architect</span>
            <span className="text-[#aaaaaa] text-[11px]">B2B Cold Outbound &amp; Deliverability</span>
          </div>
          <div>
            <span className="text-[10px] text-muted block mb-1">PROVEN STACK</span>
            <span className="text-white font-bold block">Smartlead • Clay • Apollo</span>
            <span className="text-[#aaaaaa] text-[11px]">HeyReach • n8n • Cal.com</span>
          </div>
          <div>
            <span className="text-[10px] text-muted block mb-1">DELIVERABILITY GUARANTEE</span>
            <span className="text-primary font-bold block">&gt;98% Primary Inbox Placement</span>
            <span className="text-[#aaaaaa] text-[11px]">&lt;1.5% Bounce Rate SLA</span>
          </div>
          <div>
            <span className="text-[10px] text-muted block mb-1">COMMERCIAL MODEL</span>
            <span className="text-white font-bold block">$2,500 - $5,000 Setup</span>
            <span className="text-[#aaaaaa] text-[11px]">30-Day Money-Back Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  )
}
