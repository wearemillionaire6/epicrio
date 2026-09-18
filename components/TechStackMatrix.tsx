'use client'

import { useState } from 'react'
import { sound } from '@/lib/sound'

interface TechTool {
  name: string
  category: 'AI & VOICE' | 'ORCHESTRATION' | 'DATA & STORAGE' | 'INFRASTRUCTURE'
  role: string
  sla: string
  spec: string
}

const tools: TechTool[] = [
  {
    name: 'N8N CLUSTERS',
    category: 'ORCHESTRATION',
    role: 'Deterministic Workflow Engine',
    sla: '99.98% Uptime',
    spec: 'Self-hosted air-gapped runtimes for billing, contract generation, and multi-system synchronization.',
  },
  {
    name: 'CLAUDE 3.5 SONNET',
    category: 'AI & VOICE',
    role: 'Cognitive Reasoning Core',
    sla: '<500ms TTFT',
    spec: 'Evaluates structured JSON schemas, enforces compliance guidelines, and dispatches deterministic tool calls.',
  },
  {
    name: 'VAPI & TWILIO SIP',
    category: 'AI & VOICE',
    role: 'Conversational Telephony',
    sla: '<280ms Latency',
    spec: 'Direct carrier trunking with bi-directional audio streaming and instant calendar reservation.',
  },
  {
    name: 'SUPABASE & PGVECTOR',
    category: 'DATA & STORAGE',
    role: 'Knowledge Vector Store & Auth',
    sla: '99.99% Reliability',
    spec: 'Hybrid dense/sparse embedding retrieval paired with Postgres row-level security for enterprise data.',
  },
  {
    name: 'REDIS STREAMS',
    category: 'DATA & STORAGE',
    role: 'Event Buffer & Priority Queues',
    sla: '100k events/sec',
    spec: 'Sub-millisecond job broker isolating webhooks from downstream rate limits and network spikes.',
  },
  {
    name: 'DEEPGRAM NOVA-2',
    category: 'AI & VOICE',
    role: 'Live Audio Transcription',
    sla: '<180ms STT',
    spec: 'Domain-tuned speech recognition capable of transcribing complex medical, legal, and HVAC terminology.',
  },
  {
    name: 'HUBSPOT & SFDC APIS',
    category: 'ORCHESTRATION',
    role: 'Enterprise Revenue Sync',
    sla: 'Real-time REST',
    spec: 'Zero-loss attribution and lead routing with automatic field normalization and deduplication.',
  },
  {
    name: 'DOCKER ON HARDENED LINUX',
    category: 'INFRASTRUCTURE',
    role: 'Isolated Execution Pods',
    sla: 'Zero-Trust Architecture',
    spec: 'Containerized workloads running within your cloud perimeter with automatic health restarts.',
  },
]

export default function TechStackMatrix() {
  const [selectedCat, setSelectedCat] = useState<string>('ALL')

  const categories = ['ALL', 'AI & VOICE', 'ORCHESTRATION', 'DATA & STORAGE', 'INFRASTRUCTURE']

  const filteredTools =
    selectedCat === 'ALL'
      ? tools
      : tools.filter((t) => t.category === selectedCat)

  return (
    <section className="py-20 border-b border-[#222222] font-mono">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#222222] gap-4">
        <div>
          <div className="text-primary text-xs tracking-widest uppercase mb-1 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary" />
            <span>[ENTERPRISE_STACK // AUDITED INFRASTRUCTURE]</span>
          </div>
          <h2 className="font-pixel text-3xl sm:text-5xl text-white tracking-widest">
            TECH STACK
          </h2>
        </div>
        <div className="text-right text-xs text-muted">
          <span>8 HARDENED PROTOCOLS</span>
          <br />
          <span className="text-white">NO LOW-CODE SLOP • CODE-FIRST DETERMINISM</span>
        </div>
      </div>

      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => {
          const isActive = selectedCat === cat
          return (
            <button
              key={cat}
              onClick={() => {
                sound.click()
                setSelectedCat(cat)
              }}
              className={`px-3 py-1.5 text-xs font-bold border transition-colors cursor-pointer ${
                isActive
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-[#333333] text-muted hover:border-white hover:text-white'
              }`}
            >
              [{cat}]
            </button>
          )
        })}
      </div>

      {/* Tech Stack Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {filteredTools.map((tool) => (
          <div
            key={tool.name}
            className="p-4 border border-[#222222] bg-[#070707] hover:border-primary/50 transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-[9px] mb-2">
                <span className="text-primary font-bold">{tool.category}</span>
                <span className="text-muted border border-[#333333] px-1 py-0.2">
                  {tool.sla}
                </span>
              </div>
              <h4 className="font-bold text-sm text-white tracking-wide mb-1 group-hover:text-primary transition-colors">
                {tool.name}
              </h4>
              <div className="text-[10px] text-slate-300 font-bold mb-2">
                {tool.role}
              </div>
              <p className="text-[11px] text-muted leading-relaxed">
                {tool.spec}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-[#1a1a1a] flex items-center justify-between text-[9px] text-[#555555]">
              <span>DEPLOYED & TESTED</span>
              <span className="text-primary">VERIFIED ■</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
