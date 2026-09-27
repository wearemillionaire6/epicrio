'use client'

interface StudioPilotProps {
  isDark: boolean
}

const pilotSteps = [
  {
    day: 'Day 1',
    title: 'Quick 20-Min Alignment',
    desc: 'We hop on a short call to pinpoint exactly who you want to reach (job titles, company size, and industries) and agree on simple, friendly email messages.',
  },
  {
    day: 'Day 2',
    title: 'We Find 100 Ideal Clients',
    desc: 'We find 100 active business owners who need what you offer and verify every single email address so zero messages bounce.',
  },
  {
    day: 'Days 3–6',
    title: 'We Send the Emails',
    desc: 'We send the emails from our own safe, pre-warmed Gmail accounts. Your primary company email remains 100% untouched.',
  },
  {
    day: 'Day 7',
    title: 'Review Real Replies',
    desc: 'We review the positive replies and meetings together. If you are thrilled, we launch your full system. If not, you pay nothing.',
  },
]

export default function StudioPilot({ isDark }: StudioPilotProps) {
  return (
    <section id="pilot" className="py-20 border-t border-current/10">
      <div className="max-w-2xl mb-12">
        <div className="text-zinc-400 font-medium tracking-wider uppercase text-xs mb-3 font-mono">
          Zero-risk pilot
        </div>
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
          isDark ? 'text-white' : 'text-zinc-950'
        }`}>
          Try us for 7 days before paying a dollar.
        </h2>
        <p className={`mt-4 text-base leading-relaxed ${
          isDark ? 'text-zinc-400' : 'text-zinc-600'
        }`}>
          We don't ask you to pay on blind faith. We test 100 real prospect emails first so you can see the response quality with zero risk.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pilotSteps.map((step) => (
          <div
            key={step.day}
            className={`rounded-2xl p-6 flex flex-col justify-between border backdrop-blur-md transition-all ${
              isDark
                ? 'bg-zinc-900/40 border-white/10 hover:border-white/30 shadow-sm'
                : 'bg-white/70 border-black/[0.06] hover:border-black/30 shadow-sm'
            }`}
          >
            <div>
              <div className="font-bold text-xs mb-3 text-zinc-950 font-mono tracking-wider">
                {step.day}
              </div>
              <h3 className={`text-base font-semibold mb-2 ${
                isDark ? 'text-white' : 'text-zinc-900'
              }`}>
                {step.title}
              </h3>
              <p className={`text-xs leading-relaxed ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-10 rounded-2xl p-6 border flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-md ${
        isDark ? 'bg-zinc-900/40 border-white/10' : 'bg-white/70 border-black/[0.06]'
      }`}>
        <div>
          <div className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            Zero risk guarantee
          </div>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            No setup fee, no card required upfront. We only proceed if you see real interested prospects.
          </p>
        </div>

        <a
          href="#apply"
          className="px-6 py-3 text-xs font-semibold rounded-full whitespace-nowrap transition-all shadow-sm bg-zinc-950 text-white hover:bg-zinc-800 cursor-pointer active:scale-[0.98]"
        >
          Start your pilot &rarr;
        </a>
      </div>
    </section>
  )
}
