'use client'

import { motion } from 'framer-motion'
import { Users, Zap, Mic, Bot, Link2, Code2, Sparkles, ArrowRight } from 'lucide-react'

const solutions = [
  {
    icon: Users,
    title: "Central CRM Architecture",
    desc: "Turn leads into customers automatically. Custom CRM pipelines designed specifically around your high-ticket sales process.",
    tech: "HubSpot • GoHighLevel • Salesforce",
    link: "Explore CRM Architecture",
    target: "#lead-form"
  },
  {
    icon: Zap,
    title: "Autonomous Workflows",
    desc: "Make repetitive manual work disappear. Automated lead scoring, contract routing, customer onboarding, and invoicing.",
    tech: "n8n • Make.com • Custom Python Workers",
    link: "Explore Automations",
    target: "#lead-form"
  },
  {
    icon: Mic,
    title: "AI Voice Receptionist",
    desc: "Never miss an incoming customer call. Human-grade conversational AI that answers in <300ms, qualifies, and books meetings.",
    tech: "Vapi.ai • Bland AI • Twilio WebRTC",
    link: "Test Interactive Demo",
    target: "#ai-voice-demo"
  },
  {
    icon: Bot,
    title: "Enterprise AI Agents",
    desc: "Put intelligence directly into your daily operations. Knowledge-base RAG bots, document analyzers, and customer support co-pilots.",
    tech: "Claude 3.5 • OpenAI • LangChain",
    link: "Explore AI Solutions",
    target: "#lead-form"
  },
  {
    icon: Link2,
    title: "Unified Integrations",
    desc: "Connect your disjointed tools into one brain. Realtime data synchronization across WhatsApp, Email, Slack, Stripe, and ERPs.",
    tech: "Webhooks • REST APIs • GraphQL Sync",
    link: "Explore Integrations",
    target: "#architecture"
  },
  {
    icon: Code2,
    title: "Custom Technology & Portals",
    desc: "Build proprietary software your competitors can't buy off the shelf. Client portals, executive dashboards, and bespoke apps.",
    tech: "Next.js • Supabase • Node • Python",
    link: "Explore Custom Tech",
    target: "#lead-form"
  },
]

export default function Solutions() {
  return (
    <section id="solutions" className="py-28 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gray-800 bg-surface/60 text-xs font-mono text-primary mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENGINEERED SOLUTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Six Pillars of Modern Business Infrastructure
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Modular engineering components tailored to eliminate operational friction and compound your revenue per employee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s, i) => (
            <motion.a
              href={s.target}
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="group relative bg-glass-panel border border-gray-800 hover:border-primary/50 rounded-2xl p-8 transition-all duration-300 hover:bg-surface/90 backdrop-blur-md flex flex-col justify-between hover:shadow-[0_10px_35px_rgba(16,185,129,0.12)] hover:-translate-y-1 block"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono text-gray-400 bg-surface px-2.5 py-1 rounded-md border border-gray-800">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
                
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div>
                <div className="text-[11px] font-mono text-gray-500 mb-4 pb-4 border-b border-gray-800/80">
                  {s.tech}
                </div>

                <div className="text-primary text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  <span>{s.link}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
