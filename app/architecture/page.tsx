'use client'

import { useState } from 'react'
import Link from 'next/link'
import CustomCursor from '@/components/CustomCursor'

const architectureLayers = [
  {
    num: '01',
    layer: 'INGESTION & TRAFFIC LAYER',
    protocol: 'HTTP/2 REST // GRAPHQL // WEBSOCKETS',
    specs: [
      'Edge routing via Cloudflare Workers (<35ms global propagation)',
      'Clay enrichment for instant B2B account firmographics',
      'Rate-limiting with Redis Token Bucket algorithm (1,000 req/sec peak)',
      'Automated honeypot bot filtering and CAPTCHA bypass prevention'
    ],
    payload: `{\n  "source": "web_lead_capture",\n  "ip_edge": "104.28.14.92",\n  "enrichment": {\n    "domain": "acme-corp.com",\n    "headcount": 140,\n    "funding_tier": "Series B"\n  }\n}`
  },
  {
    num: '02',
    layer: 'CONVERSATIONAL VOICE & SIP FABRIC',
    protocol: 'SIP TRUNKING // WEBRTC // OPUS 48KHZ',
    specs: [
      'Direct Twilio SIP trunking into Vapi.ai low-latency media gateway',
      'Streaming ASR via Deepgram Nova-2 (<180ms partial transcription)',
      'Contextual LLM response generation via Anthropic Claude 3.5 Sonnet',
      'Cartesia Sonic TTS streaming (<90ms voice synthesis playback)',
      'Total roundtrip conversational latency: ~260ms'
    ],
    payload: `{\n  "call_sid": "CA_89f0291ba4c9",\n  "sip_latency_ms": 264,\n  "caller_intent": "urgent_lease_dispute",\n  "action_taken": "calendar.hold_slot",\n  "slot_reserved": "2026-09-20T14:00:00-04:00"\n}`
  },
  {
    num: '03',
    layer: 'CENTRAL CRM SYNCHRONIZATION FABRIC',
    protocol: 'BI-DIRECTIONAL WEBHOOK // POSTGRESQL CDC',
    specs: [
      'HubSpot, GoHighLevel & Salesforce multi-way sync engines',
      'De-duplication hashing on normalized phone (E.164) and corporate email',
      'Custom pipeline stages with automated ownership reassignment',
      'Real-time attribution parameter tracking (UTM source, medium, ad_id)'
    ],
    payload: `{\n  "entity": "deal_record",\n  "pipeline": "enterprise_inbound",\n  "stage": "discovery_scheduled",\n  "deal_value": 48000,\n  "owner_slack_uid": "U08F91A"\n}`
  },
  {
    num: '04',
    layer: 'STATEFUL ORCHESTRATION & ASYNC QUEUES',
    protocol: 'BULLMQ // REDIS STATE MACHINE // DLQ',
    specs: [
      'Self-hosted n8n workers orchestrated with Docker Swarm / Kubernetes',
      'Exponential backoff retry policy (1s, 5s, 30s, 5m, 1h)',
      'Dead-Letter-Queue (DLQ) automated replay with alert push to engineering Slack',
      'Audit logging of every payload execution with 90-day retention'
    ],
    payload: `{\n  "job_id": "wf_exec_9082",\n  "retry_count": 0,\n  "queue": "contract_generation",\n  "state": "COMPLETED",\n  "duration_ms": 482\n}`
  }
]

export default function ArchitecturePage() {
  const [selectedIdx, setSelectedIdx] = useState(0)

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black font-mono">
      <CustomCursor />
      
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-8 border-b border-[#222222] mb-12">
          <Link href="/" className="font-pixel text-xl sm:text-2xl text-white hover:text-primary transition-colors">
            AGENCY CO // ARCHITECTURE
          </Link>
          <Link
            href="/"
            className="border border-[#333333] hover:border-white px-3 py-1 text-xs text-muted hover:text-white transition-colors"
          >
            [ ^H BACK TO HOME ]
          </Link>
        </div>

        {/* Hero Section */}
        <div className="mb-16 space-y-4">
          <div className="text-muted text-xs">
            [/&gt; PROTOCOL SPECIFICATION // § 13 CONNECTED FABRIC ]
          </div>
          <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-wider">
            SYSTEM FABRIC
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
            DETAILED TECHNICAL BLUEPRINT OF OUR ENTERPRISE AUTOMATION ARCHITECTURE. 
            ELIMINATING DATA FRAGMENTATION VIA LOW-LATENCY EVENT CONDUITS, ASYNC RETRY QUEUES, AND REAL-TIME CRM RECONCILIATION.
          </p>
        </div>

        {/* Architecture Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-10 text-xs">
          {architectureLayers.map((l, i) => (
            <button
              key={l.num}
              onClick={() => setSelectedIdx(i)}
              className={`p-3 border text-left transition-colors uppercase ${
                selectedIdx === i
                  ? 'border-white bg-white text-black font-bold'
                  : 'border-[#222222] text-muted hover:border-slate-500 hover:text-white'
              }`}
            >
              <div className="text-[10px] mb-1">LAYER {l.num}</div>
              <div className="truncate">{l.layer.split('&')[0]}</div>
            </button>
          ))}
        </div>

        {/* Layer Deep Dive View */}
        <div className="border border-[#333333] bg-[#0A0A0A] p-6 sm:p-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#222222] gap-2">
            <div>
              <span className="text-muted text-xs">[ LAYER {architectureLayers[selectedIdx].num} ]</span>
              <h2 className="font-pixel text-xl sm:text-2xl text-white mt-1">
                {architectureLayers[selectedIdx].layer}
              </h2>
            </div>
            <span className="text-primary text-xs font-mono bg-black px-3 py-1 border border-primary/40">
              {architectureLayers[selectedIdx].protocol}
            </span>
          </div>

          {/* Technical Specs List */}
          <div>
            <span className="text-muted text-xs block mb-3">ENGINEERING SPECIFICATIONS:</span>
            <div className="space-y-2 text-xs text-slate-300">
              {architectureLayers[selectedIdx].specs.map((spec, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-primary font-bold">_</span>
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Payload Schema */}
          <div>
            <span className="text-muted text-xs block mb-2">LIVE WIRE TRANSMISSION SCHEMA:</span>
            <pre className="p-4 bg-black border border-[#222222] text-primary text-xs leading-relaxed overflow-x-auto">
              {architectureLayers[selectedIdx].payload}
            </pre>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 border border-[#333333] text-center space-y-4">
          <h3 className="font-pixel text-xl sm:text-2xl text-white">
            WANT THIS ARCHITECTURE IN YOUR STACK?
          </h3>
          <p className="text-muted text-xs max-w-xl mx-auto leading-relaxed">
            SCHEDULE A SYSTEM AUDIT. OUR SENIOR ARCHITECTS WILL MAP YOUR DATA FLOWS AND PROPOSE A COMPLETE 30-DAY DEPLOYMENT PLAN.
          </p>
          <div className="pt-2">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white hover:bg-white hover:text-black font-bold text-xs uppercase transition-colors"
            >
              <span>REQUEST ARCHITECTURE AUDIT</span>
              <span className="text-primary text-[10px]">■</span>
              <span>-&gt;</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
