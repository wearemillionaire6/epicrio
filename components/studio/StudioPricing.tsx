'use client'

interface StudioPricingProps {
  isDark: boolean
}

const packages = [
  {
    name: 'Essentials Ops',
    setup: '$2,500',
    retainer: '$997 / mo',
    target: 'Best for small businesses wanting 24/7 call answering & clean CRM',
    deliverables: [
      '24/7 AI Voice Receptionist (up to 500 call minutes/mo)',
      'Custom Central CRM Setup (HubSpot, Twenty, or GoHighLevel)',
      'Instant Calendar Booking (Google Calendar / Cal.com)',
      'Automated SMS confirmations to callers',
      'Instant team alerts on Slack or WhatsApp',
      'Expected: 100% answered calls & 15+ hours saved weekly',
    ],
    highlight: false,
  },
  {
    name: 'Complete Business OS',
    setup: '$3,500',
    retainer: '$1,500 / mo',
    target: 'All-in-one suite: Voice receptionist, CRM, invoices, & outreach',
    deliverables: [
      '24/7 AI Voice Receptionist (up to 1,500 call minutes/mo)',
      'Central CRM with automated follow-ups & pipeline stages',
      'Managed Cold Email Client Outreach (15 Gmails, 3,000 leads/mo)',
      'Automated Stripe invoices & digital e-signature contracts',
      'Zero manual data entry across phone, email, and billing',
      'Expected: 20–30 booked client meetings & 35+ hours saved weekly',
    ],
    highlight: true,
  },
  {
    name: 'Enterprise Scale',
    setup: '$5,000',
    retainer: '$2,500 / mo',
    target: 'For established firms needing custom portals & high-volume systems',
    deliverables: [
      'Unlimited AI Voice Receptionist phone lines',
      'Custom Executive Dashboard & Client Operating Portal',
      'Full Outbound Email Engine (30+ inboxes, 6,000+ leads/mo)',
      'Complete API integration with QuickBooks, WhatsApp, & ERP',
      'Dedicated systems engineer with priority 24/7 support',
      'Expected: Full operations running automatically on autopilot',
    ],
    highlight: false,
  },
]

export default function StudioPricing({ isDark }: StudioPricingProps) {
  return (
    <section id="investment" className="py-20 border-t border-current/10">
      <div className="max-w-2xl mb-12">
        <div className="text-zinc-400 font-medium tracking-wider uppercase text-xs mb-3 font-mono">
          Pricing
        </div>
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
          isDark ? 'text-white' : 'text-zinc-950'
        }`}>
          Simple, predictable pricing. No surprises.
        </h2>
        <p className={`mt-4 text-base leading-relaxed ${
          isDark ? 'text-zinc-400' : 'text-zinc-600'
        }`}>
          One setup fee builds your infrastructure. A monthly retainer covers management, software, and voice minutes. Cancel anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`rounded-3xl p-8 flex flex-col justify-between border backdrop-blur-md transition-all ${
              pkg.highlight
                ? isDark
                  ? 'bg-zinc-900/60 border-white shadow-[0_0_30px_rgba(255,255,255,0.1)]'
                  : 'bg-white border-zinc-950 shadow-[0_12px_40px_rgba(0,0,0,0.1)] ring-1 ring-zinc-950'
                : isDark
                ? 'bg-zinc-900/40 border-white/10 shadow-sm'
                : 'bg-white/80 border-black/[0.06] shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-black/10 mb-4">
                <span className="font-bold text-base text-zinc-950">{pkg.name}</span>
                {pkg.highlight && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-950 text-white shadow-xs">
                    Most popular
                  </span>
                )}
              </div>

              <div className="space-y-1 mb-4">
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 font-sans">
                  {pkg.setup}
                </div>
                <div className="text-xs text-zinc-500">
                  One-time buildout, then {pkg.retainer}
                </div>
              </div>

              <p className="text-xs mb-6 pb-4 border-b border-black/10 text-zinc-600">
                {pkg.target}
              </p>

              <ul className="space-y-3 text-xs">
                {pkg.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 mt-1.5 flex-shrink-0" />
                    <span className="text-zinc-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-black/10">
              <a
                href="#apply"
                className={`w-full py-3.5 text-xs font-semibold rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-[0.98] ${
                  pkg.highlight
                    ? 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-md'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200/80'
                }`}
              >
                <span>Select {pkg.name}</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
