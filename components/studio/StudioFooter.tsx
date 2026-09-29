'use client'

import Link from 'next/link'
import EpicrioLogo from './EpicrioLogo'

export default function StudioFooter() {
  return (
    <footer className="w-full py-10 bg-white border-t border-zinc-100">
      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <EpicrioLogo size={24} showWordmark={true} />
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            <a href="#industries" className="text-xs sm:text-sm text-zinc-400 hover:text-zinc-950 transition-colors font-sans">
              Solutions
            </a>
            <a href="#suite" className="text-xs sm:text-sm text-zinc-400 hover:text-zinc-950 transition-colors font-sans">
              Platform
            </a>
            <a href="#voice-receptionist" className="text-xs sm:text-sm text-zinc-400 hover:text-zinc-950 transition-colors font-sans">
              Voice AI
            </a>
            <a href="#crm-workflows" className="text-xs sm:text-sm text-zinc-400 hover:text-zinc-950 transition-colors font-sans">
              Back-Office
            </a>
            <a href="#how-it-works" className="text-xs sm:text-sm text-zinc-400 hover:text-zinc-950 transition-colors font-sans">
              How it works
            </a>
            <a href="#investment" className="text-xs sm:text-sm text-zinc-400 hover:text-zinc-950 transition-colors font-sans">
              Pricing
            </a>
            <Link href="/book" className="text-xs sm:text-sm text-zinc-400 hover:text-zinc-950 transition-colors font-sans">
              Contact
            </Link>
          </nav>

          <div className="text-xs sm:text-sm text-zinc-400 font-sans">
            &copy; {new Date().getFullYear()} Epicrio&trade;. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
