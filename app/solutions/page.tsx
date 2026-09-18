'use client'

import { useState } from 'react'
import Link from 'next/link'
import CustomCursor from '@/components/CustomCursor'

const solutionsDetail = [
  {
    code: '01',
    title: 'CENTRAL CRM ARCHITECTURE',
    hero: 'TURN FRAGMENTED LEADS INTO PREDICTABLE REVENUE PIPELINES.',
    problem: 'SALES REPS TIED UP WITH MANUAL DATA ENTRY, UNRECORDED CALLS, AND ZERO SYSTEMIC PIPELINE VISIBILITY.',
    architecture: 'CUSTOM PIPELINE SCHEMAS WITH AUTOMATIC LEAD ROUTING, ATTRITION DETECTION, AND REVENUE ATTRIBUTION.',
    technologies: ['HUBSPOT ENTERPRISE', 'GOHIGHLEVEL', 'SALESFORCE CPQ', 'TWENTY CRM', 'POSTGRESQL'],
    metrics: ['10X FASTER LEAD QUALIFICATION', '0 DROPPED OPPORTUNITIES', '100% PIPELINE VISIBILITY']
  },
  {
    code: '02',
    title: 'AUTONOMOUS WORKFLOW ENGINES',
    hero: 'MAKE REPETITIVE BACK-OFFICE HUMAN TASKS DISAPPEAR.',
    problem: 'HOURS LOST TO MANUAL INVOICING, CONTRACT PREPARATION, TEAM NOTIFICATIONS, AND CROSS-PLATFORM DATA COPY-PASTE.',
    architecture: 'EVENT-DRIVEN SELF-HOSTED WORKFLOW ENGINES WITH AUTOMATIC ERROR RETRY, DLQ REPLAY, AND INSTANT SLACK ALERTS.',
    technologies: ['N8N SELF-HOSTED', 'MAKE.COM', 'PYTHON CELERY WORKERS', 'STRIPE BILLING HOOKS', 'AWS SQS'],
    metrics: ['80% MANUAL ADMIN REDUCTION', 'SUB-SECOND EXECUTION', 'ZERO ZAPIER TIMEOUTS']
  },
  {
    code: '03',
    title: 'SUB-300MS AI VOICE RECEPTIONIST',
    hero: 'NEVER MISS A CALL. HUMAN-GRADE CONVERSATIONAL TELEPHONY.',
    problem: 'CALLS ABANDONED AFTER BUSINESS HOURS, LONG ON-HOLD TIMES, AND COSTLY RECEPTIONIST OVERHEAD.',
    architecture: 'STREAMING ASR + CONVERSATIONAL LLM + ULTRA-LOW LATENCY TTS RUNNING OVER TWILIO SIP TRUNKING.',
    technologies: ['VAPI.AI', 'BLAND.AI', 'TWILIO SIP', 'DEEPGRAM NOVA-2', 'CAL.COM'],
    metrics: ['<260MS TTFT LATENCY', '24/7/365 AVAILABILITY', '+48% RETAINERS SECURED']
  },
  {
    code: '04',
    title: 'ENTERPRISE KNOWLEDGE RAG AGENTS',
    hero: 'BRING CONTEXTUAL AI CO-PILOTS INTO DAILY OPERATIONS.',
    problem: 'EMPLOYEES SPENDING HOURS SEARCHING SOPS, REGULATORY MANUALS, AND HISTORICAL CUSTOMER TICKETS.',
    architecture: 'HYBRID RETRIEVAL AUGMENTED GENERATION (BM25 + VECTOR) WITH STRICT SOURCE CITATIONS AND AUDIT LOGS.',
    technologies: ['CLAUDE 3.5 SONNET', 'OPENAI EMBEDDINGS', 'SUPABASE PGVECTOR', 'LANGCHAIN', 'COGNITY'],
    metrics: ['100% GROUNDED CITATIONS', 'ZERO HALLUCINATIONS', 'INSTANT SOP RETRIEVAL']
  },
  {
    code: '05',
    title: 'UNIFIED API CONDUITS & INTEGRATIONS',
    hero: 'SYNCHRONIZE DISJOINTED SOFTWARE INTO ONE BRAIN.',
    problem: 'DATA TRAPPED IN SILOS: WHATSAPP, EMAIL, ERP, BILLING, AND CUSTOM SPREADSHEETS FAILING TO TALK TO EACH OTHER.',
    architecture: 'STATEFUL MIDDLEWARE PROXIES HANDLING BI-DIRECTIONAL EVENT SYNCHRONIZATION AND CONFLICT RESOLUTION.',
    technologies: ['META CLOUD API', 'TWILIO MESSAGING', 'REST & GRAPHQL', 'WEBHOOK MIDDLEWARE', 'REDIS'],
    metrics: ['BI-DIRECTIONAL SYNC', '<100MS EVENT LATENCY', 'ZERO DUPLICATE RECORDS']
  },
  {
    code: '06',
    title: 'CUSTOM OPERATING PORTALS & DASHBOARDS',
    hero: 'SOFTWARE BUILT SPECIFICALLY FOR YOUR UNIQUE EDGE.',
    problem: 'COMMERCIAL OFF-THE-SHELF SAAS IS EITHER TOO RIGID, TOO EXPENSIVE, OR LACKS CRITICAL CUSTOM WORKFLOWS.',
    architecture: 'PRODUCTION-GRADE BESPOKE WEB APPLICATIONS, EXECUTIVE TELEMETRY CONSOLES, AND CLIENT INTAKE PORTALS.',
    technologies: ['NEXT.JS 15 APP ROUTER', 'TYPESCRIPT', 'TAILWIND CSS', 'SUPABASE AUTH & DB', 'VERCEL EDGE'],
    metrics: ['TAILORED TO WORKFLOW', 'ENTERPRISE RBAC', 'HIGH-VELOCITY ITERATION']
  }
]

