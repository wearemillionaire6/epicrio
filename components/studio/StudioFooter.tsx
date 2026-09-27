'use client'

import Link from 'next/link'
import EpicrioLogo from './EpicrioLogo'

interface StudioFooterProps {
  isDark?: boolean
}

export default function StudioFooter({ isDark = false }: StudioFooterProps) {
  return (
    <footer className="py-16 border-t border-black/10 text-xs">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
        <div className="md:col-span-6 space-y-3">
          <EpicrioLogo size={28} showWordmark={true} />
          <p className="text-sm leading-relaxed max-w-sm text-zinc-600">
            Business operations and automation infrastructure. We automate the work your team shouldn't be doing manually.
          </p>
        </div>

        <div className="md:col-span-3 space-y-2.5">
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Solutions
          </div>
          <ul className="space-y-2 text-xs">
            <li><a href="#industries" className="text-zinc-600 hover:text-zinc-950 transition-colors">Solutions</a></li>
            <li><a href="#suite" className="text-zinc-600 hover:text-zinc-950 transition-colors">Platform</a></li>
            <li><a href="#voice-receptionist" className="text-zinc-600 hover:text-zinc-950 transition-colors">Voice AI</a></li>
            <li><a href="#crm-workflows" className="text-zinc-600 hover:text-zinc-950 transition-colors">Workflows</a></li>
            <li><a href="#investment" className="text-zinc-600 hover:text-zinc-950 transition-colors">Pricing</a></li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-2.5">
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Appointment &amp; Demo
          </div>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/book" className="font-semibold text-zinc-950 hover:underline">
                Book a Systems Call
              </Link>
            </li>
            <li><a href="#pilot" className="text-zinc-600 hover:text-zinc-950 transition-colors">Zero-Risk Pilot</a></li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <div>
          &copy; 2026 Epicrio. All rights reserved.
        </div>
        <div>
          Autonomous Business Operations &amp; Automation Platform
        </div>
      </div>
    </footer>
  )
}
