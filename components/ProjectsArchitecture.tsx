'use client'

import { useState } from 'react'
import { sound } from '@/lib/sound'

interface ArchitectureTab {
  id: string
  label: string
  title: string
  description: string
  diagram: string
  spec: {
    label: string
    value: string
  }[]
  codeSnippet: string
}

const outboundArchitectures: ArchitectureTab[] = [
  {
    id: 'dns-deliverability',
    label: '01 // DNS & DELIVERABILITY',
    title: 'MULTI-DOMAIN ISOLATION & 28-DAY WARMUP PROTOCOL',
    description: 'Sending high-volume cold email from your primary corporate domain carries severe blacklisting risk. We establish secondary domain clusters with strict cryptographic authentication records and gradual sending curves to protect inbox placement forever.',
    diagram: '[PRIMARY DOMAIN: SAFE] ──> [5-15 SECONDARY DOMAINS] ──> [SPF+DKIM+DMARC PASS] ──> [PRIMARY INBOX: 98.4%]',
    spec: [
      { label: 'DNS PROTOCOLS', value: 'SPF, DKIM (2048-BIT), DMARC (P=REJECT)' },
      { label: 'WARMUP CURVE', value: 'WEEK 1: 10/DAY -> WEEK 4: 50/DAY PER BOX' },
      { label: 'SPAM THRESHOLD', value: '< 0.08% COMPLAINT SLA (GMAIL SAFE)' },
      { label: 'TRACKING DOMAIN', value: 'ISOLATED SSL CNAME (NO SHARED PIXELS)' },
    ],
    codeSnippet: `; BIND9 DNS Zone Configuration (Sample Secondary Domain)
$ORIGIN outreach-nexus.co.
@   IN  TXT   "v=spf1 include:_spf.google.com ~all"
google._domainkey IN TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0lX..."
_dmarc            IN TXT "v=DMARC1; p=reject; pct=100; rua=mailto:dmarc@outreach-nexus.co"
track             IN CNAME custom.smartlead.io.`,
  },
  {
    id: 'clay-waterfall',
    label: '02 // CLAY CASCADE',
    title: 'TRIPLE-VERIFIED WATERFALL ENRICHMENT ENGINE',
    description: 'Single-source lead lists suffer 15-30% invalid email rates. Our Clay architecture chains multiple verification APIs in sequence, ensuring every decision-maker address is cryptographically validated via live SMTP handshakes before any email is dispatched.',
    diagram: '[APOLLO / SALES NAV] ──> [CLAY TABLE] ──> [PROVIDER 1: NEVERBOUNCE] ──> [PROVIDER 2: PROSPEO] ──> [DEBOUNCE VERIFIED]',
    spec: [
      { label: 'CASCADE PROVIDERS', value: 'NEVERBOUNCE -> PROSPEO -> HUNTER -> DEBOUNCE' },
      { label: 'BOUNCE GUARANTEE', value: '< 1.5% BOUNCE RATE ON ALL DELIVERIES' },
      { label: 'SIGNAL EXTRACTION', value: 'RECENT LINKEDIN POSTS, PODCASTS, HIRING ADS' },
      { label: 'EXPORT AUTOMATION', value: 'AUTO-PUSH INTO SMARTLEAD WARMED CAMPAIGNS' },
    ],
    codeSnippet: `// Clay Waterfall Step 3: Cascading Resolution
{
  "prospect": "David Vance",
  "company": "Beacon Analytics",
  "provider_1_result": { "source": "NeverBounce", "status": "catch_all" },
  "provider_2_fallback": { "source": "Prospeo", "status": "verified_deliverable", "email": "david.vance@beaconanalytics.com" },
  "trigger_signal": "Hired Head of Sales 12 days ago; expanding SDR team",
  "outreach_ready": true
}`,
  },
  {
    id: 'humanized-copy',
    label: '03 // COPY LAB',
    title: 'HUMANIZED PEER-TO-PEER VS 2022 AI SLOP',
    description: '47% of B2B professionals refuse to reply to emails they perceive as automated AI fluff. We ban corporate buzzwords, generic flattery, and long paragraphs. Every email is under 80 words, plain-text, and sounds like a sharp operator speaking directly to a peer.',
    diagram: '[PROSPECT RESEARCH HOOK] ──> [REAL OPERATIONAL PAIN] ──> [PROVEN PROPOSITION] ──> [ZERO-FRICTION CTA]',
    spec: [
      { label: 'LENGTH CONSTRAINT', value: 'UNDER 80 WORDS MAXIMUM' },
      { label: 'STRUCTURE', value: 'OBSERVATION -> PAIN -> SOLUTION -> ASYNC CTA' },
      { label: 'FORMATTING', value: '100% PLAIN TEXT (NO HTML, NO TEMPLATES)' },
      { label: 'REPLY RATE', value: '15-25% ON TRIGGER EVENTS (VS 3.4% BENCHMARK)' },
    ],
    codeSnippet: `=== ❌ GENERIC 2022 AI SLOP (REPLY: 1.2%) ===
Subject: Synergizing Beacon Analytics with Revolutionary AI Paradigms
Dear Mr. Vance,
I hope this email finds you well in these exciting times! At AgencyCo, we are thrilled
to introduce our cutting-edge, state-of-the-art AI-driven revenue enablement suite.
Are you open for a 30-minute demonstration this Thursday at 2 PM EST?

=== ✓ OUR 2026 HUMANIZED COPY (REPLY: 19.4%) ===
Subject: quick question re: beacon's SDR hiring

Hi David,

Saw your post about the new sales team buildout and noticed you have 2 open outbound SDR roles.

Most B2B SaaS teams at your stage are spending $77K/year per rep to book 8-12 meetings. We built an outbound system that configures 15 secondary mailboxes, Clay waterfall data, and consistently books 15-25 qualified meetings/month without adding headcount.

Mind if I send over a 2-minute Loom showing how the system runs?

Best,
Bhavesh`,
  },
  {
    id: 'reply-triage',
    label: '04 // AUTONOMOUS TRIAGE',
    title: 'SUB-3-MINUTE SPEED-TO-LEAD & CRM SYNC',
    description: 'When positive replies land, minutes matter. Our n8n workflow monitors Smartlead webhooks, parses intent, automatically halts subsequent follow-ups for that prospect across email and LinkedIn, and syncs directly into Cal.com and your CRM.',
    diagram: '[INCOMING REPLY] ──> [N8N INTENT CLASSIFIER] ──> [HALT FOLLOWUPS] ──> [SLACK ALERT + CAL.COM SYNC]',
    spec: [
      { label: 'SPEED-TO-LEAD', value: '< 3 MINUTES FROM INBOX DEPOSIT' },
      { label: 'INTENT LABELS', value: 'POSITIVE, QUESTION, OBJECTION, OOO' },
      { label: 'CRM INTEGRATIONS', value: 'HUBSPOT, PIPEDRIVE, SALESFORCE, TWENTY' },
      { label: 'SLACK WAR-ROOM', value: 'REAL-TIME RICH NOTIFICATION WITH PROSPECT BRIEF' },
    ],
    codeSnippet: `// n8n Webhook Reply Classification Payload
{
  "event": "email.reply.received",
  "from": "david.vance@beaconanalytics.com",
  "snippet": "Sure, send over the Loom or grab 15 mins on my calendar next Tuesday.",
  "classification": "POSITIVE_INTEREST",
  "actions_executed": [
    "SMARTLEAD_CAMPAIGN_PAUSED",
    "HEYREACH_LINKEDIN_PAUSED",
    "HUBSPOT_DEAL_CREATED_STAGE_DISCOVERY",
    "SLACK_WAR_ROOM_NOTIFIED_HOT_LEAD",
    "CAL_COM_LINK_AUTO_DRAFTED"
  ]
}`,
  },
]

