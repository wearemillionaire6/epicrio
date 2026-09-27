'use client'

import { useState } from 'react'
import { sound } from '@/lib/sound'

interface ICPProfile {
  id: string
  code: string
  title: string
  headline: string
  corePain: string
  ourSolution: string
  sampleHook: string
  defaultMonthlyVolume: number
  defaultDealSize: number
}

const targetICPs: ICPProfile[] = [
  {
    id: 'b2b-saas',
    code: 'ICP.01',
    title: 'B2B SAAS FOUNDERS ($500K - $3M ARR)',
    headline: 'REPLACE SDR TURNOVER WITH AN ALWAYS-ON INBOX ENGINE.',
    corePain: 'Founders have strong product-market fit but lack scalable outbound. Hiring an SDR costs $77K/year, takes 3 months to ramp, and 68% leave within 12 months. Single-inbox attempts quickly get flagged as spam by Google.',
    ourSolution: 'We deploy 15 secondary domains, trigger-monitor competitor tech stacks on BuiltWith, verify verified VP/Director direct emails via Clay waterfall, and book 15-25 qualified demos directly onto your sales calendar.',
    sampleHook: 'Saw you just launched your SOC-2 compliance badge and noticed 3 open enterprise AE roles on your Careers page.',
    defaultMonthlyVolume: 3000,
    defaultDealSize: 8000,
  },
  {
    id: 'marketing-agencies',
    code: 'ICP.02',
    title: 'DIGITAL & GROWTH AGENCIES (5 - 25 STAFF)',
    headline: 'CONSISTENT HIGH-TICKET CLIENT INTAKE WITHOUT FOUNDER BURNOUT.',
    corePain: 'Agencies live on a feast-or-famine referral rollercoaster. Senior partners and founders have zero time for manual prospecting, and generic cold email agencies burn their reputation with cringe AI templates.',
    ourSolution: 'We identify e-commerce brands, high-growth startups, and local multi-location brands seeking redesigns, paid media, or growth partners. We send humanized, hyper-relevant peer-to-peer audits that command respect.',
    sampleHook: 'Audited your mobile PDP checkout flow and noticed 2 friction points that usually cost Shopify Plus brands 14% in conversion.',
    defaultMonthlyVolume: 2500,
    defaultDealSize: 4500,
  },
  {
    id: 'b2b-consulting',
    code: 'ICP.03',
    title: 'HIGH-TICKET B2B CONSULTING & ADVISORY',
    headline: 'HIGH-STAKES REVENUE CONVERSATIONS WITH C-SUITE BUYERS.',
    corePain: 'Every enterprise deal is worth $15K-$50K+, but reaching C-suite leaders (CFOs, CISOs, VP HR) through gatekeepers is notoriously difficult. Blatant sales pitches are immediately blocked or reported.',
    ourSolution: 'We monitor executive promotions, regulatory shifts, and quarterly 10-K filings to draft ultra-tailored 60-word consultative observation notes. Prospects are engaged on both email and LinkedIn simultaneously.',
    sampleHook: 'Noticed your Q1 SEC filing highlighted supply chain compliance for your EU operations; wanted to share a 1-page summary of how peer directors handled audit prep.',
    defaultMonthlyVolume: 1500,
    defaultDealSize: 18000,
  },
]

