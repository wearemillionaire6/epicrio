import { getSettings, getLeads, getLeadById, saveLead, updateLead, getStats } from '../leads/store'
import { researchAndRefineLead, discoverLeads, normalizeDomain } from '../leads/researcher'
import { sendLeadEmail, generateEmailDraft } from '../leads/outreach'
import { Lead } from '../leads/types'

/**
 * Send a notification or message to the configured Telegram Chat
 */
export async function sendTelegramNotification(
  text: string,
  options?: {
    chatId?: string
    botToken?: string
    parseMode?: 'Markdown' | 'HTML'
    replyMarkup?: any
  }
): Promise<{ success: boolean; message: string }> {
  const settings = getSettings()
  const botToken = options?.botToken || settings.botToken || process.env.TELEGRAM_BOT_TOKEN
  const chatId = options?.chatId || settings.chatId || process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    return {
      success: false,
      message: 'Telegram Bot Token or Chat ID not configured. Please set them in Dashboard or .env.local',
    }
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: options?.parseMode || 'Markdown',
        reply_markup: options?.replyMarkup,
        disable_web_page_preview: true,
      }),
    })

    const data = await res.json()
    if (!data.ok) {
      // Fallback: If Markdown parsing failed due to unescaped characters, retry as plain text
      if (options?.parseMode === 'Markdown' && data.description?.includes('can\'t parse')) {
        const retryRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: text.replace(/[*_`\[\]()]/g, ''),
            reply_markup: options?.replyMarkup,
          }),
        })
        const retryData = await retryRes.json()
        if (retryData.ok) {
          return { success: true, message: 'Message sent successfully (plain text fallback)' }
        }
      }
      return { success: false, message: data.description || 'Failed to send Telegram message' }
    }

    return { success: true, message: 'Message sent to Telegram' }
  } catch (error: any) {
    console.error('Telegram notification network error:', error)
    return { success: false, message: error.message || 'Telegram network error' }
  }
}

/**
 * Verify credentials and send test ping
 */
export async function testTelegramConnection(
  token: string,
  chatId: string
): Promise<{ success: boolean; botName?: string; message: string }> {
  if (!token || !chatId) {
    return { success: false, message: 'Both Bot Token and Chat ID are required' }
  }

  try {
    // 1. Verify bot token
    const meRes = await fetch(`https://api.telegram.org/bot${token}/getMe`)
    const meData = await meRes.json()

    if (!meData.ok) {
      return { success: false, message: `Invalid Bot Token: ${meData.description}` }
    }

    const botName = meData.result?.username || meData.result?.first_name || 'Epicrio Bot'

    // 2. Send test message
    const testText =
      `🟢 *Epicrio Autonomous System Connected!*\n\n` +
      `Your Telegram bot @${botName} is successfully connected to Epicrio Lead Intelligence & Outreach Engine.\n\n` +
      `⚡ *Available Commands:*\n` +
      `• \`/status\` - Live pipeline telemetry\n` +
      `• \`/leads\` - View top qualified leads\n` +
      `• \`/research <domain>\` - Instant AI company audit\n` +
      `• \`/find <niche> [city]\` - Auto-discover new leads\n` +
      `• \`/send <id>\` - Approve & dispatch cold outreach\n\n` +
      `⏰ Connected at: ${new Date().toLocaleTimeString()}`

    const msgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: testText,
        parse_mode: 'Markdown',
      }),
    })

    const msgData = await msgRes.json()
    if (!msgData.ok) {
      return {
        success: false,
        message: `Bot token valid, but failed to message Chat ID: ${msgData.description}. Did you click "Start" in the bot on Telegram?`,
      }
    }

    return {
      success: true,
      botName,
      message: `Connected successfully to @${botName}! A test notification has arrived in your Telegram chat.`,
    }
  } catch (err: any) {
    return { success: false, message: err.message || 'Failed to verify Telegram credentials' }
  }
}

/**
 * Handle incoming Telegram webhook updates or polling updates
 */
