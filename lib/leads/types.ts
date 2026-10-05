export type LeadStatus =
  | 'discovered'
  | 'researched'
  | 'qualified'
  | 'disqualified'
  | 'drafted'
  | 'contacted'
  | 'replied'

export type ICPFitTier = 'High Fit' | 'Medium Fit' | 'Low Fit' | 'Disqualified'

export interface ResearchInsight {
  summary: string
  businessType: string
  industry: string
  estimatedSize?: string
  detectedTechStack: string[]
  painPoints: string[]
  epicrioOpportunity: string
  suggestedService: 'Voice AI Receptionist' | 'Autonomous CRM' | 'Odoo Operations Suite' | 'Custom Enterprise'
  confidence: 'high' | 'medium' | 'low'
  researchedAt: string
  decisionMaker?: {
    name?: string
    title?: string
    email?: string
    linkedin?: string
  }
  contactMethodsFound: {
    emails: string[]
    phones: string[]
    formsFound: boolean
  }
}

export interface OutreachDraft {
  subject: string
  body: string
  followUpSubject?: string
  followUpBody?: string
  angle: 'voice_ai' | 'operations_audit' | 'crm_backoffice' | 'founder_direct'
  status: 'draft' | 'sent' | 'scheduled'
  sentAt?: string
  resendEmailId?: string
}

export interface Lead {
  id: string
  name: string
  company: string
  domain: string
  email: string
  phone?: string
  location?: string
  industry?: string
  source: 'website_inquiry' | 'research_finder' | 'manual_import' | 'telegram_bot'
  status: LeadStatus
  icpScore: number // 0 to 100
  icpTier: ICPFitTier
  notes?: string
  research?: ResearchInsight
  outreach?: OutreachDraft
  telegramNotified: boolean
  createdAt: string
  updatedAt: string
}

export interface LeadDiscoveryQuery {
  niche: string
  location?: string
  count?: number
  keywords?: string[]
}

export interface TelegramConfig {
  botToken: string
  chatId: string
  autoAlertNewLeads: boolean
  autoAlertHighICP: boolean
  autoAlertEmailsSent: boolean
  webhookConfigured?: boolean
}

export interface PipelineStats {
  totalLeads: number
  discovered: number
  researched: number
  qualified: number
  contacted: number
  highIcpCount: number
  averageIcpScore: number
}
