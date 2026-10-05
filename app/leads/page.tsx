'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Search,
  Sparkles,
  Send,
  Bot,
  Filter,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  SlidersHorizontal,
  Layers,
  Settings,
  Mail,
  Phone,
  Building2,
  User,
  Clock,
  ChevronRight,
  Plus,
  Trash2,
  Copy,
  Check,
  Zap,
  Globe,
  Radio,
  FileText,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'
import { Lead, PipelineStats, TelegramConfig, OutreachDraft } from '@/lib/leads/types'

export default function LeadsIntelligencePage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState<PipelineStats>({
    totalLeads: 0,
    discovered: 0,
    researched: 0,
    qualified: 0,
    contacted: 0,
    highIcpCount: 0,
    averageIcpScore: 0,
  })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'all' | 'high_icp' | 'drafted' | 'contacted'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [modalMode, setModalMode] = useState<'dossier' | 'outreach' | 'settings' | 'add' | null>(null)

  // Lead Discovery State
  const [searchNiche, setSearchNiche] = useState('Dental Clinics')
  const [searchLocation, setSearchLocation] = useState('Austin, TX')
  const [searchCount, setSearchCount] = useState(3)
  const [isDiscovering, setIsDiscovering] = useState(false)
  const [discoveryStatusText, setDiscoveryStatusText] = useState('')

  // Instant Domain Audit State
  const [instantDomain, setInstantDomain] = useState('')
  const [isAuditingDomain, setIsAuditingDomain] = useState(false)

  // Telegram Config & Test State
  const [telegramSettings, setTelegramSettings] = useState<Partial<TelegramConfig>>({
    botToken: '',
    chatId: '',
    autoAlertNewLeads: true,
    autoAlertHighICP: true,
    autoAlertEmailsSent: true,
  })
  const [telegramStatus, setTelegramStatus] = useState<{ connected: boolean; message: string; botName?: string }>({
    connected: false,
    message: '',
  })
  const [isTestingTelegram, setIsTestingTelegram] = useState(false)
  const [isSavingSettings, setIsSavingSettings] = useState(false)
  const [pollIntervalActive, setPollIntervalActive] = useState(false)
  const [pollingLogs, setPollingLogs] = useState<string[]>([])

  // Outreach Draft Editor State
  const [draftSubject, setDraftSubject] = useState('')
  const [draftBody, setDraftBody] = useState('')
  const [draftAngle, setDraftAngle] = useState<OutreachDraft['angle']>('voice_ai')
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [sendResultMsg, setSendResultMsg] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  // Manual Add Lead State
  const [manualForm, setManualForm] = useState({
    company: '',
    domain: '',
    name: '',
    email: '',
    phone: '',
    industry: 'Healthcare / Dental',
    notes: '',
  })
  const [isAddingLead, setIsAddingLead] = useState(false)

  // Fetch leads and stats
  const fetchLeads = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/leads')
      const data = await res.json()
      if (data.success) {
        setLeads(data.leads || [])
        setStats(data.stats || stats)
      }
    } catch (err) {
      console.error('Failed to load leads:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch Telegram settings
  const fetchTelegramSettings = async () => {
    try {
      const res = await fetch('/api/telegram/settings')
      const data = await res.json()
      if (data.success && data.settings) {
        setTelegramSettings(data.settings)
        if (data.settings.hasBotToken && data.settings.chatId) {
          setTelegramStatus({
            connected: true,
            message: 'Telegram Bot credentials configured and ready.',
          })
        }
      }
    } catch (err) {
      console.error('Failed to load telegram settings:', err)
    }
  }

  useEffect(() => {
    fetchLeads()
    fetchTelegramSettings()
  }, [])

  // Discovery Action
  const handleDiscoverLeads = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchNiche) return
    setIsDiscovering(true)
    setDiscoveryStatusText(`Scanning web for ${searchNiche} in ${searchLocation}...`)

    try {
      setDiscoveryStatusText('Extracting domains & identifying decision makers...')
      const res = await fetch('/api/leads/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche: searchNiche,
          location: searchLocation,
          count: searchCount,
          autoResearchTop: true,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setDiscoveryStatusText(`Discovered & refined ${data.count} prospects! Alert sent to Telegram.`)
        await fetchLeads()
        setTimeout(() => {
          setIsDiscovering(false)
          setDiscoveryStatusText('')
        }, 2200)
      } else {
        setDiscoveryStatusText('Discovery error: ' + (data.error || 'Failed'))
        setIsDiscovering(false)
      }
    } catch (err: any) {
      setDiscoveryStatusText('Failed: ' + err.message)
      setIsDiscovering(false)
    }
  }

  // Instant Domain Deep Audit Action
  const handleInstantDomainAudit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!instantDomain) return
    setIsAuditingDomain(true)

    try {
      const res = await fetch('/api/leads/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: instantDomain,
          notifyTelegram: true,
        }),
      })
      const data = await res.json()
      if (data.success && data.lead) {
        await fetchLeads()
        setSelectedLead(data.lead)
        setModalMode('dossier')
        setInstantDomain('')
      }
    } catch (err) {
      console.error('Audit failed:', err)
    } finally {
      setIsAuditingDomain(false)
    }
  }

  // Trigger Research on existing lead
  const handleResearchLead = async (lead: Lead) => {
    try {
      const res = await fetch('/api/leads/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: lead.id, notifyTelegram: true }),
      })
      const data = await res.json()
      if (data.success && data.lead) {
        await fetchLeads()
        setSelectedLead(data.lead)
        setModalMode('dossier')
      }
    } catch (err) {
      console.error('Research error:', err)
    }
  }

  // Open Outreach Studio
  const handleOpenOutreach = (lead: Lead) => {
    setSelectedLead(lead)
    const draft = lead.outreach
    setDraftSubject(draft?.subject || `Quick question regarding ${lead.company}'s operations`)
    setDraftBody(draft?.body || '')
    setDraftAngle(draft?.angle || 'voice_ai')
    setSendResultMsg('')
    setModalMode('outreach')
  }

  // Regenerate Draft with Angle
  const handleRegenerateDraft = async (angle: OutreachDraft['angle']) => {
    if (!selectedLead) return
    setDraftAngle(angle)
    try {
      const res = await fetch('/api/leads/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedLead.id, angle }),
      })
      const data = await res.json()
      if (data.success && data.outreach) {
        setDraftSubject(data.outreach.subject)
        setDraftBody(data.outreach.body)
      }
    } catch (err) {
      console.error('Draft error:', err)
    }
  }

  // Send Email Action
  const handleSendEmail = async (isTest: boolean = false) => {
    if (!selectedLead) return
    setIsSendingEmail(true)
    setSendResultMsg('')

    try {
      const res = await fetch('/api/leads/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedLead.id,
          subject: draftSubject,
          emailBody: draftBody,
          isTest,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSendResultMsg(data.result?.message || 'Outreach dispatched successfully!')
        await fetchLeads()
      } else {
        setSendResultMsg('Dispatch failed: ' + (data.error || 'Unknown error'))
      }
    } catch (err: any) {
      setSendResultMsg('Error: ' + err.message)
    } finally {
      setIsSendingEmail(false)
    }
  }

  // Delete Lead
  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to remove this lead?')) return
    try {
      await fetch(`/api/leads/${id}`, { method: 'DELETE' })
      await fetchLeads()
      if (selectedLead?.id === id) {
        setSelectedLead(null)
        setModalMode(null)
      }
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  // Test Telegram Connection
  const handleTestTelegram = async () => {
    setIsTestingTelegram(true)
    setTelegramStatus({ connected: false, message: 'Pinging Telegram servers...' })

    try {
      const res = await fetch('/api/telegram/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          botToken: telegramSettings.botToken,
          chatId: telegramSettings.chatId,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setTelegramStatus({
          connected: true,
          botName: data.botName,
          message: data.message,
        })
      } else {
        setTelegramStatus({
          connected: false,
          message: data.message || 'Connection test failed',
        })
      }
    } catch (err: any) {
      setTelegramStatus({ connected: false, message: err.message || 'Test failed' })
    } finally {
      setIsTestingTelegram(false)
    }
  }

  // Save Telegram Settings
  const handleSaveSettings = async () => {
    setIsSavingSettings(true)
    try {
      const res = await fetch('/api/telegram/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(telegramSettings),
      })
      const data = await res.json()
      if (data.success) {
        alert('Telegram configuration saved!')
        await fetchTelegramSettings()
      }
    } catch (err) {
      alert('Failed to save settings')
    } finally {
      setIsSavingSettings(false)
    }
  }

  // Poll Telegram updates on demand
  const handlePollTelegramNow = async () => {
    try {
      const res = await fetch('/api/telegram/poll', { method: 'POST' })
      const data = await res.json()
      if (data.success) {
        const timestamp = new Date().toLocaleTimeString()
        const log = `[${timestamp}] Polled: ${data.processed} updates processed.`
        setPollingLogs((prev) => [log, ...prev.slice(0, 9)])
        await fetchLeads()
      }
    } catch (err) {
      console.error('Poll error:', err)
    }
  }

  // Add Manual Lead
  const handleAddManualLead = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddingLead(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(manualForm),
      })
      const data = await res.json()
      if (data.success) {
        await fetchLeads()
        setModalMode(null)
        setManualForm({
          company: '',
          domain: '',
          name: '',
          email: '',
          phone: '',
          industry: 'Healthcare / Dental',
          notes: '',
        })
      }
    } catch (err) {
      alert('Failed to add lead')
    } finally {
      setIsAddingLead(false)
    }
  }

  // Copy email body
  const handleCopyBody = () => {
    navigator.clipboard.writeText(draftBody)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    if (activeTab === 'high_icp' && (lead.icpScore || 0) < 75) return false
    if (activeTab === 'drafted' && lead.status !== 'drafted') return false
    if (activeTab === 'contacted' && lead.status !== 'contacted') return false

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return (
        lead.company.toLowerCase().includes(q) ||
        lead.name.toLowerCase().includes(q) ||
        lead.domain.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        (lead.industry && lead.industry.toLowerCase().includes(q))
      )
    }
    return true
  })

  return (
    <div className="min-h-screen bg-[#FDFDFC] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      {/* Top Header & Telemetry Bar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-zinc-200/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-zinc-950 font-bold tracking-tight text-lg hover:opacity-80 transition-opacity"
            >
              <span className="w-7 h-7 bg-zinc-950 text-white rounded-lg flex items-center justify-center text-xs font-mono font-bold">
                E
              </span>
              <span>Epicrio™</span>
            </Link>
            <span className="text-zinc-300">/</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-700">Autonomous Lead & Outreach Engine</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Agent
              </span>
            </div>
          </div>

          {/* Quick Actions & Navigation */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => {
                setModalMode('settings')
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-zinc-100 hover:bg-zinc-200/80 text-zinc-800 rounded-lg transition-colors border border-zinc-200/60"
            >
              <Bot className="w-3.5 h-3.5 text-zinc-600" />
              <span>Telegram Bot</span>
              <span
                className={`w-2 h-2 rounded-full ${
                  telegramStatus.connected ? 'bg-emerald-500' : 'bg-amber-400'
                }`}
              />
            </button>

            <button
              onClick={() => setModalMode('add')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-100 hover:bg-zinc-200/80 text-zinc-800 rounded-lg transition-colors border border-zinc-200/60"
            >
              <Plus className="w-3.5 h-3.5 text-zinc-600" />
              <span>Add Lead</span>
            </button>

            <button
              onClick={fetchLeads}
              disabled={loading}
              className="p-1.5 text-zinc-500 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200/80 rounded-lg transition-colors border border-zinc-200/60"
              title="Refresh Pipeline"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-zinc-950 text-white hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <span>Back to Site</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Telemetry Stat Cards */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          <div className="bg-white p-4 rounded-xl border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase tracking-wider mb-2">
              <span>Pipeline Leads</span>
              <Layers className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="text-2xl font-bold tracking-tight text-zinc-950">{stats.totalLeads}</div>
            <div className="text-[11px] text-zinc-500 mt-1">Total prospective entities</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase tracking-wider mb-2">
              <span>Deep Researched</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold tracking-tight text-zinc-950">{stats.researched + stats.qualified}</div>
            <div className="text-[11px] text-zinc-500 mt-1">Audit dossiers completed</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase tracking-wider mb-2">
              <span>High ICP Fit</span>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold tracking-tight text-emerald-600">{stats.highIcpCount}</div>
            <div className="text-[11px] text-zinc-500 mt-1">Score &gt;= 75 / 100</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase tracking-wider mb-2">
              <span>Outreach Sent</span>
              <Send className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold tracking-tight text-zinc-950">{stats.contacted}</div>
            <div className="text-[11px] text-zinc-500 mt-1">Cold pitches delivered</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase tracking-wider mb-2">
              <span>Avg ICP Score</span>
              <TrendingUp className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold tracking-tight text-zinc-950">{stats.averageIcpScore}<span className="text-sm font-normal text-zinc-400">/100</span></div>
            <div className="text-[11px] text-zinc-500 mt-1">Lead quality index</div>
          </div>
        </section>

        {/* Lead Discovery & Deep Research Console */}
        <section className="bg-white rounded-2xl border border-zinc-200/80 p-6 shadow-sm space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-zinc-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-950" />
                <h2 className="text-base font-bold text-zinc-950 tracking-tight">Autonomous Prospecting & Research Bot</h2>
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                Scours target niches, extracts decision-maker data, inspects site tech stacks, and flags operational bottlenecks for Epicrio outreach.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400">Telegram Sync:</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">
                {telegramSettings.chatId ? 'Active Alerts' : 'Needs Chat ID'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Niche Lead Finder */}
            <form onSubmit={handleDiscoverLeads} className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 uppercase tracking-wider">
                <Search className="w-3.5 h-3.5 text-zinc-500" />
                <span>Mode 1: Market & Niche Lead Discovery</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-6 space-y-1">
                  <label className="text-[11px] font-medium text-zinc-500">Target Industry / Niche</label>
                  <input
                    type="text"
                    value={searchNiche}
                    onChange={(e) => setSearchNiche(e.target.value)}
                    placeholder="e.g. Dental Clinics, Law Firms, HVAC"
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-950"
                  />
                </div>

                <div className="sm:col-span-4 space-y-1">
                  <label className="text-[11px] font-medium text-zinc-500">Target City / Region</label>
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="e.g. Austin, TX or Miami, FL"
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-950"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] font-medium text-zinc-500">Count</label>
                  <select
                    value={searchCount}
                    onChange={(e) => setSearchCount(parseInt(e.target.value))}
                    className="w-full text-xs px-2.5 py-2.5 rounded-lg border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-950"
                  >
                    <option value={2}>2 Leads</option>
                    <option value={3}>3 Leads</option>
                    <option value={5}>5 Leads</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="submit"
                  disabled={isDiscovering}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg transition-colors shadow-sm disabled:opacity-50"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isDiscovering ? 'animate-spin' : ''}`} />
                  <span>{isDiscovering ? 'Bot Running...' : 'Find & Auto-Research Leads'}</span>
                </button>
                {discoveryStatusText && (
                  <span className="text-xs text-zinc-600 font-mono animate-fade-in">
                    {discoveryStatusText}
                  </span>
                )}
              </div>
            </form>

            {/* Right: Direct Domain Deep-Research */}
            <form onSubmit={handleInstantDomainAudit} className="lg:col-span-5 space-y-4 lg:border-l lg:border-zinc-100 lg:pl-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5 text-zinc-500" />
                <span>Mode 2: Single Domain Deep Audit</span>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-500">Enter Any Business Website</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={instantDomain}
                    onChange={(e) => setInstantDomain(e.target.value)}
                    placeholder="e.g. apexdentalpartners.com"
                    className="flex-1 text-xs px-3 py-2.5 rounded-lg border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-950"
                  />
                  <button
                    type="submit"
                    disabled={isAuditingDomain || !instantDomain}
                    className="px-3.5 py-2.5 text-xs font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap border border-zinc-200"
                  >
                    {isAuditingDomain ? 'Auditing...' : 'Run Audit'}
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-zinc-400">
                Inspects real site HTML, detects booking widgets, computes ICP score, drafts cold outreach, and pushes directly to Telegram.
              </p>
            </form>
          </div>
        </section>

        {/* Lead Pipeline & Filtering Table */}
        <section className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm overflow-hidden">
          {/* Table Controls Bar */}
          <div className="p-4 sm:p-5 border-b border-zinc-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-zinc-100/80 rounded-xl overflow-x-auto text-xs font-medium">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'all'
                    ? 'bg-white text-zinc-950 shadow-sm font-semibold'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                All Prospects ({leads.length})
              </button>
              <button
                onClick={() => setActiveTab('high_icp')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'high_icp'
                    ? 'bg-white text-emerald-700 shadow-sm font-semibold'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                🔥 High ICP Fit ({leads.filter((l) => (l.icpScore || 0) >= 75).length})
              </button>
              <button
                onClick={() => setActiveTab('drafted')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'drafted'
                    ? 'bg-white text-zinc-950 shadow-sm font-semibold'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                ✉️ Ready for Send ({leads.filter((l) => l.status === 'drafted').length})
              </button>
              <button
                onClick={() => setActiveTab('contacted')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'contacted'
                    ? 'bg-white text-zinc-950 shadow-sm font-semibold'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                📬 Dispatched ({leads.filter((l) => l.status === 'contacted').length})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search leads, domains, niches..."
                className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-950"
              />
            </div>
          </div>

          {/* Leads List / Table */}
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <RefreshCw className="w-6 h-6 text-zinc-400 animate-spin mx-auto" />
              <p className="text-xs text-zinc-500 font-mono">Syncing lead intelligence pipeline...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <Bot className="w-8 h-8 text-zinc-300 mx-auto" />
              <h3 className="text-sm font-medium text-zinc-700">No leads match this view</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Use the Autonomous Prospecting Bot above or click "Find & Auto-Research Leads" to scout new prospects.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-100">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-4 sm:p-5 hover:bg-zinc-50/70 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  {/* Lead Info & Score */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h4 className="text-sm font-bold text-zinc-950 tracking-tight">
                        {lead.company}
                      </h4>
                      <a
                        href={`https://${lead.domain}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
                      >
                        <span>{lead.domain}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>

                      {/* ICP Score Pill */}
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${
                          lead.icpScore >= 80
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : lead.icpScore >= 60
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
                        }`}
                      >
                        <Zap className="w-2.5 h-2.5" />
                        <span>ICP: {lead.icpScore}/100</span>
                        <span className="text-[10px] opacity-75">({lead.icpTier})</span>
                      </span>

                      {/* Status Badge */}
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                          lead.status === 'contacted'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : lead.status === 'drafted'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : lead.status === 'qualified'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-zinc-100 text-zinc-600'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-zinc-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-zinc-400" />
                        <span className="font-medium text-zinc-700">{lead.name}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-zinc-400" />
                        <span>{lead.email}</span>
                      </span>
                      {lead.location && (
                        <span className="flex items-center gap-1">
                          <Globe className="w-3 h-3 text-zinc-400" />
                          <span>{lead.location}</span>
                        </span>
                      )}
                      <span className="text-zinc-400">• {lead.industry}</span>
                    </div>

                    {/* Detected Bottleneck & Epicrio Angle */}
                    {lead.research?.painPoints?.[0] && (
                      <div className="text-xs text-zinc-600 bg-zinc-50 rounded-lg p-2.5 border border-zinc-200/50 max-w-3xl">
                        <span className="font-semibold text-zinc-800">Detected Friction: </span>
                        <span>{lead.research.painPoints[0]}</span>
                        <span className="text-zinc-400 ml-2">→ Suggests {lead.research.suggestedService}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                    <button
                      onClick={() => {
                        setSelectedLead(lead)
                        setModalMode('dossier')
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-100 hover:bg-zinc-200/80 text-zinc-800 rounded-lg transition-colors border border-zinc-200/60 whitespace-nowrap"
                    >
                      <FileText className="w-3.5 h-3.5 text-zinc-600" />
                      <span>Dossier</span>
                    </button>

                    <button
                      onClick={() => handleOpenOutreach(lead)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-100 hover:bg-zinc-200/80 text-zinc-800 rounded-lg transition-colors border border-zinc-200/60 whitespace-nowrap"
                    >
                      <Mail className="w-3.5 h-3.5 text-zinc-600" />
                      <span>Cold Email</span>
                    </button>

                    <button
                      onClick={() => {
                        handleOpenOutreach(lead)
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg transition-colors whitespace-nowrap shadow-sm"
                    >
                      <Send className="w-3 h-3" />
                      <span>{lead.status === 'contacted' ? 'Sent' : 'Dispatch'}</span>
                    </button>

                    <button
                      onClick={() => handleDeleteLead(lead.id)}
                      className="p-1.5 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove Lead"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* MODAL 1: Lead Research Dossier */}
      {modalMode === 'dossier' && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-zinc-100 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-zinc-950">{selectedLead.company}</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    ICP Fit: {selectedLead.icpScore}/100
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-1">
                  Autonomous Web Audit • Domain: <a href={`https://${selectedLead.domain}`} target="_blank" rel="noreferrer" className="text-zinc-900 underline">{selectedLead.domain}</a>
                </p>
              </div>
              <button
                onClick={() => setModalMode(null)}
                className="text-zinc-400 hover:text-zinc-700 p-1 rounded-lg text-lg font-mono"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              {/* Executive Summary */}
              <div className="space-y-1.5">
                <span className="font-mono text-zinc-400 uppercase tracking-wider text-[10px]">Business Profile</span>
                <p className="text-zinc-700 leading-relaxed bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                  {selectedLead.research?.summary || 'Standard profile recorded.'}
                </p>
              </div>

              {/* Detected Friction / Pain Points */}
              <div className="space-y-2">
                <span className="font-mono text-zinc-400 uppercase tracking-wider text-[10px]">Detected Friction Points</span>
                <div className="space-y-1.5">
                  {selectedLead.research?.painPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-red-50/60 text-red-900 p-2.5 rounded-lg border border-red-100">
                      <AlertCircle className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Epicrio Recommendation */}
              <div className="space-y-2">
                <span className="font-mono text-zinc-400 uppercase tracking-wider text-[10px]">Recommended Epicrio Automation</span>
                <div className="bg-zinc-950 text-white p-3.5 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-bold text-sm">{selectedLead.research?.suggestedService}</span>
                  </div>
                  <p className="text-zinc-300 leading-relaxed text-xs">
                    {selectedLead.research?.epicrioOpportunity}
                  </p>
                </div>
              </div>

              {/* Tech Stack Detected */}
              <div className="space-y-2">
                <span className="font-mono text-zinc-400 uppercase tracking-wider text-[10px]">Detected Tech Stack Signals</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedLead.research?.detectedTechStack.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700 font-mono text-[11px] border border-zinc-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Extraction */}
              <div className="space-y-2 pt-2 border-t border-zinc-100">
                <span className="font-mono text-zinc-400 uppercase tracking-wider text-[10px]">Extracted Decision Maker Details</span>
                <div className="grid grid-cols-2 gap-3 bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                  <div>
                    <span className="text-zinc-400 block text-[10px]">Target Name</span>
                    <span className="font-semibold text-zinc-900">{selectedLead.name}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px]">Email Address</span>
                    <span className="font-mono text-zinc-900">{selectedLead.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
              <button
                onClick={() => handleResearchLead(selectedLead)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-950"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Re-run Deep Audit</span>
              </button>

              <button
                onClick={() => {
                  handleOpenOutreach(selectedLead)
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-zinc-950 text-white hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <span>Draft Cold Outreach</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: AI Email Outreach Studio */}
      {modalMode === 'outreach' && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden max-h-[92vh] flex flex-col">
            <div className="p-6 border-b border-zinc-100 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-zinc-950">AI Cold Outreach Studio</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-mono">
                    To: {selectedLead.email}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-1">
                  Personalized message tailored to {selectedLead.company}'s specific operational bottlenecks.
                </p>
              </div>
              <button
                onClick={() => setModalMode(null)}
                className="text-zinc-400 hover:text-zinc-700 p-1 rounded-lg text-lg font-mono"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              {/* Pitch Angle Selector */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-medium text-zinc-500">Select Pitch Strategy Angle:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleRegenerateDraft('voice_ai')}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      draftAngle === 'voice_ai'
                        ? 'bg-zinc-950 text-white border-zinc-950'
                        : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    📞 24/7 Voice AI Receptionist
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRegenerateDraft('crm_backoffice')}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      draftAngle === 'crm_backoffice'
                        ? 'bg-zinc-950 text-white border-zinc-950'
                        : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    ⚡ Odoo & Back-Office Workflows
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRegenerateDraft('operations_audit')}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      draftAngle === 'operations_audit'
                        ? 'bg-zinc-950 text-white border-zinc-950'
                        : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    🔍 20-Min Systems Audit Offer
                  </button>
                </div>
              </div>

              {/* Subject Line Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-500">Email Subject</label>
                <input
                  type="text"
                  value={draftSubject}
                  onChange={(e) => setDraftSubject(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-lg border border-zinc-200 bg-zinc-50/50 font-medium text-zinc-950 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-950"
                />
              </div>

              {/* Email Body Textarea */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-medium text-zinc-500">Email Body (Tailored Copy)</label>
                  <button
                    onClick={handleCopyBody}
                    className="inline-flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-900"
                  >
                    {copySuccess ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copySuccess ? 'Copied' : 'Copy Text'}</span>
                  </button>
                </div>
                <textarea
                  rows={10}
                  value={draftBody}
                  onChange={(e) => setDraftBody(e.target.value)}
                  className="w-full text-xs p-3 rounded-lg border border-zinc-200 bg-zinc-50/50 leading-relaxed font-sans text-zinc-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-950"
                />
              </div>

              {/* Result Message */}
              {sendResultMsg && (
                <div className="p-3 rounded-lg bg-zinc-100 text-zinc-800 border border-zinc-200 font-mono text-[11px]">
                  {sendResultMsg}
                </div>
              )}
            </div>

            <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleSendEmail(true)}
                disabled={isSendingEmail}
                className="px-3.5 py-2 text-xs font-medium text-zinc-700 bg-zinc-200/80 hover:bg-zinc-300 rounded-lg transition-colors"
              >
                Send Test Email
              </button>

              <button
                type="button"
                onClick={() => handleSendEmail(false)}
                disabled={isSendingEmail}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg transition-colors shadow-sm disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSendingEmail ? 'Dispatching...' : 'Dispatch Live Email via Resend'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Telegram Bot Settings & Live Test Center */}
      {modalMode === 'settings' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden max-h-[92vh] flex flex-col">
            <div className="p-6 border-b border-zinc-100 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-zinc-950">Telegram Bot Controller</h3>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-mono ${
                      telegramStatus.connected
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {telegramStatus.connected ? 'Connected' : 'Setup Required'}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-1">
                  Connect your personal Telegram account to receive real-time lead updates and run commands right from your phone.
                </p>
              </div>
              <button
                onClick={() => setModalMode(null)}
                className="text-zinc-400 hover:text-zinc-700 p-1 rounded-lg text-lg font-mono"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              {/* Credentials Form */}
              <div className="space-y-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200/60">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-zinc-700">Telegram Bot Token</label>
                  <input
                    type="password"
                    value={telegramSettings.botToken || ''}
                    onChange={(e) =>
                      setTelegramSettings((prev) => ({ ...prev, botToken: e.target.value }))
                    }
                    placeholder="e.g. 7123456789:AAHfkq..."
                    className="w-full text-xs px-3 py-2 rounded-lg border border-zinc-200 bg-white focus:outline-none focus:ring-1 focus:ring-zinc-950 font-mono"
                  />
                  <span className="text-[10px] text-zinc-400">Created via @BotFather on Telegram</span>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-zinc-700">Your Telegram Chat ID</label>
                  <input
                    type="text"
                    value={telegramSettings.chatId || ''}
                    onChange={(e) =>
                      setTelegramSettings((prev) => ({ ...prev, chatId: e.target.value }))
                    }
                    placeholder="e.g. 182736450"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-zinc-200 bg-white focus:outline-none focus:ring-1 focus:ring-zinc-950 font-mono"
                  />
                  <span className="text-[10px] text-zinc-400">Get your numeric ID instantly from @userinfobot</span>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleTestTelegram}
                    disabled={isTestingTelegram || !telegramSettings.botToken || !telegramSettings.chatId}
                    className="px-3.5 py-2 text-xs font-semibold bg-zinc-950 text-white hover:bg-zinc-800 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isTestingTelegram ? 'Testing...' : 'Send Live Test Ping'}
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveSettings}
                    disabled={isSavingSettings}
                    className="px-3.5 py-2 text-xs font-medium bg-zinc-200 text-zinc-800 hover:bg-zinc-300 rounded-lg transition-colors"
                  >
                    {isSavingSettings ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>

                {telegramStatus.message && (
                  <div
                    className={`p-2.5 rounded-lg text-[11px] font-mono ${
                      telegramStatus.connected
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {telegramStatus.message}
                  </div>
                )}
              </div>

              {/* Bot Commands Guide */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-zinc-950 uppercase tracking-wider font-mono">
                  Interactive Bot Commands (From your Telegram App):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-100">
                    <span className="font-mono font-bold text-zinc-900">/status</span>
                    <p className="text-zinc-500 mt-0.5">View live leads pipeline metrics</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-100">
                    <span className="font-mono font-bold text-zinc-900">/leads</span>
                    <p className="text-zinc-500 mt-0.5">List recent qualified high-ICP leads</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-100">
                    <span className="font-mono font-bold text-zinc-900">/find dental Austin</span>
                    <p className="text-zinc-500 mt-0.5">Scout new prospects right from chat</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-100">
                    <span className="font-mono font-bold text-zinc-900">/research domain.com</span>
                    <p className="text-zinc-500 mt-0.5">Deep AI company website audit</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-100">
                    <span className="font-mono font-bold text-zinc-900">/draft &lt;id&gt;</span>
                    <p className="text-zinc-500 mt-0.5">View cold outreach email draft</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-100">
                    <span className="font-mono font-bold text-zinc-900">/send &lt;id&gt;</span>
                    <p className="text-zinc-500 mt-0.5">Approve and send email via Telegram</p>
                  </div>
                </div>
              </div>

              {/* Local Dev Telegram Listener */}
              <div className="p-3.5 rounded-xl bg-zinc-900 text-white space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span className="font-semibold text-xs">Local Telegram Listener</span>
                  </div>
                  <button
                    onClick={handlePollTelegramNow}
                    className="px-2.5 py-1 text-[10px] font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded transition-colors"
                  >
                    Poll Updates Now
                  </button>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Click "Poll Updates Now" to process any commands you just sent to your bot on Telegram while developing locally.
                </p>
                {pollingLogs.length > 0 && (
                  <div className="bg-black/40 p-2 rounded text-[10px] font-mono text-emerald-400 space-y-0.5">
                    {pollingLogs.map((log, i) => (
                      <div key={i}>{log}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex justify-end">
              <button
                onClick={() => setModalMode(null)}
                className="px-4 py-2 text-xs font-semibold bg-zinc-950 text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Manual Add Lead */}
      {modalMode === 'add' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-zinc-100 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-zinc-950">Add Target Business</h3>
                <p className="text-xs text-zinc-500 mt-1">Add a prospective client to run through the research bot.</p>
              </div>
              <button
                onClick={() => setModalMode(null)}
                className="text-zinc-400 hover:text-zinc-700 p-1 text-lg font-mono"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddManualLead} className="p-6 space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-700">Company Name *</label>
                <input
                  type="text"
                  required
                  value={manualForm.company}
                  onChange={(e) => setManualForm({ ...manualForm, company: e.target.value })}
                  placeholder="e.g. Apex Dental Care"
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-950"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-700">Website / Domain</label>
                <input
                  type="text"
                  value={manualForm.domain}
                  onChange={(e) => setManualForm({ ...manualForm, domain: e.target.value })}
                  placeholder="e.g. apexdental.com"
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-950"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-zinc-700">Contact Person</label>
                  <input
                    type="text"
                    value={manualForm.name}
                    onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                    placeholder="e.g. Dr. Sarah Vance"
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-950"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-zinc-700">Email Address</label>
                  <input
                    type="email"
                    value={manualForm.email}
                    onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                    placeholder="e.g. sarah@apexdental.com"
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-950"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-700">Industry / Niche</label>
                <input
                  type="text"
                  value={manualForm.industry}
                  onChange={(e) => setManualForm({ ...manualForm, industry: e.target.value })}
                  placeholder="e.g. Healthcare, Legal, Real Estate"
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-950"
                />
              </div>

              <div className="p-4 bg-zinc-50 -mx-6 -mb-6 mt-6 border-t border-zinc-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-3.5 py-2 text-xs font-medium text-zinc-600 hover:text-zinc-950"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAddingLead}
                  className="px-4 py-2 text-xs font-semibold bg-zinc-950 text-white rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50"
                >
                  {isAddingLead ? 'Adding...' : 'Save Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
