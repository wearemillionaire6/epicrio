'use client'

interface StudioCrmWorkflowsProps {
  isDark: boolean
}

const workflowSteps = [
  {
    number: '01',
    title: 'Instant Lead Capture',
    desc: 'When a customer calls your AI receptionist, submits a website form, or replies to an email, their details are immediately created in your CRM with zero manual typing.',
    badge: '100% Data Accuracy'
  },
  {
    number: '02',
    title: 'Automated Quote & Contract',
    desc: 'Generate branded PDF proposals and contracts in seconds. Customers can sign on their phone with a single tap, with deposit invoices automatically sent via Stripe.',
    badge: 'Sign in Seconds'
  },
  {
    number: '03',
    title: 'Team Dispatch & Notifications',
    desc: 'Your technicians, account reps, or clinic staff receive instant WhatsApp or Slack notifications with customer notes, address, and job requirements.',
    badge: 'Real-Time Sync'
  },
  {
    number: '04',
    title: 'Automated Reviews & Re-Booking',
    desc: 'Once the service is completed, the system automatically sends a friendly review request, files the paid receipt, and schedules routine follow-ups.',
    badge: 'More 5-Star Reviews'
  }
]

export default function StudioCrmWorkflows({ isDark }: StudioCrmWorkflowsProps) {
  return (
    <section id="crm-workflows" className="py-20 border-t border-current/10">
      <div className="max-w-3xl mb-14">
        <div className="text-zinc-400 font-medium tracking-wider uppercase text-xs mb-3 font-mono">
          Autonomous back-office
        </div>
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
          isDark ? 'text-white' : 'text-zinc-950'
        }`}>
          From lead capture to invoice — fully hands-free.
        </h2>
        <p className={`mt-4 text-base leading-relaxed ${
          isDark ? 'text-zinc-400' : 'text-zinc-600'
        }`}>
          New leads flow into your CRM automatically. Quotes generate themselves. Contracts get signed digitally. Invoices fire through Stripe. Your team just shows up and does the work.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {workflowSteps.map((step) => (
          <div
            key={step.number}
            className={`rounded-3xl p-7 flex flex-col justify-between border backdrop-blur-xl transition-all ${
              isDark
                ? 'bg-zinc-900/40 border-white/10 hover:border-white/30 shadow-sm'
                : 'bg-white/70 border-black/[0.06] hover:border-black/30 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-current/10 mb-4">
                <span className="font-sans text-sm font-bold text-zinc-950">
                  {step.number}
                </span>
                <span className="text-[11px] font-medium text-zinc-400">
                  {step.badge}
                </span>
              </div>
              <h3 className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                {step.title}
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-10 rounded-3xl p-8 border flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl ${
        isDark ? 'bg-zinc-900/50 border-white/10' : 'bg-white/80 border-black/[0.06]'
      }`}>
        <div className="space-y-1">
          <h4 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            Compatible with your existing tools
          </h4>
          <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            We seamlessly connect HubSpot, Twenty CRM, GoHighLevel, Stripe, Google Workspace, WhatsApp, Slack, and QuickBooks.
          </p>
        </div>

        <a
          href="#apply"
          className="px-6 py-3 text-xs font-semibold rounded-full whitespace-nowrap transition-all shadow-sm bg-zinc-950 text-white hover:bg-zinc-800 cursor-pointer active:scale-[0.98]"
        >
          Automate Your Workflows &rarr;
        </a>
      </div>
    </section>
  )
}
