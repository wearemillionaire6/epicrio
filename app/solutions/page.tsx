'use client'

import { useState } from 'react'
import Link from 'next/link'
import CustomCursor from '@/components/CustomCursor'
import DynamicIslandNavbar from '@/components/DynamicIslandNavbar'
import TerminalFooter from '@/components/TerminalFooter'
import { sound } from '@/lib/sound'
import { useTheme } from '@/components/ThemeProvider'

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
    technologies: ['N8N SELF-HOSTED', 'DOCKER CLUSTER', 'PYTHON CELERY WORKERS', 'STRIPE BILLING HOOKS', 'AWS SQS'],
    metrics: ['80% MANUAL ADMIN REDUCTION', 'SUB-SECOND EXECUTION', 'ZERO ZAPIER TIMEOUTS']
  },
  {
    code: '03',
    title: 'SUB-300MS AI VOICE RECEPTIONIST',
    hero: 'NEVER MISS A CALL. HUMAN-GRADE CONVERSATIONAL TELEPHONY.',
    problem: 'CALLS ABANDONED AFTER BUSINESS HOURS, LONG ON-HOLD TIMES, AND COSTLY RECEPTIONIST OVERHEAD.',
    architecture: 'STREAMING ASR + CONVERSATIONAL LLM + ULTRA-LOW LATENCY TTS RUNNING OVER TWILIO SIP TRUNKING.',
    technologies: ['VAPI', 'TWILIO SIP', 'DEEPGRAM NOVA-2', 'CARTESIA SONIC', 'CAL.COM'],
    metrics: ['<260MS TTFT LATENCY', '24/7/365 AVAILABILITY', '+48% RETAINERS SECURED']
  },
  {
    code: '04',
    title: 'ENTERPRISE KNOWLEDGE RAG AGENTS',
    hero: 'BRING CONTEXTUAL AI CO-PILOTS INTO DAILY OPERATIONS.',
    problem: 'EMPLOYEES SPENDING HOURS SEARCHING SOPS, REGULATORY MANUALS, AND HISTORICAL CUSTOMER TICKETS.',
    architecture: 'HYBRID RETRIEVAL AUGMENTED GENERATION (BM25 + VECTOR) WITH STRICT SOURCE CITATIONS AND AUDIT LOGS.',
    technologies: ['CLAUDE 3.5 SONNET', 'OPENAI EMBEDDINGS', 'SUPABASE PGVECTOR', 'LANGCHAIN', 'COHERE RERANK'],
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
  const { isDark, toggleTheme } = useTheme()
  const [soundEnabled, setSoundEnabled] = useState(true)

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev)
  }

  const activeSolution = solutionsDetail[selectedIdx]

  return (
    <div className={`min-h-screen selection:bg-primary selection:text-black font-mono uppercase transition-colors ${
      !isDark ? 'inverted bg-white text-black' : 'bg-black text-white'
    }`}>
      <CustomCursor />

      {/* Floating Glassmorphic Dynamic Island Navigation */}
      <DynamicIslandNavbar
        onToggleInvert={toggleTheme}
        inverted={!isDark}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />
      
      <div className="pt-24 max-w-6xl mx-auto px-4 sm:px-8 py-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-muted mb-8 border-b border-[#222222] pb-3">
          <Link href="/" className="hover:text-primary transition-colors">
            HOME
          </Link>
          <span>/</span>
          <span className="text-white font-bold">SOLUTIONS MATRIX (6 PILLARS)</span>
        </div>

        {/* Hero Section */}
        <div className="mb-12 space-y-3">
          <div className="text-primary text-xs tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-primary inline-block" />
            <span>[SIX_CORE_DISCIPLINES // PRD § 11 CATALOG]</span>
          </div>
          <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-wider">
            SOLUTIONS MATRIX
          </h1>
          <p className="text-[#aaaaaa] text-xs sm:text-sm max-w-3xl leading-relaxed">
            COMPREHENSIVE SPECIFICATIONS OF OUR SIX MODULAR SYSTEM PILLARS.
            DESIGNED TO COMPOUND REVENUE PER EMPLOYEE AND ELIMINATE HUMAN OVERHEAD.
          </p>
        </div>

        {/* Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8 text-xs">
          {solutionsDetail.map((s, i) => (
            <button
              key={s.code}
              onClick={() => {
                sound.click()
                setSelectedIdx(i)
              }}
              className={`p-3 border text-left transition-colors uppercase cursor-pointer ${
                selectedIdx === i
                  ? 'border-primary bg-primary/10 text-white font-bold shadow-[0_0_10px_rgba(0,255,136,0.15)]'
                  : 'border-[#222222] bg-[#070707] text-muted hover:border-white hover:text-white'
              }`}
            >
              <div className="text-[10px] text-primary font-bold mb-1">PILLAR {s.code}</div>
              <div className="truncate text-white font-bold">{s.title.split('&')[0]}</div>
            </button>
          ))}
        </div>

        {/* Detail Box */}
        <div className="border border-white/20 bg-[#070707] p-6 sm:p-8 space-y-6 mb-12">
          <div className="pb-4 border-b border-[#222222]">
            <span className="text-primary text-xs font-bold">[ PILLAR // {activeSolution.code} ]</span>
            <h2 className="font-pixel text-xl sm:text-3xl text-white mt-1">
              {activeSolution.title}
            </h2>
            <p className="text-primary text-xs sm:text-sm mt-2 font-bold">
              &gt; {activeSolution.hero}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-[#222222] bg-black">
              <span className="text-zinc-400 font-bold text-[10px] uppercase block mb-1">
                [X] THE OPERATIONAL FRICTION
              </span>
              <p className="text-xs text-[#aaaaaa] leading-relaxed">
                {activeSolution.problem}
              </p>
            </div>
            <div className="p-4 border border-primary/40 bg-primary/5">
              <span className="text-primary font-bold text-[10px] uppercase block mb-1">
                [√] THE ENGINEERED ARCHITECTURE
              </span>
              <p className="text-xs text-white leading-relaxed">
                {activeSolution.architecture}
              </p>
            </div>
          </div>

          <div>
            <span className="text-muted text-[10px] uppercase font-bold block mb-2">
              AUDITED TECH STACK:
            </span>
            <div className="flex flex-wrap gap-2">
              {activeSolution.technologies.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 border border-[#333333] bg-black text-white">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-muted text-[10px] uppercase font-bold block mb-2">
              AUDITED DELIVERABLE BENCHMARKS:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeSolution.metrics.map((m, idx) => (
                <div key={idx} className="p-3 border border-[#222222] bg-black text-center">
                  <span className="text-primary font-bold text-xs">{m}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-[#222222] gap-4">
            <Link
              href="/architecture"
              className="text-xs text-muted hover:text-white transition-colors"
            >
              [INSPECT SYSTEM FABRIC SPECIFICATION -&gt;]
            </Link>
            <Link
              href="/audit"
              className="px-4 py-2 bg-white text-black font-bold text-xs hover:bg-primary transition-colors flex items-center justify-center gap-2"
            >
              <span>DEPLOY THIS PILLAR</span>
              <span>-&gt;</span>
            </Link>
          </div>
        </div>

        {/* Multi-Page Jump Strip */}
        <div className="py-8 border-b border-[#222222] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <Link
            href="/architecture"
            className="p-3.5 border border-[#222222] bg-[#070707] hover:border-primary text-white flex items-center justify-between"
          >
            <span>ARCHITECTURE SPEC</span>
            <span className="text-primary">-&gt;</span>
          </Link>
          <Link
            href="/voice-agent"
            className="p-3.5 border border-[#222222] bg-[#070707] hover:border-primary text-white flex items-center justify-between"
          >
            <span>VOICE TELEPHONY LAB</span>
            <span className="text-primary">-&gt;</span>
          </Link>
          <Link
            href="/sectors"
            className="p-3.5 border border-[#222222] bg-[#070707] hover:border-primary text-white flex items-center justify-between"
          >
            <span>VERTICAL BLUEPRINTS</span>
            <span className="text-primary">-&gt;</span>
          </Link>
        </div>

        {/* Footer */}
        <TerminalFooter onToggleInvert={toggleTheme} />
      </div>
    </div>
  )
}
