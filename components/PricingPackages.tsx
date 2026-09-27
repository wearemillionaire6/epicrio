'use client'

import { useState } from 'react'
import { sound } from '@/lib/sound'

interface PricingTier {
  id: string
  name: string
  tagline: string
  setupFee: string
  monthlyRetainer: string
  isPopular?: boolean
  mailboxes: string
  volume: string
  features: string[]
  idealFor: string
}

const tiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'STARTER OUTBOUND',
    tagline: 'VALIDATE COLD OUTBOUND IN 1 NICHE BEFORE COMMITTING HEADCOUNT.',
    setupFee: '$2,500',
    monthlyRetainer: '$997 / MO',
    mailboxes: '5 MAILBOXES (2 DOMAINS)',
    volume: '1,500 EMAILS / MONTH',
    idealFor: 'Small B2B teams, early-stage SaaS, consulting firms entering outbound.',
    features: [
      '5 secondary mailboxes across 2 domains',
      'Full SPF, DKIM, DMARC, and custom tracking DNS',
      '28-day automated deliverability warmup',
      '1,500 verified emails sent monthly (under 30/day/box)',
      '1 target ICP & niche market sequence',
      'Clay cascading waterfall verification',
      'Humanized 4-touch copy (under 80 words/email)',
      'Cal.com meeting scheduling integration',
      'Bi-weekly performance digest',
    ],
  },
  {
    id: 'growth',
    name: 'GROWTH OUTBOUND',
    tagline: 'REPLACES A $77K/YR SDR. COMPLETE MULTI-CHANNEL PIPELINE ENGINE.',
    setupFee: '$3,500',
    monthlyRetainer: '$1,500 / MO',
    isPopular: true,
    mailboxes: '15 MAILBOXES (5 DOMAINS)',
    volume: '3,000 EMAILS / MONTH',
    idealFor: 'B2B SaaS ($500K-$3M ARR), agencies, and high-ticket service businesses.',
    features: [
      '15 secondary mailboxes across 5 domains',
      'Full SPF, DKIM, DMARC, custom tracking & dedicated IPs',
      '3,000 verified emails sent monthly',
      '2 distinct ICP segments & A/B variant testing',
      'Deep Clay waterfall: LinkedIn posts, recent funding & hiring triggers',
      'Parallel LinkedIn outreach via HeyReach (connect + message)',
      'Autonomous reply classification (positive/question/objection)',
      'Instant Slack war-room alerts + auto-drafted reply triage',
      'Two-way CRM integration (HubSpot, Pipedrive, Twenty)',
      'Weekly Loom video performance reviews',
    ],
  },
  {
    id: 'enterprise',
    name: 'ENTERPRISE OUTBOUND',
    tagline: 'HIGH-VOLUME MULTI-ICP DOMINATION WITH DEDICATED REVENUE ARCHITECT.',
    setupFee: '$5,000',
    monthlyRetainer: '$2,500 / MO',
    mailboxes: '30+ MAILBOXES (10 DOMAINS)',
    volume: '6,000+ EMAILS / MONTH',
    idealFor: '$3M+ ARR companies, multi-product B2B firms, and high-velocity teams.',
    features: [
      '30+ secondary mailboxes across 10 domains',
      '6,000+ verified multi-channel touches monthly',
      '4 distinct ICP verticals with custom dynamic value propositions',
      'Custom webhook integration into proprietary backend/EHR/PMS',
      'Sub-3-minute positive reply turnaround SLA',
      'Custom trigger webhook automations (BuiltWith + funding alerts)',
      'Bi-weekly strategy call with lead systems architect',
      'Quarterly domain rotation and deliverability audits',
      'Dedicated Slack channel with priority engineering support',
    ],
  },
]

