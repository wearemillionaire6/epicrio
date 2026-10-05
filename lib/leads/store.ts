import fs from 'fs'
import path from 'path'
import { Lead, TelegramConfig, PipelineStats } from './types'

const DATA_DIR = path.join(process.cwd(), 'data')
const LEADS_FILE = path.join(DATA_DIR, 'leads.json')
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json')

function ensureDirectoryExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

const DEFAULT_SETTINGS: TelegramConfig = {
  botToken: process.env.TELEGRAM_BOT_TOKEN || '',
  chatId: process.env.TELEGRAM_CHAT_ID || '',
  autoAlertNewLeads: true,
  autoAlertHighICP: true,
  autoAlertEmailsSent: true,
  webhookConfigured: false,
}

const SEED_LEADS: Lead[] = [
  {
    id: 'lead_dental_01',
    name: 'Dr. Sarah Vance',
    company: 'Apex Dental Partners & Aesthetics',
    domain: 'apexdentalpartners.com',
    email: 'contact@apexdentalpartners.com',
    phone: '+1 (512) 890-4120',
    location: 'Austin, TX',
    industry: 'Healthcare / Dental Clinics',
    source: 'research_finder',
    status: 'qualified',
    icpScore: 94,
    icpTier: 'High Fit',
    notes: 'Multi-location dental practice. High call volume during lunch and evening hours. Zero automated call handling after 5:00 PM.',
    research: {
      summary: 'High-ticket cosmetic & restorative dentistry practice with 3 locations in Greater Austin. Website features static booking request forms with manual staff confirmation delays.',
      businessType: 'Medical & Dental Clinic',
      industry: 'Healthcare / Dental',
      estimatedSize: '15-40 employees',
      detectedTechStack: ['WordPress', 'Gravity Forms', 'Legacy VoIP', 'OpenDental'],
      painPoints: [
        'No 24/7 call receptionist — missed emergency and after-hours booking requests',
        'Staff spends 3.5+ hours/day manually calling back patients to confirm appointments',
        'No automated CRM pipeline sync between phone inquiries and booking software'
      ],
      epicrioOpportunity: 'Deploy Epicrio 24/7 AI Voice Receptionist to handle inbound patient intake, triage dental emergencies, and instantly sync scheduled slots into OpenDental.',
      suggestedService: 'Voice AI Receptionist',
      confidence: 'high',
      researchedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      decisionMaker: {
        name: 'Dr. Sarah Vance',
        title: 'Managing Partner & Clinical Director',
        email: 'dr.vance@apexdentalpartners.com'
      },
      contactMethodsFound: {
        emails: ['contact@apexdentalpartners.com', 'dr.vance@apexdentalpartners.com'],
        phones: ['+1 (512) 890-4120'],
        formsFound: true
      }
    },
    outreach: {
      subject: 'Quick question regarding Apex Dental after-hours patient intake',
      body: `Hi Dr. Vance,

I came across Apex Dental while researching high-performing dental groups in Austin — your patient reviews for cosmetic restoration are outstanding.

I noticed that outside clinic hours (post-5:00 PM and weekends), new patient inquiries go directly to voicemail or a static form. For emergency dentistry and high-ticket smile consultations, data shows up to 62% of patients call the next clinic on Google rather than leaving a message.

At Epicrio, we build autonomous 24/7 AI Voice Receptionists engineered specifically for dental practices. Our voice agent:
• Answers every inbound call with sub-second, natural human cadence
• Qualifies patient treatment interest and insurance tier
• Books consultations directly into your scheduling software without staff involvement

Would you be open to hearing a 30-second live demo tailored with Apex Dental's clinic protocols?

Best regards,
Bhavesh • Epicrio Autonomous Operations
https://epicrio.com`,
      followUpSubject: 'Re: Quick question regarding Apex Dental after-hours patient intake',
      followUpBody: `Hi Dr. Vance,

Circling back quickly on this — we recently set up an autonomous voice receptionist for a multi-chair dental practice that recaptured 28 booked appointments in month one that would have otherwise gone to voicemail.

Happy to send over a 2-minute workflow breakdown or let you test-call a live practice sandbox. Does Thursday afternoon suit?

Best,
Bhavesh`,
      angle: 'voice_ai',
      status: 'draft'
    },
    telegramNotified: true,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'lead_legal_02',
    name: 'Marcus Sterling',
    company: 'Sterling & Croft Litigation',
    domain: 'sterlingcroftlaw.com',
    email: 'msterling@sterlingcroftlaw.com',
    phone: '+1 (305) 555-0199',
    location: 'Miami, FL',
    industry: 'Legal Services / Law Firms',
    source: 'research_finder',
    status: 'drafted',
    icpScore: 89,
    icpTier: 'High Fit',
    notes: 'Boutique corporate and civil litigation firm. Incurring high retainer churn on initial case vetting.',
    research: {
      summary: 'High-growth litigation practice handling commercial dispute cases. Current intake is gated by an overburdened paralegal staff conducting manual qualification interviews.',
      businessType: 'Law Firm & Legal Counsel',
      industry: 'Legal Services',
      estimatedSize: '8-20 attorneys',
      detectedTechStack: ['Squarespace', 'Clio CRM', 'Zendesk Chat'],
      painPoints: [
        'Attorneys losing billable hours filtering out non-viable case leads',
        'Intake intake forms lack automated conflict-of-interest pre-screening',
        'Lead response time averages 4 hours during court sessions'
      ],
      epicrioOpportunity: 'Implement Epicrio Autonomous Client Triage: automated conversational intake agent that vets case jurisdiction, pre-screens facts, and creates pre-formatted case briefs directly in Clio.',
      suggestedService: 'Autonomous CRM',
      confidence: 'high',
      researchedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      decisionMaker: {
        name: 'Marcus Sterling',
        title: 'Senior Managing Partner',
        email: 'msterling@sterlingcroftlaw.com'
      },
      contactMethodsFound: {
        emails: ['msterling@sterlingcroftlaw.com', 'intake@sterlingcroftlaw.com'],
        phones: ['+1 (305) 555-0199'],
        formsFound: true
      }
    },
    outreach: {
      subject: 'Automating case qualification at Sterling & Croft',
      body: `Hi Marcus,

I noticed Sterling & Croft's recent litigation advisory expansions in South Florida — congratulations on the momentum.

Managing high-volume litigation inquiries often creates an expensive bottleneck where senior staff spend hours screening out unviable claims or basic jurisdiction inquiries.

We build autonomous intake infrastructure for modern legal practices. The system conducts preliminary intake, checks case qualification parameters, and delivers organized case summaries into your CRM (like Clio) before an attorney ever picks up the phone.

Would you be open to seeing how other commercial litigation firms reduced initial intake time by 75%?

Warm regards,
Bhavesh • Epicrio`,
      angle: 'operations_audit',
      status: 'draft'
    },
    telegramNotified: true,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'lead_inbound_03',
    name: 'David Keller',
    company: 'Keller Logistics & Freight',
    domain: 'kellerfreight.io',
    email: 'david@kellerfreight.io',
    phone: '+1 (415) 800-9921',
    location: 'Chicago, IL',
    industry: 'Logistics / Supply Chain',
    source: 'website_inquiry',
    status: 'researched',
    icpScore: 82,
    icpTier: 'High Fit',
    notes: 'Submitted inquiry via Epicrio website. Interested in back-office dispatch automation & automated ERP invoicing.',
    research: {
      summary: 'Regional freight brokerage coordinating 120+ monthly carrier dispatches. Heavy reliance on manual spreadsheets, PDF invoice extraction, and driver SMS status calls.',
      businessType: 'Freight Brokerage & Fleet Dispatch',
      industry: 'Logistics',
      estimatedSize: '25-60 employees',
      detectedTechStack: ['Custom Portal', 'QuickBooks Desktop', 'Dialpad'],
      painPoints: [
        'Manual proof-of-delivery (POD) document processing and rate confirmation matching',
        'Carrier dispatchers spending 40% of their workday answering "where is my load" phone calls',
        'Delayed invoice dispatch causing 45-day payment collection cycles'
      ],
      epicrioOpportunity: 'Deploy Epicrio All-in-One Operations Suite (Odoo ERP backend + automated voice/SMS status bot for carriers + zero-touch invoice reconciliation).',
      suggestedService: 'Odoo Operations Suite',
      confidence: 'medium',
      researchedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
      decisionMaker: {
        name: 'David Keller',
        title: 'Director of Operations',
        email: 'david@kellerfreight.io'
      },
      contactMethodsFound: {
        emails: ['david@kellerfreight.io'],
        phones: ['+1 (415) 800-9921'],
        formsFound: true
      }
    },
    outreach: {
      subject: 'Blueprint for Keller Freight — Autonomous Dispatch & Invoice Flow',
      body: `Hi David,

Thanks for submitting an inquiry through Epicrio.

Our team reviewed Keller Freight's dispatch footprint. Coordinating rate confirmations, proof-of-deliveries, and invoice matching manually creates massive overhead as carrier volumes scale.

We have drafted a custom architecture map showing how an autonomous dispatch & Odoo ERP workflow will automate load tracking calls and drop invoice generation latency down to minutes.

Let's review the blueprint on a 20-minute architecture review:
https://epicrio-git-main-wearemillionaire6-3440s-projects.vercel.app/book

Best,
Bhavesh • Epicrio Operations Engineering`,
      angle: 'crm_backoffice',
      status: 'draft'
    },
    telegramNotified: true,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  }
]

