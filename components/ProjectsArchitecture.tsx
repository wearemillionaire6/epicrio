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
    id: 'hvac',
    code: 'SYS.01',
    title: 'HVAC AI VOICE RECEPTIONIST (HVACEQ)',
    protocol: 'ZERO-DOUBLE-REASONING TELEPHONY // 1-RING ANSWER',
    stack: 'VAPI • TWILIO SIP • PYTHON PAPERCLIP • GOOGLE CALENDAR',
    summary: 'PURPOSE-BUILT FOR SOLO HVAC OPERATORS (1-3 TECHS). ANSWERS EVERY INBOUND CALL WITHIN 1 RING, ESCALATES \'NO HEAT\' / \'LEAK\' EMERGENCIES TO SMS WITHIN 30 SECONDS, AND COMMITS DIRECT BOOKINGS WITH ZERO DOUBLE-REASONING LATENCY.',
    latency: '<260MS TTFT',
    uptime: '99.98%',
    schema: `{\n  "project": "hvac_ai_receptionist",\n  "offer": "$2000_lifetime",\n  "emergency_keywords": ["no heat", "gas smell", "freezer leak"],\n  "latency_rule": "ADR-005_rigid_python_sync",\n  "status": "OPERATIONAL"\n}`,
  },
  {
    id: 'aas',
    code: 'SYS.02',
    title: 'AI APPOINTMENT SETTER (AAS)',
    protocol: 'PMS / CAL.COM SYNC // 74% CONTAINMENT',
    stack: 'RETELL AI • CAL.COM • TWENTY CRM • MAKE / N8N',
    summary: 'PRODUCTIZED 24/7 INBOUND CONVERSATIONAL ENGINE FOR HIGH-TICKET MED SPAS, SOLO DENTAL PRACTICES, AND CONTRACTORS. 65-75% CALL CONTAINMENT RATE, REAL-TIME CALENDAR AVAILABILITY INJECTION, AND INSTANT POST-CALL SMS ENRICHMENT.',
    latency: '<280MS TTFT',
    uptime: '99.95%',
    schema: `{\n  "project": "ai_appointment_setter",\n  "containment_target": "65-75%",\n  "pricing_tiers": ["$1.5k_starter", "$2.5k_growth", "$4.5k_prem"],\n  "post_call_sync": "twenty_crm_webhook",\n  "status": "ACTIVE"\n}`,
  },
  {
    id: 'aetherscrape',
    code: 'SYS.03',
    title: 'AETHERSCRAPE WEB EXTRACTION RUNTIME',
    protocol: 'FIRECRAWL • SCRAPLING MCP • WATERFALL ENRICH',
    stack: 'FIRECRAWL REST • SCRAPLING • PYTHON DOCKER • EXCEL ETL',
    summary: 'RESILIENT TARGETED PROSPECTING PIPELINE. HIGH-SPEED SCRAPING OF REGIONAL CLINICS, DENTAL PRACTICES, AND CONTRACTOR FLEETS WITH REAL-TIME WATERFALL PHONE/EMAIL AUDITING AND EXCEL/DB HARMONIZATION.',
    latency: '120MS / REC',
    uptime: '99.99%',
    schema: `{\n  "project": "aetherscrape_engine",\n  "extraction_tool": "firecrawl_and_scrapling",\n  "waterfall_enrichment": "phone_email_valid",\n  "dataset_output": "verified_leads_xlsx",\n  "status": "VERIFIED"\n}`,
  },
  {
    id: 'clinicsync',
    code: 'SYS.04',
    title: 'CLINICSYNC AI & HEALTHCARE RECEPTION',
    protocol: 'HIPAA BAA // OPENDENTAL & DENTRIX INTEGRATION',
    stack: 'RETELL HIPAA • SUPABASE PGVECTOR • OPENDENTAL • TWILIO',
    summary: 'HIPAA-COMPLIANT CLINICAL PATIENT INTAKE WITH SOC 2 TYPE II ENCRYPTION. PRE-OP GUIDANCE, AUTOMATED RESCHEDULING, AND EMERGENCY INTENT CLASSIFICATION LINKED DIRECTLY INTO EXISTING PRACTICE MANAGEMENT SYSTEMS.',
    latency: '<310MS TTFT',
    uptime: '100% HIPAA',
    schema: `{\n  "project": "clinicsync_ai",\n  "security": "SOC2_Type_II_HIPAA_BAA",\n  "pms_bridges": ["OpenDental", "Dentrix", "Boulevard"],\n  "pii_redaction": "enforced",\n  "status": "COMPLIANT"\n}`,
  },
  {
    id: 'agentos',
    code: 'SYS.05',
    title: 'AGENT OS 12-FACTOR ENGINE',
    protocol: 'KARPATHY 3-LAYER WIKI // LITELLM ROUTING',
    stack: 'LITELLM • LANGFUSE • OBSIDIAN MCP • NEXT.JS 15',
    summary: 'PRODUCTION 12-FACTOR AGENT ORCHESTRATION LAYER. RAW INGESTION, AUDITED WIKI CITATIONS, AND TYPED TOOL EXECUTION (FACTOR 4) WITH CENTRALIZED TOKEN SPEND CAPS AND LANGFUSE DISTRIBUTED TRACING.',
    latency: '18MS ROUTING',
    uptime: '99.999%',
    schema: `{\n  "project": "agent_os_core",\n  "pattern": "karpathy_llm_wiki_3_layer",\n  "spend_guard": "litellm_hard_caps",\n  "observability": "langfuse_trace_v2",\n  "status": "DEPLOYED"\n}`,
  },
]

export default function ProjectsArchitecture() {
  const [activeTab, setActiveTab] = useState<string>('hvac')
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
