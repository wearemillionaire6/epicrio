'use client'

import { useState, useEffect } from 'react'

interface TelemetryEvent {
  id: string
  time: string
  source: string
  event: string
  latency: string
  status: string
}

const mockEvents: TelemetryEvent[] = [
  {
    id: '1',
    time: '04:02:14 UTC',
    source: 'VAPI_VOICE',
    event: 'INBOUND DISPATCH: 3M 42S CALL COMPLETED -> CALENDAR SLOT LOCKED',
    latency: '268ms',
    status: '200 OK',
  },
  {
    id: '2',
    time: '04:02:18 UTC',
    source: 'N8N_CLUSTER',
    event: 'WORKFLOW #402: STRIPE INVOICE RECONCILED WITH HUBSPOT DEAL #9812',
    latency: '112ms',
    status: 'SUCCESS',
  },
  {
    id: '3',
    time: '04:02:22 UTC',
    source: 'RAG_ENGINE',
    event: 'HYBRID QUERY: 14 SOPS SEARCHED -> HALLUCINATION RISK 0.00%',
    latency: '492ms',
    status: 'VERIFIED',
  },
  {
    id: '4',
    time: '04:02:27 UTC',
    source: 'WEBHOOK_BUS',
    event: 'HMAC_SHA256 SIGNATURE AUTHENTICATED -> 45K BYTES COMMITTED',
    latency: '34ms',
    status: '200 OK',
  },
  {
    id: '5',
    time: '04:02:31 UTC',
    source: 'HVAC_DISPATCH',
    event: 'EMERGENCY REFRIGERATION CALL: ROOFTOP UNIT LOCATED -> TECH NOTIFIED',
    latency: '180ms',
    status: 'DISPATCHED',
  },
  {
    id: '6',
    time: '04:02:35 UTC',
    source: 'SUPABASE_CDC',
    event: 'CHANGE DATA CAPTURE -> 12 CLIENT PORTALS SYNCED VIA WEBSOCKETS',
    latency: '21ms',
    status: 'BROADCAST',
  },
]

export default function LiveTelemetryTicker() {
  const [events, setEvents] = useState<TelemetryEvent[]>(mockEvents)
  const [currentIdx, setCurrentIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % mockEvents.length)
    }, 3800)
    return () => clearInterval(interval)
  }, [])

  const activeEvent = events[currentIdx]

  return (
    <div className="w-full bg-[#050505] border-y border-[#222222] py-2 font-mono text-[11px] text-muted overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        {/* Left: Ticker Label */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="inline-block w-2 h-2 bg-primary rounded-none animate-pulse" />
          <span className="font-bold text-white tracking-wider">
            [LIVE TELEMETRY STREAM]
          </span>
          <span className="text-[#444444]">|</span>
        </div>

        {/* Center: Active Live Event Message */}
        <div className="flex-1 flex items-center gap-3 overflow-hidden text-xs">
          <span className="text-[#666666] text-[10px] hidden md:inline">
            {activeEvent.time}
          </span>
          <span className="text-primary text-[10px] font-bold border border-primary/30 px-1.5 py-0.2 bg-primary/5 flex-shrink-0">
            {activeEvent.source}
          </span>
          <span className="text-white truncate font-medium">
            {activeEvent.event}
          </span>
        </div>

        {/* Right: Telemetry Health */}
        <div className="flex items-center gap-3 text-[10px] flex-shrink-0">
          <span className="text-muted">
            LATENCY: <span className="text-primary font-bold">{activeEvent.latency}</span>
          </span>
          <span className="text-[#333333]">|</span>
          <span className="text-primary font-bold">
            {activeEvent.status}
          </span>
        </div>
      </div>
    </div>
  )
}
