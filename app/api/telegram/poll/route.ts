import { NextResponse } from 'next/server'
import { getSettings } from '@/lib/leads/store'
import { handleTelegramUpdate } from '@/lib/telegram/bot'

let lastUpdateOffset = 0

export async function POST(request: Request) {
  try {
    const settings = getSettings()
    const token = settings.botToken || process.env.TELEGRAM_BOT_TOKEN

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Bot token not configured' },
        { status: 400 }
      )
    }

    const url = `https://api.telegram.org/bot${token}/getUpdates?offset=${lastUpdateOffset}&timeout=2`
    const res = await fetch(url)
    const data = await res.json()

    if (!data.ok) {
      return NextResponse.json(
        { success: false, message: data.description || 'Failed to poll updates' },
        { status: 400 }
      )
    }

    const updates = data.result || []
    let processedCount = 0

    for (const update of updates) {
      if (update.update_id >= lastUpdateOffset) {
        lastUpdateOffset = update.update_id + 1
      }
      try {
        await handleTelegramUpdate(update)
        processedCount++
      } catch (err) {
        console.error('Error processing update:', err)
      }
    }

    return NextResponse.json({
      success: true,
      processed: processedCount,
      totalReceived: updates.length,
      nextOffset: lastUpdateOffset,
    })
  } catch (error: any) {
    console.error('Telegram poll error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(request: Request) {
  return POST(request)
}
