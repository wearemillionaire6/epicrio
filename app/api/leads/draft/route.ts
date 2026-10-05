import { NextResponse } from 'next/server'
import { getLeadById, saveLead } from '@/lib/leads/store'
import { generateEmailDraft } from '@/lib/leads/outreach'
import { OutreachDraft } from '@/lib/leads/types'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, angle = 'voice_ai' } = body

    if (!id) {
      return NextResponse.json({ error: 'Lead ID is required' }, { status: 400 })
    }

    const lead = getLeadById(id)
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    const draft = generateEmailDraft(lead, angle as OutreachDraft['angle'])
    lead.outreach = draft
    if (lead.status === 'discovered' || lead.status === 'researched' || lead.status === 'qualified') {
      lead.status = 'drafted'
    }

    saveLead(lead)

    return NextResponse.json({
      success: true,
      lead,
      outreach: draft,
    })
  } catch (error: any) {
    console.error('Draft generation error:', error)
    return NextResponse.json({ error: error.message || 'Draft generation failed' }, { status: 500 })
  }
}