export default function ProjectsArchitecture() {
  const [activeTab, setActiveTab] = useState<number>(0)
  const currentTab = outboundArchitectures[activeTab]

  return (
    <section id="infrastructure" className="py-20 border-b border-[#222222] font-mono">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#222222] gap-4">
        <div>
          <div className="text-primary text-xs tracking-widest uppercase mb-1 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary" />
            <span>[TECHNICAL_BLUEPRINT // OUTBOUND ARCHITECTURE]</span>
          </div>
          <h2 className="font-pixel text-3xl sm:text-5xl text-white tracking-widest">
            INFRASTRUCTURE
          </h2>
        </div>
        <div className="text-right text-xs text-muted">
          <span>HIGH-DELIVERABILITY ENGINE SPECIFICATION</span>
          <br />
          <span className="text-white">CLICK TABS TO INSPECT SYSTEM SCHEMATICS</span>
        </div>
      </div>

      {/* Tab Navigation Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
        {outboundArchitectures.map((tab, idx) => {
          const isActive = activeTab === idx
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                sound.click()
                setActiveTab(idx)
              }}
              className={`p-3 text-left border transition-all text-xs cursor-pointer ${
                isActive
                  ? 'border-primary bg-primary/10 text-white shadow-[0_0_15px_rgba(0,255,136,0.15)] font-bold'
                  : 'border-[#222222] bg-[#070707] text-muted hover:border-white hover:text-white'
              }`}
            >
              <span className={`text-[10px] block mb-0.5 ${isActive ? 'text-primary' : 'text-muted'}`}>
                {tab.label.split(' // ')[0]}
              </span>
              <span className="truncate block font-pixel">
                {tab.label.split(' // ')[1]}
              </span>
            </button>
          )
        })}
      </div>

      {/* Main Spec Card */}
      <div className="border border-white/20 bg-[#070707] p-6 sm:p-8 relative overflow-hidden">
        {/* Title & Description */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-primary mb-1">
            <span className="w-2 h-2 bg-primary" />
            <span>MODULE {activeTab + 1} OF 4</span>
          </div>
          <h3 className="font-bold text-lg sm:text-xl text-white tracking-wide mb-2">
            {currentTab.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
            {currentTab.description}
          </p>
        </div>

        {/* Spec Matrix Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 bg-black border border-[#222222] mb-6 text-xs">
          {currentTab.spec.map((item) => (
            <div key={item.label}>
              <span className="text-[9px] text-muted block mb-1">{item.label}</span>
              <span className="text-white font-bold text-[11px] block">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Circuit Diagram */}
        <div className="mb-6">
          <div className="text-[10px] text-muted mb-1 flex items-center justify-between">
            <span>[PIPELINE FLOW DIAGRAM]</span>
            <span className="text-primary text-[9px]">DETERMINISTIC PATH</span>
          </div>
          <div className="p-3 bg-black border border-[#222222] text-xs text-primary font-mono overflow-x-auto whitespace-nowrap">
            {currentTab.diagram}
          </div>
        </div>

        {/* Code / Artifact Snippet */}
        <div>
          <div className="text-[10px] text-muted mb-1 flex items-center justify-between">
            <span>[ENGINEERING SPECIFICATION &amp; PRODUCTION PAYLOAD]</span>
            <span className="text-[9px] text-muted">VERIFIED RUNTIME</span>
          </div>
          <pre className="p-4 bg-black border border-[#222222] text-[11px] text-white font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
            {currentTab.codeSnippet}
          </pre>
        </div>
      </div>
    </section>
  )
}
