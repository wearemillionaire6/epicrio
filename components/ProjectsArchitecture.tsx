'use client'

import { useState } from 'react'
import Link from 'next/link'
import { sound } from '@/lib/sound'

interface ArchitectureProject {
  id: string
  code: string
  title: string
  protocol: string
  stack: string
  summary: string
  latency: string
  uptime: string
  schema: string
}

const projects: ArchitectureProject[] = [
  {
    id: 'crm',
    code: 'SYS.01',
    title: 'CENTRAL CRM & REVENUE PIPELINE',
    protocol: 'BI-DIRECTIONAL REALTIME SYNC',
    stack: 'HUBSPOT • GOHIGHLEVEL • SALESFORCE • REDIS',
    summary: 'SINGLE SOURCE OF REVENUE TRUTH ACROSS MULTI-CHANNEL INBOUND FUNNELS. AUTOMATED LEAD ATTRIBUTION, SCORING, AND DYNAMIC ACCOUNT ROUTING WITH ZERO FRAGMENTATION.',
    latency: '<85MS',
    uptime: '99.99%',
    schema: `{\n  "module": "central_crm_router",\n  "sync_latency_ms": 78,\n  "failover": "dlq_auto_replay",\n  "channels": ["inbound_voice", "form_webhook", "portal"],\n  "status": "SYNCHRONIZED"\n}`,
  },
  {
    id: 'voice',
    code: 'SYS.02',
    title: 'SUB-300MS CONVERSATIONAL VOICE TRUNKING',
    protocol: 'SIP TRUNKING // OPUS 48KHZ // WEBRTC',
    stack: 'VAPI.AI • TWILIO SIP • DEEPGRAM NOVA-2 • CARTESIA',
    summary: 'ENTERPRISE-GRADE TELEPHONY RUNTIMES DELIVERING 24/7 CALL QUALIFICATION, EMERGENCY DISPATCH, AND INSTANT CALENDAR LOCKS AT SUB-300MS FIRST-TOKEN LATENCY.',
    latency: '<280MS TTFT',
    uptime: '99.95%',
    schema: `{\n  "module": "voice_telephony_trunk",\n  "sip_carrier": "twilio_us_east",\n  "ttft_ms": 264,\n  "codec": "opus_48khz_stereo",\n  "state": "CARRIER_CONNECTED"\n}`,
  },
  {
    id: 'workflows',
    code: 'SYS.03',
    title: 'AUTONOMOUS MULTI-STEP WORKFLOW ENGINES',
    protocol: 'STATEFUL QUEUE & ASYNC DLQ REPLAY',
    stack: 'N8N SELF-HOSTED • DOCKER • STRIPE API • DOCUSIGN',
    summary: 'DETERMINISTIC MULTI-STEP ORCHESTRATION OF BILLING, INVOICING, CLIENT ONBOARDING, AND CONTRACT GENERATION DEPLOYED ON AIR-GAPPED HARDENED LINUX PODS.',
    latency: '140MS',
    uptime: '99.98%',
    schema: `{\n  "module": "n8n_execution_cluster",\n  "concurrency_limit": 250,\n  "retry_policy": "exponential_jitter",\n  "dlq_alerting": "slack_war_room",\n  "status": "ONLINE"\n}`,
  },
  {
    id: 'rag',
    code: 'SYS.04',
    title: 'REGULATORY KNOWLEDGE RAG ENGINES',
    protocol: 'HYBRID EMBEDDINGS // PGVECTOR DENSE RETRIEVAL',
    stack: 'CLAUDE 3.5 SONNET • SUPABASE VECTOR • COHERE RERANK',
    summary: 'GROUNDED INTERNAL CO-PILOTS TIED DIRECTLY TO YOUR COMPANY SOPS, EQUIPMENT REGISTRIES, LEGAL PRECEDENTS, AND HISTORICAL TICKETS WITH 0.00% HALLUCINATION RISK.',
    latency: '<520MS',
    uptime: '99.99%',
    schema: `{\n  "module": "enterprise_vector_rag",\n  "retrieval_strategy": "hybrid_dense_bm25",\n  "hallucination_guard": "100%_cited_sources",\n  "status": "VERIFIED"\n}`,
  },
  {
    id: 'api',
    code: 'SYS.05',
    title: 'UNIFIED API CONDUITS & STATEFUL BROKERS',
    protocol: 'HMAC-SHA256 SIGNED WEBHOOK MIDDLEWARE',
    stack: 'NEXT.JS 15 • POSTGRESQL CDC • REDIS STREAMS • CLOUDFLARE',
    summary: 'RESILIENT PROTOCOL BRIDGES CONNECTING PROPRIETARY ON-PREM SQL DATABASES, LEGACY ERPS, WHATSAPP, AND SAAS PLATFORMS INTO ONE SECURE DATA STREAM.',
    latency: '45MS',
    uptime: '99.999%',
    schema: `{\n  "module": "stateful_webhook_broker",\n  "handshake": "HMAC_SHA256_VERIFIED",\n  "throughput_qps": 45000,\n  "delivery_guarantee": "at_least_once",\n  "status": "ACTIVE"\n}`,
  },
]

