'use client'

import { useState } from 'react'

interface ArchitectureProject {
  id: string
  index: string
  title: string
  asciiName: string
  protocol: string
  stack: string
  summary: string
  schema: string
}

const projects: ArchitectureProject[] = [
  {
    id: 'crm',
    index: '01',
    title: 'CENTRAL CRM ARCHITECTURE',
    asciiName: '░░░ CENTRAL CRM ARCHITECTURE ░░░',
    protocol: 'BI-DIRECTIONAL REALTIME SYNC',
    stack: 'HUBSPOT • GOHIGHLEVEL • SALESFORCE • TWENTY CRM',
    summary: 'SINGLE SOURCE OF TRUTH FOR HIGH-TICKET DEALS, CONTACT PIPELINES, AND REVENUE ATTRIBUTION.',
    schema: '{\n  "module": "central_crm",\n  "sync_latency": "<85ms",\n  "failover": "dlq_auto_replay",\n  "status": "synchronized"\n}',
  },
  {
    id: 'voice',
    index: '02',
    title: 'SUB-300MS AI VOICE RECEPTIONIST',
    asciiName: '░░░ AI VOICE RECEPTIONIST ░░░',
    protocol: 'SIP TRUNKING // WEBRTC // OPUS 48KHZ',
    stack: 'VAPI.AI • TWILIO SIP • DEEPGRAM NOVA-2 • CAL.COM',
    summary: 'HUMAN-GRADE CONVERSATIONAL TELEPHONY CONDUCTING 24/7 CALL QUALIFICATION, FAQ RESOLUTION, AND CALENDAR BOOKING.',
    schema: '{\n  "module": "voice_telephony",\n  "sip_trunk": "twilio_us_east",\n  "latency_ttft": "264ms",\n  "codec": "opus_48khz"\n}',
  },
  {
    id: 'workflows',
    index: '03',
    title: 'AUTONOMOUS WORKFLOW ENGINES',
    asciiName: '░░░ AUTONOMOUS WORKFLOW ENGINES ░░░',
    protocol: 'STATEFUL QUEUE & DLQ REPLAY',
    stack: 'N8N SELF-HOSTED • PYTHON WORKERS • STRIPE API',
    summary: 'AUTOMATED LEAD ROUTING, RECURRING BILLING HOOKS, CONTRACT DISPATCH, AND ONBOARDING PORTAL PROVISIONING.',
    schema: '{\n  "module": "workflow_engine",\n  "concurrency": 250,\n  "reliability": "99.98%",\n  "execution": "deterministic"\n}',
  },
  {
    id: 'omnichannel',
    index: '04',
    title: 'WHATSAPP & OMNICHANNEL TELEPHONY',
    asciiName: '░░░ WHATSAPP & OMNICHANNEL ░░░',
    protocol: 'WHATSAPP BUSINESS CLOUD API // SMS',
    stack: 'META CLOUD API • TWILIO MESSAGING SERVICE',
    summary: 'INSTANT 2-WAY WHATSAPP APPOINTMENT CONFIRMATIONS, RESCHEDULE TRIGGERS, AND AUTOMATED DOCUMENT DELIVERY.',
    schema: '{\n  "module": "omnichannel_dispatch",\n  "throughput": "instant_webhook",\n  "channels": ["whatsapp", "sms", "email"]\n}',
  },
  {
    id: 'rag',
    index: '05',
    title: 'ENTERPRISE KNOWLEDGE RAG AGENTS',
    asciiName: '░░░ KNOWLEDGE RAG AGENTS ░░░',
    protocol: 'HYBRID EMBEDDINGS // VECTOR RETRIEVAL',
    stack: 'CLAUDE 3.5 SONNET • SUPABASE VECTOR • LANGCHAIN',
    summary: 'AI CO-PILOTS TIED DIRECTLY TO YOUR INTERNAL SOPS, HISTORICAL TICKETS, AND REGULATORY COMPLIANCE LEDGERS.',
    schema: '{\n  "module": "enterprise_rag",\n  "context_depth": "full_corpus",\n  "grounding": "100%_cited_sources"\n}',
  },
]

export default function ProjectsArchitecture() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="architecture" className="py-20 border-b border-[#222222]">
      {/* Section Title in Pixel Font */}
      <h2 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-widest mb-16">
        PROJECTS
      </h2>

      {/* Projects List matching exact reference styling */}
      <div className="space-y-14 font-mono text-xs sm:text-sm">
        {projects.map((proj) => {
          const isExpanded = expandedId === proj.id

          return (
            <div key={proj.id} className="space-y-3">
              {/* Index & Visit CTA Row */}
              <div className="flex items-center justify-between text-muted text-[11px]">
                <span>[/&gt; {proj.index}]</span>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>VISIT STACK</span>
                  <span>-&gt;</span>
                </a>
              </div>

              {/* Pixel/ASCII Title */}
              <div className="text-white font-bold tracking-wider text-sm sm:text-base">
                {proj.asciiName}
              </div>

              {/* Read More toggle with mint square ■ */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleExpand(proj.id)}
                  className="text-muted hover:text-white flex items-center gap-2 transition-colors uppercase"
                >
                  <span>{isExpanded ? 'COLLAPSE' : 'READ MORE'}</span>
                  <span className="text-primary text-[10px]">■</span>
                  <span>-&gt;</span>
                </button>
              </div>

              {/* Expandable Technical Details */}
              {isExpanded && (
                <div className="mt-4 p-4 border border-[#333333] bg-[#0A0A0A] space-y-3 text-xs leading-relaxed">
                  <div>
                    <span className="text-muted block text-[10px] mb-0.5">SUMMARY</span>
                    <p className="text-white">{proj.summary}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#222222]">
                    <div>
                      <span className="text-muted block text-[10px] mb-0.5">PROTOCOL</span>
                      <span className="text-primary">{proj.protocol}</span>
                    </div>
                    <div>
                      <span className="text-muted block text-[10px] mb-0.5">CORE STACK</span>
                      <span className="text-slate-300">{proj.stack}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#222222]">
                    <span className="text-muted block text-[10px] mb-1">RUNTIME SCHEMA</span>
                    <pre className="text-[11px] text-slate-400 bg-black p-2 border border-[#222222] overflow-x-auto">
                      {proj.schema}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
