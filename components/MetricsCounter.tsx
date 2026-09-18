'use client'

import { motion } from 'framer-motion'

interface MetricCard {
  val: string
  label: string
  sub: string
  tag: string
}

const metrics: MetricCard[] = [
  {
    val: '$4.8M+',
    label: 'ANNUAL CAPITAL FLOW AUTOMATED',
    sub: 'REVENUE ROUTED VIA ZERO-LEAKAGE PIPELINES',
    tag: 'FINANCIAL',
  },
  {
    val: '<280MS',
    label: 'VOICE AGENT RESPONSE LATENCY',
    sub: 'DEEPGRAM NOVA-2 + CARTESIA ULTRA-FAST TTFT',
    tag: 'TELEPHONY',
  },
  {
    val: '99.98%',
    label: 'EXECUTION RELIABILITY SLA',
    sub: 'EXPONENTIAL RETRIES & DEAD-LETTER QUEUES',
    tag: 'RESILIENCE',
  },
  {
    val: '30 DAYS',
    label: 'PRODUCTION CUTOVER TIMELINE',
    sub: 'FROM ARCHITECTURE AUDIT TO FULL LIVE ROLLOUT',
    tag: 'DELIVERY',
  },
]

export default function MetricsCounter() {
  return (
    <section className="py-16 border-b border-[#222222] font-mono">
      <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#222222]">
        <div className="text-primary text-xs uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-primary inline-block" />
          <span>[SYSTEM_BENCHMARKS // DETERMINISTIC SLA]</span>
        </div>
        <div className="text-[11px] text-muted hidden sm:block">
          AUDITED PRODUCTION METRICS
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className="p-5 border border-[#222222] bg-[#070707] hover:border-primary/60 transition-colors group relative overflow-hidden"
          >
            {/* Top Tag */}
            <div className="flex items-center justify-between text-[10px] mb-3">
              <span className="text-muted tracking-wider">[{m.tag}]</span>
              <span className="text-primary text-[8px] opacity-70 group-hover:opacity-100">
                0{i + 1}
              </span>
            </div>

            {/* Big Pixel Number */}
            <div className="font-pixel text-2xl sm:text-3xl lg:text-4xl text-white font-bold tracking-wider mb-2 group-hover:text-primary transition-colors">
              {m.val}
            </div>

            {/* Title */}
            <div className="text-xs font-bold text-slate-200 tracking-wide mb-1 leading-snug">
              {m.label}
            </div>

            {/* Subtext */}
            <div className="text-[10px] text-muted leading-relaxed">
              {m.sub}
            </div>

            {/* Subtle bottom edge scanner accent */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/20 group-hover:bg-primary transition-colors" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
