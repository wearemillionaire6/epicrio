import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

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

    const leadData = {
      id: `lead_${Date.now()}`,
      name,
      email,
      phone: phone || 'Not provided',
      domain: domain || 'Not provided',
      interest: interest || 'General Automation Inquiry',
      notes: notes || '',
      source,
      receivedAt: new Date().toISOString(),
    }

    // 1. Dispatch Real-Time Alert to Telegram (if configured)
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID

    if (telegramToken && telegramChatId) {
      try {
        const text = `🚨 *NEW EPICRIO LEAD!*\n\n` +
          `👤 *Name:* ${name}\n` +
          `✉️ *Email:* ${email}\n` +
          `📞 *Phone:* ${phone || 'N/A'}\n` +
          `🏢 *Website:* ${domain || 'N/A'}\n` +
          `🎯 *Interest:* ${interest}\n` +
          `${notes ? `📝 *Notes:* ${notes}\n` : ''}` +
          `📍 *Source:* ${source}\n` +
          `⏰ *Time:* ${new Date().toLocaleString()}`

        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text,
            parse_mode: 'Markdown',
          }),
        })
      } catch (err) {
        console.error('Telegram notification error:', err)
      }
    }

    // 2. Dispatch Real-Time Alert to Discord Webhook (if configured)
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
                  { name: 'Service Requested', value: interest, inline: false },
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

    // 3. Fallback: Append to local leads database so no lead is ever lost
    try {
      const leadsFilePath = path.join(process.cwd(), 'data', 'leads.json')
      const dir = path.dirname(leadsFilePath)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      let existingLeads: any[] = []
      if (fs.existsSync(leadsFilePath)) {
        const fileContent = fs.readFileSync(leadsFilePath, 'utf8')
        existingLeads = fileContent ? JSON.parse(fileContent) : []
      }
      existingLeads.unshift(leadData)
      fs.writeFileSync(leadsFilePath, JSON.stringify(existingLeads, null, 2), 'utf8')
    } catch (saveErr) {
      // In serverless environments like Vercel read-only filesystem, fallback silently
      console.log('Lead processed in memory:', leadData.id)
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully',
      leadId: leadData.id,
    })
  } catch (error) {
    console.error('Error handling lead submission:', error)
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    )
  }
}