export async function handleTelegramUpdate(update: any): Promise<{ handled: boolean; replyText?: string }> {
  // Handle callback queries (inline buttons clicked by user)
  if (update.callback_query) {
    const callback = update.callback_query
    const data = callback.data || ''
    const chatId = callback.message?.chat?.id

    if (data.startsWith('send_lead_')) {
      const leadId = data.replace('send_lead_', '')
      const lead = getLeadById(leadId)
      if (lead) {
        try {
          const draft = lead.outreach || generateEmailDraft(lead)
          await sendLeadEmail({
            lead,
            subject: draft.subject,
            body: draft.body,
          })
          lead.status = 'contacted'
          if (lead.outreach) {
            lead.outreach.status = 'sent'
            lead.outreach.sentAt = new Date().toISOString()
          }
          saveLead(lead)

          await sendTelegramNotification(
            `🚀 *Email Dispatched!*\n\n` +
            `Recipient: \`${lead.email}\`\n` +
            `Company: *${lead.company}*\n` +
            `Subject: *${draft.subject}*`,
            { chatId }
          )
          return { handled: true }
        } catch (err: any) {
          await sendTelegramNotification(`❌ Failed to send email: ${err.message}`, { chatId })
          return { handled: true }
        }
      }
    }

    if (data.startsWith('research_lead_')) {
      const leadId = data.replace('research_lead_', '')
      const lead = getLeadById(leadId)
      if (lead) {
        const enriched = await researchAndRefineLead(lead)
        saveLead(enriched)
        await sendLeadDossierToTelegram(enriched, chatId)
        return { handled: true }
      }
    }
  }

  // Handle standard text messages / commands
  const message = update.message
  if (!message || !message.text) return { handled: false }

  const chatId = message.chat.id
  const text = message.text.trim()

  // Command: /start or /help
  if (text === '/start' || text === '/help') {
    const reply =
      `🤖 *Epicrio Autonomous Lead & Research Bot*\n\n` +
      `I am your autonomous agency operations bot. I find targeted prospects, perform deep website audits, score ICP fit, draft hyper-personalized outreach, and send emails.\n\n` +
      `⚡ *Commands You Can Run:*\n\n` +
      `📊 \`/status\`\n` +
      `View live pipeline metrics (total leads, qualified, sent).\n\n` +
      `🔍 \`/find <niche> [city]\`\n` +
      `Auto-discover new prospective businesses.\n` +
      `_Example:_ \`/find dental Miami\` or \`/find "commercial law" Austin\`\n\n` +
      `🔬 \`/research <domain>\`\n` +
      `Run instant AI audit on any target company.\n` +
      `_Example:_ \`/research apexdentalpartners.com\`\n\n` +
      `📋 \`/leads\`\n` +
      `List top qualified leads ready for outreach.\n\n` +
      `📄 \`/lead <id>\`\n` +
      `View complete research dossier and bottlenecks.\n\n` +
      `✉️ \`/draft <id>\`\n` +
      `View cold outreach email draft.\n\n` +
      `🚀 \`/send <id>\`\n` +
      `Approve and send outreach email.\n\n` +
      `🟢 \`/test\`\n` +
      `Check bot connection.`

    await sendTelegramNotification(reply, { chatId })
    return { handled: true, replyText: reply }
  }

  // Command: /status
  if (text === '/status') {
    const stats = getStats()
    const reply =
      `📊 *Epicrio Pipeline Telemetry*\n\n` +
      `• *Total Leads Tracked:* ${stats.totalLeads}\n` +
      `• *High Fit (ICP 75+):* ${stats.highIcpCount}\n` +
      `• *Deep-Researched:* ${stats.researched}\n` +
      `• *Qualified for Outreach:* ${stats.qualified}\n` +
      `• *Outreach Dispatched:* ${stats.contacted}\n` +
      `• *Avg ICP Fit Score:* ${stats.averageIcpScore}/100\n\n` +
      `Use \`/leads\` to see top prospects or \`/find\` to discover new ones.`

    await sendTelegramNotification(reply, { chatId })
    return { handled: true, replyText: reply }
  }

  // Command: /test
  if (text === '/test') {
    const reply = `✅ Epicrio Bot is online and listening. Everything is operational!`
    await sendTelegramNotification(reply, { chatId })
    return { handled: true, replyText: reply }
  }

  // Command: /leads
  if (text === '/leads') {
    const leads = getLeads().slice(0, 6)
    if (leads.length === 0) {
      const reply = `No leads found yet. Use \`/find <niche>\` to search for prospects!`
      await sendTelegramNotification(reply, { chatId })
      return { handled: true, replyText: reply }
    }

    let reply = `📋 *Recent High-Value Prospects:*\n\n`
    for (const lead of leads) {
      const scoreEmoji = lead.icpScore >= 80 ? '🟢' : lead.icpScore >= 60 ? '🟡' : '⚪'
      reply +=
        `${scoreEmoji} *${lead.company}* (ICP: ${lead.icpScore}/100)\n` +
        `• Contact: ${lead.name} (${lead.email})\n` +
        `• Status: \`${lead.status.toUpperCase()}\` • Service: ${lead.research?.suggestedService || 'Voice AI'}\n` +
        `• View Dossier: \`/lead ${lead.id}\` | Outreach: \`/draft ${lead.id}\`\n\n`
    }

    await sendTelegramNotification(reply, { chatId })
    return { handled: true, replyText: reply }
  }

  // Command: /lead <id>
  if (text.startsWith('/lead ')) {
    const leadId = text.replace('/lead ', '').trim()
    const lead = getLeadById(leadId)
    if (!lead) {
      await sendTelegramNotification(`⚠️ Lead with ID \`${leadId}\` not found. Use \`/leads\` to list.`, { chatId })
      return { handled: true }
    }
    await sendLeadDossierToTelegram(lead, chatId)
    return { handled: true }
  }

  // Command: /draft <id>
  if (text.startsWith('/draft ')) {
    const leadId = text.replace('/draft ', '').trim()
    const lead = getLeadById(leadId)
    if (!lead) {
      await sendTelegramNotification(`⚠️ Lead with ID \`${leadId}\` not found.`, { chatId })
      return { handled: true }
    }

    const draft = lead.outreach || generateEmailDraft(lead)
    const reply =
      `✉️ *Personalized Email Draft for ${lead.company}*\n\n` +
      `*To:* \`${lead.email}\`\n` +
      `*Subject:* *${draft.subject}*\n\n` +
      `--- *Body Preview* ---\n` +
      `${draft.body}\n\n` +
      `🚀 *To send this email:* Reply with \`/send ${lead.id}\``

    await sendTelegramNotification(reply, {
      chatId,
      replyMarkup: {
        inline_keyboard: [
          [{ text: '🚀 Approve & Send Email Now', callback_data: `send_lead_${lead.id}` }],
        ],
      },
    })
    return { handled: true }
  }

  // Command: /send <id>
  if (text.startsWith('/send ')) {
    const leadId = text.replace('/send ', '').trim()
    const lead = getLeadById(leadId)
    if (!lead) {
      await sendTelegramNotification(`⚠️ Lead with ID \`${leadId}\` not found.`, { chatId })
      return { handled: true }
    }

    try {
      const draft = lead.outreach || generateEmailDraft(lead)
      const res = await sendLeadEmail({
        lead,
        subject: draft.subject,
        body: draft.body,
      })

      lead.status = 'contacted'
      if (lead.outreach) {
        lead.outreach.status = 'sent'
        lead.outreach.sentAt = new Date().toISOString()
      }
      saveLead(lead)

      const reply =
        `✅ *Outreach Sent Successfully!*\n\n` +
        `• Recipient: \`${lead.email}\`\n` +
        `• Company: *${lead.company}*\n` +
        `• Mode: ${res.simulated ? '⚡ Simulation Log' : '📬 Live Resend Delivery'}\n` +
        `• Message ID: \`${res.emailId}\``

      await sendTelegramNotification(reply, { chatId })
      return { handled: true }
    } catch (err: any) {
      await sendTelegramNotification(`❌ Send failed: ${err.message}`, { chatId })
      return { handled: true }
    }
  }

  // Command: /research <domain>
  if (text.startsWith('/research')) {
    const rawTarget = text.replace('/research', '').trim()
    if (!rawTarget) {
      await sendTelegramNotification(`⚠️ Please provide a domain or company name.\n_Example:_ \`/research stripe.com\``, { chatId })
      return { handled: true }
    }

    await sendTelegramNotification(`🔎 *Initiating Deep Research on:* \`${rawTarget}\`...\nInspecting domain, detecting tech stack, and calculating ICP fit score.`, { chatId })

    const domain = normalizeDomain(rawTarget)
    const company = domain.split('.')[0].toUpperCase()

    const enriched = await researchAndRefineLead({
      company,
      domain,
      email: `contact@${domain}`,
      source: 'telegram_bot',
    })

    saveLead(enriched)
    await sendLeadDossierToTelegram(enriched, chatId)
    return { handled: true }
  }

  // Command: /find <niche> [location]
  if (text.startsWith('/find')) {
    const args = text.replace('/find', '').trim()
    if (!args) {
      await sendTelegramNotification(
        `⚠️ Please specify a niche to search.\n_Example:_ \`/find dental Austin\` or \`/find "real estate" Miami\``,
        { chatId }
      )
      return { handled: true }
    }

    const parts = args.split(' ')
    const niche = parts[0]
    const location = parts.slice(1).join(' ') || 'United States'

    await sendTelegramNotification(`🔍 *Hunting for prospects in* _${niche}_ (${location})...`, { chatId })

    const discovered = await discoverLeads({ niche, location, count: 3 })
    if (discovered.length === 0) {
      await sendTelegramNotification(`No prospects discovered for this query.`, { chatId })
      return { handled: true }
    }

    // Auto-research top lead
    const topLead = discovered[0]
    const researchedTop = await researchAndRefineLead(topLead)

    for (const d of discovered) {
      if (d.id === topLead.id) {
        saveLead(researchedTop)
      } else {
        saveLead(d)
      }
    }

    let summaryText =
      `🎯 *Discovered ${discovered.length} New Prospects!*\n\n` +
      `🌟 *Top Researched Lead:* *${researchedTop.company}*\n` +
      `• ICP Score: *${researchedTop.icpScore}/100* (${researchedTop.icpTier})\n` +
      `• Contact: ${researchedTop.name} (\`${researchedTop.email}\`)\n` +
      `• Bottleneck: ${researchedTop.research?.painPoints[0] || 'Manual intake'}\n` +
      `• Solution: *${researchedTop.research?.suggestedService}*\n\n` +
      `🚀 *Next Steps:* View draft with \`/draft ${researchedTop.id}\` or approve send with \`/send ${researchedTop.id}\``

    await sendTelegramNotification(summaryText, {
      chatId,
      replyMarkup: {
        inline_keyboard: [
          [{ text: '✉️ View Email Draft', callback_data: `send_lead_${researchedTop.id}` }],
        ],
      },
    })
    return { handled: true }
  }

  return { handled: false }
}

