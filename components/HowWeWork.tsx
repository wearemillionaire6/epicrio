'use client'

import { Compass, Cpu, GitBranch, Gauge, ArrowRight } from 'lucide-react'

const phases = [
  {
    step: '01',
    timeline: 'WEEK 01',
    title: 'Systems Audit & Architecture Blueprint',
    desc: 'We map every tool, spreadsheet, team handoff, and API endpoint in your company. We identify failure points and deliver an immutable technical schematic of your unified stack.',
    deliverables: ['Bottleneck failure analysis', 'Data-flow schema & ERD', 'Sprint backlog & milestones'],
  },
  {
    step: '02',
    timeline: 'WEEKS 02–03',
    title: 'Rapid Engineering Sprint',
    desc: 'We build your CRM pipelines, voice receptionists, webhook conduits, and custom integrations in staged environments. You receive private staging access and loom walkthroughs at every milestone.',
    deliverables: ['Custom CRM schema configuration', 'Sub-300ms voice agent prompt engineering', 'Self-healing error retry queues'],
  },
  {
    step: '03',
    timeline: 'WEEK 04',
    title: 'Stress Testing & Production Cutover',
    desc: 'We simulate load bursts: simultaneous incoming calls, webhook spikes, and edge-case exceptions. Once verified, we execute zero-downtime production cutover and train your core staff.',
    deliverables: ['Simulated load testing report', 'Staff operations playbook', 'Zero-downtime live cutover'],
  },
  {
    step: '04',
    timeline: 'CONTINUOUS',
    title: 'Telemetry & Autonomous Scaling',
    desc: 'Your business scales and your systems adapt. We provide ongoing uptime monitoring, latency tracking, monthly workflow upgrades, and a dedicated Slack channel with our engineering team.',
    deliverables: ['24/7 uptime & DLQ alerts', 'Monthly workflow capability expansions', 'Direct engineer Slack access'],
  },
]

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="py-28 bg-[#070B14] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-white/[0.1] text-xs font-mono text-primary mb-4">
            <span>METHODOLOGY // 4-STAGE SPRINT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-display mb-4">
            How we engineer your operating system.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            A rigorous engineering methodology designed to transition your business from fragmented tools to an autonomous stack in 30 days.
          </p>
        </div>

        {/* 4 Phases Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {phases.map((p) => (
            <div
              key={p.step}
              className="bg-[#0A0F1D] border border-white/[0.08] hover:border-white/[0.16] rounded-xl p-8 flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.06]">
                  <span className="font-mono text-xs text-primary bg-primary/10 px-2.5 py-1 rounded border border-primary/20">
                    {p.timeline}
                  </span>
                  <span className="font-mono text-2xl font-bold text-slate-700">
                    {p.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white font-display mb-3">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {p.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-2">
                  Sprint Deliverables
                </span>
                {p.deliverables.map((d, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
