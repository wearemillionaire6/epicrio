'use client'

import { motion } from 'framer-motion'
import { Check, Compass, Cpu, GitBranch, Gauge, Sparkles, ArrowRight } from 'lucide-react'

const steps = [
  {
    step: '01',
    title: 'Deep Systems Audit & Blueprint',
    desc: 'We examine your entire operations: every SaaS subscription, spreadsheet, customer touchpoint, and manual bottleneck. We deliver a comprehensive architectural schematic of your ideal connected stack.',
    timeline: 'Week 1',
    deliverables: ['Bottleneck analysis report', 'End-to-end data flow schematic', 'ROI & timeline forecast'],
    icon: Compass
  },
  {
    step: '02',
    title: 'Rapid Engineering Sprint',
    desc: 'We build your CRM, webhooks, voice receptionist, and autonomous workflows in modular sandboxes. You get weekly video walk-throughs and staging access to test every piece before live deployment.',
    timeline: 'Weeks 2-3',
    deliverables: ['Custom CRM schema', 'Autonomous webhook pipelines', 'Voice agent persona prompt engineering'],
    icon: Cpu
  },
  {
    step: '03',
    title: 'Failover Testing & Full Sync',
    desc: 'We rigorously stress-test edge cases: missed calls, concurrent webhook bursts, data validation, and CRM error fallbacks. Nothing goes live until it is bulletproof.',
    timeline: 'Week 4',
    deliverables: ['Simulated load testing', 'Staff video training docs', 'Production zero-downtime cutover'],
    icon: GitBranch
  },
  {
    step: '04',
    title: 'Continuous Telemetry & Scaling',
    desc: 'Your business evolves, and so does your technology. We maintain ongoing telemetry, error-monitoring alerts, and proactive feature enhancements so your systems never lag behind your growth.',
    timeline: 'Ongoing',
    deliverables: ['24/7 uptime monitoring', 'Monthly workflow upgrades', 'Dedicated Slack engineer channel'],
    icon: Gauge
  }
]

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="py-28 bg-background relative border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gray-800 bg-surface/60 text-xs font-mono text-primary mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE METHODOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            How We Engineer Your Systems
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            A battle-tested 4-phase agile delivery framework designed to deploy enterprise-grade infrastructure in under 30 days.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-glass-panel border border-gray-800 hover:border-gray-700 rounded-3xl p-8 backdrop-blur-xl relative flex flex-col justify-between group hover:shadow-[0_10px_30px_rgba(16,185,129,0.08)] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-surface border border-gray-700 flex items-center justify-center text-primary group-hover:border-primary/50 transition-colors">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                      {s.timeline}
                    </span>
                    <span className="text-2xl font-mono font-bold text-gray-700 group-hover:text-gray-500 transition-colors">
                      {s.step}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {s.desc}
                </p>
              </div>

              <div className="border-t border-gray-800/80 pt-5 mt-2">
                <span className="text-xs uppercase font-mono text-gray-500 tracking-wider block mb-3">Key Deliverables</span>
                <div className="space-y-2">
                  {s.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
