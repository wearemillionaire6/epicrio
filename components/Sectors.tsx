'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sound } from '@/lib/sound'

interface SectorData {
  id: string
  code: string
  name: string
  shortTitle: string
  metric: string
  metricLabel: string
  friction: string
  solution: string
  agentsDeployed: string[]
  workflowNodes: string[]
  defaultMonthlyVolume: number
  avgDealSize: number
  sampleTranscript: {
    speaker: string
    text: string
  }[]
}

const sectorData: SectorData[] = [
  {
    id: 'hvac',
    code: '01',
    name: 'COMMERCIAL HVAC & MECHANICAL CONTRACTORS',
    shortTitle: 'HVAC & FIELD SERVICES',
    metric: '18+ HRS',
    metricLabel: 'SAVED PER ESTIMATOR / WEEK',
    friction: 'Emergency after-hours equipment failures go to voicemail; field technicians and estimators waste 35% of their day manually transcribing equipment serials and driving quotes.',
    solution: 'Sub-300ms voice triage for emergency breakdowns, automated equipment catalog lookup (leveraging HvacEQ data pipelines), instant technician dispatch, and automated quote follow-ups.',
    agentsDeployed: ['Emergency Voice Triage Agent', 'Equipment Spec OCR Worker', 'ServiceTitan / Procore Bridge', 'Auto-Review Generator'],
    workflowNodes: ['[INBOUND EMERGENCY CALL]', '[EQUIPMENT MODEL PARSE]', '[AVAILABILITY & GEO-ROUTING]', '[DISPATCH SMS & CALENDAR]'],
    defaultMonthlyVolume: 350,
    avgDealSize: 4200,
    sampleTranscript: [
      { speaker: 'CALLER', text: 'Our 40-ton rooftop unit on building B just threw a critical head pressure code and our freezer room is heating up.' },
      { speaker: 'VOICE AGENT', text: 'Understood. Flagged as Priority 1 commercial refrigeration emergency. I am routing your location and Carrier RTU serial to Senior Tech Marcus who is 12 minutes away.' },
    ],
  },
  {
    id: 'legal',
    code: '02',
    name: 'LEGAL & HIGH-STAKES LAW FIRMS',
    shortTitle: 'LEGAL & LAW FIRMS',
    metric: '+48%',
    metricLabel: 'RETAINERS SIGNED SAME-DAY',
    friction: 'Prospective clients in high-intent distress call after 5 PM and hang up during long web questionnaires; staff spend hours on manual conflict-of-interest checks.',
    solution: '24/7 empathetic conversational intake, immediate multi-database conflict checks against internal firm ledgers, and automated retainer agreement dispatch via DocuSign.',
    agentsDeployed: ['Inbound Retainer Voice Agent', 'Conflict Check Microservice', 'Clio / Clio Grow Sync', 'DocuSign Automated Pipeline'],
    workflowNodes: ['[AFTER-HOURS CALL]', '[JURISDICTION / CONFLICT CHECK]', '[CASE QUALIFICATION SCORE]', '[INSTANT PARTNER CALENDAR BOOK]'],
    defaultMonthlyVolume: 180,
    avgDealSize: 6500,
    sampleTranscript: [
      { speaker: 'CALLER', text: 'I was just served with a federal IP injunction and I need an emergency consultation before the morning filing deadline.' },
      { speaker: 'VOICE AGENT', text: 'I am immediately logging this under emergency civil defense. Conflict check against opposing counsel has cleared. I have reserved partner David Vance for 8:15 AM tomorrow.' },
    ],
  },
  {
    id: 'medical',
    code: '03',
    name: 'MEDICAL, SURGICAL & AESTHETIC PRACTICES',
    shortTitle: 'HEALTHCARE & MED SPAS',
    metric: '-62%',
    metricLabel: 'REDUCTION IN NO-SHOW LOSS',
    friction: 'Overburdened front desks miss high-ticket surgical consultation calls; patients cancel last minute leaving expensive OR slots idle with zero automated backfill.',
    solution: 'HIPAA-compliant conversational voice booking, smart 2-way SMS confirmation loops, and automated standby list backfill that fills cancelled slots in under 4 minutes.',
    agentsDeployed: ['HIPAA Voice Scheduler', 'Waitlist Auto-Fill Engine', 'EHR / Nextech Conduit', 'Post-Op Follow-up Bot'],
    workflowNodes: ['[CONSULTATION INQUIRY]', '[INSURANCE & PROCEDURE TRIAGE]', '[EHR SLOT RESERVATION]', '[2-WAY SMS CADENCE]'],
    defaultMonthlyVolume: 420,
    avgDealSize: 2800,
    sampleTranscript: [
      { speaker: 'CALLER', text: 'Hi, I need to reschedule my consultation with Dr. Reyes next Tuesday, do you have anything open on Thursday afternoon?' },
      { speaker: 'VOICE AGENT', text: 'Yes, Dr. Reyes has an opening at 2:30 PM on Thursday. I have updated your chart and texted you the updated prep guidelines.' },
    ],
  },
  {
    id: 'realestate',
    code: '04',
    name: 'COMMERCIAL REAL ESTATE & ASSET MGMT',
    shortTitle: 'COMMERCIAL REAL ESTATE',
    metric: '10X',
    metricLabel: 'SPEED-TO-LEAD ON ASSET TOURS',
    friction: 'Institutional brokers miss tenant inquiries during multi-hour property tours; prospective tenants move on to competing properties before receiving asset pitch decks.',
    solution: 'Sub-60s instant qualification, automated WhatsApp & email brochure delivery with NDAs, and live agent-guided tour booking synchronized across the brokerage.',
    agentsDeployed: ['Asset Brochure Dispatcher', 'Tenant KYC Pre-Filter', 'WhatsApp Business Engine', 'Buildout / Salesforce Sync'],
    workflowNodes: ['[PORTAL INQUIRY]', '[TENANT SQUARE-FOOTAGE PARSE]', '[INSTANT BROCHURE & NDA]', '[CALENDLY / CRM LOCK]'],
    defaultMonthlyVolume: 240,
    avgDealSize: 12000,
    sampleTranscript: [
      { speaker: 'INVESTOR', text: 'Looking at the 25,000 sq ft industrial flex space on Airport Blvd. Can I get the trailing 12-month cap rate and rent roll?' },
      { speaker: 'VOICE AGENT', text: 'I have dispatched the encrypted offering memorandum and NDA to your email. I can also schedule a walkthrough with Managing Director Sarah this Friday.' },
    ],
  },
  {
    id: 'saas',
    code: '05',
    name: 'HIGH-TICKET B2B TECH & ADVISORY',
    shortTitle: 'B2B SAAS & TECH ADVISORY',
    metric: '3.4X',
    metricLabel: 'DEMO-TO-CONTRACT VELOCITY',
    friction: 'Sales reps waste 40% of their day manually qualifying inbound demo requests, updating messy CRM properties, and hand-crafting proposals in Google Docs.',
    solution: 'Instant Clearbit/Apollo webhook enrichment upon form submission, autonomous demo qualification, and automated Stripe/PandaDoc contract pipelines upon deal close.',
    agentsDeployed: ['Enrichment & Scoring Worker', 'Autonomous Contract Generator', 'Stripe Billing Reconciler', 'Slack War-Room Bot'],
    workflowNodes: ['[DEMO SUBMIT]', '[CLEARBIT DATA ENRICHMENT]', '[ENTERPRISE TIER ROUTE]', '[PROPOSAL AUTO-DISPATCH]'],
    defaultMonthlyVolume: 300,
    avgDealSize: 8500,
    sampleTranscript: [
      { speaker: 'BUYER', text: 'We have 250 seats and need SOC2 compliance validation before we can start a 30-day proof-of-concept.' },
      { speaker: 'VOICE AGENT', text: 'Our enterprise tier covers full SOC2 Type II and HIPAA compliance. I am generating your customized POC agreement and security package now.' },
    ],
  },
  {
    id: 'wealth',
    code: '06',
    name: 'WEALTH & PRIVATE ASSET MANAGEMENT',
    shortTitle: 'WEALTH MANAGEMENT',
    metric: '100%',
    metricLabel: 'COMPLIANCE AUDIT TRAIL ACCURACY',
    friction: 'High-net-worth client onboarding requires back-and-forth email PDF submissions, manual KYC verifications, and disjointed risk questionnaires.',
    solution: 'Bespoke client onboarding portal with automated document extraction, real-time risk profile scoring, and direct custodial database integration.',
    agentsDeployed: ['Secure KYC Portal', 'Document Extraction OCR', 'Custodian API Bridge', 'Encrypted Telemetry Ledger'],
    workflowNodes: ['[CLIENT INTAKE PORTAL]', '[KYC / AML IDENTITY CHECK]', '[PORTFOLIO RISK PROFILE]', '[CUSTODIAN ACCT SYNC]'],
    defaultMonthlyVolume: 80,
    avgDealSize: 25000,
    sampleTranscript: [
      { speaker: 'CLIENT', text: 'I am rolling over a family trust portfolio and want to make sure the tax-loss harvesting strategy aligns with our state estate laws.' },
      { speaker: 'VOICE AGENT', text: 'All estate tax parameters have been logged against the trust schedule. I have scheduled an intake review with Senior Wealth Advisor Miller for Tuesday.' },
    ],
  },
]

