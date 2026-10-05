import { NextResponse } from 'next/server'
import { getLeadById, saveLead } from '@/lib/leads/store'
import { sendLeadEmail, generateEmailDraft } from '@/lib/leads/outreach'
import { sendTelegramNotification } from '@/lib/telegram/bot'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, toEmail, subject, emailBody, isTest = false } = body

    if (!id) {
      return NextResponse.json({ error: 'Lead ID is required' }, { status: 400 })
    }

    const lead = getLeadById(id)
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    const draft = lead.outreach || generateEmailDraft(lead)
    const finalSubject = subject || draft.subject
    const finalBody = emailBody || draft.body
    const targetEmail = toEmail || lead.email

    // Dispatch email
    const result = await sendLeadEmail({
      lead,
      toEmail: targetEmail,
      subject: finalSubject,
      body: finalBody,
      isTest,
    })

    // Update lead record
    if (!isTest) {
      lead.status = 'contacted'
      if (!lead.outreach) lead.outreach = draft
      lead.outreach.status = 'sent'
      lead.outreach.sentAt = new Date().toISOString()
      lead.outreach.resendEmailId = result.emailId
      saveLead(lead)
    }

    // Send Telegram alert
    try {
      await sendTelegramNotification(
        `📬 *OUTREACH DISPATCHED!*\n\n` +
        `• Recipient: \`${targetEmail}\`\n` +
        `• Company: *${lead.company}*\n` +
        `• Subject: *${finalSubject}*\n` +
        `• Mode: ${result.simulated ? '⚡ Simulation Log' : '🚀 Live Delivery (Resend)'}\n` +
        `• Time: ${new Date().toLocaleTimeString()}`
      )
    } catch (tgErr) {
      console.warn('Failed to send Telegram dispatch alert:', tgErr)
    }

    return NextResponse.json({
      success: true,
      result,
      lead,
    })
  } catch (error: any) {
    console.error('Email send error:', error)
    return NextResponse.json({ error: error.message || 'Email dispatch failed' }, { status: 500 })
  }
}
