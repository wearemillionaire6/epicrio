export default function Footer() {
  return (
    <footer className="bg-[#05080F] border-t border-white/[0.08] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <a href="#" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0D1424] border border-white/[0.12] flex items-center justify-center font-mono text-xs text-primary font-bold">
                AC
              </div>
              <span className="font-mono text-sm tracking-[0.2em] font-semibold text-white uppercase">
                Agency<span className="text-primary">//</span>Co
              </span>
            </a>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              We design and deploy autonomous systems infrastructure for modern enterprises: CRM architecture, sub-300ms voice agents, and self-healing workflow pipelines.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-white/[0.08] text-xs font-mono text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>ALL SYSTEMS OPERATIONAL // 99.98%</span>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="lg:col-span-3 space-y-3 font-mono text-xs">
            <span className="uppercase text-white font-semibold tracking-wider block">Disciplines</span>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#solutions" className="hover:text-primary transition-colors">01 // CRM Architecture</a></li>
              <li><a href="#solutions" className="hover:text-primary transition-colors">02 // Autonomous Workflows</a></li>
              <li><a href="#ai-voice-demo" className="hover:text-primary transition-colors">03 // Voice Telephony</a></li>
              <li><a href="#solutions" className="hover:text-primary transition-colors">04 // Enterprise AI Agents</a></li>
              <li><a href="#solutions" className="hover:text-primary transition-colors">05 // Unified Integrations</a></li>
              <li><a href="#solutions" className="hover:text-primary transition-colors">06 // Custom Portals</a></li>
            </ul>
          </div>

          {/* Stack & Contact */}
          <div className="lg:col-span-4 space-y-3 font-mono text-xs">
            <span className="uppercase text-white font-semibold tracking-wider block">Core Infrastructure</span>
            <p className="text-slate-400 leading-relaxed">
              Engineered with Next.js 15, Vapi, Twilio SIP, n8n, Deepgram Nova-2, Claude 3.5 Sonnet, and Supabase.
            </p>
            <div className="pt-2 text-slate-500">
              Direct Contact: <a href="#lead-form" className="text-primary hover:underline">architect@agency.co</a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Agency.co. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Security Architecture</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
