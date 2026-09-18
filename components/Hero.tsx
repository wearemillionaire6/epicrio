'use client'

import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Bot, Database, Workflow, ShieldCheck, Zap, Sparkles } from 'lucide-react'

export default function Hero() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden bg-background pt-32 pb-20">
      {/* Background Ambient Glows & Grid Mesh */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] md:w-[900px] h-[550px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} 
      />

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs md:text-sm font-medium mb-8 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span>Next-Generation Business Infrastructure</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={item} className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          WE BUILD THE SYSTEMS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
            BEHIND MODERN BUSINESS.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={item} className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
          CRM. Automation. AI. Voice. Integrations. Custom Technology. One connected technology infrastructure built around the exact way your company scales.
        </motion.p>

        {/* Action Buttons */}
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#lead-form"
            className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primaryHover text-background font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] active:scale-95"
          >
            Build My System <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#architecture"
            className="w-full sm:w-auto px-8 py-4 bg-surface/80 hover:bg-surface border border-gray-800 hover:border-gray-600 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-md"
          >
            Explore Systems Architecture
          </a>
        </motion.div>

        {/* Live Metrics Grid */}
        <motion.div
          variants={item}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-gray-800/60 pt-8"
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold text-white font-mono">99.8%</span>
            <span className="text-xs text-gray-400 mt-1">Automation Reliability</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold text-primary font-mono">&lt; 300ms</span>
            <span className="text-xs text-gray-400 mt-1">Voice Agent Latency</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold text-white font-mono">10x</span>
            <span className="text-xs text-gray-400 mt-1">Faster Lead Routing</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold text-white font-mono">0</span>
            <span className="text-xs text-gray-400 mt-1">Dropped Opportunities</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
