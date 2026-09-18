import { Cpu } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-surface/50 border-t border-gray-900 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface border border-gray-800 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                AGENCY<span className="text-primary">.CO</span>
              </span>
            </a>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              We design and deploy autonomous business infrastructure. CRM architecture, AI voice receptionists, and seamless enterprise workflow integrations.
            </p>
            
            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-gray-800 text-xs font-mono text-gray-300">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>All Systems Operational (99.99%)</span>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">Solutions</span>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#solutions" className="hover:text-primary transition-colors">CRM Architecture</a></li>
              <li><a href="#solutions" className="hover:text-primary transition-colors">Autonomous Workflows</a></li>
              <li><a href="#ai-voice-demo" className="hover:text-primary transition-colors">AI Voice Receptionist</a></li>
              <li><a href="#solutions" className="hover:text-primary transition-colors">Enterprise AI Agents</a></li>
              <li><a href="#solutions" className="hover:text-primary transition-colors">Custom Portals</a></li>
            </ul>
          </div>

          {/* Architecture & Process */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">Platform</span>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#architecture" className="hover:text-primary transition-colors">System Fabric</a></li>
              <li><a href="#how-we-work" className="hover:text-primary transition-colors">Engineering Process</a></li>
              <li><a href="#industries" className="hover:text-primary transition-colors">Verticals & Industries</a></li>
              <li><a href="#lead-form" className="hover:text-primary transition-colors">Schedule System Audit</a></li>
            </ul>
          </div>

          {/* Stack & Contact */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">Telephony & Stack</span>
            <p className="text-xs text-gray-400 font-mono leading-relaxed">
              Engineered with Next.js, Framer Motion, Tailwind, WebRTC, Twilio, Vapi, and Supabase.
            </p>
            <div className="pt-2">
              <a
                href="#lead-form"
                className="text-xs font-mono text-primary hover:underline flex items-center gap-1"
              >
                <span>book@agency.co</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} Agency.co Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Security Architecture</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
