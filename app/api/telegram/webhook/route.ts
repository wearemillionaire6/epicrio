import { NextResponse } from 'next/server'
import { handleTelegramUpdate } from '@/lib/telegram/bot'

export async function POST(request: Request) {
  try {
    const update = await request.json()
    const result = await handleTelegramUpdate(update)
    return NextResponse.json({ ok: true, handled: result.handled })
  } catch (error: any) {
    console.error('Telegram webhook handling error:', error)
    // Always return 200 OK to Telegram so it doesn't repeatedly retry failing webhooks
    return NextResponse.json({ ok: true, error: error.message })
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    service: 'Epicrio Telegram Bot Webhook Endpoint',
  })
}
