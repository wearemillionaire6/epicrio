'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Users, Zap, Database, Phone, BarChart3, Layers, CheckCircle2, ArrowRight } from 'lucide-react'

interface NodeProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  sublabel: string
  delay: number
  status?: string
}

const Node = ({ icon: Icon, label, sublabel, delay, status = 'ACTIVE' }: NodeProps) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="flex flex-col items-center gap-3 z-10 relative"
  >
    <div className="w-20 h-20 rounded-2xl bg-surface/90 border border-gray-700/80 hover:border-primary/60 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.08)] relative group transition-all duration-300 backdrop-blur-md">
      <div className="absolute inset-0 bg-primary/5 rounded-2xl group-hover:bg-primary/20 transition-colors" />
      <Icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" />
      
      {/* Live ping dot */}
      <span className="absolute top-2 right-2 flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
      </span>
    </div>
    
    <div className="text-center">
      <div className="text-sm font-semibold text-white tracking-wide">{label}</div>
      <div className="text-xs text-gray-400 font-mono mt-0.5">{sublabel}</div>
    </div>
  </motion.div>
)

export default function SystemArchitecture() {
  return (
    <section id="architecture" className="py-28 bg-background border-t border-gray-900 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gray-800 bg-surface/60 text-xs font-mono text-gray-300 mb-4">
            <Layers className="w-3.5 h-3.5 text-primary" />
            <span>UNIFIED SYSTEM FABRIC</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            One Technology Partner. <span className="text-primary">Your Entire Stack.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Your business has too many disconnected systems. We architect, integrate, and synchronize them into a single high-velocity operational pipeline.
          </p>
        </div>

        {/* Node Diagram Container */}
        <div className="relative max-w-4xl mx-auto py-8 px-4 rounded-3xl bg-surface/30 border border-gray-800/80 backdrop-blur-xl">
          
          {/* Animated Connecting Lines (Desktop/Tablet) */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
            {/* Vertical spine */}
            <div className="absolute top-16 bottom-16 left-1/2 w-0.5 bg-gradient-to-b from-primary/10 via-primary/60 to-primary/10 -translate-x-1/2">
              <div className="w-full h-16 bg-primary blur-sm animate-data-flow" />
            </div>

            {/* Horizontal crossbar */}
            <div className="absolute top-1/2 left-[18%] right-[18%] h-0.5 bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 -translate-y-1/2">
              <div className="h-full w-20 bg-primary blur-sm animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-20 relative">
            {/* Top Node */}
            <div className="md:col-span-3 flex justify-center">
              <Node icon={Zap} label="Website & Enquiries" sublabel="Instant Capture & Triage" delay={0.1} />
            </div>
            
            {/* Middle Row Nodes */}
            <div className="flex justify-center">
              <Node icon={MessageSquare} label="WhatsApp & Omnichannel" sublabel="Automated Chat Flows" delay={0.2} />
            </div>

            <div className="flex justify-center">
              <div className="relative p-1 rounded-3xl bg-gradient-to-b from-primary/40 to-transparent">
                <div className="p-3 bg-background/90 rounded-[22px]">
                  <Node icon={Users} label="Central CRM Fabric" sublabel="Single Source of Truth" delay={0.3} />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Node icon={Phone} label="AI Voice Receptionist" sublabel="Live 24/7 Voice Calling" delay={0.4} />
            </div>

            {/* Bottom Node */}
            <div className="md:col-span-3 flex justify-center">
              <Node icon={BarChart3} label="Operations & Realtime Analytics" sublabel="Autonomous Execution" delay={0.5} />
            </div>
          </div>

          {/* Architecture Feature Cards Footer */}
          <div className="mt-14 pt-8 border-t border-gray-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-xl bg-surface/50 border border-gray-800/50">
              <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Bi-Directional Sync
              </div>
              <p className="text-xs text-gray-400">Zero duplicate entries. Contacts, states, and telemetry update everywhere in &lt;1 second.</p>
            </div>
            <div className="p-4 rounded-xl bg-surface/50 border border-gray-800/50">
              <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Enterprise Webhooks
              </div>
              <p className="text-xs text-gray-400">Custom middleware connecting legacy SQL databases, Zapier/Make, and custom APIs.</p>
            </div>
            <div className="p-4 rounded-xl bg-surface/50 border border-gray-800/50">
              <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Self-Healing Logic
              </div>
              <p className="text-xs text-gray-400">Automated error recovery and fallback notifications ensure critical leads never slip away.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