export default function Sectors() {
  const [activeTab, setActiveTab] = useState<number>(0)
  const currentSector = sectorData[activeTab]

  // Interactive ROI Calculator State
  const [monthlyLeads, setMonthlyLeads] = useState<number>(currentSector.defaultMonthlyVolume)
  const [avgTicket, setAvgTicket] = useState<number>(currentSector.avgDealSize)

  // Calculations
  const hoursSavedPerMonth = Math.round((monthlyLeads * 0.45))
  const capturedDealsPerMonth = Math.max(1, Math.round((monthlyLeads * 0.04)))
  const estimatedRevenueGain = Math.round(capturedDealsPerMonth * avgTicket * 12)

  const handleSelectTab = (idx: number) => {
    sound.click()
    setActiveTab(idx)
    setMonthlyLeads(sectorData[idx].defaultMonthlyVolume)
    setAvgTicket(sectorData[idx].avgDealSize)
  }

  return (
    <section id="sectors" className="py-24 border-b border-[#222222] font-mono">
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#222222] gap-4">
        <div>
          <div className="text-primary text-xs tracking-widest uppercase mb-1 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary" />
            <span>[VERTICAL_INTELLIGENCE // MODULE 03]</span>
          </div>
          <h2 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-widest">
            SECTORS
          </h2>
        </div>
        <div className="text-right text-xs text-muted">
          <span>VERTICAL SPECIALIZATIONS</span>
          <br />
          <span className="text-white">SELECT INDUSTRY TO INSPECT BLUEPRINT</span>
        </div>
      </div>

      {/* Terminal Command Header */}
      <div className="text-muted text-xs sm:text-sm mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-primary">[/&gt; SECTOR_SWITCHER : ]</span>
          <span className="text-[#888888]">SELECT DOMAIN TO RUN SIMULATION</span>
        </div>
        <span className="text-[11px] text-primary hidden md:inline">
          6 PRODUCTION BLUEPRINTS
        </span>
      </div>

      {/* Sector Tab Selector Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
        {sectorData.map((sec, idx) => {
          const isActive = activeTab === idx
          return (
            <button
              key={sec.id}
              onClick={() => handleSelectTab(idx)}
              className={`p-2.5 sm:p-3 text-left border transition-all text-xs cursor-pointer flex flex-col justify-between min-h-[70px] ${
                isActive
                  ? 'border-primary bg-primary/10 text-white shadow-[0_0_12px_rgba(0,255,136,0.2)]'
                  : 'border-[#222222] bg-black/40 text-muted hover:border-white hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[9px] text-primary font-bold">[{sec.code}]</span>
                {isActive && <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />}
              </div>
              <span className="font-bold text-[11px] sm:text-xs tracking-tight line-clamp-2 mt-1">
                {sec.shortTitle}
              </span>
            </button>
          )
        })}
      </div>

      {/* Active Sector Command Hub Showcase */}
      <div className="border border-[#222222] bg-[#070707] p-6 sm:p-8 relative">
        {/* Hub Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#222222]">
          <div>
            <div className="flex items-center gap-2 text-[10px] text-primary uppercase tracking-wider mb-1">
              <span>SECTOR PROTOCOL // {currentSector.code}</span>
              <span>•</span>
              <span>VERIFIED PRODUCTION BLUEPRINT</span>
            </div>
            <h3 className="font-bold text-lg sm:text-2xl text-white tracking-wide">
              {currentSector.name}
            </h3>
          </div>

          <div className="flex items-center gap-3 bg-black border border-primary/40 px-4 py-3">
            <div>
              <span className="text-2xl sm:text-3xl font-pixel font-bold text-primary block leading-none">
                {currentSector.metric}
              </span>
              <span className="text-[9px] text-muted tracking-wider block mt-1">
                {currentSector.metricLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Operational Friction vs Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-4 border border-[#262626] bg-black/60">
            <div className="text-red-400 text-[10px] font-bold tracking-widest uppercase mb-2 flex items-center gap-1.5">
              <span>[X]</span>
              <span>CURRENT OPERATIONAL BOTTLENECK</span>
            </div>
            <p className="text-xs text-[#aaaaaa] leading-relaxed">
              {currentSector.friction}
            </p>
          </div>

          <div className="p-4 border border-primary/40 bg-primary/5">
            <div className="text-primary text-[10px] font-bold tracking-widest uppercase mb-2 flex items-center gap-1.5">
              <span>[√]</span>
              <span>ENGINEERED AUTONOMOUS ARCHITECTURE</span>
            </div>
            <p className="text-xs text-white leading-relaxed">
              {currentSector.solution}
            </p>
          </div>
        </div>

        {/* Interactive Architecture Flow Nodes */}
        <div className="mb-8 p-4 bg-black border border-[#222222]">
          <div className="text-muted text-[10px] uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>[REAL-TIME DATA DISPATCH PIPELINE]</span>
            <span className="text-primary text-[9px]">END-TO-END AUTONOMOUS</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
            {currentSector.workflowNodes.map((node, i) => (
              <div
                key={node}
                className="p-2.5 border border-[#333333] bg-[#0c0c0c] text-white flex items-center justify-between group hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-primary text-[10px] font-bold">0{i + 1}</span>
                  <span className="text-[11px] truncate font-mono">{node}</span>
                </div>
                {i < 3 && <span className="text-muted group-hover:text-primary hidden lg:inline">-&gt;</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Live Audio / Telephony Intake Transcript Sample */}
        <div className="mb-8 p-4 bg-black border border-[#222222]">
          <div className="text-muted text-[10px] uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>[AI VOICE AGENT INTAKE LOG // LIVE AUDIO TRANSCRIPTION]</span>
            <span className="text-primary text-[9px]">280MS TTFT</span>
          </div>
          <div className="space-y-2 text-xs">
            {currentSector.sampleTranscript.map((line, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span
                  className={`text-[10px] font-bold uppercase px-1.5 py-0.5 border flex-shrink-0 ${
                    line.speaker === 'VOICE AGENT'
                      ? 'border-primary text-primary bg-primary/10'
                      : 'border-[#333333] text-muted'
                  }`}
                >
                  {line.speaker}
                </span>
                <p
                  className={`text-[11px] leading-relaxed ${
                    line.speaker === 'VOICE AGENT' ? 'text-white' : 'text-[#888888]'
                  }`}
                >
                  &ldquo;{line.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Sector ROI Calculator Widget */}
        <div className="p-5 sm:p-6 bg-black border border-white/20 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-[#222222] gap-2">
            <div>
              <span className="text-[10px] text-primary uppercase font-bold">
                [INTERACTIVE VALUE CALCULATOR]
              </span>
              <h4 className="text-sm font-bold text-white tracking-wide">
                PROJECTED REVENUE & TIME HARVESTED FOR {currentSector.shortTitle}
              </h4>
            </div>
            <span className="text-[10px] text-muted">ADJUST SLIDERS TO SIMULATE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Slider 1: Monthly Leads / Inquiries */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted">MONTHLY INBOUND INQUIRIES:</span>
                <span className="text-primary font-bold">{monthlyLeads} / MO</span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="25"
                value={monthlyLeads}
                onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                className="w-full accent-[#00FF88] cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-[#555555] mt-1">
                <span>50</span>
                <span>500</span>
                <span>1,000</span>
                <span>2,000+</span>
              </div>
            </div>

            {/* Slider 2: Average Deal Size */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted">AVERAGE DEAL / RETAINER VALUE:</span>
                <span className="text-white font-bold">${avgTicket.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="500"
                value={avgTicket}
                onChange={(e) => setAvgTicket(Number(e.target.value))}
                className="w-full accent-[#00FF88] cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-[#555555] mt-1">
                <span>$1,000</span>
                <span>$15,000</span>
                <span>$30,000</span>
                <span>$50,000+</span>
              </div>
            </div>
          </div>

          {/* Calculator Output Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#0a0a0a] border border-[#222222] text-center">
            <div>
              <span className="text-[10px] text-muted block mb-1">SAVED LABOR HOURS</span>
              <span className="text-lg sm:text-xl font-bold text-white">
                ~{hoursSavedPerMonth} HRS / MO
              </span>
            </div>
            <div>
              <span className="text-[10px] text-muted block mb-1">MISSED DEALS RECOVERED</span>
              <span className="text-lg sm:text-xl font-bold text-primary">
                +{capturedDealsPerMonth} DEALS / MO
              </span>
            </div>
            <div>
              <span className="text-[10px] text-muted block mb-1">PROJECTED NET ARR CAPTURED</span>
              <span className="text-lg sm:text-xl font-bold text-primary font-pixel">
                +${estimatedRevenueGain.toLocaleString()} / YR
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#222222]">
          <div className="flex flex-wrap gap-1.5">
            {currentSector.agentsDeployed.map((ag) => (
              <span
                key={ag}
                className="text-[9px] px-2 py-0.5 border border-[#333333] text-muted bg-black"
              >
                {ag}
              </span>
            ))}
          </div>

          <a
            href="#contact"
            onClick={() => sound.click()}
            className="px-4 py-2 bg-white text-black font-bold text-xs hover:bg-primary transition-colors flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
          >
            <span>DEPLOY FOR {currentSector.shortTitle}</span>
            <span>-&gt;</span>
          </a>
        </div>
      </div>
    </section>
  )
}
