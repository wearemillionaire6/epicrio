'use client'

import { useState, useRef, useEffect } from 'react'
import { sound } from '@/lib/sound'

interface CommandLog {
  id: string
  command: string
  timestamp: string
  output: string | React.ReactNode
}

const presets = [
  { cmd: 'sys.health', label: 'SYS.HEALTH', desc: 'Cluster diagnostics across all 6 pods' },
  { cmd: 'voice.benchmark', label: 'VOICE.BENCHMARK', desc: 'Sub-300ms audio pipeline latency breakdown' },
  { cmd: 'crm.sync', label: 'CRM.SYNC', desc: 'Simulate HubSpot/Salesforce two-way commit' },
  { cmd: 'hvac.emergency', label: 'HVAC.EMERGENCY', desc: 'Simulate RTU commercial breakdown dispatch' },
  { cmd: 'roi.audit', label: 'ROI.AUDIT', desc: 'Run financial hours-saved yield calculation' },
  { cmd: 'clear', label: 'CLEAR', desc: 'Reset console session' },
]

export default function InteractiveCliSandbox() {
  const [inputVal, setInputVal] = useState('')
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 'init-1',
      command: 'sys.init',
      timestamp: '05:00:12 UTC',
      output: (
        <div className="text-white space-y-1">
          <div>[+] AGENCY.CO OPERATING FABRIC INITIALIZED // KERNEL V4.2</div>
          <div>[+] 6 AIR-GAPPED DOCKER PODS REPORTING HEALTHY [99.98% UPTIME]</div>
          <div className="text-muted">TYPE &apos;HELP&apos; OR CLICK A PRESET COMMAND BELOW TO TEST LIVE SYSTEM CAPABILITIES.</div>
        </div>
      ),
    },
  ])
  const terminalEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  const executeCommand = (cmdText: string) => {
    sound.click()
    const trimmed = cmdText.trim().toLowerCase()
    const now = new Date().toISOString().substring(11, 19) + ' UTC'

    if (trimmed === 'clear') {
      setLogs([])
      setInputVal('')
      return
    }

    let outputContent: React.ReactNode = null

    if (trimmed === 'help') {
      outputContent = (
        <div className="space-y-1 text-slate-300">
          <div className="text-primary font-bold">AVAILABLE TERMINAL COMMANDS:</div>
          <div>• <span className="text-white font-bold">sys.health</span> — Run diagnostics on n8n, Twilio, Redis, Supabase, Claude 3.5</div>
          <div>• <span className="text-white font-bold">voice.benchmark</span> — Measure Deepgram STT, Claude LLM & Cartesia TTS TTFT</div>
          <div>• <span className="text-white font-bold">crm.sync</span> — Simulate bi-directional lead routing and revenue attribution</div>
          <div>• <span className="text-white font-bold">hvac.emergency</span> — Simulate commercial HVAC chiller alarm and technician dispatch</div>
          <div>• <span className="text-white font-bold">roi.audit</span> — Calculate labor hours saved and annual revenue capture</div>
          <div>• <span className="text-white font-bold">clear</span> — Reset terminal output screen</div>
        </div>
      )
    } else if (trimmed === 'sys.health') {
      outputContent = (
        <div className="space-y-1 text-xs">
          <div className="text-primary font-bold">[CLUSTER DIAGNOSTICS // ALL 6 PODS HEALTHY]</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2.5 bg-black border border-[#222222] my-1 text-[11px]">
            <div>• N8N WORKER CLUSTER: <span className="text-primary font-bold">ONLINE [140MS]</span></div>
            <div>• TWILIO SIP MEDIA GATEWAY: <span className="text-primary font-bold">READY [12MS]</span></div>
            <div>• SUPABASE PGVECTOR STORE: <span className="text-primary font-bold">SYNCED [18MS]</span></div>
            <div>• CLAUDE 3.5 REASONING ROUTER: <span className="text-primary font-bold">200 OK [210MS]</span></div>
            <div>• REDIS EVENT BUFFER: <span className="text-primary font-bold">0 DLQ DROPS</span></div>
            <div>• REVENUE ATTRIBUTION ENGINE: <span className="text-primary font-bold">COMMITTED</span></div>
          </div>
          <div className="text-muted text-[10px]">TOTAL SYSTEM RELIABILITY OVER PRECEDING 30 DAYS: 99.98%</div>
        </div>
      )
    } else if (trimmed === 'voice.benchmark') {
      outputContent = (
        <div className="space-y-1.5 text-xs">
          <div className="text-primary font-bold">[VOICE TELEPHONY ROUNDTRIP LATENCY TRACE]</div>
          <div className="p-2.5 bg-black border border-[#222222] text-[11px] font-mono space-y-1">
            <div className="flex justify-between">
              <span>01. DEEPGRAM NOVA-2 (STREAMING STT):</span>
              <span className="text-primary font-bold">84MS</span>
            </div>
            <div className="flex justify-between">
              <span>02. CLAUDE 3.5 SONNET (FIRST-TOKEN EMISSION):</span>
              <span className="text-primary font-bold">115MS</span>
            </div>
            <div className="flex justify-between">
              <span>03. CARTESIA SONIC (STREAMING NEURAL TTS):</span>
              <span className="text-primary font-bold">65MS</span>
            </div>
            <div className="border-t border-[#333333] pt-1 flex justify-between font-bold text-white">
              <span>TOTAL MEASURED TIME-TO-FIRST-TOKEN (TTFT):</span>
              <span className="text-primary">264MS [PASSED SLA &lt;300MS]</span>
            </div>
          </div>
        </div>
      )
    } else if (trimmed === 'crm.sync') {
      outputContent = (
        <div className="space-y-1.5 text-xs">
          <div className="text-primary font-bold">[SIMULATING INBOUND LEAD COMMITTING TO HUBSPOT / SALESFORCE]</div>
          <pre className="p-2.5 bg-black border border-[#222222] text-[10px] text-[#FF3333] font-mono overflow-x-auto leading-relaxed">
{`{
  "event_id": "evt_pipe_98241",
  "source": "inbound_voice_triage",
  "deal_name": "Acme Global - 250 Seat Enterprise Retainer",
  "deal_value_usd": 48000,
  "crm_status": "COMMITTED_ATOMICALLY",
  "sync_latency_ms": 68,
  "notification_pushed": "Slack #revenue-war-room"
}`}
          </pre>
        </div>
      )
    } else if (trimmed === 'hvac.emergency') {
      outputContent = (
        <div className="space-y-1.5 text-xs">
          <div className="text-primary font-bold">[COMMERCIAL HVAC & REFRIGERATION EMERGENCY ROUTINE]</div>
          <div className="p-2.5 bg-black border border-primary/30 text-[11px] space-y-1 text-white">
            <div>• INCOMING ALARM: <span className="text-red-400 font-bold">40-TON CARRIER ROOFTOP UNIT HEAD PRESSURE FAULT</span></div>
            <div>• ASSET LOCATION: <span className="text-white">BUILDING B SERVER WING (FACILITY #891)</span></div>
            <div>• ACTION TAKEN: <span className="text-primary font-bold">OCR MODEL CATALOG PARSE &amp; OEM SENSOR PULL</span></div>
            <div>• DISPATCH DISPOSITION: <span className="text-primary font-bold">SENIOR TECH DEREK EN ROUTE (11 MINS AWAY)</span></div>
          </div>
        </div>
      )
    } else if (trimmed === 'roi.audit') {
      outputContent = (
        <div className="space-y-1.5 text-xs">
          <div className="text-primary font-bold">[ANNUAL AUTOMATION YIELD ASSESSMENT // BASELINE 400 LEADS/MO]</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2.5 bg-black border border-[#222222] text-[11px]">
            <div>
              <span className="text-muted block text-[9px]">ADMIN HOURS SAVED</span>
              <span className="text-white font-bold">~180 HRS / MONTH</span>
            </div>
            <div>
              <span className="text-muted block text-[9px]">DEALS RECOVERED</span>
              <span className="text-primary font-bold">+16 DEALS / MONTH</span>
            </div>
            <div>
              <span className="text-muted block text-[9px]">PROJECTED NET ARR GAIN</span>
              <span className="text-primary font-bold font-pixel">+$240,000 / YR</span>
            </div>
          </div>
        </div>
      )
    } else {
      outputContent = (
        <div className="text-red-400">
          COMMAND NOT RECOGNIZED: &apos;{trimmed}&apos;. TYPE &apos;HELP&apos; FOR A LIST OF AVAILABLE SYSTEM ROUTINES.
        </div>
      )
    }

    setLogs((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: cmdText,
        timestamp: now,
        output: outputContent,
      },
    ])
    setInputVal('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputVal.trim()) {
      executeCommand(inputVal)
    }
  }

  return (
    <section className="py-20 border-b border-[#222222] font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#222222] gap-4">
        <div>
          <div className="text-primary text-xs tracking-widest uppercase mb-1 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary" />
            <span>[INTERACTIVE_SANDBOX // LIVE CLI COMMAND DECK]</span>
          </div>
          <h2 className="font-pixel text-3xl sm:text-5xl text-white tracking-widest">
            CLI TERMINAL
          </h2>
        </div>
        <div className="text-right text-xs text-muted">
          <span>REAL-TIME SYSTEM RUNTIME</span>
          <br />
          <span className="text-white">TYPE COMMANDS OR CLICK PRESETS BELOW</span>
        </div>
      </div>

      {/* Preset Command Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {presets.map((p) => (
          <button
            key={p.cmd}
            type="button"
            onClick={() => executeCommand(p.cmd)}
            className="px-3 py-1.5 border border-[#333333] bg-[#0c0c0c] hover:border-primary text-white hover:text-primary transition-all text-xs font-bold cursor-pointer flex items-center gap-1.5"
          >
            <span className="text-primary">&gt;</span>
            <span>{p.label}</span>
          </button>
        ))}
      </div>

      {/* Interactive Terminal Window */}
      <div className="border border-white/20 bg-[#050505] p-5 sm:p-6 shadow-2xl relative">
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#222222] text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
            <span className="text-muted ml-2 text-[10px]">
              AGENCY.CO // INTERACTIVE ARCHITECTURE PLAYGROUND
            </span>
          </div>
          <span className="text-[10px] text-primary bg-primary/10 border border-primary/30 px-2 py-0.5">
            INTERACTIVE SESSION
          </span>
        </div>

        {/* Scrollable Command Output Log */}
        <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2 mb-4 text-xs font-mono">
          {logs.map((log) => (
            <div key={log.id} className="space-y-1">
              <div className="flex items-center gap-2 text-muted text-[11px]">
                <span className="text-primary font-bold">&gt;</span>
                <span className="text-white font-bold">{log.command}</span>
                <span className="text-[#555555] text-[9px]">[{log.timestamp}]</span>
              </div>
              <div className="pl-4 pt-0.5">{log.output}</div>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Command Input Prompt */}
        <div className="flex items-center gap-2 pt-3 border-t border-[#222222] text-xs">
          <span className="text-primary font-bold flex-shrink-0">&gt;</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="TYPE 'SYS.HEALTH', 'VOICE.BENCHMARK', 'CRM.SYNC', OR 'HELP'..."
            className="w-full bg-transparent border-none focus:outline-none text-white font-mono text-xs uppercase placeholder:text-[#555555]"
          />
          <button
            type="button"
            onClick={() => inputVal.trim() && executeCommand(inputVal)}
            className="px-3 py-1 bg-primary text-black font-bold text-xs hover:bg-white transition-colors cursor-pointer flex-shrink-0"
          >
            EXEC ■
          </button>
        </div>
      </div>
    </section>
  )
}
