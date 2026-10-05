import { NextResponse } from 'next/server'
import { getLeadById, saveLead } from '@/lib/leads/store'
import { researchAndRefineLead } from '@/lib/leads/researcher'
import { sendLeadDossierToTelegram } from '@/lib/telegram/bot'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, domain, company, email, notifyTelegram = true } = body

    let targetLead = id ? getLeadById(id) : null

    if (!targetLead && !domain && !company) {
      return NextResponse.json(
        { error: 'Lead ID or company/domain is required' },
        { status: 400 }
      )
    }

    if (!targetLead) {
      targetLead = {
        id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        name: 'Operations Lead',
        company: company || (domain ? domain.split('.')[0].toUpperCase() : 'Company'),
        domain: domain || 'example.com',
        email: email || `contact@${domain || 'example.com'}`,
        source: 'research_finder',
        status: 'discovered',
        icpScore: 0,
        icpTier: 'Medium Fit',
        telegramNotified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    }

    // Run deep research & refinement
    const enriched = await researchAndRefineLead(targetLead)
    saveLead(enriched)

    // Notify Telegram with rich dossier if enabled
    if (notifyTelegram) {
      try {
        await sendLeadDossierToTelegram(enriched)
      } catch (tgErr) {
        console.warn('Telegram notification failed:', tgErr)
      }
    }

    return NextResponse.json({
      success: true,
      lead: enriched,
    })
  } catch (error: any) {
    console.error('Lead research error:', error)
    return NextResponse.json({ error: error.message || 'Research failed' }, { status: 500 })
  }
}
