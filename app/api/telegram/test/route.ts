import { NextResponse } from 'next/server'
import { testTelegramConnection } from '@/lib/telegram/bot'
import { getSettings } from '@/lib/leads/store'

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const settings = getSettings()

    const token = body.botToken || settings.botToken || process.env.TELEGRAM_BOT_TOKEN
    const chatId = body.chatId || settings.chatId || process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Both Bot Token and Chat ID are required to run a test.',
        },
        { status: 400 }
      )
    }

    const testResult = await testTelegramConnection(token, chatId)
    return NextResponse.json(testResult)
  } catch (error: any) {
    console.error('Telegram test error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Telegram test failed' },
      { status: 500 }
    )
  }
}
