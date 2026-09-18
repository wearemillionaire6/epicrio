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
    id: 'hvac',
    code: 'SYS.01',
    name: 'HVAC & FIELD OPS AI VOICE DISPATCHER',
    tagline: '24/7 EMERGENCY TRIAGE FOR SOLO HVAC CONTRACTORS & REFRIGERATION FLEETS.',
    desc: 'PURPOSE-BUILT 24/7 INBOUND VOICE RECEPTIONIST. 1-RING ANSWERING, EMERGENCY TRIAGE (\'NO HEAT\', \'GAS SMELL\', \'FREEZER THAWING\') WITH 30-SEC SMS PAGING, DIRECT GOOGLE CALENDAR BOOKING, AND $2,000 ONE-TIME LIFETIME PRICING.',
    stack: ['VAPI VOICE', 'PAPERCLIP PYTHON', 'TWILIO TELEPHONY', 'GOOGLE CALENDAR API'],
    metrics: {
      latency: '260MS TTFT',
      reliability: '99.98%',
      throughput: '100X SPEED-TO-LEAD',
    },
    diagram: '[INBOUND SIP] ──> [VAPI VOICE] ──> [PAPERCLIP RIGID SYNC] ──> [GOOGLE CAL / TWILIO SMS]',
    payloadPreview: `{\n  "call_id": "vapi_hvac_9841",\n  "intent": "emergency_refrigeration",\n  "escalation": "SMS_PAGED_30SEC",\n  "lead_captured": true,\n  "speed_to_lead_multiplier": "100x"\n}`,
    specLink: '/voice-agent',
  },
  {
    id: 'aas',
    code: 'SYS.02',
    name: 'HIGH-TICKET AI APPOINTMENT SETTER (AAS)',
    tagline: 'PRODUCTIZED 24/7 INBOUND BOOKING FOR MED SPAS, DENTAL & HOME SERVICES.',
    desc: 'CONVERSATIONAL VOICE INTAKE HANDLING 65-75% CALL CONTAINMENT WITHOUT HUMAN STAFF. REAL-TIME PMS AND CAL.COM INTEGRATION, MULTI-TIER REVENUE RECOVERY, AND AUTOMATED POST-CALL SMS/CRM ENRICHMENT.',
    stack: ['RETELL AI', 'CAL.COM', 'TWENTY CRM', 'MAKE / N8N'],
    metrics: {
      latency: '280MS TTFT',
      reliability: '99.95%',
      throughput: '74% CONTAINMENT',
    },
    diagram: '[INBOUND CALL] ──> [RETELL AGENT] ──> [CAL.COM AVAILABILITY] ──> [TWENTY CRM SYNC]',
    payloadPreview: `{\n  "agent": "ai_appointment_setter_v1",\n  "vertical": "med_spa_dental",\n  "containment_rate": 0.74,\n  "booking_status": "CONFIRMED",\n  "sms_dispatched": true\n}`,
    specLink: '/solutions#crm',
  },
  {
    id: 'aetherscrape',
    code: 'SYS.03',
    name: 'AETHERSCRAPE & COLD OUTBOUND INTELLIGENCE',
    tagline: 'HIGH-FIDELITY WEB EXTRACTION AND CONTACT WATERFALL ENRICHMENT.',
    desc: 'AUTOMATED PROSPECTING RUNTIMES POWERED BY FIRECRAWL AND SCRAPLING WITH MULTI-STEP WATERFALL ENRICHMENT. DELIVERS AUDITED DOCTOR, CLINIC, AND CONTRACTOR FLEET CONTACTS DIRECTLY INTO OUTBOUND FUNNELS.',
    stack: ['FIRECRAWL', 'SCRAPLING MCP', 'WATERFALL ENRICH', 'PYTHON WORKER'],
    metrics: {
      latency: '120MS / RECORD',
      reliability: '99.99%',
      throughput: '50K LEADS / RUN',
    },
    diagram: '[TARGET SECTOR] ──> [FIRECRAWL / SCRAPLING] ──> [WATERFALL VALIDATION] ──> [CRM DEPOSIT]',
    payloadPreview: `{\n  "pipeline": "aetherscrape_mumbai_fleet",\n  "verified_records": 1240,\n  "phone_waterfall": "100% VALIDATED",\n  "firecrawl_status": "200_OK"\n}`,
    specLink: '/solutions#workflows',
  },
  {
    id: 'clinicsync',
    code: 'SYS.04',
    name: 'CLINICSYNC AI & HEALTHCARE RECEPTION',
    tagline: 'HIPAA-COMPLIANT PATIENT INTAKE AND CLINICAL SCHEDULING.',
    desc: 'SOC 2 TYPE II AND HIPAA BAA ARCHITECTURE CONNECTED DIRECTLY TO OPENDENTAL, DENTRIX, AND AESTHETIC RECORD. RESOLVES RESCHEDULING, PRE-OP INTAKE FAQS, AND EMERGENCY ESCALATIONS WITHOUT STAFF OVERHEAD.',
    stack: ['RETELL HIPAA BAA', 'OPENDENTAL API', 'SUPABASE PGVECTOR', 'TWILIO'],
    metrics: {
      latency: '310MS TTFT',
      reliability: '100% HIPAA',
      throughput: '80 CONCURRENT CALLS',
    },
    diagram: '[PATIENT INTAKE] ──> [RETELL HIPAA BAA] ──> [EHR PMS SYNC] ──> [TRIAGE ALERT]',
    payloadPreview: `{\n  "clinic_id": "lumen_dental_01",\n  "hipaa_baa_active": true,\n  "ehr_integrated": "OpenDental",\n  "appointment_slot": "2026-09-24T10:30:00Z"\n}`,
    specLink: '/solutions#rag',
  },
  {
    id: 'paperclip',
    code: 'SYS.05',
    name: 'DETERMINISTIC WORKFLOW RUNTIMES',
    tagline: 'ZERO-DOUBLE-REASONING BACKEND SYNC AND OPERATIONAL AUTOMATION.',
    desc: 'RIGID TYPED PYDANTIC PYTHON WORKER POOL RUNNING IN PAPERCLIP CONTAINERS. OFF-THE-LIVE-PATH ASYNC TRANSCRIPT ENRICHMENT, AUTOMATIC INVOICING, AND CRM TWO-WAY SYNC WITHOUT FRAGILE LLM DELAYS.',
    stack: ['PAPERCLIP ENGINE', 'SELF-HOSTED N8N', 'DOCKER PODS', 'STRIPE API'],
    metrics: {
      latency: '42MS SYNC',
      reliability: '99.99%',
      throughput: '15K JOBS / MIN',
    },
    diagram: '[LIVE TELEPHONY] ──> [RIGID PYDANTIC HANDLER] ──> [ASYNC ENRICHMENT QUEUE] ──> [CRM]',
    payloadPreview: `{\n  "worker_pool": "paperclip_sync_v2",\n  "llm_in_live_path": false,\n  "double_reasoning_trap": "PREVENTED",\n  "execution_sla_ms": 38\n}`,
    specLink: '/solutions#api',
  },
  {
    id: 'agentos',
    code: 'SYS.06',
    name: 'AGENT OS & LLM GOVERNANCE',
    tagline: '12-FACTOR PRODUCTION AGENT SPECIFICATION & OBSERVABILITY.',
    desc: 'FULL AGENT OS RUNTIME BASED ON KARPATHY LLM-WIKI STANDARDS. CENTRALIZED LITELLM SPEND CAPS AND RESILIENT MULTI-PROVIDER FAILOVER, DEPLOYED WITH LANGFUSE DISTRIBUTED TELEMETRY TRACING.',
    stack: ['LITELLM', 'LANGFUSE TRACING', 'KARPATHY WIKI', 'NEXT.JS 15'],
    metrics: {
      latency: '18MS ROUTING',
      reliability: '99.999%',
      throughput: '100% AUDIT TRACE',
    },
    diagram: '[AGENT DISPATCH] ──> [LITELLM ROUTER] ──> [LANGFUSE TRACING] ──> [KARPATHY WIKI CACHE]',
    payloadPreview: `{\n  "framework": "agent_os_12_factor",\n  "router": "LiteLLM_failover",\n  "observability": "Langfuse_traced",\n  "adr_compliance": "ADR-001_TO_ADR-005"\n}`,
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
