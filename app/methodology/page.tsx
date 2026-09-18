'use client'

import { useState } from 'react'
import Link from 'next/link'
import CustomCursor from '@/components/CustomCursor'
import DynamicIslandNavbar from '@/components/DynamicIslandNavbar'
import TerminalFooter from '@/components/TerminalFooter'
import { sound } from '@/lib/sound'

const sprintPhases = [
  {
    week: 'WEEK 01',
    phase: 'STAGE 01 // AUDIT, METRIC DIAGNOSTICS & SYSTEM SCHEMATIC',
    focus: 'MAPPING THE FAILURE SURFACE',
    items: [
      'COMPREHENSIVE INVENTORY OF ALL ACTIVE SAAS SUBSCRIPTIONS, TOOLS, SPREADSHEETS, AND MANUAL HANDOFFS.',
      'ANALYSIS OF LEAD LOSS POINTS, INBOUND RESPONSE LAG, AND REP ADMINISTRATIVE BURDEN.',
      'CREATION OF FULL ENTITY-RELATIONSHIP DIAGRAM (ERD) AND WEBHOOK ARCHITECTURE SCHEMA.',
      'DEFINITION OF SPRINT MILESTONES, SLA BENCHMARKS, AND STAGING SANDBOX ISOLATION.'
    ],
    deliverable: 'IMMUTABLE ARCHITECTURE SCHEMATIC + EXECUTION BACKLOG'
  },
  {
    week: 'WEEKS 02–03',
    phase: 'STAGE 02 // MODULAR ENGINEERING & RECURSIVE BUILD SPRINT',
    focus: 'INFRASTRUCTURE CONSTRUCTION',
    items: [
      'CENTRAL CRM CUSTOM FIELD SCHEMAS, DEAL PIPELINES, AND AUTOMATIC LEAD ASSIGNMENT RULES.',
      'SUB-300MS CONVERSATIONAL VOICE AGENT PROMPT ENGINEERING, SIP TRUNKING, AND TOOL-CALLING HOOKS.',
      'DEPLOYMENT OF SELF-HOSTED N8N / PYTHON WORKERS WITH DEAD-LETTER QUEUE (DLQ) AUTOMATED REPLAY.',
      'WHATSAPP BUSINESS CLOUD API INTEGRATION FOR INSTANT TWO-WAY MESSAGING AND CALENDAR CONFIRMATIONS.'
    ],
    deliverable: 'FULLY CONFIGURED STAGING ENVIRONMENT WITH VIDEO WALKTHROUGHS'
  },
  {
    week: 'WEEK 04',
    phase: 'STAGE 03 // STRESS SIMULATION, INTEGRATION TESTING & CUTOVER',
    focus: 'BULLETPROOFING & ZERO-DOWNTIME LAUNCH',
    items: [
      'SIMULATED LOAD BURSTS: CONCURRENT INBOUND CALLS, WEBHOOK FLOODS, AND NETWORK DROP RECOVERY.',
      'EDGE-CASE TESTING: INVALID LEAD PAYLOADS, DUPLICATE PHONE NUMBERS, AND TIME-ZONE ROUTING.',
      'STAFF OPERATIONAL TRAINING: VIDEO SOPS, EXCEPTION HANDLING GUIDELINES, AND ADMIN CONSOLE ACCESS.',
      'SEAMLESS PRODUCTION CUTOVER WITH ZERO DOWNTIME ON LIVE REVENUE CHANNELS.'
    ],
    deliverable: 'PRODUCTION DEPLOYMENT + STAFF TRAINING DOCUMENTATION'
  },
  {
    week: 'CONTINUOUS',
    phase: 'STAGE 04 // REAL-TIME TELEMETRY & AUTONOMOUS SCALING',
    focus: 'ONGOING RELIABILITY & EXPANSION',
    items: [
      '24/7 AUTOMATED TELEMETRY MONITORING FOR API RATE-LIMIT ALERTS, WEBHOOK FAILURES, AND DLQ SPIKES.',
      'MONTHLY ARCHITECTURAL SPRINT TO EXPAND CAPABILITIES AS YOUR BUSINESS LAUNCHES NEW SERVICE LINES.',
      'DIRECT SLACK CHANNEL ACCESS TO SENIOR SYSTEMS ARCHITECTS FOR REAL-TIME ADJUSTMENTS.',
      'QUARTERLY REVIEW OF SOFTWARE COST OPTIMIZATION TO ELIMINATE REDUNDANT SAAS SUBSCRIPTIONS.'
    ],
    deliverable: '99.98% UPTIME GUARANTEE + PROACTIVE MONTHLY UPGRADES'
  }
]

