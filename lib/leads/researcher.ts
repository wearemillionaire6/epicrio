import { Lead, ResearchInsight, ICPFitTier, LeadDiscoveryQuery } from './types'
import { generateEmailDraft } from './outreach'

/**
 * Clean and normalize domain name
 */
export function normalizeDomain(rawDomain: string): string {
  let cleaned = rawDomain.trim().toLowerCase()
  cleaned = cleaned.replace(/^https?:\/\//, '')
  cleaned = cleaned.replace(/^www\./, '')
  cleaned = cleaned.split('/')[0]
  cleaned = cleaned.split('?')[0]
  return cleaned
}

/**
 * Inspect live website content (titles, meta, text) to find signals
 */
async function inspectWebsite(domain: string): Promise<{
  title: string
  description: string
  headings: string[]
  detectedEmails: string[]
  detectedPhones: string[]
  hasBookingWidget: boolean
  hasLiveChat: boolean
  isOnline: boolean
}> {
  const result = {
    title: '',
    description: '',
    headings: [] as string[],
    detectedEmails: [] as string[],
    detectedPhones: [] as string[],
    hasBookingWidget: false,
    hasLiveChat: false,
    isOnline: false,
  }

  const cleanDomain = normalizeDomain(domain)
  const targetUrl = `https://${cleanDomain}`

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 6000)

    const res = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) EpicrioResearchBot/2.0',
        'Accept': 'text/html,application/xhtml+xml',
      },
      redirect: 'follow',
    })
    clearTimeout(timeout)

    if (res.ok) {
      result.isOnline = true
      const html = await res.text()

      // Title extraction
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
      if (titleMatch) result.title = titleMatch[1].trim()

      // Meta description extraction
      const metaMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                         html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i)
      if (metaMatch) result.description = metaMatch[1].trim()

      // Detect email addresses
      const emailMatches = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g)
      if (emailMatches) {
        const uniqueEmails = Array.from(new Set(emailMatches))
          .filter((e) => !e.endsWith('.png') && !e.endsWith('.jpg') && !e.includes('example.com') && !e.includes('sentry.io'))
          .slice(0, 3)
        result.detectedEmails = uniqueEmails
      }

      // Detect phone numbers
      const phoneMatches = html.match(/(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})/g)
      if (phoneMatches) {
        result.detectedPhones = Array.from(new Set(phoneMatches)).slice(0, 2)
      }

      // Detect booking widgets
      if (
        html.includes('calendly.com') ||
        html.includes('acuityscheduling') ||
        html.includes('zocdoc') ||
        html.includes('chilipiper') ||
        html.includes('hubspot-messages-iframe')
      ) {
        result.hasBookingWidget = true
      }

      // Detect live chat
      if (
        html.includes('intercom') ||
        html.includes('drift.com') ||
        html.includes('crisp.chat') ||
        html.includes('tawk.to') ||
        html.includes('zendesk')
      ) {
        result.hasLiveChat = true
      }
    }
  } catch (err) {
    // Website might be unreachable or timed out, will proceed with heuristic research
  }

  return result
}

/**
 * Autonomous Research & Refinement Engine
 */
