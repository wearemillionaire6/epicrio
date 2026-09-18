'use client'

import { ArrowUpRight } from 'lucide-react'

const verticals = [
  {
    title: 'Legal & Law Firms',
    metric: '+48% Retainers Signed',
    friction: 'High-value inquiries calling after-hours or bouncing due to slow intake questionnaires.',
    solution: 'Voice AI answers intake calls 24/7, executes conflict screening, and schedules senior partner consultations directly.',
  },
  {
    title: 'Medical & Dental Practices',
    metric: '-62% Patient No-Shows',
    friction: 'Front-desk staff inundated with routine calls, leading to abandoned inquiries and costly schedule gaps.',
    solution: 'Automated 2-way SMS and voice confirmations, emergency triage routing, and self-service calendar reschedule flows.',
  },
  {
    title: 'Commercial Real Estate',
    metric: '10x Speed-to-Lead',
    friction: 'Buyer and tenant inquiries taking hours to receive spec sheets, losing deals to faster competitors.',
    solution: 'Sub-60 second lead qualification, automated property collateral delivery via WhatsApp, and instant tour booking.',
  },
  {
    title: 'B2B Tech & Advisory',
    metric: '3.4x Sales Velocity',
    friction: 'Manual demo qualification, fragmented customer records between Slack/Stripe/HubSpot, and delayed contracts.',
    solution: 'Real-time webhook routing, instant Calendly/Cal.com sync, automatic Stripe billing hooks, and onboarding portals.',
  },
  {
    title: 'Commercial Field Services',
    metric: '15+ Hours Saved / PM',
    friction: 'Project managers bogged down by manual quote follow-ups, paper dispatches, and delayed customer updates.',
    solution: 'Automated quote generators, instant SMS field technician dispatch, and automated post-service review capture.',
  },
  {
    title: 'Wealth & Asset Management',
    metric: '100% KYC Audit Trail',
    friction: 'Cumbersome onboarding paperwork, regulatory compliance delays, and manual document collection.',
    solution: 'Secure digital client intake, automated verification reminders, and real-time CRM document synchronization.',
  },
]

export default function Industries() {
  return (
    <section id="industries" className="py-28 bg-[#070B14] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-white/[0.1] text-xs font-mono text-primary mb-4">
            <span>VERTICAL BLUEPRINTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-display mb-4">
            Proven architectures by sector.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            We do not deploy generic software. Every pipeline is engineered around the regulatory, compliance, and sales mechanics of your vertical.
          </p>
        </div>

        {/* Verticals Ledger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verticals.map((v) => (
            <div
              key={v.title}
              className="bg-[#0A0F1D] border border-white/[0.08] hover:border-white/[0.16] rounded-xl p-7 flex flex-col justify-between transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
                  <h3 className="text-lg font-bold text-white font-display">
                    {v.title}
                  </h3>
                  <span className="font-mono text-xs text-primary bg-primary/10 px-2.5 py-0.5 rounded border border-primary/20">
                    {v.metric}
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 block mb-1">
                      Friction
                    </span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {v.friction}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-primary block mb-1">
                      Engineered Solution
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {v.solution}
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="#lead-form"
                className="pt-4 border-t border-white/[0.06] text-xs font-mono text-slate-400 group-hover:text-primary flex items-center justify-between transition-colors uppercase tracking-wider"
              >
                <span>Request Blueprint</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
