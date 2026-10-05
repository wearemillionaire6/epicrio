import { NextResponse } from 'next/server'
import { getSettings, saveSettings } from '@/lib/leads/store'

export async function GET() {
  try {
    const settings = getSettings()
    // Mask sensitive token for display
    const maskedToken = settings.botToken
      ? `${settings.botToken.substring(0, 6)}...${settings.botToken.substring(settings.botToken.length - 4)}`
      : ''

    return NextResponse.json({
      success: true,
      settings: {
        ...settings,
        hasBotToken: Boolean(settings.botToken),
        maskedToken,
      },
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { botToken, chatId, autoAlertNewLeads, autoAlertHighICP, autoAlertEmailsSent } = body

    const updates: any = {}
    if (botToken !== undefined && botToken !== '') updates.botToken = botToken
    if (chatId !== undefined) updates.chatId = chatId
    if (autoAlertNewLeads !== undefined) updates.autoAlertNewLeads = autoAlertNewLeads
    if (autoAlertHighICP !== undefined) updates.autoAlertHighICP = autoAlertHighICP
    if (autoAlertEmailsSent !== undefined) updates.autoAlertEmailsSent = autoAlertEmailsSent

    const updated = saveSettings(updates)

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
      settings: {
        ...updated,
        hasBotToken: Boolean(updated.botToken),
      },
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