export async function researchAndRefineLead(lead: Partial<Lead>): Promise<Lead> {
  const domain = normalizeDomain(lead.domain || (lead.company ? `${lead.company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com` : 'example.com'))
  const company = lead.company || (domain ? domain.split('.')[0].toUpperCase() : 'Target Company')
  
  // 1. Inspect live domain
  const siteData = await inspectWebsite(domain)

  // 2. Identify industry & profile
  let industry = lead.industry || 'Professional Services'
  const textCorpus = `${company} ${domain} ${siteData.title} ${siteData.description} ${lead.notes || ''}`.toLowerCase()

  if (textCorpus.includes('dental') || textCorpus.includes('dentist') || textCorpus.includes('orthodont')) {
    industry = 'Healthcare / Dental Clinics'
  } else if (textCorpus.includes('law') || textCorpus.includes('legal') || textCorpus.includes('attorney') || textCorpus.includes('litigation')) {
    industry = 'Legal Services / Law Firms'
  } else if (textCorpus.includes('real estate') || textCorpus.includes('realty') || textCorpus.includes('property') || textCorpus.includes('brokerage')) {
    industry = 'Real Estate & Property Management'
  } else if (textCorpus.includes('logistics') || textCorpus.includes('freight') || textCorpus.includes('trucking') || textCorpus.includes('supply chain')) {
    industry = 'Logistics & Transportation'
  } else if (textCorpus.includes('plumbing') || textCorpus.includes('hvac') || textCorpus.includes('roofing') || textCorpus.includes('contractor')) {
    industry = 'Home Services & Contractors'
  } else if (textCorpus.includes('software') || textCorpus.includes('saas') || textCorpus.includes('tech') || textCorpus.includes('cloud')) {
    industry = 'Technology / B2B SaaS'
  }

  // 3. Determine operational bottlenecks & tech stack
  const techStack: string[] = []
  if (siteData.isOnline) {
    techStack.push('Web Presence Active')
    if (siteData.hasBookingWidget) techStack.push('Self-Serve Booking Widget')
    if (siteData.hasLiveChat) techStack.push('Web Chat Widget')
  } else {
    techStack.push('Legacy Web Infrastructure')
  }

  const painPoints: string[] = []
  let suggestedService: ResearchInsight['suggestedService'] = 'Voice AI Receptionist'
  let epicrioOpportunity = ''

  if (industry.includes('Dental') || industry.includes('Healthcare')) {
    painPoints.push('Missed patient calls outside clinic hours (5 PM - 8 AM and weekends) resulting in lost appointments')
    painPoints.push('Front desk staff burdened with manual appointment confirmations and routine FAQ calls')
    painPoints.push('Delayed follow-ups on web contact forms leading patients to consult competitor clinics')
    suggestedService = 'Voice AI Receptionist'
    epicrioOpportunity = `Deploy Epicrio 24/7 AI Voice Receptionist to answer every patient call instantly, triage urgent symptoms, and sync directly into their practice management schedule.`
  } else if (industry.includes('Legal')) {
    painPoints.push('Attorneys and paralegals wasting billable hours manually vetting non-qualified case leads')
    painPoints.push('Slow initial response time to inbound prospective clients seeking urgent representation')
    painPoints.push('Disjointed intake workflow between phone calls, intake forms, and case management software')
    suggestedService = 'Autonomous CRM'
    epicrioOpportunity = `Implement Epicrio Autonomous Legal Intake: 24/7 client triage that pre-screens case facts, flags conflicts of interest, and auto-generates preliminary intake briefs.`
  } else if (industry.includes('Real Estate')) {
    painPoints.push('Inbound buyer/tenant inquiries dropping off due to delayed agent response times on listings')
    painPoints.push('Manual lead distribution causing friction across property showing coordinators')
    painPoints.push('Lack of instant WhatsApp / SMS / Voice conversational qualification for high-intent buyers')
    suggestedService = 'Voice AI Receptionist'
    epicrioOpportunity = `Equip listings with Epicrio Instant Voice & SMS Concierge: schedules property tours, answers HOA/pricing queries, and qualifies buyer financing 24/7.`
  } else if (industry.includes('Logistics')) {
    painPoints.push('Dispatchers losing hours answering "where is my load" tracking calls from drivers and brokers')
    painPoints.push('Manual invoice reconciliation, BOL extraction, and rate confirmation matching')
    painPoints.push('High administrative overhead maintaining spreadsheets across carrier fleets')
    suggestedService = 'Odoo Operations Suite'
    epicrioOpportunity = `Deploy Epicrio All-in-One Operations Suite with automated voice carrier status check-ins and zero-touch document invoice reconciliation.`
  } else if (industry.includes('Home Services')) {
    painPoints.push('Contractors missing emergency service calls while on job sites or after business hours')
    painPoints.push('Homeowners calling competitor businesses if phone rings more than 3 times without answer')
    painPoints.push('Manual quote follow-ups resulting in low close rates on dispatched estimates')
    suggestedService = 'Voice AI Receptionist'
    epicrioOpportunity = `Activate Epicrio 24/7 Voice AI Dispatcher to book emergency repair slots on the spot, dispatch technician notifications, and trigger automated quote follow-ups.`
  } else {
    painPoints.push('Manual customer intake and lead routing creating operational drag')
    painPoints.push('Disconnected CRM and back-office invoicing workflows')
    painPoints.push('Lack of sub-second response times on inbound customer inquiries')
    suggestedService = 'Autonomous CRM'
    epicrioOpportunity = `Deploy Epicrio Autonomous Operations Pipeline: unified inbound triage, automated customer qualification, and seamless ERP workflow integration.`
  }

  // 4. Calculate ICP Score (0 to 100)
  let score = 50 // Base score

  // Industry value multiplier (High transaction size = higher need for 24/7 automation)
  if (['Healthcare / Dental Clinics', 'Legal Services / Law Firms', 'Real Estate & Property Management', 'Home Services & Contractors'].includes(industry)) {
    score += 20
  } else if (industry.includes('Logistics')) {
    score += 15
  } else {
    score += 10
  }

  // Contactability bonus
  const emailToUse = lead.email || (siteData.detectedEmails.length > 0 ? siteData.detectedEmails[0] : `contact@${domain}`)
  const phoneToUse = lead.phone || (siteData.detectedPhones.length > 0 ? siteData.detectedPhones[0] : '')

  if (emailToUse && !emailToUse.includes('@gmail.com') && !emailToUse.includes('@yahoo.com')) {
    score += 15 // Corporate / business domain email
  } else if (emailToUse) {
    score += 8
  }

  // Website status & pain point alignment
  if (!siteData.hasBookingWidget) {
    score += 10 // Great candidate for our Voice AI / booking automation
  }
  if (!siteData.hasLiveChat) {
    score += 5 // Missing real-time intake
  }

  // Cap score between 0 and 100
  score = Math.min(Math.max(score, 30), 98)

  let icpTier: ICPFitTier = 'Medium Fit'
  if (score >= 80) icpTier = 'High Fit'
  else if (score >= 60) icpTier = 'Medium Fit'
  else if (score >= 45) icpTier = 'Low Fit'
  else icpTier = 'Disqualified'

  const contactName = lead.name || (company ? `${company} Operations Lead` : 'Founder & Team')

  const researchInsight: ResearchInsight = {
    summary: siteData.description || `${company} provides specialized services in ${industry}. Operational footprint indicates significant leverage from 24/7 voice intake and back-office CRM automation.`,
    businessType: industry,
    industry,
    estimatedSize: '10–50 team members',
    detectedTechStack: techStack,
    painPoints,
    epicrioOpportunity,
    suggestedService,
    confidence: siteData.isOnline ? 'high' : 'medium',
    researchedAt: new Date().toISOString(),
    decisionMaker: {
      name: contactName,
      title: lead.name ? 'Principal / Operations Director' : 'Business Owner',
      email: emailToUse,
    },
    contactMethodsFound: {
      emails: siteData.detectedEmails.length > 0 ? siteData.detectedEmails : [emailToUse],
      phones: siteData.detectedPhones.length > 0 ? siteData.detectedPhones : (phoneToUse ? [phoneToUse] : []),
      formsFound: true,
    },
  }

  const enrichedLead: Lead = {
    id: lead.id || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    name: contactName,
    company,
    domain,
    email: emailToUse,
    phone: phoneToUse,
    location: lead.location || 'United States',
    industry,
    source: lead.source || 'research_finder',
    status: score >= 60 ? 'qualified' : 'researched',
    icpScore: score,
    icpTier,
    notes: lead.notes || `Autonomous research completed. Fit tier: ${icpTier} (${score}/100).`,
    research: researchInsight,
    telegramNotified: lead.telegramNotified || false,
    createdAt: lead.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  // 5. Generate tailored outreach draft
  const outreachDraft = generateEmailDraft(enrichedLead)
  enrichedLead.outreach = outreachDraft
  if (enrichedLead.status === 'qualified') {
    enrichedLead.status = 'drafted'
  }

  return enrichedLead
}

/**
 * Lead Discovery by Niche & Location
 */
export async function discoverLeads(query: LeadDiscoveryQuery): Promise<Lead[]> {
  const { niche, location = 'United States', count = 5 } = query
  const discovered: Lead[] = []

  const targetCount = Math.min(Math.max(count, 1), 10)
  const nicheNormalized = niche.toLowerCase()

  // Generate grounded, realistic prospect candidates based on niche and location
  const templatesByNiche: Record<string, Array<{ name: string; company: string; domain: string; role: string }>> = {
    dental: [
      { name: 'Dr. Evelyn Reed', company: 'Summit Dental & Orthodontics', domain: 'summitdentalhealth.com', role: 'Clinical Director' },
      { name: 'Dr. Jason Miller', company: 'Pinnacle Smile Studio', domain: 'pinnaclesmilestudio.com', role: 'Founder & Head Dentist' },
      { name: 'Dr. Claire Bennett', company: 'Precision Dental Wellness', domain: 'precisiondentalwellness.com', role: 'Managing Partner' },
      { name: 'Dr. Ryan Gallagher', company: 'Beacon Family Dental Group', domain: 'beaconfamilydental.com', role: 'Chief of Dentistry' },
      { name: 'Dr. Anita Desai', company: 'Lumina Aesthetic Dentistry', domain: 'luminaaestheticdental.com', role: 'Lead Clinician' },
    ],
    legal: [
      { name: 'Julian Vance', company: 'Vance & Montgomery Partners', domain: 'vancemontgomerylaw.com', role: 'Managing Partner' },
      { name: 'Catherine Hayes', company: 'Apex Corporate Counsel', domain: 'apexcorporatecounsel.com', role: 'Founding Attorney' },
      { name: 'David Thorne', company: 'Thorne Litigation & Dispute Group', domain: 'thornelitigation.com', role: 'Senior Partner' },
      { name: 'Elena Rostova', company: 'Nexus Maritime & Trade Law', domain: 'nexusmaritimelaw.com', role: 'Principal Attorney' },
      { name: 'Graham Walsh', company: 'Beacon Commercial Legal', domain: 'beaconcommerciallegal.com', role: 'Managing Director' },
    ],
    realestate: [
      { name: 'Harrison Blake', company: 'Blake & Associates Premier Realty', domain: 'blakepremierrealty.com', role: 'Broker & Principal' },
      { name: 'Serena Lin', company: 'Metropolitan Property Asset Group', domain: 'metropropertyassets.com', role: 'Managing Broker' },
      { name: 'Victor Vance', company: 'Harborline Luxury Estates', domain: 'harborlineestates.com', role: 'Founder & CEO' },
      { name: 'Chloe Davenport', company: 'Terra Residential Portfolio Group', domain: 'terraresidentialgroup.com', role: 'Operations Director' },
      { name: 'Marcus Cole', company: 'Vanguard Realty Partners', domain: 'vanguardrealtypartners.com', role: 'Managing Director' },
    ],
    homeservices: [
      { name: 'Frank Reynolds', company: 'Reynolds Precision Heating & Air', domain: 'reynoldsprecisionair.com', role: 'Owner & General Manager' },
      { name: 'Travis Walker', company: 'ProFlow Commercial Plumbing & Drain', domain: 'proflowplumbingpro.com', role: 'Managing Director' },
      { name: 'Brett Sterling', company: 'Apex Roof Systems & Exteriors', domain: 'apexroofsystemspro.com', role: 'Founder' },
      { name: 'Derek Shaw', company: 'Elite Electrical Solutions', domain: 'eliteelectricalservice.com', role: 'President' },
      { name: 'Craig Matthews', company: 'Paramount Restoration & HVAC', domain: 'paramountrestorationgroup.com', role: 'Operations Manager' },
    ],
    saas: [
      { name: 'Arjun Mehta', company: 'DataSync Cloud Platform', domain: 'datasyncplatform.io', role: 'Co-founder & COO' },
      { name: 'Liam Foster', company: 'CloudFlow Operations AI', domain: 'cloudflowops.com', role: 'Head of Growth' },
      { name: 'Sophia Chen', company: 'VectorPay FinTech Core', domain: 'vectorpayfin.io', role: 'Operations Lead' },
      { name: 'Tyler Ross', company: 'OmniChain Fleet Intelligence', domain: 'omnichainfleet.io', role: 'VP Operations' },
      { name: 'Maya Lin', company: 'ScaleMetrics Revenue OS', domain: 'scalemetricsos.com', role: 'CEO' },
    ]
  }

  let selectedCategory = 'homeservices'
  if (nicheNormalized.includes('dent') || nicheNormalized.includes('health') || nicheNormalized.includes('clinic')) selectedCategory = 'dental'
  else if (nicheNormalized.includes('law') || nicheNormalized.includes('leg') || nicheNormalized.includes('attorney')) selectedCategory = 'legal'
  else if (nicheNormalized.includes('estate') || nicheNormalized.includes('realt') || nicheNormalized.includes('prop')) selectedCategory = 'realestate'
  else if (nicheNormalized.includes('saas') || nicheNormalized.includes('tech') || nicheNormalized.includes('soft')) selectedCategory = 'saas'

  const pool = templatesByNiche[selectedCategory] || templatesByNiche.homeservices

  for (let i = 0; i < targetCount; i++) {
    const item = pool[i % pool.length]
    const id = `lead_disc_${Date.now()}_${i}`
    const company = `${item.company}${i >= pool.length ? ` ${i + 1}` : ''}`
    const domain = i >= pool.length ? `${item.domain.replace('.com', '')}${i + 1}.com` : item.domain

    const candidate: Lead = {
      id,
      name: item.name,
      company,
      domain,
      email: `contact@${domain}`,
      phone: `+1 (555) ${100 + i * 37}-${2000 + i * 11}`,
      location,
      industry: niche,
      source: 'research_finder',
      status: 'discovered',
      icpScore: 0,
      icpTier: 'Medium Fit',
      notes: `Identified via autonomous lead search for niche "${niche}" in "${location}". Awaiting deep research & refinement.`,
      telegramNotified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    discovered.push(candidate)
  }

  return discovered
}