export function getLeads(): Lead[] {
  ensureDirectoryExists()
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(SEED_LEADS, null, 2), 'utf8')
    return SEED_LEADS
  }
  try {
    const raw = fs.readFileSync(LEADS_FILE, 'utf8')
    if (!raw.trim()) {
      fs.writeFileSync(LEADS_FILE, JSON.stringify(SEED_LEADS, null, 2), 'utf8')
      return SEED_LEADS
    }
    return JSON.parse(raw) as Lead[]
  } catch (err) {
    console.error('Error reading leads file:', err)
    return SEED_LEADS
  }
}

export function saveAllLeads(leads: Lead[]): void {
  ensureDirectoryExists()
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8')
}

export function getLeadById(id: string): Lead | undefined {
  const leads = getLeads()
  return leads.find((l) => l.id === id)
}

export function saveLead(lead: Lead): Lead {
  const leads = getLeads()
  const existingIdx = leads.findIndex((l) => l.id === lead.id)
  const now = new Date().toISOString()
  
  if (existingIdx >= 0) {
    leads[existingIdx] = {
      ...leads[existingIdx],
      ...lead,
      updatedAt: now,
    }
  } else {
    leads.unshift({
      ...lead,
      createdAt: lead.createdAt || now,
      updatedAt: now,
    })
  }
  
  saveAllLeads(leads)
  return lead
}

