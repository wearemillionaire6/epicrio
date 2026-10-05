/**
 * Standalone Telegram Bot Poller for Epicrio
 * Run with: node scripts/telegram-bot.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

// Helper to load .env.local if present
function loadEnv() {
  const envPath = path.join(rootDir, '.env.local')
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [k, ...v] = trimmed.split('=')
        const val = v.join('=').replace(/^["']|["']$/g, '')
        if (!process.env[k]) {
          process.env[k] = val
        }
      }
    }
  }

  // Also check data/settings.json
  const settingsPath = path.join(rootDir, 'data', 'settings.json')
  if (fs.existsSync(settingsPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(settingsPath, 'utf8'))
      if (data.botToken && !process.env.TELEGRAM_BOT_TOKEN) {
        process.env.TELEGRAM_BOT_TOKEN = data.botToken
      }
      if (data.chatId && !process.env.TELEGRAM_CHAT_ID) {
        process.env.TELEGRAM_CHAT_ID = data.chatId
      }
    } catch (e) {}
  }
}

loadEnv()

const token = process.env.TELEGRAM_BOT_TOKEN
if (!token) {
  console.log('⚠️ TELEGRAM_BOT_TOKEN is not configured.')
  console.log('Please set TELEGRAM_BOT_TOKEN in .env.local or via http://localhost:3000/leads')
  process.exit(1)
}

console.log('⚡ Epicrio Telegram Bot Poller starting...')
let lastOffset = 0

async function poll() {
  while (true) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates?offset=${lastOffset}&timeout=20`)
      const data = await res.json()
      if (data.ok && Array.isArray(data.result)) {
        for (const update of data.result) {
          lastOffset = update.update_id + 1
          console.log(`[Update Received] ${update.message?.text || update.callback_query?.data || 'update'}`)
          
          // Forward to Next.js webhook handler
          try {
            await fetch('http://localhost:3000/api/telegram/webhook', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(update),
            })
          } catch (forwardErr) {
            console.error('Failed to dispatch to local API route:', forwardErr.message)
          }
        }
      }
    } catch (err) {
      console.error('Polling connection error:', err.message)
      await new Promise((r) => setTimeout(r, 4000))
    }
  }
}

poll()
