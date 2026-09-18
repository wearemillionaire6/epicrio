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
    latency: '12MS',
    throughput: '50,000 REQ/MIN',
    details: 'VALIDATES HMAC SIGNATURES, PERFORMS SSL TERMINATION, AND BUFFERS EVENTS INTO DURABLE REDIS STREAMS TO PROTECT DOWNSTREAM BACKENDS FROM TRAFFIC BURSTS.',
    protocols: ['TWILIO SIP', 'HUBSPOT WEBHOOK', 'NEXT.JS API ROUTES', 'STRIPE SIGNING SECRET'],
  },
  {
    id: 'router',
    name: '02 // COGNITIVE TRIAGE & ROUTER',
    category: 'DECISION ENGINE',
    latency: '110MS',
    throughput: '3,200 EV/SEC',
    details: 'EVALUATES INTENT, CUSTOMER TIER, URGENCY, AND DATA SCHEMAS TO ROUTE EVENTS TO EITHER CONVERSATIONAL TELEPHONY, VECTOR RAG RETRIEVAL, OR DETERMINISTIC EXECUTION.',
    protocols: ['CLAUDE 3.5 SONNET', 'JSON SCHEMA VALIDATION', 'PRIORITY QUEUE', 'RULE ENGINE'],
  },
  {
    id: 'rag',
    name: '03 // REGULATORY VECTOR RAG',
    category: 'KNOWLEDGE FABRIC',
    latency: '240MS',
    throughput: '850 QPS',
    details: 'HYBRID DENSE + SPARSE SEMANTIC SEARCH ACROSS PROPRIETARY SOPS, EQUIPMENT SPECIFICATIONS, LEGAL PRECEDENTS, AND CUSTOMER RECORDS WITH 0.00% HALLUCINATION VERIFICATION.',
    protocols: ['PGVECTOR', 'HYBRID BM25', 'COHERE RERANK', 'SUPABASE POSTGRES'],
  },
  {
    id: 'runtime',
    name: '04 // DETERMINISTIC RUNTIME (N8N)',
    category: 'EXECUTION CLUSTER',
    latency: '85MS',
    throughput: '12,000 JOBS/HR',
    details: 'SELF-HOSTED AIR-GAPPED N8N WORKERS EXECUTING COMPLEX MULTI-STEP STATE MACHES WITH AUTOMATED EXPONENTIAL BACKOFF AND DEAD-LETTER QUEUE NOTIFICATIONS IN SLACK.',
    protocols: ['DOCKER CLUSTER', 'POSTGRESQL STATE STORE', 'REDIS JOB QUEUE', 'DEAD-LETTER BUS'],
  },
  {
    id: 'destination',
    name: '05 // REVENUE LEDGER & DISPATCH',
    category: 'STATE COMMIT',
    latency: '60MS',
    throughput: 'REAL-TIME PUSH',
    details: 'TWO-WAY SYNCHRONIZED WRITE TO ENTERPRISE CRMS (HUBSPOT, SALESFORCE), CALENDAR LOCKS, SMS DISPATCHES TO FIELD TECHNICIANS, AND AUTOMATED STRIPE BILLING RECONCILIATION.',
    protocols: ['HUBSPOT V3 API', 'SALESFORCE REST', 'TWILIO MESSAGING', 'STRIPE INVOICING'],
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
      <div className="border border-white/20 bg-[#070707] p-6 mb-6">
        <div className="text-muted text-[10px] uppercase tracking-wider mb-4 flex items-center justify-between">
          <span>[END-TO-END AUTONOMOUS CIRCUIT]</span>
          <span className="text-primary text-[10px] animate-pulse">● TRANSMISSION ACTIVE</span>
        </div>

        {/* Node Stepper Box Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-6">
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
                    : 'border-[#222222] bg-black text-muted hover:border-white hover:text-white'
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

                {i < nodes.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-muted text-[10px]">
                    &gt;
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Selected Node Deep Dive Inspector Box */}
        <div className="p-5 bg-black border border-[#222222]">
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
