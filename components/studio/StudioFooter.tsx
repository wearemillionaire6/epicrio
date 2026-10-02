'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import EpicrioLogo from './EpicrioLogo'

export default function StudioFooter() {
  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative w-full py-20 bg-white font-sans"
    >
      {/* Top Border Animation */}
      <motion.div 
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 1 }
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-zinc-200 origin-center max-w-[1440px] 2xl:max-w-[1600px] mx-auto w-full"
      />

      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Logo & Tagline */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="md:col-span-4 flex flex-col items-start"
          >
            <EpicrioLogo size={28} showWordmark={true} />
            <p className="mt-6 text-[15px] leading-relaxed text-zinc-500 max-w-sm">
              We design and build high-performance systems for modern agencies and visionary enterprises.
            </p>
          </motion.div>

          {/* Navigation Columns */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="md:col-span-4 flex gap-16 lg:gap-24"
          >
            <div className="flex flex-col gap-4">
              <h4 className="text-[13px] font-medium text-zinc-900 tracking-wide uppercase mb-2">Platform</h4>
              <a href="#industries" className="text-[15px] text-zinc-500 hover:text-zinc-900 transition-colors">Solutions</a>
              <a href="#voice-receptionist" className="text-[15px] text-zinc-500 hover:text-zinc-900 transition-colors">Voice AI</a>
              <a href="#crm-workflows" className="text-[15px] text-zinc-500 hover:text-zinc-900 transition-colors">Back-Office</a>
              <a href="#investment" className="text-[15px] text-zinc-500 hover:text-zinc-900 transition-colors">Pricing</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[13px] font-medium text-zinc-900 tracking-wide uppercase mb-2">Company</h4>
              <Link href="/book" className="text-[15px] text-zinc-500 hover:text-zinc-900 transition-colors">Book a Call</Link>
              <Link href="/contact" className="text-[15px] text-zinc-500 hover:text-zinc-900 transition-colors">Contact</Link>
            </div>
          </motion.div>

          {/* Contact & Status */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="md:col-span-4 flex flex-col items-start md:items-end gap-6"
          >
            <a href="mailto:engineering@epicrio.com" className="text-[15px] text-zinc-500 hover:text-zinc-900 transition-colors">
              engineering@epicrio.com
            </a>
            
            <div className="flex items-center gap-2 mt-auto pt-10 md:pt-0">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] animate-pulse" />
              <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest">
                All Systems Operational
              </span>
            </div>
          </motion.div>

        </div>

        {/* Copyright */}
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="mt-20 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="text-[13px] text-zinc-400 font-sans">
            &copy; {new Date().getFullYear()} Epicrio&trade;. All rights reserved.
          </div>
          <div className="text-[13px] text-zinc-400 font-sans">
            San Francisco, CA
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}
