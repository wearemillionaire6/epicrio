'use client'

import { useState } from 'react'
import Link from 'next/link'
import CustomCursor from '@/components/CustomCursor'
import DynamicIslandNavbar from '@/components/DynamicIslandNavbar'
import TerminalFooter from '@/components/TerminalFooter'
import { sound } from '@/lib/sound'

const architectureLayers = [
  {
    num: '01',
    layer: 'INGESTION & TRAFFIC LAYER',
    protocol: 'HTTP/2 REST // GRAPHQL // WEBSOCKETS',
    specs: [
      'EDGE ROUTING VIA CLOUDFLARE WORKERS (<35MS GLOBAL PROPAGATION)',
      'CLAY ENRICHMENT FOR INSTANT B2B ACCOUNT FIRMOGRAPHICS',
      'RATE-LIMITING WITH REDIS TOKEN BUCKET ALGORITHM (1,000 REQ/SEC PEAK)',
      'AUTOMATED HONEYPOT BOT FILTERING AND CAPTCHA BYPASS PREVENTION'
    ],
    payload: `{\n  "source": "web_lead_capture",\n  "ip_edge": "104.28.14.92",\n  "enrichment": {\n    "domain": "acme-corp.com",\n    "headcount": 140,\n    "funding_tier": "Series B"\n  }\n}`
  },
  {
    num: '02',
    layer: 'CONVERSATIONAL VOICE & SIP FABRIC',
    protocol: 'SIP TRUNKING // WEBRTC // OPUS 48KHZ',
    specs: [
      'DIRECT TWILIO SIP TRUNKING INTO VAPI LOW-LATENCY MEDIA GATEWAY',
      'STREAMING ASR VIA DEEPGRAM NOVA-2 (<180MS PARTIAL TRANSCRIPTION)',
      'CONTEXTUAL LLM RESPONSE GENERATION VIA ANTHROPIC CLAUDE 3.5 SONNET',
      'CARTESIA SONIC TTS STREAMING (<90MS VOICE SYNTHESIS PLAYBACK)',
      'TOTAL ROUNDTRIP CONVERSATIONAL LATENCY: ~260MS'
    ],
    payload: `{\n  "call_sid": "CA_89f0291ba4c9",\n  "sip_latency_ms": 264,\n  "caller_intent": "urgent_lease_dispute",\n  "action_taken": "calendar.hold_slot",\n  "slot_reserved": "2026-09-20T14:00:00-04:00"\n}`
  },
  {
    num: '03',
    layer: 'CENTRAL CRM SYNCHRONIZATION FABRIC',
    protocol: 'BI-DIRECTIONAL WEBHOOK // POSTGRESQL CDC',
    specs: [
      'HUBSPOT, GOHIGHLEVEL & SALESFORCE MULTI-WAY SYNC ENGINES',
      'DE-DUPLICATION HASHING ON NORMALIZED PHONE (E.164) AND CORPORATE EMAIL',
      'CUSTOM PIPELINE STAGES WITH AUTOMATED OWNERSHIP REASSIGNMENT',
      'REAL-TIME ATTRIBUTION PARAMETER TRACKING (UTM SOURCE, MEDIUM, AD_ID)'
    ],
    payload: `{\n  "entity": "deal_record",\n  "pipeline": "enterprise_inbound",\n  "stage": "discovery_scheduled",\n  "deal_value": 48000,\n  "owner_slack_uid": "U08F91A"\n}`
  },
  {
    num: '04',
    layer: 'STATEFUL ORCHESTRATION & ASYNC QUEUES',
    protocol: 'BULLMQ // REDIS STATE MACHINE // DLQ',
    specs: [
      'SELF-HOSTED N8N WORKERS ORCHESTRATED WITH DOCKER ON HARDENED LINUX',
      'EXPONENTIAL BACKOFF RETRY POLICY (1S, 5S, 30S, 5M, 1H)',
      'DEAD-LETTER-QUEUE (DLQ) AUTOMATED REPLAY WITH ALERT PUSH TO SLACK',
      'AUDIT LOGGING OF EVERY PAYLOAD EXECUTION WITH 90-DAY RETENTION'
    ],
    payload: `{\n  "job_id": "wf_exec_9082",\n  "retry_count": 0,\n  "queue": "contract_generation",\n  "state": "COMPLETED",\n  "duration_ms": 482\n}`
  }
]

