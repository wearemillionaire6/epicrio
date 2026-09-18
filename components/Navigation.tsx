'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Solutions', href: '#solutions' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Voice Demo', href: '#ai-voice-demo' },
    { name: 'Process', href: '#how-we-work' },
    { name: 'Industries', href: '#industries' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-250 ${
        scrolled
          ? 'bg-[#070B14]/90 backdrop-blur-md border-b border-white/[0.08]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Monospaced Wordmark */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[#0D1424] border border-white/[0.12] flex items-center justify-center font-mono text-xs text-primary font-bold">
            AC
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-sm tracking-[0.2em] font-semibold text-white uppercase group-hover:text-primary transition-colors">
              Agency<span className="text-primary">//</span>Co
            </span>
            <span className="font-mono text-[9px] text-muted tracking-wider uppercase">
              Autonomous Systems
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Status & CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 border border-white/[0.08] bg-[#0D1424]/60 px-3 py-1 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>FABRIC // ONLINE</span>
          </div>

          <a
            href="#lead-form"
            className="px-4 py-2 bg-primary hover:bg-primaryHover text-[#070B14] font-semibold rounded-lg text-xs transition-all duration-200 flex items-center gap-1.5 font-mono uppercase tracking-wider"
          >
            <span>Book Audit</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-[#0D1424] border border-white/[0.1] text-slate-300 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#070B14] border-b border-white/[0.08] px-6 py-6 space-y-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-slate-300 hover:text-primary transition-colors py-1.5"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-white/[0.08]">
              <a
                href="#lead-form"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-primary text-[#070B14] font-semibold rounded-lg text-center text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Request Systems Audit</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
