'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sound } from '@/lib/sound'

interface ServicePillar {
  id: string
  code: string
  name: string
  tagline: string
  desc: string
  stack: string[]
  deliverable: string
  metrics: {
    label1: string
    val1: string
    label2: string
    val2: string
    label3: string
    val3: string
  }
  topology: string
  sampleOutput: string
}

const outboundServices: ServicePillar[] = [
  {
    id: 'inbox-infra',
    code: 'PIL.01',
    name: 'MULTI-INBOX DOMAIN INFRASTRUCTURE & WARMUP',
    tagline: 'PREVENT DOMAIN BURNING. GUARANTEE 98%+ PRIMARY INBOX PLACEMENT.',
    desc: 'We never send cold outreach from your primary corporate domain. We procure 5 to 15 secondary domains, configure hardened SPF, DKIM, DMARC, and custom tracking domains, and run a mandatory 28-day gradual volume warmup across 15 to 45 mailboxes before scaling to 50 emails/day per inbox.',
    stack: ['GOOGLE WORKSPACE', 'NAMECHEAP DNS', 'SMARTLEAD / INSTANTLY', 'MXTOOLBOX'],
    deliverable: '15-45 ISOLATED SENDING MAILBOXES WITH 100% PASSING DNS RECORDS',
    metrics: {
      label1: 'INBOX PLACEMENT',
      val1: '98.4% PRIMARY',
      label2: 'BOUNCE THRESHOLD',
      val2: '< 1.5% GUARANTEED',
      label3: 'SENDING CAPACITY',
      val3: '3,000 - 6,000 / MO',
    },
    topology: '[SECONDARY DOMAINS] ──> [SPF / DKIM / DMARC] ──> [28-DAY WARMUP] ──> [ROTATING POOL]',
    sampleOutput: `// Live DNS Verification Status
DOMAIN: outreach-acme.co
STATUS: AUTHENTICATED
├── SPF:  v=spf1 include:_spf.google.com ~all [PASS]
├── DKIM: google._domainkey.outreach-acme.co [2048-BIT PASS]
├── DMARC: v=DMARC1; p=reject; rua=mailto:dmarc@outreach-acme.co [PASS]
└── CUSTOM TRACKING: track.outreach-acme.co [SSL CNAME VERIFIED]`,
  },
  {
    id: 'lead-sourcing',
    code: 'PIL.02',
    name: 'ICP LEAD SOURCING & TRIGGER-EVENT MONITORING',
    tagline: 'TARGET PROSPECTS AT THE EXACT MOMENT THEY HAVE THE BUDGET AND THE PAIN.',
    desc: 'We define your ideal customer profile with surgical precision: company headcount, tech-stack dependencies, revenue milestones, and verified decision-maker titles. We monitor trigger events such as recent funding rounds, open job postings, leadership promotions, and tech migrations to initiate outreach with genuine context.',
    stack: ['APOLLO.IO', 'LINKEDIN SALES NAV', 'BUILTWITH', 'CRUNCHBASE PRO'],
    deliverable: '1,000 - 3,000 VERIFIED PROSPECT ACCOUNTS SOURCED WEEKLY',
    metrics: {
      label1: 'ACCOUNT MATCH',
      val1: '100% ICP FIT',
      label2: 'LEAD FRESHNESS',
      val2: '7-DAY ROLLING REFRESH',
      label3: 'DATA COVERAGE',
      val3: 'DIRECT DIALS + WORK EMAILS',
    },
    topology: '[TRIGGER EVENTS] ──> [SALES NAV + APOLLO] ──> [BUILTWITH TECH SCAN] ──> [FILTERED ICP]',
    sampleOutput: `// Sourced Account Record with Trigger Event
Company: FleetScale SaaS ($12M ARR)
Prospect: Sarah Jenkins, VP of Revenue Operations
Trigger Signal: Posted 3 new SDR job openings 4 days ago
Identified Pain: High SDR ramp costs ($77k/hire), missing Q2 inbound quota
Tech Detected: HubSpot CRM, Stripe Billing, ZoomInfo`,
  },
  {
    id: 'clay-waterfall',
    code: 'PIL.03',
    name: 'CLAY CASCADING WATERFALL ENRICHMENT',
    tagline: 'TRIPLE-VERIFIED EMAILS. ZERO BOUNCED SENDS. RELEVANT BIO RESEARCH.',
    desc: 'Raw prospect lists are funneled through a cascading waterfall enrichment table in Clay. If Provider A cannot find a verified email, it cascades to Provider B, then C, then D. We verify every email address against strict SMTP handshakes and extract recent LinkedIn post topics, podcasts, and company announcements.',
    stack: ['CLAY.COM', 'NEVERBOUNCE', 'PROSPEO', 'ANTHROPIC SONNET'],
    deliverable: 'ENRICHED, DE-DUPLICATED CSV TIED DIRECTLY TO SENDING CAMPAIGNS',
    metrics: {
      label1: 'VERIFICATION RATE',
      val1: '94% VALIDATED',
      label2: 'CASCADE DEPTH',
      val2: '4 TIERS (NEVERBOUNCE)',
      label3: 'SPAM PROTECTION',
      val3: 'ZERO UNVERIFIED SENDS',
    },
    topology: '[RAW CSV] ──> [CLAY WATERFALL CASCADE] ──> [SMTP HANDSHAKE VERIFY] ──> [CLEAN LIST]',
    sampleOutput: `// Clay Waterfall Cascade Record
Email Found: sarah.jenkins@fleetscale.io
Validation Provider: NeverBounce (Deliverable - Safe to Send)
Cascade Step: Tier 2 (Prospeo fallback)
LinkedIn Post Hook: "Spoke at SaaStr yesterday on why outbound SDR ramp is breaking"
Enrichment Confidence: 99.8%`,
  },
  {
    id: 'humanized-copy',
    code: 'PIL.04',
    name: 'HUMANIZED COLD EMAIL COPY & MULTI-TOUCH SEQUENCES',
    tagline: 'UNDER 80 WORDS. ZERO AI CLICHÉS. 15-25% SIGNAL-BASED REPLY RATES.',
    desc: '47% of B2B decision-makers instantly delete obvious AI-generated emails. We write plain-text, high-converting copy anchored to real prospect research. 4 carefully timed touches (Day 0, 3, 7, 14) with a single low-friction call to action, reinforced with parallel LinkedIn profile touches via HeyReach.',
    stack: ['SMARTLEAD', 'HEYREACH LINKEDIN', 'HUMANIZED COPY FRAMEWORK', 'A/B VARIANTS'],
    deliverable: 'COMPLETE 4-TOUCH SEQUENCE + LINKEDIN WORKFLOW + VARIANT TESTING',
    metrics: {
      label1: 'LENGTH BUDGET',
      val1: '< 80 WORDS / EMAIL',
      label2: 'AVERAGE REPLY RATE',
      val2: '15 - 25% ON SIGNALS',
      label3: 'FORMATTING',
      val3: '100% PLAIN-TEXT ONLY',
    },
    topology: '[DAY 0 EMAIL] ──> [DAY 2 LINKEDIN TOUCH] ──> [DAY 3 BUMP] ──> [DAY 7 ASSET] ──> [DAY 14 CLOSE]',
    sampleOutput: `// Real Humanized Cold Email Sample (Day 0)
Subject: quick question regarding fleetscale's SDR hiring

Hi Sarah,

Saw your SaaStr note on SDR ramp times and noticed you have 3 open outbound rep roles.

Most SaaS teams at your stage are spending $77K/year per rep just to book 8-12 meetings. We built an outbound system that configures 15 secondary mailboxes, Clay waterfall data, and books 15-25 qualified meetings/month without adding headcount.

Mind if I send over a 2-minute Loom showing how we set it up?

Best,
Bhavesh`,
  },
  {
    id: 'reply-triage',
    code: 'PIL.05',
    name: 'AUTONOMOUS REPLY TRIAGE & CAL.COM BOOKING',
    tagline: 'SPEED-TO-LEAD AUTOMATION. INSTANT MEETING CONFIRMATIONS.',
    desc: 'When an interested prospect replies, our n8n orchestration engine instantly classifies the response (positive, technical question, objection, or out-of-office). Prospects are automatically paused across all sequences, hot leads trigger an instant Slack war-room ping, and meetings are booked directly onto your calendar via Cal.com.',
    stack: ['N8N ENGINE', 'CAL.COM', 'HUBSPOT / TWENTY CRM', 'SLACK WEBHOOKS'],
    deliverable: 'AUTOMATED CRM SYNC, INSTANT SLACK ALERTS, 0-MINUTES MISSED LEADS',
    metrics: {
      label1: 'SPEED-TO-LEAD',
      val1: '< 3 MINUTES RESPONSE',
      label2: 'CLASSIFICATION',
      val2: '99.2% ACCURACY',
      label3: 'CALENDAR SYNC',
      val3: 'CAL.COM / HUBSPOT 2-WAY',
    },
    topology: '[REPLY WEBHOOK] ──> [REPLY CLASSIFIER] ──> [SLACK WAR-ROOM] ──> [CAL.COM BOOKING]',
    sampleOutput: `// Incoming Positive Reply Event
Prospect: Sarah Jenkins (VP RevOps, FleetScale)
Reply: "Sure, send over the Loom or grab 15 mins on my calendar next Tuesday."
Automation Triggered:
  ✓ Sequence Paused: All 4 mailboxes halted for Sarah Jenkins
  ✓ CRM Created: HubSpot Deal "FleetScale Outbound" ($2,500/mo)
  ✓ Slack Alert: #sales-war-room pinged with prospect notes
  ✓ Auto-Reply Drafted: Cal.com direct scheduling link dispatched`,
  },
]

