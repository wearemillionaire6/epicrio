'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, MessageSquare, Users, Phone, BarChart3, ArrowRight, CheckCircle2, Terminal } from 'lucide-react'

interface ArchitectureNode {
  id: string
  title: string
  protocol: string
  role: string
  tools: string
}

const nodes: ArchitectureNode[] = [
  {
    id: 'capture',
    title: 'Inbound Enquiries & Web',
    protocol: 'HTTP/2 REST API',
    role: 'Captures and enriches lead data from form submissions in <100ms.',
    tools: 'Next.js 15 • Cloudflare Edge • Clay Enriched',
  },
  {
    id: 'voice',
    title: 'AI Voice Receptionist',
    protocol: 'SIP Trunking // WebRTC',
    role: 'Answers phone calls in <300ms, qualifies intent, and schedules consultations.',
    tools: 'Vapi.ai • Twilio SIP • Deepgram Nova-2',
  },
  {
    id: 'messaging',
    title: 'Omnichannel WhatsApp & SMS',
    protocol: 'WhatsApp Business Cloud API',
    role: 'Instant booking confirmations, reminders, and 2-way conversation threads.',
    tools: 'Meta Cloud API • Twilio Messaging Service',
  },
  {
    id: 'crm',
    title: 'Central CRM Fabric',
    protocol: 'Bi-directional Realtime Webhook',
    role: 'Single source of truth for deal pipelines, contacts, and custom field sync.',
    tools: 'HubSpot • GoHighLevel • Salesforce',
  },
  {
    id: 'ops',
    title: 'Operations & Autonomous Workflows',
    protocol: 'Stateful Queue & DLQ Replay',
    role: 'Executes back-office work: contract generation, invoicing, and team alerts.',
    tools: 'n8n Self-Hosted • Python Workers • Stripe API',
  },
]

export default function SystemArchitecture() {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(nodes[3])

  return (
    <section id="architecture" className="py-28 bg-[#070B14] border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-white/[0.1] text-xs font-mono text-primary mb-4">
            <span>ARCHITECTURE // § 13</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-display mb-4">
            One connected technology infrastructure.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Your organization runs on too many isolated tools. We engineer low-latency event conduits that synchronize your entire stack in real time.
          </p>
        </div>

        {/* Interactive Architecture Schema */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Node Ledger (Left side: 7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            {nodes.map((n, idx) => {
              const isSelected = selectedNode.id === n.id
              return (
                <div
                  key={n.id}
                  onClick={() => setSelectedNode(n)}
                  className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0D1424] border-primary shadow-[0_0_20px_rgba(16,185,129,0.12)]'
                      : 'bg-[#0A0F1D] border-white/[0.08] hover:border-white/[0.18] hover:bg-[#0D1424]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-primary font-bold">
                        0{idx + 1}
                      </span>
                      <h3 className="text-base font-semibold text-white font-display">
                        {n.title}
                      </h3>
                    </div>
                    <span className="font-mono text-[11px] text-slate-400 bg-black/40 px-2.5 py-0.5 rounded border border-white/[0.06]">
                      {n.protocol}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-3 pl-7">
                    {n.role}
                  </p>

                  <div className="font-mono text-[11px] text-slate-500 pl-7 flex items-center gap-2">
                    <span className="text-slate-600 font-semibold">STACK:</span>
                    <span>{n.tools}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Interactive Inspection Console (Right side: 5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-[#0D1424] border border-white/[0.12] rounded-xl p-6 font-mono text-xs">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] text-slate-300 mb-4">
                <span className="flex items-center gap-2 font-bold text-white uppercase tracking-wider">
                  <Terminal className="w-4 h-4 text-primary" />
                  <span>Conduit Inspector</span>
                </span>
                <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded">
                  200 OK
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-slate-500 uppercase tracking-wider text-[10px] block mb-1">Target Component</span>
                  <div className="text-sm font-semibold text-white font-display">
                    {selectedNode.title}
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 uppercase tracking-wider text-[10px] block mb-1">Active Protocol</span>
                  <div className="text-primary text-xs bg-black/50 p-2 rounded border border-white/[0.08]">
                    {selectedNode.protocol}
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 uppercase tracking-wider text-[10px] block mb-1">Live Payload Schema</span>
                  <pre className="bg-[#070B14] p-3 rounded-lg border border-white/[0.08] text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
{`{
  "system_id": "${selectedNode.id}",
  "sync_state": "SYNCHRONIZED",
  "latency_ms": 142,
  "telemetry": {
    "engine": "${selectedNode.tools.split('•')[0].trim()}",
    "retries": 0,
    "integrity": "verified"
  }
}`}
                  </pre>
                </div>

                <div className="pt-2 text-[11px] text-slate-400 border-t border-white/[0.08] leading-relaxed">
                  Every pipeline includes automatic retry logic, Dead-Letter-Queues (DLQ), and Slack alerting on abnormal failure rates.
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
