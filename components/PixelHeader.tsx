'use client'

import { sound } from '@/lib/sound'

interface PixelHeaderProps {
  onToggleInvert: () => void
  inverted: boolean
}

export default function PixelHeader({ onToggleInvert, inverted }: PixelHeaderProps) {
  return (
    <header className="pt-6 pb-12 border-b border-[#222222]">
      {/* Header Top Bar: Outbound Status */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#222222] text-[10px]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-none animate-ping" />
          <span className="text-primary font-bold tracking-wider">
            [B2B COLD OUTBOUND &amp; EMAIL INFRASTRUCTURE // PRODUCTIZED CES]
          </span>
        </div>
        <div className="flex items-center gap-3 text-muted">
          <span>INBOX PLACEMENT: &gt;98% PRIMARY</span>
          <span>•</span>
          <span className="text-white font-bold">REPLACE $77K/YR SDR AT $21K/YR</span>
        </div>
      </div>

      {/* Giant Wordmark & Core Value Prop */}
      <div className="mb-6 overflow-hidden">
        <h1 className="font-pixel text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-widest text-white leading-none mb-4">
          AGENCY CO
        </h1>
        <p className="text-lg sm:text-2xl md:text-3xl font-bold text-white tracking-wide uppercase max-w-4xl leading-snug">
          WE BUILD COLD OUTBOUND ENGINES THAT FILL YOUR CALENDAR.
        </p>
        <p className="text-xs sm:text-sm text-muted max-w-3xl mt-3 leading-relaxed">
          Full-stack B2B email deliverability, Clay waterfall lead enrichment, and humanized peer-to-peer cold outreach. 
          Generating 10 to 30 qualified sales meetings every month without hiring bloated sales teams or sending generic AI spam.
        </p>
      </div>

      {/* Action CTA Buttons */}
      <div className="flex flex-wrap items-center gap-3 mb-10">
        <a
          href="#pilot"
          onClick={() => sound.click()}
          className="px-5 py-2.5 bg-primary text-black font-bold text-xs hover:bg-white transition-colors flex items-center gap-2 shadow-lg"
        >
          <span>START FREE 7-DAY OUTBOUND PILOT</span>
          <span>-&gt;</span>
        </a>
        <a
          href="#pricing"
          onClick={() => sound.click()}
          className="px-5 py-2.5 border border-white/40 text-white font-bold text-xs hover:border-primary hover:text-primary transition-colors flex items-center gap-2"
        >
          <span>VIEW PACKAGES ($2.5K SETUP)</span>
          <span>■</span>
        </a>
        <span className="text-[11px] text-muted hidden sm:inline ml-2">
          [NO CONTRACT • 100 REAL EMAILS SENT DURING TRIAL]
        </span>
      </div>

      {/* Hero Body: Clean 3-Column Brutalist Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Card 1: Deliverability */}
        <div className={`p-5 sm:p-6 border shadow-xl flex flex-col justify-between ${
          inverted ? 'bg-white/95 border-[#E2E8F0] text-black' : 'bg-black/80 border-[#222222] text-white'
        }`}>
          <div>
            <span className="text-primary text-[10px] font-bold block mb-2 tracking-wider">
              [01 // MULTI-INBOX INFRASTRUCTURE]
            </span>
            <p className={`font-bold text-xs sm:text-sm leading-relaxed mb-3 ${inverted ? 'text-black' : 'text-white'}`}>
              SECONDARY DOMAINS &amp; 98%+ PRIMARY INBOX PLACEMENT
            </p>
            <p className="text-xs text-muted leading-relaxed">
              We never risk your main domain. 5 to 15 secondary domains configured with strict SPF, DKIM, DMARC, and custom tracking domains. 
              Rotating 15 to 45 mailboxes with 28-day automated warm-up protocols.
            </p>
          </div>
          <div className="pt-4 border-t border-[#222222] mt-4 flex justify-between text-[10px]">
            <span className="text-muted">BENCHMARK:</span>
            <span className="text-primary font-bold">&lt; 1.5% BOUNCE RATE</span>
          </div>
        </div>

        {/* Card 2: Signal Sourcing */}
        <div className={`p-5 sm:p-6 border shadow-xl flex flex-col justify-between ${
          inverted ? 'bg-white/95 border-[#E2E8F0] text-black' : 'bg-black/80 border-[#222222] text-white'
        }`}>
          <div>
            <span className="text-primary text-[10px] font-bold block mb-2 tracking-wider">
              [02 // CLAY WATERFALL ENRICHMENT]
            </span>
            <p className={`font-bold text-xs sm:text-sm leading-relaxed mb-3 ${inverted ? 'text-black' : 'text-white'}`}>
              SIGNAL-BASED ICP SOURCING &amp; TRIPLE VERIFICATION
            </p>
            <p className="text-xs text-muted leading-relaxed">
              Apollo + LinkedIn Sales Navigator + BuiltWith technology tracking. Cascading 4-provider waterfall verification confirms active decision-maker work emails and direct mobile numbers before a single send.
            </p>
          </div>
          <div className="pt-4 border-t border-[#222222] mt-4 flex justify-between text-[10px]">
            <span className="text-muted">SIGNALS:</span>
            <span className="text-primary font-bold">HIRING / TECH STACK / FUNDING</span>
          </div>
        </div>

        {/* Card 3: Humanized Copywriting */}
        <div className={`p-5 sm:p-6 border shadow-xl flex flex-col justify-between ${
          inverted ? 'bg-white/95 border-[#E2E8F0] text-black' : 'bg-black/80 border-[#222222] text-white'
        }`}>
          <div>
            <span className="text-primary text-[10px] font-bold block mb-2 tracking-wider">
              [03 // HUMANIZED SEQUENCES]
            </span>
            <p className={`font-bold text-xs sm:text-sm leading-relaxed mb-3 ${inverted ? 'text-black' : 'text-white'}`}>
              UNDER 80 WORDS, ZERO AI SLOP, 15-25% REPLY RATES
            </p>
            <p className="text-xs text-muted leading-relaxed">
              47% of B2B buyers ignore obvious AI emails. We write plain-text, research-anchored cold emails with single low-friction CTAs. 
              Integrated LinkedIn touches and autonomous reply qualification into Cal.com.
            </p>
          </div>
          <div className="pt-4 border-t border-[#222222] mt-4 flex justify-between text-[10px]">
            <span className="text-muted">REPLY RATE:</span>
            <span className="text-primary font-bold">4X INDUSTRY AVERAGE</span>
          </div>
        </div>
      </div>

      {/* Quick Section Shortcuts Bar */}
      <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-4 border-t border-[#222222] font-mono text-[11px]">
        <a
          href="#infrastructure"
          onClick={() => sound.click()}
          className="border border-[#333333] hover:border-primary p-2 flex flex-col justify-between transition-colors"
        >
          <span className="text-muted">SEC.01</span>
          <span className="text-white font-bold truncate">DOMAINS &amp; DNS</span>
        </a>
        <a
          href="#services"
          onClick={() => sound.click()}
          className="border border-[#333333] hover:border-primary p-2 flex flex-col justify-between transition-colors"
        >
          <span className="text-muted">SEC.02</span>
          <span className="text-white font-bold truncate">5 PILLARS</span>
        </a>
        <a
          href="#calculator"
          onClick={() => sound.click()}
          className="border border-[#333333] hover:border-primary p-2 flex flex-col justify-between transition-colors"
        >
          <span className="text-muted">SEC.03</span>
          <span className="text-white font-bold truncate">ROI SIMULATOR</span>
        </a>
        <a
          href="#methodology"
          onClick={() => sound.click()}
          className="border border-[#333333] hover:border-primary p-2 flex flex-col justify-between transition-colors"
        >
          <span className="text-muted">SEC.04</span>
          <span className="text-white font-bold truncate">30-DAY CUTOVER</span>
        </a>
        <a
          href="#pricing"
          onClick={() => sound.click()}
          className="border border-[#333333] hover:border-primary p-2 flex flex-col justify-between transition-colors"
        >
          <span className="text-muted">SEC.05</span>
          <span className="text-white font-bold truncate">PACKAGES</span>
        </a>
        <a
          href="#pilot"
          onClick={() => sound.click()}
          className="border border-primary/50 bg-primary/10 text-primary p-2 flex flex-col justify-between transition-colors font-bold"
        >
          <span className="text-[9px]">FREE</span>
          <span className="truncate">7-DAY PILOT ■</span>
        </a>
      </nav>
    </header>
  )
}
