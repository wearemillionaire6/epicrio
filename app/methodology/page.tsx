'use client'

import Link from 'next/link'
import CustomCursor from '@/components/CustomCursor'

const sprintPhases = [
  {
    week: 'WEEK 01',
    phase: 'STAGE 01 // AUDIT, METRIC DIAGNOSTICS & SYSTEM SCHEMATIC',
    focus: 'MAPPING THE FAILURE SURFACE',
    items: [
      'Comprehensive inventory of all active SaaS subscriptions, tools, spreadsheets, and manual handoffs.',
      'Analysis of lead loss points, inbound response lag, and rep administrative burden.',
      'Creation of full entity-relationship diagram (ERD) and webhook architecture schema.',
      'Definition of Sprint Milestones, SLA benchmarks, and staging sandbox isolation.'
    ],
    deliverable: 'IMMUTABLE ARCHITECTURE SCHEMATIC + EXECUTION BACKLOG'
  },
  {
    week: 'WEEKS 02–03',
    phase: 'STAGE 02 // MODULAR ENGINEERING & RECURSIVE BUILD SPRINT',
    focus: 'INFRASTRUCTURE CONSTRUCTION',
    items: [
      'Central CRM custom field schemas, deal pipelines, and automatic lead assignment rules.',
      'Sub-300ms conversational voice agent prompt engineering, SIP trunking, and tool-calling hooks.',
      'Deployment of self-hosted n8n / Python Celery workers with dead-letter queue (DLQ) automated replay.',
      'WhatsApp Business Cloud API integration for instant two-way messaging and calendar confirmations.'
    ],
    deliverable: 'FULLY CONFIGURED STAGING ENVIRONMENT WITH VIDEO WALKTHROUGHS'
  },
  {
    week: 'WEEK 04',
    phase: 'STAGE 03 // STRESS SIMULATION, INTEGRATION TESTING & CUTOVER',
    focus: 'BULLETPROOFING & ZERO-DOWNTIME LAUNCH',
    items: [
      'Simulated load bursts: concurrent inbound calls, webhook floods, and network drop recovery.',
      'Edge-case testing: invalid lead payloads, duplicate phone numbers, and time-zone routing.',
      'Staff operational training: video SOPs, exception handling guidelines, and admin dashboard access.',
      'Seamless production cutover with zero downtime on live lead channels.'
    ],
    deliverable: 'PRODUCTION DEPLOYMENT + STAFF TRAINING DOCUMENTATION'
  },
  {
    week: 'CONTINUOUS',
    phase: 'STAGE 04 // REAL-TIME TELEMETRY & AUTONOMOUS SCALING',
    focus: 'ONGOING RELIABILITY & EXPANSION',
    items: [
      '24/7 automated telemetry monitoring for API rate-limit alerts, webhook failures, and DLQ spikes.',
      'Monthly architectural sprint to expand capabilities as your business launches new service lines.',
      'Direct Slack channel access to senior systems architects for real-time adjustments.',
      'Quarterly review of software cost optimization to eliminate redundant SaaS subscriptions.'
    ],
    deliverable: '99.98% UPTIME GUARANTEE + PROACTIVE MONTHLY UPGRADES'
  }
]

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black font-mono">
      <CustomCursor />

      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-8 border-b border-[#222222] mb-12">
          <Link href="/" className="font-pixel text-xl sm:text-2xl text-white hover:text-primary transition-colors">
            AGENCY CO // METHODOLOGY
          </Link>
          <Link
            href="/"
            className="border border-[#333333] hover:border-white px-3 py-1 text-xs text-muted hover:text-white transition-colors"
          >
            [ ^H BACK TO HOME ]
          </Link>
        </div>

        {/* Hero */}
        <div className="mb-14 space-y-4">
          <div className="text-muted text-xs">
            [/&gt; AGILE DELIVERY FRAMEWORK // 30-DAY PRODUCTION CUTOVER ]
          </div>
          <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-wider">
            HOW WE ENGINEER SYSTEMS
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
            A BATTLE-TESTED FOUR-STAGE SPRINT METHODOLOGY DESIGNED TO TAKE ENTERPRISES FROM DISCONNECTED CHAOS
            TO A UNIFIED, AUTONOMOUS OPERATING SYSTEM IN 30 DAYS.
          </p>
        </div>

        {/* Sprint Timeline List */}
        <div className="space-y-10">
          {sprintPhases.map((s, idx) => (
            <div key={idx} className="border border-[#222222] bg-[#0A0A0A] p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#222222] gap-2">
                <span className="font-pixel text-lg sm:text-xl text-white">
                  {s.phase}
                </span>
                <span className="text-primary font-bold text-xs bg-black px-3 py-1 border border-primary/30">
                  {s.week}
                </span>
              </div>

              <div className="text-[11px] text-muted font-bold">
                FOCUS: {s.focus}
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                {s.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-primary font-bold">_</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#222222] text-[11px]">
                <span className="text-muted uppercase">DELIVERABLE: </span>
                <span className="text-white font-bold">{s.deliverable}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 p-8 border border-[#333333] text-center space-y-4">
          <h3 className="font-pixel text-xl sm:text-2xl text-white">
            READY TO INITIATE STAGE 01?
          </h3>
          <p className="text-muted text-xs max-w-lg mx-auto">
            SCHEDULE A SYSTEM AUDIT TO BEGIN YOUR 30-DAY INFRASTRUCTURE SPRINT.
          </p>
          <div className="pt-2">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white hover:bg-white hover:text-black font-bold text-xs uppercase transition-colors"
            >
              <span>DISPATCH AUDIT REQUEST</span>
              <span className="text-primary text-[10px]">■</span>
              <span>-&gt;</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