/**
 * Helper to render and push a full lead dossier to Telegram
 */
export async function sendLeadDossierToTelegram(lead: Lead, targetChatId?: string) {
  const research = lead.research
  const scoreIcon = lead.icpScore >= 80 ? '🔥' : lead.icpScore >= 60 ? '⚡' : '❄️'

  const message =
    `${scoreIcon} *LEAD INTELLIGENCE DOSSIER*\n\n` +
    `🏢 *Company:* ${lead.company} (\`${lead.domain}\`)\n` +
    `👤 *Contact:* ${lead.name} • \`${lead.email}\`\n` +
    `🎯 *ICP Fit Score:* *${lead.icpScore}/100* — _${lead.icpTier}_\n` +
    `💼 *Industry:* ${lead.industry}\n` +
    `🛠 *Tech Stack:* ${research?.detectedTechStack.join(', ') || 'Standard'}\n\n` +
    `⚠️ *Key Friction Points Detected:*\n` +
    `${research?.painPoints.map((p) => `• ${p}`).join('\n') || 'None recorded'}\n\n` +
    `💡 *Epicrio Recommendation:*\n` +
    `*${research?.suggestedService}:* ${research?.epicrioOpportunity}\n\n` +
    `🆔 *Lead ID:* \`${lead.id}\`\n` +
    `Commands: \`/draft ${lead.id}\` or \`/send ${lead.id}\``

  await sendTelegramNotification(message, {
    chatId: targetChatId,
    replyMarkup: {
      inline_keyboard: [
        [{ text: '✉️ View & Approve Email Draft', callback_data: `send_lead_${lead.id}` }],
      ],
    },
  })
}

/**
 * Real-time notification helper when an inbound inquiry arrives
 */
export async function notifyNewWebsiteInbound(lead: Lead) {
  const settings = getSettings()
  if (!settings.autoAlertNewLeads) return

  const text =
    `🚨 *NEW INBOUND EPICRIO INQUIRY!*\n\n` +
    `👤 *Name:* ${lead.name}\n` +
    `✉️ *Email:* \`${lead.email}\`\n` +
    `📞 *Phone:* ${lead.phone || 'N/A'}\n` +
    `🏢 *Company / Domain:* ${lead.domain || lead.company}\n` +
    `🎯 *ICP Fit Score:* *${lead.icpScore}/100* (${lead.icpTier})\n` +
    `💡 *Suggested Service:* ${lead.research?.suggestedService || 'Autonomous Operations'}\n` +
    `⏰ *Received:* ${new Date().toLocaleTimeString()}\n\n` +
    `View details: \`/lead ${lead.id}\` | Send pitch: \`/send ${lead.id}\``

  await sendTelegramNotification(text)
}
