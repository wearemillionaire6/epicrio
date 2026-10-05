import { NextResponse } from 'next/server'
import { discoverLeads, researchAndRefineLead } from '@/lib/leads/researcher'
import { saveLead } from '@/lib/leads/store'
import { sendTelegramNotification } from '@/lib/telegram/bot'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { niche, location = 'United States', count = 4, autoResearchTop = true } = body

    if (!niche) {
      return NextResponse.json({ error: 'Niche or industry is required' }, { status: 400 })
    }

    // 1. Discover prospects
    const discovered = await discoverLeads({ niche, location, count })

    if (discovered.length === 0) {
      return NextResponse.json({ success: true, count: 0, leads: [] })
    }

    const savedLeads = []

    // 2. Automatically run research & refinement on the top candidate if requested
    for (let i = 0; i < discovered.length; i++) {
      let lead = discovered[i]
      if (i === 0 && autoResearchTop) {
        lead = await researchAndRefineLead(lead)
      }
      const saved = saveLead(lead)
      savedLeads.push(saved)
    }

    // 3. Notify Telegram
    const topLead = savedLeads[0]
    await sendTelegramNotification(
      `🔎 *LEAD DISCOVERY COMPLETED*\n\n` +
      `Target Niche: *${niche}* (${location})\n` +
      `Found: *${savedLeads.length} new prospects*\n\n` +
      `🌟 *Top Researched Lead:* *${topLead.company}*\n` +
      `• ICP Score: *${topLead.icpScore}/100* (${topLead.icpTier})\n` +
      `• Bottleneck: ${topLead.research?.painPoints[0] || 'Manual operations'}\n` +
      `• Recommendation: *${topLead.research?.suggestedService || 'Voice AI'}*\n\n` +
      `Review in dashboard or reply with \`/draft ${topLead.id}\``
    )

    return NextResponse.json({
      success: true,
      count: savedLeads.length,
      leads: savedLeads,
    })
  } catch (error: any) {
    console.error('Lead discovery error:', error)
    return NextResponse.json({ error: error.message || 'Discovery failed' }, { status: 500 })
  }
}
