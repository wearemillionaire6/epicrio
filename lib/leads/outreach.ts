import { Resend } from 'resend'
import { Lead, OutreachDraft } from './types'

export function generateEmailDraft(
  lead: Lead,
  angle: OutreachDraft['angle'] = 'voice_ai'
): OutreachDraft {
  const company = lead.company || 'your team'
  const contactName = lead.name ? lead.name.split(' ')[0] : 'there'
  const industry = lead.industry || 'your industry'
  const bottleneck =
    lead.research?.painPoints?.[0] || 'manual operational bottlenecks and delayed response times'
  const epicrioAngle =
    lead.research?.epicrioOpportunity ||
    'autonomous 24/7 client intake and voice receptionist infrastructure'

  let subject = `Quick question regarding ${company}'s operations`
  let body = ''
  let followUpSubject = `Re: Quick question regarding ${company}'s operations`
  let followUpBody = ''

  if (angle === 'voice_ai' || lead.research?.suggestedService === 'Voice AI Receptionist') {
    subject = `Quick question regarding ${company}'s after-hours call intake`
    followUpSubject = `Re: Quick question regarding ${company}'s after-hours call intake`
    body = `Hi ${contactName},

I came across ${company} while analyzing operational response times across ${industry}.

I noticed that outside standard operating hours, inbound customer calls often route to voicemail or static inquiry forms. In high-intent service sectors, data shows over 60% of prospective clients simply call the next available provider rather than waiting for a callback.

At Epicrio, we build autonomous 24/7 AI Voice Receptionists for high-performing businesses. Our voice agents:
• Answer inbound calls instantly with natural, human-grade conversational intelligence
• Qualify customer intent and handle routine FAQs
• Schedule booked consultations directly into your calendar/CRM with zero staff latency

Would you be open to hearing a brief 30-second live demo tailored to ${company}'s exact workflow?

Warm regards,
Bhavesh • Epicrio Autonomous Operations
https://epicrio-git-main-wearemillionaire6-3440s-projects.vercel.app/book`

    followUpBody = `Hi ${contactName},

Circling back briefly on this — we recently set up an autonomous voice receptionist for a service team that recaptured 24+ qualified appointments in month one that would have otherwise slipped into voicemail.

Happy to send over a 2-minute workflow breakdown or let you test-call a live practice sandbox. Does Thursday afternoon suit?

Best,
Bhavesh`
  } else if (angle === 'crm_backoffice' || lead.research?.suggestedService === 'Odoo Operations Suite') {
    subject = `Automating ${company}'s back-office dispatch & invoicing flow`
    followUpSubject = `Re: Automating ${company}'s back-office dispatch & invoicing flow`
    body = `Hi ${contactName},

I was reviewing ${company}'s operational footprint in ${industry}.

Many teams scaling to your size find themselves losing dozens of weekly hours to manual data re-entry, disconnected CRM pipelines, and delayed invoicing reconciliations.

Epicrio engineers autonomous back-office infrastructure (including unified Odoo ERP pipelines and automated CRM sync). We replace manual spreadsheet tracking with zero-touch operational flows that run continuously in the background.

Would you be open to reviewing a custom systems architecture blueprint for ${company}?

Best regards,
Bhavesh • Epicrio Engineering Team
https://epicrio-git-main-wearemillionaire6-3440s-projects.vercel.app/audit`

    followUpBody = `Hi ${contactName},

Wanted to follow up on this — we put together a rapid 20-minute audit framework that maps out exactly where operations teams are leaking billable hours.

Would love to share the framework with you or your ops lead this week if you have a quick 10 minutes.

Best,
Bhavesh`
  } else {
    subject = `Systems bottleneck audit for ${company}`
    followUpSubject = `Re: Systems bottleneck audit for ${company}`
    body = `Hi ${contactName},

Reaching out because our engineering team at Epicrio analyzed operational response times across ${industry}.

We identified that ${bottleneck.toLowerCase()} can create significant revenue leakage as lead volume grows.

${epicrioAngle}

We typically map this out in a 20-minute operational audit and build the solution end-to-end.

Would you be open to a quick conversation this week?

Warmly,
Bhavesh • Epicrio Autonomous Operations`

    followUpBody = `Hi ${contactName},

Just following up to see if eliminating ${bottleneck.toLowerCase()} is on your radar for this quarter?

Happy to share a quick case study of how we eliminated this for a similar team. Let me know if you'd like to take a look.

Best,
Bhavesh`
  }

  return {
    subject,
    body,
    followUpSubject,
    followUpBody,
    angle,
    status: 'draft',
  }
}

export async function sendLeadEmail(params: {
  lead: Lead
  toEmail?: string
  subject: string
  body: string
  isTest?: boolean
}): Promise<{ success: boolean; message: string; emailId?: string; simulated?: boolean }> {
  const { lead, subject, body, isTest = false } = params
  const recipient = params.toEmail || lead.email

  if (!recipient) {
    throw new Error('Recipient email address is required')
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const senderEmail = process.env.RESEND_FROM_EMAIL || 'Epicrio <onboarding@resend.dev>'

  if (!resendApiKey) {
    // Graceful simulation mode when API key is not yet configured in env
    return {
      success: true,
      simulated: true,
      message: `[Simulation Mode] Email drafted and simulated for ${recipient}. To send live emails, configure RESEND_API_KEY in your .env.local file.`,
      emailId: `sim_${Date.now()}`,
    }
  }

  try {
    const resend = new Resend(resendApiKey)
    const formattedHtml = `
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #18181b; padding: 24px; max-width: 600px;">
  ${body.split('\n\n').map(p => `<p style="margin-bottom: 16px;">${p.replace(/\n/g, '<br/>')}</p>`).join('')}
  <hr style="border: 0; border-top: 1px solid #e4e4e7; margin: 32px 0 16px 0;" />
  <p style="font-size: 12px; color: #71717a;">
    Epicrio™ Autonomous Operations Infrastructure • Sent via Epicrio Outreach Engine
  </p>
</body>
</html>
`

    const response = await resend.emails.send({
      from: senderEmail,
      to: recipient,
      subject,
      html: formattedHtml,
      text: body,
    })

    return {
      success: true,
      message: `Email successfully delivered to ${recipient}`,
      emailId: (response as any)?.data?.id || (response as any)?.id || `resend_${Date.now()}`,
    }
  } catch (error: any) {
    console.error('Resend email dispatch error:', error)
    throw new Error(`Email dispatch failed: ${error.message || 'Unknown error'}`)
  }
}
