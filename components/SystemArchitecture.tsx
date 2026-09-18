'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, MessageSquare, Users, Phone, BarChart3, Terminal, CheckCircle2, ArrowRight } from 'lucide-react'

interface NodeItem {
  id: string
  title: string
  label: string
  protocol: string
  role: string
  stack: string
  icon: React.ComponentType<{ className?: string }>
}

const architectureNodes: NodeItem[] = [
  {
    id: 'capture',
    title: 'Website & Enquiries',
    label: 'NODE 01',
    protocol: 'HTTP/2 REST API // Edge',
    role: 'Captures and enriches lead data from form submissions in <100ms.',
    stack: 'Next.js 15 • Cloudflare Workers • Clay Enriched',
    icon: Zap,
  },
  {
    id: 'voice',
    title: 'AI Voice Receptionist',
    label: 'NODE 02',
    protocol: 'SIP Trunking // WebRTC',
    role: 'Answers calls in <300ms, screens intent, and schedules consultations.',
    stack: 'Vapi.ai • Twilio SIP • Deepgram Nova-2',
    icon: Phone,
  },
  {
    id: 'crm',
    title: 'Central CRM Fabric',
    label: 'CORE HUB',
    protocol: 'Bi-directional Realtime Sync',
    role: 'Single source of truth for deal stages, contacts, and custom field sync.',
    stack: 'HubSpot • GoHighLevel • Salesforce • Twenty CRM',
    icon: Users,
  },
  {
    id: 'messaging',
    title: 'WhatsApp & Omnichannel',
    label: 'NODE 03',
    protocol: 'WhatsApp Business Cloud API',
    role: 'Instant booking confirmations, reminders, and 2-way conversation threads.',
    stack: 'Meta Cloud API • Twilio Messaging Service',
    icon: MessageSquare,
  },
  {
    id: 'ops',
    title: 'Autonomous Workflows',
    label: 'NODE 04',
    protocol: 'Stateful Queue & DLQ Replay',
    role: 'Executes back-office work: contract dispatch, invoicing, and team alerts.',
    stack: 'n8n Self-Hosted • Python Workers • Stripe API',
    icon: BarChart3,
  },
]

export default function SystemArchitecture() {
  const [activeNode, setActiveNode] = useState<NodeItem>(architectureNodes[2])

  return (
    <section id="architecture" className="py-28 bg-[#060913] border-b border-white/[0.08] relative overflow-hidden">
      {/* Background glow field */}
      <div className="glow-spot top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/[0.06]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0B1120] border border-white/[0.1] text-xs font-mono text-primary mb-4">
            <span>ARCHITECTURE FABRIC // § 13</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-display mb-4">
            One connected technology infrastructure.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-sans">
            Your business runs on too many isolated tools. We engineer low-latency event conduits that synchronize your entire stack in real time.
          </p>
        </div>

        {/* Interactive Visual Network + Telemetry Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Visual Network Grid (Left: 7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            {architectureNodes.map((node) => {
              const isSelected = activeNode.id === node.id
              const isCore = node.id === 'crm'
              const Icon = node.icon

              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#0E172A] border-primary shadow-[0_0_30px_rgba(16,185,129,0.15)]'
                      : isCore
                      ? 'bg-[#0B1222] border-emerald-500/30 hover:border-emerald-500/50'
                      : 'bg-[#0A0F1D] border-white/[0.08] hover:border-white/[0.16] hover:bg-[#0D1424]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                        isSelected ? 'bg-primary text-[#060913] border-primary' : 'bg-[#10192D] text-primary border-white/[0.08]'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-primary font-bold">{node.label}</span>
                          {isCore && (
                            <span className="text-[10px] font-mono uppercase bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20">
                              Single Source of Truth
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-white font-display">
                          {node.title}
                        </h3>
                      </div>
                    </div>

                    <span className="font-mono text-[11px] text-slate-400 bg-black/40 px-2.5 py-1 rounded-md border border-white/[0.06]">
                      {node.protocol}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 pl-12 mb-3">
                    {node.role}
                  </p>

                  <div className="font-mono text-[11px] text-slate-500 pl-12 flex items-center gap-2">
                    <span className="text-slate-600 font-bold uppercase">Stack:</span>
                    <span className="text-slate-300">{node.stack}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Conduit Inspector HUD (Right: 5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="glass-surface border border-white/[0.12] rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
                <div className="flex items-center gap-2 text-white font-mono text-xs font-bold uppercase">
                  <Terminal className="w-4 h-4 text-primary" />
                  <span>Conduit Telemetry Inspector</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-primary bg-primary/10 px-2.5 py-0.5 rounded border border-primary/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span>200 OK</span>
                </div>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <span className="text-slate-500 uppercase text-[10px] tracking-wider block mb-1">Inspecting Component</span>
                  <div className="text-sm font-bold text-white font-display">
                    {activeNode.title}
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 uppercase text-[10px] tracking-wider block mb-1">Active Network Protocol</span>
                  <div className="text-primary text-xs bg-black/50 p-2.5 rounded-lg border border-white/[0.08]">
                    {activeNode.protocol}
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 uppercase text-[10px] tracking-wider block mb-1">Live Event Payload Schema</span>
                  <pre className="bg-[#060913] p-3.5 rounded-xl border border-white/[0.08] text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
{`{
  "node_id": "${activeNode.id}",
  "sync_state": "SYNCHRONIZED",
  "latency_ms": 118,
  "telemetry": {
    "engine": "${activeNode.stack.split('•')[0].trim()}",
    "retries": 0,
    "dlq_status": "healthy"
  }
}`}
                  </pre>
                </div>

                <div className="pt-3 text-[11px] text-slate-400 border-t border-white/[0.08] leading-relaxed">
                  Every pipeline includes bidirectional event validation, automatic dead-letter queue (DLQ) retry mechanisms, and instant Slack notifications upon anomalies.
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
