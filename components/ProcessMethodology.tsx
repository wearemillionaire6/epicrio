'use client'

const steps = [
  {
    num: '01',
    timeline: 'WEEK 01',
    title: 'AUDIT & ARCHITECTURE BLUEPRINT',
    desc: 'DEEP DRILL-DOWN INTO EXISTING TOOLS, MANUAL DATA RE-ENTRY, AND PIPELINE BOTTLENECKS. DELIVERING AN IMMUTABLE SYSTEM SCHEMATIC.',
    deliverables: 'BOTTLENECK ANALYSIS • DATA-FLOW ERD • SPRINT BACKLOG',
  },
  {
    num: '02',
    timeline: 'WEEKS 02–03',
    title: 'RAPID ENGINEERING SPRINT',
    desc: 'DEPLOYMENT OF CRM SCHEMAS, CONVERSATIONAL VOICE AGENT PROMPTS, AND STATEFUL WEBHOOK CONDUITS IN STAGING ENVIRONMENTS.',
    deliverables: 'CRM PIPELINE CODE • VOICE AGENT TELEPHONY • DLQ RETRY ENGINES',
  },
  {
    num: '03',
    timeline: 'WEEK 04',
    title: 'LOAD TESTING & PRODUCTION CUTOVER',
    desc: 'SIMULATION OF CONCURRENT INBOUND CALL BURSTS AND ASYNC WEBHOOK SPIKES FOLLOWED BY LIVE PRODUCTION CUTOVER.',
    deliverables: 'STRESS TEST BENCHMARK • STAFF SOP PLAYBOOK • ZERO-DOWNTIME LAUNCH',
  },
  {
    num: '04',
    timeline: 'CONTINUOUS',
    title: 'TELEMETRY & AUTONOMOUS SCALING',
    desc: 'PROACTIVE MONITORING OF SYSTEM LATENCY, DLQ REPLAY HEALTH, AND CONTINUOUS EXPANSION OF WORKFLOW RUNNERS.',
    deliverables: '24/7 TELEMETRY ALERTS • MONTHLY FEATURE UPGRADES • SLACK ACCESS',
  },
]

export default function ProcessMethodology() {
  return (
    <section id="process" className="py-20 border-b border-[#222222]">
      {/* Section Title in Pixel Font */}
      <h2 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-widest mb-10">
        PROCESS
      </h2>

      {/* Terminal prompt */}
      <div className="font-mono text-muted text-xs sm:text-sm mb-8">
        [/&gt; 4-STAGE SPRINT METHODOLOGY ]
      </div>

      <div className="space-y-8 font-mono text-xs sm:text-sm">
        {steps.map((s) => (
          <div
            key={s.num}
            className="border-b border-[#1A1A1A] pb-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start"
          >
            {/* Phase index & timeline */}
            <div className="md:col-span-3 flex items-center gap-3 text-muted">
              <span>[PHASE // {s.num}]</span>
              <span className="text-primary font-bold">{s.timeline}</span>
            </div>

            {/* Title & Desc */}
            <div className="md:col-span-9 space-y-2">
              <h3 className="text-white font-bold tracking-wider text-sm sm:text-base">
                {s.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-xs">
                {s.desc}
              </p>
              <div className="text-[11px] text-muted pt-1">
                <span className="text-slate-500 font-bold">OUTPUT:</span> {s.deliverables}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
