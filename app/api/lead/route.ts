import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { saveLead } from '@/lib/leads/store'
import { researchAndRefineLead } from '@/lib/leads/researcher'
import { notifyNewWebsiteInbound, sendTelegramNotification } from '@/lib/telegram/bot'
import { Lead } from '@/lib/leads/types'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, domain, interest, notes, source = 'website' } = body

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const leadId = `lead_${Date.now()}`
    const rawLead: Lead = {
      id: leadId,
      name,
      email,
      phone: phone || '',
      company: domain ? domain.split('.')[0].toUpperCase() : name,
      domain: domain || 'Not provided',
      industry: interest || 'General Business Operations',
      source: 'website_inquiry',
      status: 'discovered',
      icpScore: 70,
      icpTier: 'Medium Fit',
      notes: notes || `Inquiry Interest: ${interest}`,
      telegramNotified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // 1. Run Autonomous Lead Research & Refinement
    let enrichedLead = rawLead
    try {
      enrichedLead = await researchAndRefineLead(rawLead)
    } catch (researchErr) {
      console.warn('Inbound research warning:', researchErr)
    }

    // Save into unified lead pipeline
    try {
      saveLead(enrichedLead)
    } catch (saveErr) {
      console.warn('Inbound lead save warning:', saveErr)
    }

    // 2. Dispatch Real-Time Alert to Telegram (with ICP Score & Insights)
    try {
      await notifyNewWebsiteInbound(enrichedLead)
    } catch (tgErr) {
      console.error('Telegram notification error:', tgErr)
    }

    // 3. Dispatch Real-Time Alert to Discord Webhook (if configured)
    const discordWebhook = process.env.DISCORD_WEBHOOK_URL
    if (discordWebhook) {
      try {
        await fetch(discordWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: 'Epicrio Lead Bot',
            embeds: [
              {
                title: '⚡ New Client Inquiry Received',
                color: 0x09090b,
                fields: [
                  { name: 'Name', value: name, inline: true },
                  { name: 'Email', value: email, inline: true },
                  { name: 'Phone', value: phone || 'N/A', inline: true },
                  { name: 'Company', value: domain || 'N/A', inline: true },
                  { name: 'ICP Score', value: `${enrichedLead.icpScore}/100 (${enrichedLead.icpTier})`, inline: true },
                  { name: 'Service Requested', value: interest || 'Operations Suite', inline: false },
                  ...(notes ? [{ name: 'Client Notes', value: notes, inline: false }] : []),
                ],
                footer: { text: `Epicrio Lead Capture • ${new Date().toLocaleTimeString()}` },
              },
            ],
          }),
        })
      } catch (err) {
        console.error('Discord webhook error:', err)
      }
    }

    // 4. Send Automated Branded Confirmation Email (to the CLIENT)
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey)
        const senderEmail = process.env.RESEND_FROM_EMAIL || 'Epicrio <onboarding@resend.dev>'

        const confirmationHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inquiry Confirmation - Epicrio</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAFAF8; color: #1A1A1E; margin: 0; padding: 40px 20px;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          <!-- Header -->
          <tr>
            <td style="padding: 28px 36px; border-bottom: 1px solid #F0F0F0;">
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="width: 32px; height: 32px; background-color: #09090B; border-radius: 8px; text-align: center; vertical-align: middle;">
                    <span style="color: #FFFFFF; font-weight: bold; font-size: 16px; line-height: 32px;">E</span>
                  </td>
                  <td style="padding-left: 12px;">
                    <span style="font-size: 18px; font-weight: 700; color: #09090B; letter-spacing: -0.03em;">Epicrio™</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Content Body -->
          <tr>
            <td style="padding: 36px 36px 28px 36px;">
              <h1 style="font-size: 22px; font-weight: 700; color: #09090B; margin: 0 0 16px 0; letter-spacing: -0.025em; line-height: 1.3;">
                We've received your operations inquiry.
              </h1>
              <p style="font-size: 15px; line-height: 1.6; color: #52525B; margin: 0 0 18px 0;">
                Hi ${name},
              </p>
              <p style="font-size: 15px; line-height: 1.6; color: #52525B; margin: 0 0 24px 0;">
                Thank you for reaching out to Epicrio. Our engineering team has received your request and is currently analyzing your operational workflow to design a custom automation roadmap.
              </p>

              <!-- Submission Summary Card -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F8F8F6; border: 1px solid #EAEAEA; border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="font-size: 13px; color: #71717A; padding-bottom: 8px; width: 120px; font-weight: 600;">Solution:</td>
                        <td style="font-size: 13px; color: #18181B; padding-bottom: 8px; font-weight: 600;">${interest || 'Operations Suite'}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; color: #71717A; padding-bottom: 8px; font-weight: 600;">Company:</td>
                        <td style="font-size: 13px; color: #18181B; padding-bottom: 8px;">${domain || 'Direct Submission'}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; color: #71717A; font-weight: 600;">Status:</td>
                        <td style="font-size: 13px; color: #18181B;">Under Engineering Review (24-Hour SLA)</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="font-size: 14px; line-height: 1.6; color: #52525B; margin: 0 0 20px 0;">
                You will receive your custom operations feasibility blueprint directly at this email address within <strong>24 hours</strong>.
              </p>
              <p style="font-size: 14px; line-height: 1.6; color: #52525B; margin: 0 0 24px 0;">
                Need to fast-track your audit or speak directly with our team right now?
              </p>

              <!-- CTA Button -->
              <table border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td align="center" style="background-color: #09090B; border-radius: 50px;">
                    <a href="https://epicrio-git-main-wearemillionaire6-3440s-projects.vercel.app/book" target="_blank" style="display: inline-block; padding: 13px 28px; font-size: 13px; font-weight: 600; color: #FFFFFF; text-decoration: none; border-radius: 50px;">
                      Schedule a 20-Min Call &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin-top: 28px; font-size: 13px; color: #71717A; line-height: 1.5;">
                Warm regards,<br>
                <strong style="color: #09090B;">The Epicrio Team</strong><br>
                <span style="font-size: 12px; color: #A1A1AA;">Autonomous Business Operations &amp; Automation Platform</span>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 36px; background-color: #FAFAF8; border-top: 1px solid #F0F0F0; text-align: center;">
              <p style="font-size: 11px; color: #A1A1AA; margin: 0;">
                &copy; 2026 Epicrio. All rights reserved. • This is an automated receipt of your request.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

        await resend.emails.send({
          from: senderEmail,
          to: email,
          subject: 'We received your inquiry — Epicrio Operations Blueprint',
          html: confirmationHtml,
        })
      } catch (emailErr) {
        console.error('Confirmation email error:', emailErr)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry processed and enriched successfully',
      leadId: enrichedLead.id,
      icpScore: enrichedLead.icpScore,
      icpTier: enrichedLead.icpTier,
    })
  } catch (error) {
    console.error('Error handling lead submission:', error)
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    )
  }
}
