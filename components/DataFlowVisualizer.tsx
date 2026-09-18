'use client'

import { useState } from 'react'
import { sound } from '@/lib/sound'

interface ArchitectureNode {
  id: string
  name: string
  category: string
  latency: string
  throughput: string
  details: string
  protocols: string[]
}

const nodes: ArchitectureNode[] = [
  {
    id: 'ingest',
    name: '01 // INBOUND PROTOCOL INGESTION',
    category: 'ENTRY CONDUIT',
    latency: '12ms',
    throughput: '50,000 req/min',
    details: 'Validates HMAC signatures, performs SSL termination, and buffers events into durable Redis streams to protect downstream backends from traffic bursts.',
    protocols: ['Twilio SIP', 'HubSpot Webhook', 'Next.js API Routes', 'Stripe Signing Secret'],
  },
  {
    id: 'router',
    name: '02 // COGNITIVE TRIAGE & ROUTER',
    category: 'DECISION ENGINE',
    latency: '110ms',
    throughput: '3,200 ev/sec',
    details: 'Evaluates intent, customer tier, urgency, and data schemas to route events to either conversational telephony, vector RAG retrieval, or deterministic execution.',
    protocols: ['Claude 3.5 Sonnet', 'JSON Schema Validation', 'Priority Queue', 'Rule Engine'],
  },
  {
    id: 'rag',
    name: '03 // REGULATORY VECTOR RAG',
    category: 'KNOWLEDGE FABRIC',
    latency: '240ms',
    throughput: '850 QPS',
    details: 'Hybrid dense + sparse semantic search across proprietary SOPs, equipment specifications, legal precedents, and customer records with 0.00% hallucination verification.',
    protocols: ['pgvector', 'Hybrid BM25', 'Cohere Rerank', 'Supabase Postgres'],
  },
  {
    id: 'runtime',
    name: '04 // DETERMINISTIC RUNTIME (N8N)',
    category: 'EXECUTION CLUSTER',
    latency: '85ms',
    throughput: '12,000 jobs/hr',
    details: 'Self-hosted air-gapped n8n workers executing complex multi-step state machines with automated exponential backoff and dead-letter queue notifications in Slack.',
    protocols: ['Docker Cluster', 'PostgreSQL State Store', 'Redis Job Queue', 'Dead-Letter Bus'],
  },
  {
    id: 'destination',
    name: '05 // REVENUE LEDGER & DISPATCH',
    category: 'STATE COMMIT',
    latency: '60ms',
    throughput: 'Real-time Push',
    details: 'Two-way synchronized write to enterprise CRMs (HubSpot, Salesforce), calendar locks, SMS dispatches to field technicians, and automated Stripe billing reconciliation.',
    protocols: ['HubSpot v3 API', 'Salesforce REST', 'Twilio Messaging', 'Stripe Invoicing'],
  },
]

export default function DataFlowVisualizer() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('ingest')
  const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0]

  return (
    <section className="py-20 border-b border-[#222222] font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#222222] gap-4">
        <div>
          <div className="text-primary text-xs tracking-widest uppercase mb-1 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary" />
            <span>[DATA_PIPELINE // INTERACTIVE ARCHITECTURE TOPOLOGY]</span>
          </div>
          <h2 className="font-pixel text-3xl sm:text-5xl text-white tracking-widest">
            SYSTEM FABRIC
          </h2>
        </div>
        <div className="text-right text-xs text-muted">
          <span>EVENT-DRIVEN ARCHITECTURE</span>
          <br />
          <span className="text-white">CLICK ANY NODE TO INSPECT LIVE TELEMETRY</span>
        </div>
      </div>

      {/* Interactive Circuit Flow Visualizer */}
      <div className="border border-[#222222] bg-[#070707] p-6 mb-6">
        <div className="text-muted text-[10px] uppercase tracking-wider mb-4 flex items-center justify-between">
          <span>[END-TO-END AUTONOMOUS CIRCUIT]</span>
          <span className="text-primary text-[10px] animate-pulse">● TRANSMISSION ACTIVE</span>
        </div>

        {/* Node Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {nodes.map((node, i) => {
            const isSelected = selectedNodeId === node.id
            return (
              <button
                key={node.id}
                onClick={() => {
                  sound.click()
                  setSelectedNodeId(node.id)
                }}
                className={`p-3 border text-left transition-all cursor-pointer relative ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-white shadow-[0_0_12px_rgba(0,255,136,0.2)]'
                    : 'border-[#262626] bg-black text-muted hover:border-white hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between text-[9px] mb-1">
                  <span className="text-primary font-bold">NODE 0{i + 1}</span>
                  <span className="text-muted">{node.latency}</span>
                </div>
                <div className="font-bold text-xs text-white truncate">
                  {node.name.replace(/^0\d \/\/ /, '')}
                </div>
                <div className="text-[9px] text-[#777777] mt-1 uppercase">
                  {node.category}
                </div>

                {/* Arrow connector indicator */}
                {i < nodes.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-muted text-[10px]">
                    &gt;
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Selected Node Deep Dive Inspector */}
        <div className="p-5 bg-black border border-primary/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-[#222222] gap-2">
            <div>
              <span className="text-[10px] text-primary uppercase font-bold">
                [INSPECTOR CONSOLE] {activeNode.name}
              </span>
              <div className="text-xs text-muted">
                CATEGORY: <span className="text-white">{activeNode.category}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div>
                <span className="text-[10px] text-muted block">PIPELINE LATENCY</span>
                <span className="text-primary font-bold">{activeNode.latency}</span>
              </div>
              <div>
                <span className="text-[10px] text-muted block">THROUGHPUT</span>
                <span className="text-white font-bold">{activeNode.throughput}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#cccccc] leading-relaxed mb-4">
            {activeNode.details}
          </p>

          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-[#222222]">
            <span className="text-[10px] text-muted">INTEGRATED PROTOCOLS:</span>
            {activeNode.protocols.map((proto) => (
              <span
                key={proto}
                className="text-[10px] px-2 py-0.5 border border-[#333333] text-white bg-[#0f0f0f]"
              >
                {proto}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