export default function MethodologyPage() {
  const [inverted, setInverted] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const toggleInvert = () => {
    if (soundEnabled) sound.beep()
    setInverted((prev) => !prev)
  }

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev)
  }

  return (
    <div className={`min-h-screen selection:bg-primary selection:text-black font-mono uppercase transition-colors ${
      inverted ? 'inverted bg-white text-black' : 'bg-black text-white'
    }`}>
      <CustomCursor />

      {/* Floating Glassmorphic Dynamic Island Navigation */}
      <DynamicIslandNavbar
        onToggleInvert={toggleInvert}
        inverted={inverted}
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
          <span className="text-white font-bold">30-DAY CUTOVER METHODOLOGY</span>
        </div>

        {/* Hero Section */}
        <div className="mb-12 space-y-3">
          <div className="text-primary text-xs tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-primary inline-block" />
            <span>[EXECUTION_METHODOLOGY // 30-DAY TIMELINE]</span>
          </div>
          <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-wider">
            30-DAY SPRINT
          </h1>
          <p className="text-[#aaaaaa] text-xs sm:text-sm max-w-3xl leading-relaxed">
            DETERMINISTIC TIMELINES OVER ENDLESS CONSULTING RETREATS. WE AUDIT, CONSTRUCT, LOAD-TEST, AND CUT OVER YOUR PRODUCTION OPERATING SYSTEM IN 30 DAYS FLAT.
          </p>
        </div>

        {/* Phase Breakdown */}
        <div className="space-y-6 mb-12">
          {sprintPhases.map((phase) => (
            <div key={phase.week} className="border border-white/20 bg-[#070707] p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#222222] gap-2">
                <span className="text-primary font-bold text-xs">{phase.phase}</span>
                <span className="text-white font-bold text-xs px-2.5 py-0.5 border border-[#333333] bg-black">
                  {phase.week}
                </span>
              </div>

              <div className="text-xs text-white font-bold tracking-wide">
                &gt; FOCUS: {phase.focus}
              </div>

              <div className="space-y-2">
                {phase.items.map((item, iIdx) => (
                  <div key={iIdx} className="p-3 bg-black border border-[#1E1E1E] text-xs text-[#cccccc] flex items-start gap-2">
                    <span className="text-primary font-bold">0{iIdx + 1}.</span>
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#222222] flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                <div>
                  <span className="text-muted text-[10px] block">VERIFIED OUTPUT DELIVERABLE:</span>
                  <span className="text-primary font-bold">{phase.deliverable}</span>
                </div>
                <Link
                  href="/audit"
                  className="px-3 py-1.5 border border-white hover:bg-white hover:text-black transition-colors text-[11px] font-bold self-start sm:self-auto"
                >
                  START THIS SPRINT -&gt;
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Multi-Page Jump Strip */}
        <div className="py-8 border-b border-[#222222] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <Link
            href="/solutions"
            className="p-3.5 border border-[#222222] bg-[#070707] hover:border-primary text-white flex items-center justify-between"
          >
            <span>SOLUTIONS MATRIX</span>
            <span className="text-primary">-&gt;</span>
          </Link>
          <Link
            href="/architecture"
            className="p-3.5 border border-[#222222] bg-[#070707] hover:border-primary text-white flex items-center justify-between"
          >
            <span>ARCHITECTURE SPEC</span>
            <span className="text-primary">-&gt;</span>
          </Link>
          <Link
            href="/audit"
            className="p-3.5 border border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-black flex items-center justify-between font-bold"
          >
            <span>COMMISSION AUDIT</span>
            <span>■</span>
          </Link>
        </div>

        {/* Footer */}
        <TerminalFooter onToggleInvert={toggleInvert} />
      </div>
    </div>
  )
}