export default function ProjectsArchitecture() {
  const [activeTab, setActiveTab] = useState<string>('crm')
  const currentProject = projects.find((p) => p.id === activeTab) || projects[0]

  return (
    <section id="architecture" className="py-20 border-b border-[#222222] font-mono">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#222222] gap-4">
        <div>
          <div className="text-primary text-xs tracking-widest uppercase mb-1 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary" />
            <span>[SYSTEM_LEDGER // MODULE 02]</span>
          </div>
          <h2 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-widest">
            PROJECTS
          </h2>
        </div>
        <div className="text-right text-xs text-muted">
          <span>5 PRODUCTION SYSTEMS</span>
          <br />
          <span className="text-white">SELECT MODULE TO INSPECT ARCHITECTURE</span>
        </div>
      </div>

      {/* Terminal Prompt Header */}
      <div className="text-muted text-xs sm:text-sm mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-primary">[/&gt; ARCHITECTURE_CATALOG : ]</span>
          <span className="text-white">SELECT DEPLOYED SYSTEM FOR DEEP DIVE</span>
        </div>
        <span className="text-[11px] text-primary hidden md:inline">
          ALL 5 PODS PASSING HEALTH CHECK
        </span>
      </div>

      {/* Project Selector Box Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 mb-6">
        {projects.map((proj) => {
          const isActive = activeTab === proj.id
          return (
            <button
              key={proj.id}
              onClick={() => {
                sound.click()
                setActiveTab(proj.id)
              }}
              className={`p-3 border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[85px] ${
                isActive
                  ? 'border-primary bg-primary/10 text-white shadow-[0_0_12px_rgba(0,255,136,0.2)]'
                  : 'border-[#222222] bg-[#070707] text-muted hover:border-white hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between w-full text-[9px]">
                <span className="text-primary font-bold">[{proj.code}]</span>
                <span className="text-muted">{proj.latency}</span>
              </div>
              <span className="font-bold text-xs tracking-tight line-clamp-2 text-white mt-1">
                {proj.title}
              </span>
              <div className="text-[9px] text-[#555555] mt-1 flex items-center justify-between">
                <span>{proj.uptime} SLA</span>
                {isActive && <span className="text-primary">■</span>}
              </div>
            </button>
          )
        })}
      </div>

      {/* Detailed Box-Style Project Architecture Console */}
      <div className="border border-white/20 bg-[#070707] p-6 sm:p-8">
        {/* Box Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#222222] gap-3">
          <div>
            <div className="flex items-center gap-2 text-[10px] text-primary mb-1">
              <span>MODULE // {currentProject.code}</span>
              <span>•</span>
              <span className="text-white">{currentProject.protocol}</span>
            </div>
            <h3 className="font-bold text-lg sm:text-2xl text-white tracking-wide">
              {currentProject.title}
            </h3>
          </div>

          <div className="flex items-center gap-4 bg-black border border-[#222222] px-4 py-2.5">
            <div>
              <span className="text-[9px] text-muted block">LATENCY TTFT</span>
              <span className="text-primary font-bold text-sm sm:text-base">
                {currentProject.latency}
              </span>
            </div>
            <div className="h-6 w-[1px] bg-[#222222]" />
            <div>
              <span className="text-[9px] text-muted block">AVAILABILITY</span>
              <span className="text-white font-bold text-sm sm:text-base">
                {currentProject.uptime}
              </span>
            </div>
          </div>
        </div>

        {/* 3 Boxed Specification Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 border border-[#222222] bg-black">
            <span className="text-[9px] text-primary font-bold block mb-1 uppercase tracking-wider">
              [01 // PROTOCOL STANDARD]
            </span>
            <span className="text-xs text-white font-bold block">
              {currentProject.protocol}
            </span>
          </div>

          <div className="p-3.5 border border-[#222222] bg-black">
            <span className="text-[9px] text-primary font-bold block mb-1 uppercase tracking-wider">
              [02 // VERIFIED TECH STACK]
            </span>
            <span className="text-xs text-[#dddddd] font-bold block truncate">
              {currentProject.stack}
            </span>
          </div>

          <div className="p-3.5 border border-[#222222] bg-black">
            <span className="text-[9px] text-primary font-bold block mb-1 uppercase tracking-wider">
              [03 // RESILIENCE MECHANIC]
            </span>
            <span className="text-xs text-white font-bold block">
              DEAD-LETTER QUEUE AUTO-REPLAY
            </span>
          </div>
        </div>

        {/* Summary Box in Strict Monospace */}
        <div className="p-4 border border-[#222222] bg-black mb-6">
          <span className="text-[9px] text-muted block mb-1 uppercase tracking-wider">
            [OPERATIONAL MANDATE]
          </span>
          <p className="text-xs text-white leading-relaxed">
            {currentProject.summary}
          </p>
        </div>

        {/* Boxed JSON Schema Wire Transmission Preview */}
        <div className="p-4 border border-[#222222] bg-black mb-6">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1A1A1A] text-[10px]">
            <span className="text-muted">[SAMPLE JSON WIRE TRANSMISSION // RUNTIME SCHEMA]</span>
            <span className="text-primary font-bold">200 OK • ATOMIC COMMIT</span>
          </div>
          <pre className="text-xs text-[#00FF88] font-mono leading-relaxed overflow-x-auto p-1">
            {currentProject.schema}
          </pre>
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#222222]">
          <Link
            href="/architecture"
            className="text-xs text-muted hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <span>[VIEW COMPLETE SYSTEM FABRIC SPECIFICATION</span>
            <span>-&gt;]</span>
          </Link>

          <a
            href="#contact"
            onClick={() => sound.click()}
            className="px-4 py-2 bg-white text-black font-bold text-xs hover:bg-primary transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>DEPLOY THIS SYSTEM</span>
            <span className="text-[7px]">■</span>
            <span>-&gt;</span>
          </a>
        </div>
      </div>
    </section>
  )
}