export default function ServicesList() {
  const [activeIdx, setActiveIdx] = useState<number>(0)
  const currentSvc = outboundServices[activeIdx]

  return (
    <section id="services" className="py-20 border-b border-[#222222] font-mono">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#222222] gap-4">
        <div>
          <div className="text-primary text-xs tracking-widest uppercase mb-1 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary" />
            <span>[OUTBOUND_ARCHITECTURE // 5 OPERATIONAL PILLARS]</span>
          </div>
          <h2 className="font-pixel text-3xl sm:text-5xl text-white tracking-widest">
            SERVICES
          </h2>
        </div>
        <div className="text-right text-xs text-muted">
          <span>PRODUCTIZED B2B OUTBOUND INFRASTRUCTURE</span>
          <br />
          <span className="text-white">SELECT ANY PILLAR TO INSPECT DELIVERABLE SPEC</span>
        </div>
      </div>

      {/* Terminal prompt indicator */}
      <div className="text-muted text-xs mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-primary">[/&gt; CES_PILLAR_EXPLORER : ]</span>
          <span className="text-white">5 INTEGRATED OUTBOUND WORKFLOWS</span>
        </div>
        <div className="text-[11px] text-muted hidden md:block">
          STATUS: <span className="text-primary font-bold">ALL 5 PROTOCOLS VERIFIED</span>
        </div>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 5 Pillar Selector Buttons */}
        <div className="lg:col-span-5 space-y-2.5">
          {outboundServices.map((svc, idx) => {
            const isActive = activeIdx === idx

            return (
              <div
                key={svc.id}
                onClick={() => {
                  sound.click()
                  setActiveIdx(idx)
                }}
                className={`border p-4 cursor-pointer transition-all duration-150 select-none ${
                  isActive
                    ? 'border-primary bg-primary/10 text-white shadow-[0_0_20px_rgba(0,255,136,0.12)]'
                    : 'border-[#222222] bg-[#070707] text-[#aaaaaa] hover:border-white hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 border ${
                        isActive
                          ? 'border-primary bg-primary text-black'
                          : 'border-[#333333] text-muted'
                      }`}
                    >
                      {svc.code}
                    </span>
                    <span className="font-bold text-xs tracking-wide truncate">
                      {svc.name}
                    </span>
                  </div>
                  <span
                    className={`text-xs transition-transform ${
                      isActive ? 'text-primary translate-x-1' : 'text-muted'
                    }`}
                  >
                    -&gt;
                  </span>
                </div>

                {/* Mobile Preview */}
                <div className="lg:hidden mt-2 pt-2 border-t border-[#222222] text-xs">
                  <p className="text-[11px] text-muted">{svc.tagline}</p>
                </div>
              </div>
            )
          })}

          <div className="pt-4 text-xs text-muted flex items-center justify-between">
            <span>[CLICK PILLAR TO VIEW DATA &amp; WORKFLOW]</span>
            <a
              href="#pricing"
              className="text-white hover:text-primary transition-colors text-[11px] underline"
            >
              VIEW PACKAGES -&gt;
            </a>
          </div>
        </div>

        {/* Right Column: Live Pillar Spec & Technical Dossier */}
        <div className="lg:col-span-7">
          <div className="border border-white/20 bg-[#070707] p-5 sm:p-6 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#222222] text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary animate-pulse" />
                <span className="font-bold text-white tracking-wider">
                  PILLAR SPEC: {currentSvc.code}
                </span>
              </div>
              <span className="text-[10px] text-primary bg-primary/10 border border-primary/30 px-2 py-0.5 font-bold">
                PRODUCTION DELIVERABLE
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="mb-4">
              <h3 className="font-bold text-base text-white mb-1 tracking-wide">
                {currentSvc.name}
              </h3>
              <p className="text-primary text-xs font-bold mb-2">
                {currentSvc.tagline}
              </p>
              <p className="text-xs text-[#aaaaaa] leading-relaxed">
                {currentSvc.desc}
              </p>
            </div>

            {/* Metrics Trio Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 bg-black border border-[#222222] mb-4 text-[11px]">
              <div>
                <span className="text-[9px] text-muted block mb-0.5">{currentSvc.metrics.label1}</span>
                <span className="text-primary font-bold">{currentSvc.metrics.val1}</span>
              </div>
              <div>
                <span className="text-[9px] text-muted block mb-0.5">{currentSvc.metrics.label2}</span>
                <span className="text-white font-bold">{currentSvc.metrics.val2}</span>
              </div>
              <div>
                <span className="text-[9px] text-muted block mb-0.5">{currentSvc.metrics.label3}</span>
                <span className="text-white font-bold">{currentSvc.metrics.val3}</span>
              </div>
            </div>

            {/* Workflow Architecture Topology */}
            <div className="mb-4">
              <div className="text-[10px] text-muted mb-1.5 flex items-center justify-between">
                <span>[WORKFLOW TOPOLOGY]</span>
                <span className="text-primary text-[9px]">END-TO-END AUTOMATED</span>
              </div>
              <div className="p-2.5 bg-black border border-[#222222] text-[10px] text-primary overflow-x-auto whitespace-nowrap font-mono">
                {currentSvc.topology}
              </div>
            </div>

            {/* Live Wire Data / Output Preview */}
            <div className="mb-4">
              <div className="text-[10px] text-muted mb-1 flex items-center justify-between">
                <span>[REAL SYSTEM ARTIFACT PREVIEW]</span>
                <span className="text-[9px] text-muted">VERIFIED FORMAT</span>
              </div>
              <pre className="p-3 bg-black border border-[#222222] text-[11px] text-white font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
                {currentSvc.sampleOutput}
              </pre>
            </div>

            {/* Deliverable Badge & Tech Stack */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#222222]">
              <div className="flex flex-wrap gap-1">
                {currentSvc.stack.map((stk) => (
                  <span
                    key={stk}
                    className="text-[9px] px-2 py-0.5 border border-[#333333] text-muted bg-[#111111]"
                  >
                    {stk}
                  </span>
                ))}
              </div>

              <a
                href="#pilot"
                onClick={() => sound.click()}
                className="text-[11px] font-bold text-primary hover:text-white transition-colors flex items-center gap-1 border border-primary/40 bg-primary/10 px-3 py-1.5 self-start sm:self-auto"
              >
                <span>TEST IN 7-DAY PILOT</span>
                <span>-&gt;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