export default function SolutionsPage() {
  const [selectedIdx, setSelectedIdx] = useState(0)

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black font-mono">
      <CustomCursor />
      
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-8 border-b border-[#222222] mb-12">
          <Link href="/" className="font-pixel text-xl sm:text-2xl text-white hover:text-primary transition-colors">
            AGENCY CO // SOLUTIONS
          </Link>
          <Link
            href="/"
            className="border border-[#333333] hover:border-white px-3 py-1 text-xs text-muted hover:text-white transition-colors"
          >
            [ ^H BACK TO HOME ]
          </Link>
        </div>

        {/* Hero */}
        <div className="mb-16 space-y-4">
          <div className="text-muted text-xs">
            [/&gt; SIX CORE DISCIPLINES // PRD § 11 CATALOG ]
          </div>
          <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-wider">
            SOLUTIONS CATALOG
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
            COMPREHENSIVE SPECIFICATIONS OF OUR SIX MODULAR SYSTEM PILLARS.
            DESIGNED TO COMPOUND REVENUE PER EMPLOYEE AND ELIMINATE HUMAN OVERHEAD.
          </p>
        </div>

        {/* Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-10 text-xs">
          {solutionsDetail.map((s, i) => (
            <button
              key={s.code}
              onClick={() => setSelectedIdx(i)}
              className={`p-3 border text-left transition-colors uppercase ${
                selectedIdx === i
                  ? 'border-white bg-white text-black font-bold'
                  : 'border-[#222222] text-muted hover:border-slate-500 hover:text-white'
              }`}
            >
              <div className="text-[10px] mb-1">PILLAR {s.code}</div>
              <div className="truncate">{s.title}</div>
            </button>
          ))}
        </div>

        {/* Detail Box */}
        <div className="border border-[#333333] bg-[#0A0A0A] p-6 sm:p-8 space-y-8">
          <div className="pb-4 border-b border-[#222222]">
            <span className="text-muted text-xs">[ PILLAR // {solutionsDetail[selectedIdx].code} ]</span>
            <h2 className="font-pixel text-xl sm:text-3xl text-white mt-1">
              {solutionsDetail[selectedIdx].title}
            </h2>
            <p className="text-primary text-xs sm:text-sm mt-2 font-bold">
              {solutionsDetail[selectedIdx].hero}
            </p>
          </div>

          {/* Problem vs Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
            <div className="border border-[#222222] p-4 bg-black">
              <span className="text-rose-400 font-bold block mb-2">// THE OPERATIONAL BOTTLENECK</span>
              <p className="text-slate-400">{solutionsDetail[selectedIdx].problem}</p>
            </div>

            <div className="border border-[#222222] p-4 bg-black">
              <span className="text-primary font-bold block mb-2">// THE ENGINEERED ARCHITECTURE</span>
              <p className="text-slate-300">{solutionsDetail[selectedIdx].architecture}</p>
            </div>
          </div>

          {/* Tech Stack & Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#222222] text-xs">
            <div>
              <span className="text-muted block text-[10px] mb-2 uppercase">STACK COMPONENTS:</span>
              <div className="flex flex-wrap gap-2">
                {solutionsDetail[selectedIdx].technologies.map((t, idx) => (
                  <span key={idx} className="bg-black px-2.5 py-1 border border-[#333333] text-slate-300 text-[11px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-muted block text-[10px] mb-2 uppercase">MEASURED OUTCOMES:</span>
              <div className="space-y-1">
                {solutionsDetail[selectedIdx].metrics.map((m, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-white">
                    <span className="text-primary text-[10px]">■</span>
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Link */}
        <div className="mt-12 flex justify-between items-center text-xs">
          <Link href="/architecture" className="text-muted hover:text-white transition-colors">
            &lt;- VIEW ARCHITECTURE SPEC
          </Link>
          <Link
            href="/#contact"
            className="px-6 py-3 border border-white hover:bg-white hover:text-black font-bold uppercase transition-colors"
          >
            REQUEST AUDIT FOR THIS PILLAR -&gt;
          </Link>
        </div>

      </div>
    </div>
  )
}
