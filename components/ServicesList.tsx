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
    tagline: 'SINGLE SOURCE OF REVENUE TRUTH ACROSS MULTI-CHANNEL INBOUND FUNNELS.',
    desc: 'BESPOKE SALES PIPELINE ENGINEERING, REAL-TIME ATTRIBUTION, AND DYNAMIC DEAL ROUTING IN HUBSPOT, SALESFORCE, AND GOHIGHLEVEL WITH ZERO DATA FRAGMENTATION.',
    stack: ['HUBSPOT API', 'SALESFORCE REST', 'POSTGRESQL', 'REDIS QUEUE'],
    metrics: {
      latency: '85MS',
      reliability: '99.99%',
      throughput: '12.4K EVENTS/MIN',
    },
    diagram: '[INBOUND WEBHOOK] ──> [ROUTER] ──> [ENRICHMENT] ──> [CRM DEPOSIT]',
    payloadPreview: `{\n  "event": "lead.qualified",\n  "source": "inbound_call",\n  "score": 94,\n  "assigned_rep": "enterprise_pod_1",\n  "routing_latency_ms": 78\n}`,
    specLink: '/solutions#crm',
  },
  {
    id: 'workflows',
    code: 'SYS.02',
    name: 'AUTONOMOUS WORKFLOW ENGINES',
    tagline: 'SELF-HOSTED EXECUTION RUNTIMES FOR MULTI-STEP OPERATIONAL LOGIC.',
    desc: 'DETERMINISTIC ORCHESTRATION OF BILLING, INVOICING, CLIENT ONBOARDING, NDA EXECUTION, AND CONTRACT GENERATION DEPLOYED ON AIR-GAPPED N8N CLUSTERS.',
    stack: ['SELF-HOSTED N8N', 'DOCKER PODS', 'STRIPE API', 'DOCUSIGN API'],
    metrics: {
      latency: '140MS',
      reliability: '99.98%',
      throughput: '4.8K JOBS/HOUR',
    },
    diagram: '[TRIGGER] ──> [N8N RUNTIME] ──> [TRANSFORM] ──> [STRIPE / DOCUSIGN]',
    payloadPreview: `{\n  "workflow_id": "wf_client_onboard_v4",\n  "status": "EXECUTED",\n  "steps_completed": 7,\n  "invoice_id": "inv_8941_paid",\n  "vault_synced": true\n}`,
    specLink: '/solutions#workflows',
  },
  {
    id: 'voice',
    code: 'SYS.03',
    name: 'SUB-300MS AI VOICE RECEPTIONIST',
    tagline: 'DETERMINISTIC CONVERSATIONAL TELEPHONY OPERATING 24/7/365.',
    desc: 'HUMAN-GRADE INBOUND TRIAGE, AFTER-HOURS DISPATCH, CALENDAR BOOKING, AND MULTI-LINE TRUNKING POWERED BY ULTRA-LOW LATENCY TTS/STT AND TWILIO SIP.',
    stack: ['VAPI', 'TWILIO SIP TRUNKING', 'DEEPGRAM NOVA-2', 'CARTESIA TTS'],
    metrics: {
      latency: '280MS TTFT',
      reliability: '99.95%',
      throughput: '120 CONCURRENT LINES',
    },
    diagram: '[INBOUND SIP] ──> [DEEPGRAM STT] ──> [LLM BRAIN] ──> [CARTESIA TTS]',
    payloadPreview: `{\n  "call_sid": "CA9942817x84",\n  "duration_sec": 142,\n  "sentiment": "high_intent",\n  "appointment_booked": "2026-09-22T14:00:00Z",\n  "ttft_ms": 274\n}`,
    specLink: '/voice-agent',
  },
  {
    id: 'rag',
    code: 'SYS.04',
    name: 'ENTERPRISE KNOWLEDGE RAG AGENTS',
    tagline: 'GROUNDED REASONING OVER PROPRIETARY REGULATORY ARCHIVES.',
    desc: 'INTERNAL AI CO-PILOTS TIED DIRECTLY TO STANDARD OPERATING PROCEDURES, CONTRACT ARCHIVES, HISTORICAL TICKETS, AND COMPLIANCE LEDGERS.',
    stack: ['LANGCHAIN', 'PGVECTOR', 'CLAUDE 3.5 SONNET', 'SUPABASE'],
    metrics: {
      latency: '520MS',
      reliability: '99.99%',
      throughput: '850 QPS',
    },
    diagram: '[USER QUERY] ──> [HYBRID RETRIEVAL] ──> [RERANKER] ──> [GROUNDED SYNTHESIS]',
    payloadPreview: `{\n  "rag_session": "compliance_audit_2026",\n  "sources_cited": ["sop_sec_04.pdf", "nda_rev_8.md"],\n  "hallucination_score": 0.00,\n  "confidence": 0.988\n}`,
    specLink: '/solutions#rag',
  },
  {
    id: 'api',
    code: 'SYS.05',
    name: 'UNIFIED API CONDUITS & INTEGRATIONS',
    tagline: 'RESILIENT MIDDLEWARE BRIDGES CONNECTING LEGACY & MODERN STACKS.',
    desc: 'STATEFUL WEBHOOK ROUTERS, BI-DIRECTIONAL SYNC WORKERS, AND RATE-LIMITING BROKERS BRIDGING PROPRIETARY SQL DATABASES, ERPS, AND CLOUD SAAS.',
    stack: ['NEXT.JS 15', 'REDIS PUB/SUB', 'POSTGRESQL', 'CLOUDFLARE'],
    metrics: {
      latency: '45MS',
      reliability: '99.999%',
      throughput: '45K EVENTS/SEC',
    },
    diagram: '[LEGACY DB / ERP] ──> [STATEFUL BROKER] ──> [DEAD LETTER QUEUE] ──> [DESTINATION]',
    payloadPreview: `{\n  "event_id": "evt_pipe_98241",\n  "handshake": "HMAC_SHA256_VERIFIED",\n  "retry_attempts": 0,\n  "latency_ms": 42\n}`,
    specLink: '/solutions#api',
  },
  {
    id: 'portals',
    code: 'SYS.06',
    name: 'CUSTOM OPERATING PORTALS & DASHBOARDS',
    tagline: 'HIGH-SPEED ADMINISTRATIVE COMMAND CENTERS AND CLIENT PORTALS.',
    desc: 'BESPOKE NEXT.JS 15 CLIENT DASHBOARDS AND EXECUTIVE TELEMETRY CONSOLES ENGINEERED SPECIFICALLY FOR YOUR INTERNAL WORKFLOWS AND REVENUE RECONCILIATION.',
    stack: ['NEXT.JS 15', 'TAILWIND CSS', 'FRAMER MOTION', 'SUPABASE AUTH'],
    metrics: {
      latency: '18MS TTFB',
      reliability: '100%',
      throughput: 'REALTIME WEBSOCKETS',
    },
    diagram: '[EXECUTIVE CONSOLE] ──> [WEBSOCKET REALTIME] ──> [ANALYTICS ENGINE]',
    payloadPreview: `{\n  "tenant_id": "org_enterprise_core",\n  "live_sessions": 34,\n  "active_agent_count": 18,\n  "monthly_automated_volume": "$840,000"\n}`,
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

      {/* Terminal prompt header */}
      <div className="text-muted text-xs sm:text-sm mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-primary">[/&gt; CAPABILITY_EXPLORER : ]</span>
          <span className="text-white">SELECT SYSTEM PROTOCOL FOR TELEMETRY MONITOR</span>
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
                      ? 'border-primary bg-primary/10 text-white shadow-[0_0_15px_rgba(255,51,51,0.15)]'
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
                          className="mt-3 pt-3 border-t border-[#222222] text-xs space-y-2 text-white"
                        >
                          <p className="text-[11px] leading-relaxed text-[#aaaaaa]">
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
          <div className="border border-white/20 bg-[#070707] p-5 sm:p-6 relative overflow-hidden">
            {/* Monitor Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#222222] text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-none animate-pulse" />
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
              <p className="text-xs text-[#aaaaaa] leading-relaxed">
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
              <pre className="p-2.5 bg-black border border-[#222222] text-[10px] text-[#FF3333] font-mono leading-tight overflow-x-auto">
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
