'use client'

import { useState } from 'react'

interface StudioArchitectureProps {
  isDark: boolean
}

type TabKey = 'dns' | 'waterfall' | 'copylab' | 'triage'

export default function StudioArchitecture({ isDark }: StudioArchitectureProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('copylab')

  return (
    <section id="infrastructure" className="py-20 border-t border-current/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-zinc-400 font-medium tracking-wider uppercase text-xs block mb-3 font-mono">
            System architecture
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight ${
            isDark ? 'text-[#F4F2EC]' : 'text-[#1A1A1E]'
          }`}>
            The infrastructure behind your automation.
          </h2>
        </div>

        {/* Tab Selection */}
        <div className={`flex flex-wrap p-1 rounded-lg border font-mono text-xs ${
          isDark ? 'bg-[#151518] border-[#2A2A32]' : 'bg-[#F2EFE7] border-black/[0.06]'
        }`}>
          <button
            type="button"
            onClick={() => setActiveTab('copylab')}
            className={`px-3 py-2 rounded transition-colors cursor-pointer ${
              activeTab === 'copylab'
                ? 'bg-zinc-950 text-white font-medium shadow-xs'
                : 'text-zinc-600 hover:text-black'
            }`}
          >
            Copy Lab
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dns')}
            className={`px-3 py-2 rounded transition-colors cursor-pointer ${
              activeTab === 'dns'
                ? 'bg-zinc-950 text-white font-medium shadow-xs'
                : 'text-zinc-600 hover:text-black'
            }`}
          >
            DNS &amp; Multi-Inbox
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('waterfall')}
            className={`px-3 py-2 rounded transition-colors cursor-pointer ${
              activeTab === 'waterfall'
                ? 'bg-zinc-950 text-white font-medium shadow-xs'
                : 'text-zinc-600 hover:text-black'
            }`}
          >
            Clay Waterfall
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('triage')}
            className={`px-3 py-2 rounded transition-colors cursor-pointer ${
              activeTab === 'triage'
                ? 'bg-zinc-950 text-white font-medium shadow-xs'
                : 'text-zinc-600 hover:text-black'
            }`}
          >
            Autonomous Triage
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div className={`border rounded-xl p-6 sm:p-10 transition-colors ${
        isDark ? 'bg-[#151518] border-[#25252C]' : 'bg-[#F6F3EB] border-black/[0.06]'
      }`}>
        {/* TAB 1: COPY LAB */}
        {activeTab === 'copylab' && (
          <div className="space-y-8" id="copylab">
            <div className="max-w-2xl">
              <h3 className={`text-xl sm:text-2xl font-semibold tracking-tight ${
                isDark ? 'text-[#F4F2EC]' : 'text-[#1A1A1E]'
              }`}>
                Side-by-Side: Generic AI Slop vs. Humanized Peer-to-Peer Copy
              </h3>
              <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${
                isDark ? 'text-[#9A9AA4]' : 'text-[#63636D]'
              }`}>
                Cold email is not about selling in the first sentence; it is about initiating a peer inquiry. Notice the difference in tone, word count, and friction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Bad AI Slop Box */}
              <div className={`p-6 rounded-lg border space-y-4 ${
                isDark ? 'bg-[#1A1414] border-[#3D2222]' : 'bg-[#FDF3F2] border-[#F1C5C2]'
              }`}>
                <div className="flex items-center justify-between pb-3 border-b border-red-500/20 text-xs font-mono">
                  <span className="text-red-500 font-bold tracking-wider">
                    Before: 2022 Generic AI Slop (1.2% Reply Rate)
                  </span>
                  <span className="text-red-500/80">142 WORDS</span>
                </div>
                <div className="space-y-2 text-xs font-sans leading-relaxed text-[#7A3C38]">
                  <p><strong>Subject:</strong> Quick question regarding synergistic pipeline growth for {'{company}'}</p>
                  <p>Dear {'{firstName}'},</p>
                  <p>I hope this email finds you well and that your week is going great!</p>
                  <p>As a recognized visionary leader in the B2B SaaS space, I am sure you are constantly looking for ways to maximize enterprise ARR and leverage cutting-edge AI capabilities to crush your Q3 quotas.</p>
                  <p>At Omnipresent Sales Tech, we provide an all-in-one unified omnichannel hyper-growth engine that helps industry titans scale up to 10x faster. We would love to hop on a quick 30-minute demonstration call next Tuesday at 2 PM to walk you through our deck.</p>
                  <p>Do you have 30 minutes to chat next week?</p>
                </div>
                <div className="pt-3 border-t border-red-500/20 text-[11px] font-mono text-red-600 space-y-1">
                  <div>&times; Triggers spam filters with marketing jargon (synergistic, titan, 10x)</div>
                  <div>&times; High cognitive burden (asks for 30 minutes upfront)</div>
                  <div>&times; Obvious template language copied by 10,000 junior SDRs</div>
                </div>
              </div>

              {/* Good Peer-to-Peer Box */}
              <div className={`p-6 rounded-lg border space-y-4 ${
                isDark ? 'bg-[#121A16] border-[#1C382A]' : 'bg-[#F2F8F4] border-[#BFDDCB]'
              }`}>
                <div className="flex items-center justify-between pb-3 border-b border-black/10 text-xs font-mono">
                  <span className="text-zinc-950 font-bold tracking-wider">
                    After: 2026 Humanized Peer Inquiry (18.2% Reply Rate)
                  </span>
                  <span className="text-zinc-400">61 WORDS</span>
                </div>
                <div className="space-y-2 text-xs font-sans leading-relaxed text-zinc-900">
                  <p><strong>Subject:</strong> {'{firstName}'} / Clay enrichment workflow</p>
                  <p>Hi {'{firstName}'},</p>
                  <p>Saw {'{company}'} recently expanded your mid-market account executive team on LinkedIn.</p>
                  <p>Are your reps still manually researching lead contacts in Apollo, or do you already have a 4-provider waterfall running inside Clay?</p>
                  <p>We built an isolated infrastructure model that generates 15-20 verified meetings monthly for B2B founders without burning primary domains.</p>
                  <p>Worth a 2-minute Loom breakdown?</p>
                </div>
                <div className="pt-3 border-t border-black/10 text-[11px] font-mono text-zinc-600 space-y-1">
                  <div>• Under 70 words; mobile friendly in one screen tap</div>
                  <div>• Observes a real hiring trigger event</div>
                  <div>• Low-friction CTA: requests permission to send a 2-minute Loom</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DNS & MULTI-INBOX */}
        {activeTab === 'dns' && (
          <div className="space-y-8">
            <div className="max-w-2xl">
              <h3 className={`text-xl sm:text-2xl font-semibold tracking-tight ${
                isDark ? 'text-[#F4F2EC]' : 'text-[#1A1A1E]'
              }`}>
                DNS Hardening &amp; Domain Isolation Matrix
              </h3>
              <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${
                isDark ? 'text-[#9A9AA4]' : 'text-[#63636D]'
              }`}>
                Every client environment is ring-fenced. We configure cryptographic authentication on secondary domains so your main company website is never exposed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
              <div className={`p-5 rounded-lg border ${
                isDark ? 'bg-[#19191D] border-[#2A2A33]' : 'bg-[#EFECE3] border-black/[0.06]'
              }`}>
                <div className={`font-bold text-sm mb-2 text-zinc-950`}>01 // SPF</div>
                <div className="text-[11px] text-[#A0A0AA] mb-3">SENDER POLICY FRAMEWORK</div>
                <p className="text-[11px] font-sans leading-relaxed">
                  Strict authorization record (<code>v=spf1 include:_spf.google.com ~all</code>) authorizing strictly assigned IPs.
                </p>
              </div>

              <div className={`p-5 rounded-lg border ${
                isDark ? 'bg-[#19191D] border-[#2A2A33]' : 'bg-[#EFECE3] border-black/[0.06]'
              }`}>
                <div className={`font-bold text-sm mb-2 text-zinc-950`}>02 // DKIM</div>
                <div className="text-[11px] text-[#A0A0AA] mb-3">2048-BIT CRYPTO SIGNATURE</div>
                <p className="text-[11px] font-sans leading-relaxed">
                  Unique public-key signature on every email header preventing man-in-the-middle tampering and spoofing.
                </p>
              </div>

              <div className={`p-5 rounded-lg border ${
                isDark ? 'bg-[#19191D] border-[#2A2A33]' : 'bg-[#EFECE3] border-black/[0.06]'
              }`}>
                <div className={`font-bold text-sm mb-2 text-zinc-950`}>03 // DMARC</div>
                <div className="text-[11px] text-[#A0A0AA] mb-3">POLICY ENFORCEMENT</div>
                <p className="text-[11px] font-sans leading-relaxed">
                  Mandatory <code>p=reject</code> or <code>p=quarantine</code> configuration satisfying Google &amp; Yahoo 2024 compliance.
                </p>
              </div>

              <div className={`p-5 rounded-lg border ${
                isDark ? 'bg-[#19191D] border-[#2A2A33]' : 'bg-[#EFECE3] border-black/[0.06]'
              }`}>
                <div className={`font-bold text-sm mb-2 text-zinc-950`}>04 // CNAME</div>
                <div className="text-[11px] text-[#A0A0AA] mb-3">CUSTOM TRACKING DOMAIN</div>
                <p className="text-[11px] font-sans leading-relaxed">
                  Dedicated tracking subdomains eliminate shared proxy links, preserving reputation across ISPs.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CLAY WATERFALL */}
        {activeTab === 'waterfall' && (
          <div className="space-y-8">
            <div className="max-w-2xl">
              <h3 className={`text-xl sm:text-2xl font-semibold tracking-tight ${
                isDark ? 'text-[#F4F2EC]' : 'text-[#1A1A1E]'
              }`}>
                4-Provider Clay Cascading Waterfall
              </h3>
              <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${
                isDark ? 'text-[#9A9AA4]' : 'text-[#63636D]'
              }`}>
                Instead of paying for single-source stale data, our Clay engine tests four validation engines sequentially. If Provider A is uncertain, it cascades to Provider B, eliminating invalid addresses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
              <div className={`p-5 rounded-lg border ${
                isDark ? 'bg-[#19191D] border-[#2A2A33]' : 'bg-[#EFECE3] border-black/[0.06]'
              }`}>
                <div className={`text-xs font-bold mb-1 text-zinc-950`}>STAGE 01</div>
                <div className="font-semibold text-sm mb-2">Apollo &amp; SalesNav</div>
                <p className="text-[11px] font-sans text-current/80 leading-relaxed">
                  Extracts raw ICP records matching precise headcount, title, geographic market, and funding triggers.
                </p>
              </div>

              <div className={`p-5 rounded-lg border ${
                isDark ? 'bg-[#19191D] border-[#2A2A33]' : 'bg-[#EFECE3] border-black/[0.06]'
              }`}>
                <div className={`text-xs font-bold mb-1 text-zinc-950`}>STAGE 02</div>
                <div className="font-semibold text-sm mb-2">NeverBounce Real-Time</div>
                <p className="text-[11px] font-sans text-current/80 leading-relaxed">
                  Instant ping to mail server. Discards dead mailboxes, spam traps, and disposable inboxes immediately.
                </p>
              </div>

              <div className={`p-5 rounded-lg border ${
                isDark ? 'bg-[#19191D] border-[#2A2A33]' : 'bg-[#EFECE3] border-black/[0.06]'
              }`}>
                <div className={`text-xs font-bold mb-1 text-zinc-950`}>STAGE 03</div>
                <div className="font-semibold text-sm mb-2">Prospeo &amp; Hunter</div>
                <p className="text-[11px] font-sans text-current/80 leading-relaxed">
                  Cascading secondary lookup recovers personal work emails for decision-makers missing from primary lists.
                </p>
              </div>

              <div className={`p-5 rounded-lg border ${
                isDark ? 'bg-[#19191D] border-[#2A2A33]' : 'bg-[#EFECE3] border-black/[0.06]'
              }`}>
                <div className={`text-xs font-bold mb-1 text-zinc-950`}>STAGE 04</div>
                <div className="font-semibold text-sm mb-2">Catch-All Verification</div>
                <p className="text-[11px] font-sans text-current/80 leading-relaxed">
                  DeBounce deep SMTP handshake segregates catch-all domains into low-volume isolation queues.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: AUTONOMOUS TRIAGE */}
        {activeTab === 'triage' && (
          <div className="space-y-8">
            <div className="max-w-2xl">
              <h3 className={`text-xl sm:text-2xl font-semibold tracking-tight ${
                isDark ? 'text-[#F4F2EC]' : 'text-[#1A1A1E]'
              }`}>
                Autonomous Reply Triage &amp; Instant Calendar Booking
              </h3>
              <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${
                isDark ? 'text-[#9A9AA4]' : 'text-[#63636D]'
              }`}>
                When a prospect replies to an outbound email, an automated n8n webhook classifies intent within 10 seconds. Positive replies trigger immediate calendar links and private Slack war room alerts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
              <div className={`p-6 rounded-lg border space-y-3 ${
                isDark ? 'bg-[#19191D] border-[#2A2A33]' : 'bg-[#EFECE3] border-black/[0.06]'
              }`}>
                <span className={`font-bold text-zinc-950`}>[STEP 01 // WEBHOOK]</span>
                <h4 className="font-semibold text-sm font-sans">Real-Time Ingestion</h4>
                <p className="text-[11px] font-sans leading-relaxed text-current/80">
                  Smartlead/Instantly fires an instant webhook upon reply reception. Sentiment classifier distinguishes out-of-office from genuine interest.
                </p>
              </div>

              <div className={`p-6 rounded-lg border space-y-3 ${
                isDark ? 'bg-[#19191D] border-[#2A2A33]' : 'bg-[#EFECE3] border-black/[0.06]'
              }`}>
                <span className={`font-bold text-zinc-950`}>[STEP 02 // CRM SYNC]</span>
                <h4 className="font-semibold text-sm font-sans">HubSpot / Twenty CRM</h4>
                <p className="text-[11px] font-sans leading-relaxed text-current/80">
                  Contact record is automatically created or enriched in your primary CRM with complete conversational history and deal assignment.
                </p>
              </div>

              <div className={`p-6 rounded-lg border space-y-3 ${
                isDark ? 'bg-[#19191D] border-[#2A2A33]' : 'bg-[#EFECE3] border-black/[0.06]'
              }`}>
                <span className={`font-bold text-zinc-950`}>[STEP 03 // ALERT]</span>
                <h4 className="font-semibold text-sm font-sans">Slack War Room Notification</h4>
                <p className="text-[11px] font-sans leading-relaxed text-current/80">
                  Account executive receives a mobile Slack push with a one-click response button and Cal.com booking link within 60 seconds of prospect action.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
