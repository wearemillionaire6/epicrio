'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { sound } from '@/lib/sound'

interface ServiceItem {
  id: string
  code: string
  name: string
  tagline: string
  desc: string
  stack: string[]
  metrics: {
    latency: string
    reliability: string
    throughput: string
  }
  diagram: string
  payloadPreview: string
  specLink: string
}

const services: ServiceItem[] = [
  {
    id: 'crm',
    code: 'SYS.01',
    name: 'CENTRAL CRM & PIPELINE ARCHITECTURE',
    tagline: 'Single source of revenue truth across multi-channel lead funnels.',
    desc: 'Bespoke sales pipeline engineering, real-time attribution, and dynamic deal routing in HubSpot, Salesforce, and GoHighLevel with zero data fragmentation.',
    stack: ['HubSpot API', 'Salesforce REST', 'PostgreSQL', 'Redis Queue'],
    metrics: {
      latency: '85ms',
      reliability: '99.99%',
      throughput: '12.4k events/min',
    },
    diagram: '[INBOUND WEBHOOK] ──> [ROUTER] ──> [ENRICHMENT] ──> [CRM DEPOSIT]',
    payloadPreview: `{
  "event": "lead.qualified",
  "source": "inbound_call",
  "score": 94,
  "assigned_rep": "enterprise_pod_1",
  "routing_latency_ms": 78
}`,
    specLink: '/solutions#crm',
  },
  {
    id: 'workflows',
    code: 'SYS.02',
    name: 'AUTONOMOUS WORKFLOW ENGINES',
    tagline: 'Self-hosted execution runtimes for multi-step operational logic.',
    desc: 'Deterministic orchestration of billing, invoicing, client onboarding, NDA execution, and contract generation deployed on air-gapped n8n clusters.',
    stack: ['Self-Hosted n8n', 'Docker', 'Stripe Webhooks', 'DocuSign API'],
    metrics: {
      latency: '140ms',
      reliability: '99.98%',
      throughput: '4.8k jobs/hour',
    },
    diagram: '[TRIGGER] ──> [n8n RUNTIME] ──> [TRANSFORM] ──> [STRIPE / DOCUSIGN]',
    payloadPreview: `{
  "workflow_id": "wf_client_onboard_v4",
  "status": "EXECUTED",
  "steps_completed": 7,
  "invoice_id": "inv_8941_paid",
  "vault_synced": true
}`,
    specLink: '/solutions#workflows',
  },
  {
    id: 'voice',
    code: 'SYS.03',
    name: 'SUB-300MS AI VOICE RECEPTIONIST',
    tagline: 'Deterministic conversational telephony operating 24/7/365.',
    desc: 'Human-grade inbound triage, after-hours dispatch, calendar booking, and multi-line trunking powered by ultra-low latency TTS/STT and Twilio SIP.',
    stack: ['Vapi', 'Twilio SIP Trunking', 'Deepgram Nova-2', 'Cartesia TTS'],
    metrics: {
      latency: '280ms TTFT',
      reliability: '99.95%',
      throughput: '120 concurrent lines',
    },
    diagram: '[INBOUND SIP] ──> [DEEPGRAM STT] ──> [LLM BRAIN] ──> [CARTESIA TTS]',
    payloadPreview: `{
  "call_sid": "CA9942817x84",
  "duration_sec": 142,
  "sentiment": "high_intent",
  "appointment_booked": "2026-09-22T14:00:00Z",
  "ttft_ms": 274
}`,
    specLink: '/voice-agent',
  },
  {
    id: 'rag',
    code: 'SYS.04',
    name: 'ENTERPRISE KNOWLEDGE RAG AGENTS',
    tagline: 'Grounded reasoning over proprietary regulatory and technical archives.',
    desc: 'Internal AI co-pilots and customer service engines tied directly to standard operating procedures, contracts, past tickets, and compliance manuals.',
    stack: ['LangChain', 'pgvector', 'Claude 3.5 Sonnet', 'OpenAI Embeddings'],
    metrics: {
      latency: '520ms',
      reliability: '99.99%',
      throughput: '850 QPS',
    },
    diagram: '[USER QUERY] ──> [HYBRID RETRIEVAL] ──> [RERANKER] ──> [GROUNDED SYNTHESIS]',
    payloadPreview: `{
  "rag_session": "compliance_audit_2026",
  "sources_cited": ["sop_sec_04.pdf", "nda_rev_8.md"],
  "hallucination_score": 0.00,
  "confidence": 0.988
}`,
    specLink: '/solutions#rag',
  },
  {
    id: 'api',
    code: 'SYS.05',
    name: 'UNIFIED API CONDUITS & INTEGRATIONS',
    tagline: 'Resilient middleware bridges connecting legacy & modern stacks.',
    desc: 'Stateful webhook routers, bi-directional sync workers, and rate-limiting brokers bridging proprietary SQL databases, ERPs, and cloud SaaS.',
    stack: ['Next.js App Router', 'Redis Pub/Sub', 'PostgreSQL', 'Cloudflare Workers'],
    metrics: {
      latency: '45ms',
      reliability: '99.999%',
      throughput: '45k events/sec',
    },
    diagram: '[LEGACY DB / ERP] ──> [STATEFUL BROKER] ──> [DEAD LETTER QUEUE] ──> [DESTINATION]',
    payloadPreview: `{
  "event_id": "evt_pipe_98241",
  "handshake": "HMAC_SHA256_VERIFIED",
  "retry_attempts": 0,
  "latency_ms": 42
}`,
    specLink: '/solutions#api',
  },
  {
    id: 'portals',
    code: 'SYS.06',
    name: 'CUSTOM OPERATING PORTALS & DASHBOARDS',
    tagline: 'High-speed administrative command centers and client portals.',
    desc: 'Bespoke Next.js 15 client dashboards and executive telemetry consoles engineered specifically for your internal workflows and high-security operations.',
    stack: ['Next.js 15', 'Tailwind CSS', 'Framer Motion', 'Supabase Auth'],
    metrics: {
      latency: '18ms TTFB',
      reliability: '100%',
      throughput: 'Real-time WebSockets',
    },
    diagram: '[EXECUTIVE CONSOLE] ──> [WEBSOCKET REALTIME] ──> [ANALYTICS ENGINE]',
    payloadPreview: `{
  "tenant_id": "org_enterprise_core",
  "live_sessions": 34,
  "active_agent_count": 18,
  "monthly_automated_volume": "$840,000"
}`,
    specLink: '/solutions#portals',
  },
]