export default function Sectors() {
  const [activeTab, setActiveTab] = useState<number>(0)
  const currentICP = targetICPs[activeTab]

  // Interactive Outbound Calculator State
  const [monthlyVolume, setMonthlyVolume] = useState<number>(currentICP.defaultMonthlyVolume)
  const [dealSize, setDealSize] = useState<number>(currentICP.defaultDealSize)

  // Calculations based on 2026 Outbound Benchmarks (PRD § 1.4 & § 2.1)
  // Reply rate on signal-based outbound: ~3.5% - 4.5%
  // Meeting conversion rate from positive replies: ~25%
  const estimatedQualifiedMeetings = Math.max(4, Math.round((monthlyVolume * 0.038) * 0.22))
  const projectedPipelineValue = Math.round(estimatedQualifiedMeetings * dealSize * 12)
  const sdrAnnualCost = 77000 + 18000 // Salary + tools/taxes = $95,000
  const ourAnnualCost = 3500 + (1500 * 12) // $21,500
  const netAnnualSavings = sdrAnnualCost - ourAnnualCost

  const handleSelectTab = (idx: number) => {
    sound.click()
    setActiveTab(idx)
    setMonthlyVolume(targetICPs[idx].defaultMonthlyVolume)
    setDealSize(targetICPs[idx].defaultDealSize)
  }

  return (
    <section id="calculator" className="py-20 border-b border-[#222222] font-mono">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#222222] gap-4">
        <div>
          <div className="text-primary text-xs tracking-widest uppercase mb-1 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary" />
            <span>[TARGET_PROFILES // WHO WE SERVE &amp; ROI]</span>
          </div>
          <h2 className="font-pixel text-3xl sm:text-5xl text-white tracking-widest">
            ICP &amp; CALCULATOR
          </h2>
        </div>
        <div className="text-right text-xs text-muted">
          <span>SURGICAL AUDIENCE TARGETING</span>
          <br />
          <span className="text-white">SIMULATE PIPELINE VALUE &amp; SAVINGS</span>
        </div>
      </div>

      {/* 3 ICP Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
        {targetICPs.map((icp, idx) => {
          const isActive = activeTab === idx
          return (
            <button
              key={icp.id}
              type="button"
              onClick={() => handleSelectTab(idx)}
              className={`p-3.5 text-left border transition-all text-xs cursor-pointer ${
                isActive
                  ? 'border-primary bg-primary/10 text-white shadow-[0_0_15px_rgba(0,255,136,0.15)] font-bold'
                  : 'border-[#222222] bg-[#070707] text-muted hover:border-white hover:text-white'
              }`}
            >
              <span className={`text-[10px] block mb-1 ${isActive ? 'text-primary' : 'text-muted'}`}>
                {icp.code}
              </span>
              <span className="font-bold text-xs block leading-snug">
                {icp.title}
              </span>
            </button>
          )
        })}
      </div>

      {/* Active ICP Detail Card */}
      <div className="border border-white/20 bg-[#070707] p-6 mb-8">
        <div className="border-b border-[#222222] pb-4 mb-4">
          <span className="text-primary text-[10px] font-bold block mb-1">
            TARGET STRATEGY: {currentICP.code}
          </span>
          <h3 className="font-bold text-base sm:text-lg text-white mb-2">
            {currentICP.headline}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-3">
            <div className="p-3 bg-black border border-[#222222]">
              <span className="text-muted text-[10px] block mb-1 uppercase font-bold">THE CORE FRICTION:</span>
              <p className="text-[#aaaaaa] leading-relaxed">{currentICP.corePain}</p>
            </div>
            <div className="p-3 bg-black border border-primary/30 bg-primary/[0.03]">
              <span className="text-primary text-[10px] block mb-1 uppercase font-bold">OUR AUTOMATED SOLUTION:</span>
              <p className="text-slate-200 leading-relaxed">{currentICP.ourSolution}</p>
            </div>
          </div>
        </div>

        <div className="p-3 bg-black border border-[#222222] text-xs">
          <span className="text-muted text-[10px] block mb-1 uppercase font-bold">SAMPLE CONTEXTUAL OPENER HOOK:</span>
          <p className="text-primary font-mono leading-relaxed">&ldquo;{currentICP.sampleHook}&rdquo;</p>
        </div>
      </div>

      {/* Interactive Value & Pipeline Calculator */}
      <div className="border border-primary/40 bg-[#070707] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-6 border-b border-[#222222] gap-2">
          <div>
            <span className="text-primary text-[10px] uppercase font-bold tracking-wider">
              [INTERACTIVE PIPELINE CALCULATOR]
            </span>
            <h4 className="text-base font-bold text-white tracking-wide">
              PROJECTED QUALIFIED MEETINGS &amp; SDR COST SAVINGS
            </h4>
          </div>
          <span className="text-[10px] text-muted">ADJUST SLIDERS TO SIMULATE</span>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Slider 1: Monthly Email Volume */}
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-muted">MONTHLY VERIFIED SENDS:</span>
              <span className="text-primary font-bold">{monthlyVolume.toLocaleString()} EMAILS / MO</span>
            </div>
            <input
              type="range"
              min="1000"
              max="6000"
              step="250"
              value={monthlyVolume}
              onChange={(e) => setMonthlyVolume(Number(e.target.value))}
              className="w-full accent-[#00FF88] cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-[#666666] mt-1">
              <span>1,000 (Starter)</span>
              <span>3,000 (Growth)</span>
              <span>6,000+ (Enterprise)</span>
            </div>
          </div>

          {/* Slider 2: Average Deal / Contract Size */}
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-muted">AVERAGE DEAL OR RETAINER VALUE:</span>
              <span className="text-white font-bold">${dealSize.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="30000"
              step="500"
              value={dealSize}
              onChange={(e) => setDealSize(Number(e.target.value))}
              className="w-full accent-[#00FF88] cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-[#666666] mt-1">
              <span>$1,000</span>
              <span>$10,000</span>
              <span>$30,000+</span>
            </div>
          </div>
        </div>

        {/* Output Metrics Trio */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-black border border-[#222222] text-center mb-6">
          <div>
            <span className="text-[10px] text-muted block mb-1">QUALIFIED MEETINGS BOOKED</span>
            <span className="text-2xl sm:text-3xl font-bold text-primary font-pixel">
              ~{estimatedQualifiedMeetings} / MO
            </span>
            <span className="text-[9px] text-muted block mt-1">10 to 30 meetings on calendar</span>
          </div>

          <div>
            <span className="text-[10px] text-muted block mb-1">PROJECTED ANNUAL PIPELINE</span>
            <span className="text-2xl sm:text-3xl font-bold text-white font-pixel">
              +${projectedPipelineValue.toLocaleString()}
            </span>
            <span className="text-[9px] text-muted block mt-1">Calculated across 12-month run</span>
          </div>

          <div>
            <span className="text-[10px] text-muted block mb-1">NET SAVINGS VS SDR HIRE</span>
            <span className="text-2xl sm:text-3xl font-bold text-primary font-pixel">
              +${netAnnualSavings.toLocaleString()} / YR
            </span>
            <span className="text-[9px] text-muted block mt-1">$95K SDR cost vs $21.5K our fee</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="text-muted text-[11px]">
            Ready to test these numbers on your exact ICP with 100 free sends?
          </span>
          <a
            href="#pilot"
            onClick={() => sound.click()}
            className="px-5 py-2.5 bg-primary text-black font-bold text-xs hover:bg-white transition-colors text-center shadow-md flex-shrink-0"
          >
            START 7-DAY PILOT -&gt;
          </a>
        </div>
      </div>
    </section>
  )
}
