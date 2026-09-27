'use client'

import { sound } from '@/lib/sound'

export default function FreeTrialPilot() {
  return (
    <section id="pilot" className="py-20 border-b border-[#222222] font-mono">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#222222] gap-4">
        <div>
          <div className="text-primary text-xs tracking-widest uppercase mb-1 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary" />
            <span>[PILOT_PROGRAM // ZERO RISK PROOF-OF-FIT]</span>
          </div>
          <h2 className="font-pixel text-3xl sm:text-5xl text-white tracking-widest">
            FREE 7-DAY PILOT
          </h2>
        </div>
        <div className="text-right text-xs text-muted">
          <span>SHOW, DON&apos;T TELL</span>
          <br />
          <span className="text-white">100 REAL EMAILS SENT TO YOUR ICP</span>
        </div>
      </div>

      {/* Main Feature Container */}
      <div className="border border-primary/50 bg-[#070707] p-6 sm:p-8 relative overflow-hidden shadow-[0_0_35px_rgba(0,255,136,0.1)] mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Pilot Promise */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-block px-2.5 py-1 bg-primary/10 border border-primary/40 text-primary text-[10px] font-bold">
              ★ NO CREDIT CARD REQUIRED • ZERO COMMITMENT
            </div>

            <h3 className="font-bold text-xl sm:text-2xl text-white tracking-wide leading-snug">
              WE SEND 100 HYPER-TARGETED EMAILS TO YOUR EXACT ICP BEFORE YOU PAY A DIME.
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Most outbound agencies hide behind pitch decks, bloated retainers, and empty promises. 
              We do things differently: we build a live test campaign on an isolated secondary domain, source 100 verified decision-makers matching your ideal customer profile, write humanized peer-to-peer copy, and send live emails for 7 days.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-black border border-[#222222]">
                <span className="text-[9px] text-muted block mb-1">PROSPECT SAMPLE</span>
                <span className="text-white font-bold">100 VERIFIED LEADS</span>
              </div>
              <div className="p-3 bg-black border border-[#222222]">
                <span className="text-[9px] text-muted block mb-1">CAMPAIGN RUNTIME</span>
                <span className="text-white font-bold">7-10 LIVE DAYS</span>
              </div>
              <div className="p-3 bg-black border border-[#222222]">
                <span className="text-[9px] text-muted block mb-1">YOUR COST</span>
                <span className="text-primary font-bold">$0.00 OUT OF POCKET</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => sound.click()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold text-xs hover:bg-white transition-colors shadow-lg"
              >
                <span>CLAIM 1 OF 4 MONTHLY PILOT SLOTS</span>
                <span>-&gt;</span>
              </a>
              <span className="text-[10px] text-muted block mt-2">
                Requires: 30-min discovery call, defined ICP, and value prop confirmation.
              </span>
            </div>
          </div>

          {/* Right: The 7-Day Timeline Flow */}
          <div className="lg:col-span-5 bg-black border border-[#222222] p-5 space-y-3.5 text-xs">
            <span className="text-[10px] text-primary uppercase font-bold tracking-wider block border-b border-[#222222] pb-2">
              [PILOT EXECUTION TIMELINE]
            </span>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-[10px] px-1.5 py-0.5 border border-primary/30 bg-primary/10">
                  DAY 00
                </span>
                <div>
                  <span className="font-bold text-white text-xs block">30-MIN DISCOVERY CALL</span>
                  <p className="text-[11px] text-muted">
                    We extract your ICP parameters, revenue tier, offer hook, and calendar scheduling link.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-[10px] px-1.5 py-0.5 border border-primary/30 bg-primary/10">
                  DAY 01
                </span>
                <div>
                  <span className="font-bold text-white text-xs block">DOMAIN SETUP &amp; CLAY ENRICHMENT</span>
                  <p className="text-[11px] text-muted">
                    We source 100 accounts in Apollo, run Clay waterfall email validation, and verify zero bounce risks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-[10px] px-1.5 py-0.5 border border-primary/30 bg-primary/10">
                  DAY 03
                </span>
                <div>
                  <span className="font-bold text-white text-xs block">LIVE HUMANIZED SENDING</span>
                  <p className="text-[11px] text-muted">
                    Outreach begins at 20-30 emails/day with plain-text copy and contextual research hooks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-[10px] px-1.5 py-0.5 border border-primary/30 bg-primary/10">
                  DAY 10
                </span>
                <div>
                  <span className="font-bold text-white text-xs block">ASYNC RESULTS PRESENTATION</span>
                  <p className="text-[11px] text-muted">
                    We deliver a Loom review showing open rates, real positive replies, and pipeline projections to scale 10x.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#222222] text-[10px] text-slate-400">
              If the results speak for themselves, we roll into a Growth or Enterprise setup. If not, you walk away with 100 verified leads and zero debt.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