export function updateLead(id: string, updates: Partial<Lead>): Lead | null {
  const leads = getLeads()
  const idx = leads.findIndex((l) => l.id === id)
  if (idx === -1) return null
  
  leads[idx] = {
    ...leads[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  
  saveAllLeads(leads)
  return leads[idx]
}

export function deleteLead(id: string): boolean {
  const leads = getLeads()
  const filtered = leads.filter((l) => l.id !== id)
  if (filtered.length === leads.length) return false
  saveAllLeads(filtered)
  return true
}

export function getSettings(): TelegramConfig {
  ensureDirectoryExists()
  if (!fs.existsSync(SETTINGS_FILE)) {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2), 'utf8')
    return DEFAULT_SETTINGS
  }
  try {
    const raw = fs.readFileSync(SETTINGS_FILE, 'utf8')
    const saved = JSON.parse(raw)
    return {
      ...DEFAULT_SETTINGS,
      ...saved,
      botToken: saved.botToken || process.env.TELEGRAM_BOT_TOKEN || '',
      chatId: saved.chatId || process.env.TELEGRAM_CHAT_ID || '',
    }
  } catch (err) {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(settings: Partial<TelegramConfig>): TelegramConfig {
  ensureDirectoryExists()
  const current = getSettings()
  const merged = { ...current, ...settings }
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(merged, null, 2), 'utf8')
  return merged
}

export function getStats(): PipelineStats {
  const leads = getLeads()
  const totalLeads = leads.length
  const discovered = leads.filter((l) => l.status === 'discovered').length
  const researched = leads.filter((l) => l.status === 'researched').length
  const qualified = leads.filter((l) => l.status === 'qualified' || l.status === 'drafted' || l.status === 'contacted').length
  const contacted = leads.filter((l) => l.status === 'contacted').length
  const highIcpCount = leads.filter((l) => l.icpScore >= 75).length
  const totalScore = leads.reduce((acc, l) => acc + (l.icpScore || 0), 0)
  const averageIcpScore = totalLeads > 0 ? Math.round(totalScore / totalLeads) : 0

  return {
    totalLeads,
    discovered,
    researched,
    qualified,
    contacted,
    highIcpCount,
    averageIcpScore,
  }
}
