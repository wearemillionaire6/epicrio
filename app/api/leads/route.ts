import { NextResponse } from 'next/server'
import { getLeads, saveLead, getStats } from '@/lib/leads/store'
import { Lead } from '@/lib/leads/types'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')?.toLowerCase()
    const minIcp = searchParams.get('minIcp') ? parseInt(searchParams.get('minIcp')!, 10) : undefined

    let leads = getLeads()

    if (status && status !== 'all') {
      leads = leads.filter((l) => l.status === status)
    }

    if (minIcp !== undefined) {
      leads = leads.filter((l) => (l.icpScore || 0) >= minIcp)
    }

    if (search) {
      leads = leads.filter(
        (l) =>
          l.company.toLowerCase().includes(search) ||
          l.name.toLowerCase().includes(search) ||
          l.domain.toLowerCase().includes(search) ||
          l.email.toLowerCase().includes(search) ||
          (l.industry && l.industry.toLowerCase().includes(search))
      )
    }

    const stats = getStats()

    return NextResponse.json({
      success: true,
      leads,
      stats,
    })
  } catch (error: any) {
    console.error('Error fetching leads:', error)
    return NextResponse.json({ error: error.message || 'Failed to fetch leads' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { company, domain, name, email, phone, industry, location, notes } = body

    if (!company && !domain) {
      return NextResponse.json({ error: 'Company name or domain is required' }, { status: 400 })
    }

    const newLead: Lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: name || 'Contact Person',
      company: company || (domain ? domain.split('.')[0].toUpperCase() : 'New Lead'),
      domain: domain || 'example.com',
      email: email || `contact@${domain || 'example.com'}`,
      phone: phone || '',
      industry: industry || 'Professional Services',
      location: location || 'United States',
      source: 'manual_import',
      status: 'discovered',
      icpScore: 50,
      icpTier: 'Medium Fit',
      notes: notes || '',
      telegramNotified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const saved = saveLead(newLead)
    return NextResponse.json({ success: true, lead: saved })
  } catch (error: any) {
    console.error('Error creating lead:', error)
    return NextResponse.json({ error: error.message || 'Failed to create lead' }, { status: 500 })
  }
}
