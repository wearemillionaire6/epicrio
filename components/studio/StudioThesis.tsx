'use client'

interface StudioThesisProps {
  isDark: boolean
}

const steps = [
  {
    step: '1',
    title: 'We set up fresh, dedicated Gmail accounts',
    desc: 'We purchase separate, lookalike web addresses and create official Google Workspace inboxes for your business. We slowly warm up each account so Google trusts them completely and every message lands straight in the Primary inbox.',
  },
  {
    step: '2',
    title: 'We find verified decision-makers who need your service',
    desc: 'No random, scraped lists. We carefully identify the exact founders, directors, and executives who can afford your service, and double-check their real work email so zero emails bounce.',
  },
  {
    step: '3',
    title: 'We send friendly emails and deliver interested replies',
    desc: 'We write simple, polite 3-sentence messages that sound like a thoughtful peer reaching out. When prospects reply asking for more details, we send them straight to your calendar to book a call.',
  },
]

export default function StudioThesis({ isDark }: StudioThesisProps) {
  return (
    <section id="how-it-works" className="py-20 border-t border-current/10">
      <div className="max-w-2xl mb-14">
        <div className="text-zinc-400 font-medium tracking-wider uppercase text-xs mb-3 font-mono">
          How it works
        </div>
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
          isDark ? 'text-white' : 'text-zinc-950'
        }`}>
          How we fill your calendar without you lifting a finger.
        </h2>
        <p className={`mt-4 text-base leading-relaxed ${
          isDark ? 'text-zinc-400' : 'text-zinc-600'
        }`}>
          You do not need to learn complex software or spend hours prospecting. We handle the entire email setup, list building, and message sending from start to finish.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((item) => (
          <div
            key={item.step}
            className={`rounded-2xl p-8 flex flex-col justify-between border backdrop-blur-md transition-all ${
              isDark
                ? 'bg-zinc-900/40 border-white/10 hover:border-white/30 shadow-lg'
                : 'bg-white/70 border-black/10 hover:border-black/30 shadow-sm'
            }`}
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200 flex items-center justify-center font-bold text-base mb-6">
                {item.step}
              </div>
              <h3 className={`text-lg font-semibold tracking-tight mb-3 ${
                isDark ? 'text-white' : 'text-zinc-900'
              }`}>
                {item.title}
              </h3>
              <p className={`text-sm leading-relaxed ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
