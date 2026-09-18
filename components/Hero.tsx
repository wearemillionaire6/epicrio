'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Terminal } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[86vh] flex flex-col justify-center bg-[#070B14] pt-32 pb-20 border-b border-white/[0.08] overflow-hidden">
      {/* Subtle architectural hairline grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }} 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          
          {/* Main Editorial Column */}
          <div className="lg:col-span-8">
            {/* Eyebrow badge in DM Mono */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-white/[0.1] text-primary text-xs font-mono mb-8">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>SYSTEM ARCHITECTURE FOR AUTONOMOUS BUSINESS</span>
            </div>

            {/* Solid High-Contrast Headline (Bricolage Grotesque) — NO GRADIENTS */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-8 font-display">
              We engineer the systems behind modern business.
            </h1>

            {/* Manrope subhead */}
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10">
              CRM architecture, sub-300ms voice agents, and self-healing workflow pipelines. One unified infrastructure engineered around the way your company actually scales.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#lead-form"
                className="px-6 py-3.5 bg-primary hover:bg-primaryHover text-[#070B14] font-semibold rounded-lg text-sm transition-all duration-150 flex items-center justify-center gap-2 font-mono uppercase tracking-wider"
              >
                <span>Request Systems Audit</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#architecture"
                className="px-6 py-3.5 bg-[#0D1424] hover:bg-[#131C31] text-slate-200 border border-white/[0.12] rounded-lg text-sm transition-all duration-150 flex items-center justify-center gap-2 font-mono uppercase tracking-wider"
              >
                <span>Inspect Stack Architecture</span>
              </a>
            </div>
          </div>

          {/* Technical Telemetry Panel (Right Side, Asymmetric) */}
          <div className="lg:col-span-4">
            <div className="bg-[#0D1424] border border-white/[0.1] rounded-xl p-6 font-mono text-xs text-slate-400 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-slate-300">
                <span className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-primary" />
                  <span>runtime.telemetry</span>
                </span>
                <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                  LIVE
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Inbound Routing:</span>
                  <span className="text-white font-medium">&lt; 85ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Voice Synthesis:</span>
                  <span className="text-white font-medium">280ms SIP TTFT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Sync Reliability:</span>
                  <span className="text-white font-medium">99.98% zero-loss</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Primary Core:</span>
                  <span className="text-primary font-medium">Next.js • n8n • Vapi</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.08] text-[11px] text-slate-500 leading-normal">
                // Zero Zapier timeouts. Direct event webhooks with automatic DLQ replay.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