export default function ServicesList() {
  const [activeIdx, setActiveIdx] = useState<number>(0)
  const currentSvc = services[activeIdx]

  return (
    <section id="services" className="py-24 border-b border-[#222222] font-mono">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#222222] gap-4">
        <div>
          <div className="text-primary text-xs tracking-widest uppercase mb-1 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary" />
            <span>[SYS_CAPABILITIES // MODULE 02]</span>
          </div>
          <h2 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-widest">
            SERVICES
          </h2>
        </div>
        <div className="text-right text-xs text-muted">
          <span>6 OPERATIONAL CAPABILITIES</span>
          <br />
          <span className="text-white">HOVER OR CLICK TO INSPECT SPEC</span>
        </div>
      </div>

      {/* Terminal prompt prompt header */}
      <div className="text-muted text-xs sm:text-sm mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-primary">[/&gt; : ]</span>
          <span className="text-[#888888]">SELECT SYSTEM PROTOCOL FOR TELEMETRY MONITOR</span>
        </div>
        <div className="text-[11px] text-muted hidden md:block">
          STATUS: <span className="text-primary font-bold">ALL 6 RUNTIMES ACTIVE</span>
        </div>
      </div>

      {/* Dual Column Layout: Stepped Tree on Left + Live Architecture Monitor on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Mathematically Aligned Stepped Cybernetic Tree */}
        <div className="lg:col-span-6 space-y-3">
          {services.map((svc, idx) => {
            const isActive = activeIdx === idx

            // Consistent mathematical step offset: 0px, 16px, 32px, 48px, 64px, 80px
            const indentStyle = {
              marginLeft: `${idx * 16}px`,
            }

            return (
              <div
                key={svc.id}
                style={indentStyle}
                className="relative transition-all duration-150"
              >
                {/* Circuit connector visual guide */}
                <div
                  className={`absolute -left-3 top-1/2 -translate-y-1/2 text-xs select-none transition-colors ${
                    isActive ? 'text-primary' : 'text-[#333333]'
                  }`}
                >
                  {idx === services.length - 1 ? '└──' : '├──'}
                </div>

                <div
                  onMouseEnter={() => {
                    if (activeIdx !== idx) {
                      sound.click()
                      setActiveIdx(idx)
                    }
                  }}
                  onClick={() => {
                    sound.click()
                    setActiveIdx(idx)
                  }}
                  className={`border transition-all duration-150 p-3 sm:p-3.5 cursor-pointer select-none ${
                    isActive
                      ? 'border-primary bg-primary/10 text-white shadow-[0_0_15px_rgba(0,255,136,0.15)]'
                      : 'border-[#222222] bg-black/60 text-[#aaaaaa] hover:border-white hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-2.5 overflow-hidden">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 border ${
                          isActive
                            ? 'border-primary bg-primary text-black'
                            : 'border-[#333333] text-muted'
                        }`}
                      >
                        {svc.code}
                      </span>
                      <span className="text-muted text-xs">_</span>
                      <span className="font-bold text-xs sm:text-sm tracking-wide truncate">
                        {svc.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span
                        className={`text-xs transition-transform ${
                          isActive ? 'text-primary translate-x-1' : 'text-muted'
                        }`}
                      >
                        -&gt;
                      </span>
                    </div>
                  </div>

                  {/* Mobile expansion inline (only visible on mobile) */}
                  <div className="lg:hidden">
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-3 pt-3 border-t border-[#222222] text-xs space-y-2 text-[#cccccc]"
                        >
                          <p className="text-[11px] leading-relaxed text-muted">
                            {svc.desc}
                          </p>
                          <div className="flex items-center justify-between text-[10px] text-primary pt-1">
                            <span>LATENCY: {svc.metrics.latency}</span>
                            <span>UPTIME: {svc.metrics.reliability}</span>
                          </div>
                          <Link
                            href={svc.specLink}
                            className="inline-block mt-1 text-[10px] text-white border border-[#333333] px-2 py-1 hover:border-primary"
                          >
                            VIEW ARCHITECTURE SPEC -&gt;
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            )
          })}

          <div className="pt-4 text-xs text-muted flex items-center justify-between pl-2">
            <span>[TIP: PRESS KEY 1-6 TO QUICK SWITCH]</span>
            <Link
              href="/solutions"
              className="text-white hover:text-primary transition-colors text-[11px]"
            >
              FULL 6-PILLAR MATRIX -&gt;
            </Link>
          </div>
        </div>

        {/* Right Column: High-Tech Live Architecture Telemetry Monitor (Desktop) */}
        <div className="hidden lg:block lg:col-span-6 sticky top-16">
          <div className="border border-white/20 bg-[#080808] p-5 relative overflow-hidden">
            {/* Monitor Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#222222] text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="font-bold text-white tracking-wider">
                  TELEMETRY MONITOR: {currentSvc.code}
                </span>
              </div>
              <span className="text-[10px] text-primary bg-primary/10 border border-primary/30 px-2 py-0.5">
                LIVE HARNESS
              </span>
            </div>

            {/* Service Name & Tagline */}
            <div className="mb-4">
              <h3 className="font-bold text-base text-white mb-1 tracking-wide">
                {currentSvc.name}
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                {currentSvc.desc}
              </p>
            </div>

            {/* Real-time Hardware / Latency Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 p-2.5 bg-black border border-[#222222] mb-4 text-[11px]">
              <div>
                <span className="text-[9px] text-muted block">PIPELINE TTFT</span>
                <span className="text-primary font-bold">{currentSvc.metrics.latency}</span>
              </div>
              <div>
                <span className="text-[9px] text-muted block">RELIABILITY</span>
                <span className="text-white font-bold">{currentSvc.metrics.reliability}</span>
              </div>
              <div>
                <span className="text-[9px] text-muted block">THROUGHPUT</span>
                <span className="text-white font-bold truncate block">{currentSvc.metrics.throughput}</span>
              </div>
            </div>

            {/* Live ASCII Architecture Flow Diagram */}
            <div className="mb-4">
              <div className="text-[10px] text-muted mb-1.5 flex items-center justify-between">
                <span>[CIRCUIT TOPOLOGY]</span>
                <span className="text-primary text-[9px]">ACTIVE WIRE</span>
              </div>
              <div className="p-3 bg-black border border-[#222222] text-[10px] text-primary overflow-x-auto whitespace-nowrap font-mono">
                {currentSvc.diagram}
              </div>
            </div>

            {/* Live Wire Payload Stream */}
            <div className="mb-4">
              <div className="text-[10px] text-muted mb-1 flex items-center justify-between">
                <span>[SAMPLE JSON WIRE TRANSMISSION]</span>
                <span className="text-[9px] text-muted">200 OK</span>
              </div>
              <pre className="p-2.5 bg-black border border-[#222222] text-[10px] text-[#88ffaa] font-mono leading-tight overflow-x-auto">
                {currentSvc.payloadPreview}
              </pre>
            </div>

            {/* Tech Stack Badges & CTA */}
            <div className="flex items-center justify-between pt-3 border-t border-[#222222]">
              <div className="flex flex-wrap gap-1">
                {currentSvc.stack.map((stk) => (
                  <span
                    key={stk}
                    className="text-[9px] px-1.5 py-0.5 border border-[#333333] text-muted bg-[#111111]"
                  >
                    {stk}
                  </span>
                ))}
              </div>

              <Link
                href={currentSvc.specLink}
                className="text-[11px] font-bold text-white hover:text-primary transition-colors flex items-center gap-1 border border-white/40 px-2.5 py-1 hover:border-primary"
              >
                <span>SPEC</span>
                <span>-&gt;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
