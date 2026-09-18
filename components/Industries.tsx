'use client'

import { motion } from 'framer-motion'
import { Scale, HeartPulse, Building2, Laptop, Hammer, Landmark, ArrowUpRight } from 'lucide-react'

const industries = [
  {
    icon: Scale,
    title: 'Legal & Law Firms',
    pain: 'Losing high-value retainer clients who call after hours or drop out during cumbersome intake forms.',
    solution: 'Voice AI answers every intake call 24/7, screens conflict-of-interest questions, and schedules consultations directly with senior attorneys.',
    stat: '+48% More Retainers Signed',
  },
  {
    icon: HeartPulse,
    title: 'Healthcare & Medical Practices',
    pain: 'Overwhelmed front desk staff, high patient no-show rates, and delayed appointment rescheduling.',
    solution: 'Automated SMS/Voice appointment confirmations, instant reschedule links, and smart triage that frees clinical staff to care for patients.',
    stat: '-62% Drop in No-Shows',
  },
  {
    icon: Building2,
    title: 'Real Estate & Development',
    pain: 'High lead acquisition costs wasted when buyer inquiries go unanswered for longer than 5 minutes.',
    solution: 'Sub-60 second lead qualification, automated property spec sheet delivery via WhatsApp, and live calendar booking for open houses.',
    stat: '10x Speed-to-Lead Response',
  },
  {
    icon: Laptop,
    title: 'B2B SaaS & Agencies',
    pain: 'Disjointed sales pipelines, manual demo booking friction, and slow contract turnaround.',
    solution: 'Enriched inbound form routing, automatic Slack team alerts, Stripe payment webhook triggers, and automated onboarding portals.',
    stat: '3.4x Faster Sales Velocity',
  },
  {
    icon: Hammer,
    title: 'Commercial Construction & Field Services',
    pain: 'Field teams tied up doing paperwork, lost emergency bids, and slow contractor dispatching.',
    solution: 'Instant quote generator bots, automated job dispatch notifications to crews, and post-service review generation.',
    stat: '15+ Hours Saved / Week per PM',
  },
  {
    icon: Landmark,
    title: 'Private Wealth & Advisory',
    pain: 'Tedious KYC onboarding, compliance document collection delays, and fragmented client reporting.',
    solution: 'Secure digital intake portals, automated compliance reminders, and real-time CRM document synchronization.',
    stat: '100% Onboarding Compliance',
  },
]

export default function Industries() {
  return (
    <section id="industries" className="py-28 bg-background relative border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gray-800 bg-surface/60 text-xs font-mono text-primary mb-4">
            <span>VERTICAL SPECIALIZATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Engineered for High-Stakes Industries
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            We don't do generic workflows. We deploy battle-tested automation architectures tailored to the compliance, regulatory, and sales nuances of your sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="bg-glass-panel border border-gray-800 hover:border-primary/40 rounded-2xl p-7 backdrop-blur-xl flex flex-col justify-between group hover:shadow-[0_10px_30px_rgba(16,185,129,0.1)] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-surface border border-gray-800 group-hover:border-primary/30 flex items-center justify-center text-primary transition-colors">
                    <ind.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                    {ind.stat}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {ind.title}
                </h3>

                <div className="space-y-3 mb-6">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400/90 font-semibold block mb-0.5">
                      The Friction
                    </span>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {ind.pain}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold block mb-0.5">
                      The Engineered Solution
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {ind.solution}
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="#lead-form"
                className="pt-4 border-t border-gray-800/80 text-xs font-semibold text-gray-300 group-hover:text-primary flex items-center justify-between transition-colors"
              >
                <span>View Architecture Blueprint</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
