'use client'

import { sound } from '@/lib/sound'

interface SprintPhase {
  code: string
  timeline: string
  title: string
  mandate: string
  inputs: string
  deliverables: string
  sla: string
}

const phases: SprintPhase[] = [
  {
    code: 'PHASE // 01',
    timeline: 'DAYS 01–05',
    title: 'AUDIT & ARCHITECTURAL X-RAY',
    mandate: 'DEEP FORENSIC DRILL-DOWN INTO EXISTING TOOLS, MANUAL DATA RE-ENTRY TRAPS, UNSTRUCTURED SLACK ESCALATIONS, AND PIPELINE DROP-OFFS.',
    inputs: 'EXISTING HUBSPOT/SALESFORCE, AIRTABLES, ZAPIER LOGS, STRIPE PORTALS',
    deliverables: 'IMMUTABLE SYSTEM SCHEMATIC • DATA-FLOW ERD • SPRINT BACKLOG',
    sla: '5-DAY FULL ARCHITECTURE SIGN-OFF',
  },
  {
    code: 'PHASE // 02',
    timeline: 'DAYS 06–14',
    title: 'STAGING RUNTIMES & VOICE TUNING',
    mandate: 'DEPLOYMENT OF AIR-GAPPED DOCKER PODS, CONVERSATIONAL VOICE AGENT PROMPTS, TELEPHONY SIP TRUNKS, AND STATEFUL WEBHOOK MIDDLEWARE IN STAGING.',
    inputs: 'DOMAIN CORPUS, REGULATORY SOPS, TWILIO SIP CREDENTIALS, N8N CLUSTERS',
    deliverables: 'N8N CLUSTER CODE • SUB-300MS VOICE LAB • DLQ RETRY CIRCUITS',
    sla: '100% STAGING ENVIRONMENT ACCEPTANCE',
  },
  {
    code: 'PHASE // 03',
    timeline: 'DAYS 15–21',
    title: 'STRESS BENCHMARKING & FAILOVER',
    mandate: 'SIMULATION OF 1,000+ CONCURRENT INBOUND CALL BURSTS, NETWORK INTERRUPTIONS, AND ASYNCHRONOUS WEBHOOK SPIKES TO AUDIT ATOMIC COMMIT INTEGRITY.',
    inputs: 'AUTOMATED LOAD INJECTORS, SIMULATED CARRIER AUDIO DROPS, NETWORK SPIKES',
    deliverables: 'LOAD STRESS BENCHMARK • DLQ REPLAY VERIFICATION • STAFF SOP PLAYBOOK',
    sla: '99.98% RELIABILITY THRESHOLD PASS',
  },
  {
    code: 'PHASE // 04',
    timeline: 'DAYS 22–30',
    title: 'LIVE PRODUCTION CUTOVER & SLA LOCK',
    mandate: 'CONTROLLED TRAFFIC REDIRECTION TO THE NEW AUTONOMOUS OPERATING CORE WITH ZERO DOWNTIME, PARALLEL RUNTIME VALIDATION, AND REAL-TIME WAR ROOM MONITORING.',
    inputs: 'DNS RECORDS, PRODUCTION CRM WEBHOOK ROUTING, LIVE TWILIO TRUNKS',
    deliverables: 'ZERO-DOWNTIME CUTOVER • 24/7 PROACTIVE TELEMETRY • DEDICATED WAR ROOM',
    sla: '30-DAY HARD PRODUCTION GUARANTEE',
  },
]

export default function ProcessMethodology() {
  return (
    <section id="process" className="py-20 border-b border-[#222222] font-mono">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#222222] gap-4">
        <div>
          <div className="text-primary text-xs tracking-widest uppercase mb-1 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary" />
            <span>[DEPLOYMENT_FRAMEWORK // MODULE 04]</span>
          </div>
          <h2 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-widest">
            PROCESS
          </h2>
        </div>
        <div className="text-right text-xs text-muted">
          <span>THE 30-DAY CUTOVER METHODOLOGY</span>
          <br />
          <span className="text-white">DETERMINISTIC 4-PHASE SPRINT ROADMAP</span>
        </div>
      </div>

      {/* Terminal Prompt Header */}
      <div className="text-muted text-xs sm:text-sm mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-primary">[/&gt; SPRINT_EXECUTION_CADENCE : ]</span>
          <span className="text-white">FROM AUDIT TO PRODUCTION IN 30 DAYS</span>
        </div>
        <span className="text-[11px] text-primary hidden md:inline">
          DETERMINISTIC SLA GUARANTEED
        </span>
      </div>

      {/* 4 Modular Boxed Sprint Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {phases.map((phase) => (
          <div
            key={phase.code}
            onMouseEnter={() => sound.click()}
            className="p-5 border border-[#222222] bg-[#070707] hover:border-primary/60 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Box Top Header Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1A1A1A] text-[10px]">
                <span className="text-primary font-bold">[{phase.code}]</span>
                <span className="text-white font-bold border border-[#333333] px-2 py-0.5 bg-black">
                  {phase.timeline}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-sm sm:text-base text-white tracking-wide mb-2 group-hover:text-primary transition-colors">
                {phase.title}
              </h3>

              {/* Mandate in Unified Monospace */}
              <p className="text-xs text-[#aaaaaa] leading-relaxed mb-4">
                {phase.mandate}
              </p>

              {/* Boxed Inputs & Outputs Sub-cells */}
              <div className="space-y-2 mb-4">
                <div className="p-2.5 bg-black border border-[#1E1E1E] text-[11px]">
                  <span className="text-[9px] text-muted block mb-0.5 font-bold uppercase">
                    AUDITED INGESTION:
                  </span>
                  <span className="text-white font-mono">{phase.inputs}</span>
                </div>

                <div className="p-2.5 bg-black border border-[#1E1E1E] text-[11px]">
                  <span className="text-[9px] text-primary block mb-0.5 font-bold uppercase">
                    ENGINEERED DELIVERABLES:
                  </span>
                  <span className="text-white font-mono">{phase.deliverables}</span>
                </div>
              </div>
            </div>

            {/* Box SLA Guarantee Footer */}
            <div className="pt-3 border-t border-[#1A1A1A] flex items-center justify-between text-[10px]">
              <span className="text-muted">DELIVERY SLA:</span>
              <span className="text-primary font-bold tracking-wider">{phase.sla}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 30-Day Hard Delivery Guarantee Box */}
      <div className="border border-white/20 bg-black p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-primary text-[10px] font-bold block mb-1">
            [DETERMINISTIC COMMITMENT // CONTRACTUAL SLA]
          </span>
          <h4 className="text-sm sm:text-base font-bold text-white tracking-wide">
            IF YOUR PRODUCTION PIPELINE DOES NOT CUT OVER IN 30 DAYS, WE WORK AT ZERO COST UNTIL IT DOES.
          </h4>
        </div>

        <a
          href="#contact"
          onClick={() => sound.click()}
          className="px-4 py-2 bg-white text-black font-bold text-xs hover:bg-primary transition-colors flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
        >
          <span>INITIATE SPRINT 01</span>
          <span>-&gt;</span>
        </a>
      </div>
    </section>
  )
}