export default function ArchitecturePage() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [inverted, setInverted] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const toggleInvert = () => {
    if (soundEnabled) sound.beep()
    setInverted((prev) => !prev)
  }

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev)
  }

  const activeLayer = architectureLayers[selectedIdx]

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
          <span className="text-white font-bold">SYSTEM ARCHITECTURE FABRIC</span>
        </div>

        {/* Hero Section */}
        <div className="mb-12 space-y-3">
          <div className="text-primary text-xs tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-primary inline-block" />
            <span>[PROTOCOL_SPECIFICATION // § 13 CONNECTED FABRIC]</span>
          </div>
          <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-wider">
            SYSTEM FABRIC
          </h1>
          <p className="text-[#aaaaaa] text-xs sm:text-sm max-w-3xl leading-relaxed">
            DETAILED TECHNICAL BLUEPRINT OF OUR ENTERPRISE AUTOMATION ARCHITECTURE. 
            ELIMINATING DATA FRAGMENTATION VIA LOW-LATENCY EVENT CONDUITS, ASYNC RETRY QUEUES, AND REAL-TIME CRM RECONCILIATION.
          </p>
        </div>

        {/* Architecture Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 text-xs">
          {architectureLayers.map((l, i) => (
            <button
              key={l.num}
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
              <div className="text-[10px] text-primary font-bold mb-1">LAYER {l.num}</div>
              <div className="truncate text-white font-bold">{l.layer.split('&')[0]}</div>
            </button>
          ))}
        </div>

        {/* Layer Deep Dive View */}
        <div className="border border-white/20 bg-[#070707] p-6 sm:p-8 space-y-6 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#222222] gap-2">
            <div>
              <span className="text-primary text-xs font-bold">[ LAYER {activeLayer.num} ]</span>
              <h2 className="font-pixel text-xl sm:text-2xl text-white mt-1">
                {activeLayer.layer}
              </h2>
            </div>
            <span className="text-primary text-xs font-mono bg-black px-3 py-1 border border-primary/40">
              {activeLayer.protocol}
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-muted text-[10px] uppercase tracking-wider block font-bold">
              ENGINEERED PROTOCOL GUARANTEES:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {activeLayer.specs.map((spec, sIdx) => (
                <div key={sIdx} className="p-3 bg-black border border-[#1E1E1E] text-white flex items-start gap-2">
                  <span className="text-primary font-bold">0{sIdx + 1}.</span>
                  <span className="text-[11px] leading-relaxed">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-[10px] text-muted mb-2">
              <span>WIRE PAYLOAD RECONCILIATION</span>
              <span className="text-primary font-bold">200 OK • VERIFIED ATOMIC COMMIT</span>
            </div>
            <pre className="p-4 bg-black border border-[#222222] text-xs text-[#00FF88] font-mono overflow-x-auto leading-relaxed">
              {activeLayer.payload}
            </pre>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-[#222222] gap-4">
            <Link
              href="/solutions"
              className="text-xs text-muted hover:text-white transition-colors"
            >
              [VIEW SIBLING MODULE: SOLUTIONS MATRIX -&gt;]
            </Link>
            <Link
              href="/audit"
              className="px-4 py-2 bg-white text-black font-bold text-xs hover:bg-primary transition-colors flex items-center justify-center gap-2"
            >
              <span>COMMISSION THIS ARCHITECTURE</span>
              <span>-&gt;</span>
            </Link>
          </div>
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
        <TerminalFooter onToggleInvert={toggleInvert} />
      </div>
    </div>
  )
}