export default function PricingPackages() {
  const [showCostBreakdown, setShowCostBreakdown] = useState(false)

  return (
    <section id="pricing" className="py-20 border-b border-[#222222] font-mono">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#222222] gap-4">
        <div>
          <div className="text-primary text-xs tracking-widest uppercase mb-1 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary" />
            <span>[COMMERCIAL_FRAMEWORK // PRODUCTIZED TIERS]</span>
          </div>
          <h2 className="font-pixel text-3xl sm:text-5xl text-white tracking-widest">
            PRICING
          </h2>
        </div>
        <div className="text-right text-xs text-muted">
          <span>ZERO HIDDEN COMMISSIONS</span>
          <br />
          <span className="text-white">SETUP COVERS TOOL STACK + 30-DAY BUILD</span>
        </div>
      </div>

      {/* Value Anchor Banner */}
      <div className="p-4 bg-black border border-primary/40 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-primary text-xs font-bold">[THE ECONOMIC COMPARISON]</span>
          <p className="text-xs sm:text-sm text-white">
            An in-house SDR costs <span className="line-through text-muted">$77,000/year</span> salary + benefits + ramp time + tool subscriptions (~$95K total).
          </p>
          <p className="text-xs text-[#aaaaaa]">
            Our Growth Outbound System replaces this fully loaded at <span className="text-primary font-bold">~$21,500/year</span> all-in, operating 24/7 with zero turnover.
          </p>
        </div>
        <a
          href="#pilot"
          onClick={() => sound.click()}
          className="px-4 py-2 bg-primary text-black font-bold text-xs hover:bg-white transition-colors flex-shrink-0 self-start md:self-auto"
        >
          TEST WITH 7-DAY PILOT -&gt;
        </a>
      </div>

      {/* 3 Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 items-stretch">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`border p-6 flex flex-col justify-between relative transition-all duration-200 ${
              tier.isPopular
                ? 'border-primary bg-primary/[0.04] shadow-[0_0_30px_rgba(0,255,136,0.15)]'
                : 'border-[#222222] bg-[#070707] hover:border-white/40'
            }`}
          >
            {tier.isPopular && (
              <div className="absolute -top-3 left-6 bg-primary text-black font-bold text-[9px] px-2.5 py-0.5 tracking-wider">
                RECOMMENDED // BEST SELLER
              </div>
            )}

            <div>
              {/* Header */}
              <div className="border-b border-[#222222] pb-4 mb-4">
                <span className="text-[10px] text-muted block mb-1">PACKAGE TIER:</span>
                <h3 className="font-bold text-lg text-white tracking-wide mb-1">
                  {tier.name}
                </h3>
                <p className="text-xs text-[#aaaaaa] leading-relaxed">
                  {tier.tagline}
                </p>
              </div>

              {/* Pricing Numbers */}
              <div className="bg-black border border-[#222222] p-4 mb-5 space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-muted">SETUP FEE:</span>
                  <span className="text-2xl font-bold text-white font-pixel">{tier.setupFee}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-[#222222]">
                  <span className="text-xs text-muted">MONTHLY RETAINER:</span>
                  <span className="text-sm font-bold text-primary font-pixel">{tier.monthlyRetainer}</span>
                </div>
                <div className="text-[10px] text-muted pt-1">
                  Includes: {tier.mailboxes} • {tier.volume}
                </div>
              </div>

              {/* Ideal For */}
              <div className="mb-5 text-xs">
                <span className="text-muted block text-[10px] mb-1">IDEAL FIT:</span>
                <p className="text-slate-300 leading-snug">{tier.idealFor}</p>
              </div>

              {/* Features List */}
              <div className="space-y-2 mb-6 text-xs">
                <span className="text-[10px] text-muted uppercase font-bold tracking-wider block mb-2">
                  INCLUDED DELIVERABLES:
                </span>
                {tier.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2 text-[#cccccc]">
                    <span className="text-primary text-xs flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-[11px] leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="pt-4 border-t border-[#222222] space-y-2">
              <a
                href="#pilot"
                onClick={() => sound.click()}
                className={`w-full py-2.5 font-bold text-xs text-center block transition-colors ${
                  tier.isPopular
                    ? 'bg-primary text-black hover:bg-white'
                    : 'border border-white/30 text-white hover:border-primary hover:text-primary'
                }`}
              >
                APPLY FOR {tier.name.split(' ')[0]} OUTBOUND -&gt;
              </a>
              <span className="text-[9px] text-muted block text-center">
                30-day money-back guarantee on setup fee
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Transparent Setup Fee Math Drawer */}
      <div className="border border-[#222222] bg-[#070707] p-5">
        <button
          type="button"
          onClick={() => {
            sound.click()
            setShowCostBreakdown((prev) => !prev)
          }}
          className="w-full flex items-center justify-between text-xs font-bold text-white hover:text-primary transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <span className="text-primary">[+]</span>
            <span>TRANSPARENCY: WHERE DOES THE $3,500 SETUP FEE GO?</span>
          </span>
          <span className="text-[10px] text-muted">
            {showCostBreakdown ? '▲ HIDE BREAKDOWN' : '▼ VIEW DETAILED TOOL &amp; TIME LEDGER'}
          </span>
        </button>

        {showCostBreakdown && (
          <div className="mt-4 pt-4 border-t border-[#222222] text-xs space-y-3">
            <p className="text-muted leading-relaxed">
              We believe in 100% pricing transparency. We make our business margin on ongoing retainers and optimization, not by hiding costs. Here is the exact cost allocation for a standard Growth Package setup:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-[11px] text-left border border-[#222222]">
                <thead className="bg-black text-muted border-b border-[#222222]">
                  <tr>
                    <th className="p-2.5">INFRASTRUCTURE COMPONENT</th>
                    <th className="p-2.5">COVERAGE</th>
                    <th className="p-2.5 text-right">DIRECT ALLOCATED COST</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222222]">
                  <tr>
                    <td className="p-2.5 text-white font-bold">5-10 Secondary Domains</td>
                    <td className="p-2.5 text-muted">Procurement &amp; DNS isolation</td>
                    <td className="p-2.5 text-right font-mono">$100 - $150</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 text-white font-bold">15 Google Workspace Mailboxes</td>
                    <td className="p-2.5 text-muted">First 2 months prepaid ($7/mailbox/mo)</td>
                    <td className="p-2.5 text-right font-mono">$210 - $420</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 text-white font-bold">Smartlead / Instantly Enterprise</td>
                    <td className="p-2.5 text-muted">First 2 months warmup &amp; sending license</td>
                    <td className="p-2.5 text-right font-mono">$188 - $240</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 text-white font-bold">Clay Waterfall &amp; Apollo Credits</td>
                    <td className="p-2.5 text-muted">Multi-provider enrichment &amp; data validation</td>
                    <td className="p-2.5 text-right font-mono">$350 - $500</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 text-white font-bold">Systems Architect Build Time</td>
                    <td className="p-2.5 text-muted">25-35 hours: DNS setup, Clay tables, sequence copy</td>
                    <td className="p-2.5 text-right font-mono">$2,200 - $2,500</td>
                  </tr>
                  <tr className="bg-primary/5 font-bold text-primary">
                    <td className="p-2.5">TOTAL BUILD VALUE ALLOCATED</td>
                    <td className="p-2.5">TURNKEY SYSTEM DEPLOYED IN 28 DAYS</td>
                    <td className="p-2.5 text-right font-mono text-sm">$3,500 TOTAL</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 text-[10px] text-muted flex flex-wrap gap-4 justify-between">
              <span>• 30-Day Money Back Guarantee: 100% refund on setup fee if zero replies received.</span>
              <span>• Domain Ownership: Client retains full ownership of all domains and mailboxes.</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
