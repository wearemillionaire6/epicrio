'use client'

import { ArrowUpRight } from 'lucide-react'

const solutions = [
  {
    num: '01',
    title: 'Central CRM Architecture',
    desc: 'Bespoke CRM setups tailored to your actual sales mechanics. Automated pipeline stages, attribution tracking, and instant rep notification.',
    stack: 'HubSpot • GoHighLevel • Salesforce • Twenty CRM',
    cta: 'Explore CRM Engineering',
    href: '#lead-form',
  },
  {
    num: '02',
    title: 'Autonomous Workflow Engines',
    desc: 'Eliminate manual data transfer between teams. Self-hosted workflow runners that handle contract dispatch, customer onboarding, and invoicing automatically.',
    stack: 'n8n Self-Hosted • Make • Python Microservices',
    cta: 'Explore Automations',
    href: '#lead-form',
  },
  {
    num: '03',
    title: 'AI Voice Receptionist',
    desc: 'Sub-300ms conversational telephony that answers customer calls 24/7, screens qualifications, resolves FAQs, and directly books calendar meetings.',
    stack: 'Vapi.ai • Twilio SIP • Deepgram • Cal.com',
    cta: 'Test Voice Demo',
    href: '#ai-voice-demo',
  },
  {
    num: '04',
    title: 'Enterprise AI Agents & Knowledge RAG',
    desc: 'Contextual AI co-pilots connected to your internal SOPs, documents, and historical customer tickets for instant operational leverage.',
    stack: 'Claude 3.5 Sonnet • OpenAI • LangChain • Supabase Vector',
    cta: 'Explore AI Agents',
    href: '#lead-form',
  },
  {
    num: '05',
    title: 'Unified Tool Integrations',
    desc: 'Custom API middleware connecting legacy databases, WhatsApp Business, Stripe billing, and customer communication channels.',
    stack: 'REST APIs • Webhook Middleware • PostgreSQL CDC',
    cta: 'Inspect Integrations',
    href: '#architecture',
  },
  {
    num: '06',
    title: 'Custom Portals & Dashboards',
    desc: 'Proprietary client portals and executive telemetry dashboards built when off-the-shelf software cannot meet your operational requirements.',
    stack: 'Next.js 15 • TypeScript • Supabase • Tailwind CSS',
    cta: 'Explore Custom Portals',
    href: '#lead-form',
  },
]

export default function Solutions() {
  return (
    <section id="solutions" className="py-28 bg-[#070B14] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-white/[0.1] text-xs font-mono text-primary mb-4">
            <span>PILLARS // § 11</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-display mb-4">
            Engineered capabilities. No templates.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Six architectural disciplines deployed to eliminate manual human overhead and accelerate company throughput.
          </p>
        </div>

        {/* Editorial Rows (per DESIGN.md & ADR-006: mono 01-06, not boxed cards) */}
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {solutions.map((item) => (
            <div
              key={item.num}
              className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start hover:bg-[#0D1424]/40 transition-colors px-4 -mx-4 rounded-lg group"
            >
              {/* Number Index */}
              <div className="md:col-span-1 font-mono text-sm font-bold text-primary">
                {item.num}
              </div>

              {/* Title & Description */}
              <div className="md:col-span-6 space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                  {item.desc}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="md:col-span-3 font-mono text-xs text-slate-500 self-center">
                <span className="text-[10px] uppercase text-slate-600 block mb-1">Stack Components</span>
                <span className="text-slate-400">{item.stack}</span>
              </div>

              {/* CTA link */}
              <div className="md:col-span-2 flex md:justify-end self-center">
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-300 group-hover:text-primary transition-colors uppercase tracking-wider"
                >
                  <span>{item.cta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
