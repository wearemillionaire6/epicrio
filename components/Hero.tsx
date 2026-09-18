'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Terminal, Cpu, Sparkles, Activity } from 'lucide-react'

// 3x4 Flickering Pixel Grid component from portfolio-agency-web
function PixelGrid() {
  return (
    <div className="hidden xl:grid grid-cols-4 gap-1 p-2 bg-[#0B1120]/40 border border-white/[0.06] rounded-md pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.15, 0.7, 0.2] }}
          transition={{
            duration: 1.8 + (i % 4) * 0.4,
            repeat: Infinity,
            delay: (i * 0.15) % 1.2,
          }}
          className={`w-1.5 h-1.5 rounded-[1px] ${i % 3 === 0 ? 'bg-primary' : 'bg-slate-600'}`}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] flex flex-col justify-center bg-[#060913] pt-32 pb-20 border-b border-white/[0.08] overflow-hidden">
      {/* Ambient Lighting Field */}
      <div className="glow-spot top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/[0.08]" />
      <div className="glow-spot top-1/3 right-1/4 w-[350px] h-[300px] bg-emerald-500/[0.05]" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Top telemetry bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0B1120] border border-white/[0.12] text-xs font-mono text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>AUTONOMOUS BUSINESS INFRASTRUCTURE // v2.4</span>
          </div>

          <PixelGrid />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          {/* Main Headline Column */}
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-8 font-display">
              We engineer the systems <br />
              <span className="font-serif-italic font-normal text-emerald-400">
                behind modern business.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10 font-sans">
              Central CRM pipelines. Sub-300ms conversational voice agents. Self-healing integrations. One unified technology infrastructure engineered around the way your company actually scales.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#lead-form"
                className="px-6 py-4 bg-primary hover:bg-primaryHover text-[#060913] font-bold rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.45)] active:scale-95"
              >
                <span>Request Systems Audit</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#architecture"
                className="px-6 py-4 bg-[#0B1120] hover:bg-[#10182C] text-slate-200 border border-white/[0.12] hover:border-emerald-500/40 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Explore Stack Architecture</span>
              </a>
            </div>
          </div>

          {/* Right Column: Live Telemetry HUD */}
          <div className="lg:col-span-4">
            <div className="glass-surface border border-white/[0.12] rounded-2xl p-6 font-mono text-xs text-slate-300 relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08] mb-4">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Terminal className="w-4 h-4 text-primary" />
                  <span>runtime.telemetry</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-primary bg-primary/10 px-2.5 py-0.5 rounded border border-primary/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span>SYNCHRONIZED</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                  <span className="text-slate-500">Inbound Lead Routing:</span>
                  <span className="text-white font-medium">&lt; 85ms</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                  <span className="text-slate-500">Voice Synthesis Latency:</span>
                  <span className="text-white font-medium">264ms SIP TTFT</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                  <span className="text-slate-500">Webhook Pipeline Reliability:</span>
                  <span className="text-emerald-400 font-medium">99.98% Zero-Loss</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Orchestrator Stack:</span>
                  <span className="text-slate-300 font-medium">Next.js • n8n • Vapi</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.08] text-[11px] text-slate-500 leading-normal">
                // Zero Zapier timeouts. Direct event webhooks with automatic dead-letter queue replay.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
