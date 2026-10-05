'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import EpicrioLogo from './EpicrioLogo'

const navLinks = [
  { href: '#industries', label: 'Solutions' },
  { href: '#suite', label: 'Platform' },
  { href: '#voice-receptionist', label: 'Voice AI' },
  { href: '#crm-workflows', label: 'Back-Office' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#investment', label: 'Pricing' },
  { href: '/leads', label: 'Lead Engine' },
]

export default function StudioNav() {
  // Navigation is visible by default upon load
  const [isVisible, setIsVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isHoveredRef = useRef(false)
  const isMobileOpenRef = useRef(false)
  const lastScrollYRef = useRef(0)
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    isHoveredRef.current = isHovered
  }, [isHovered])

  useEffect(() => {
    isMobileOpenRef.current = isMobileMenuOpen
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 90) {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
        setIsVisible(true)
      } else if (!isHoveredRef.current && !isMobileOpenRef.current && window.scrollY > 80) {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
        hideTimerRef.current = setTimeout(() => {
          if (!isHoveredRef.current && !isMobileOpenRef.current) {
            setIsVisible(false)
          }
        }, 300)
      }
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const diff = currentScrollY - lastScrollYRef.current

      // Always show at the very top of the page
      if (currentScrollY < 40) {
        setIsVisible(true)
        lastScrollYRef.current = currentScrollY
        return
      }

      if (Math.abs(diff) < 8) return

      if (diff > 0 && currentScrollY > 90) {
        if (!isHoveredRef.current && !isMobileOpenRef.current) {
          setIsVisible(false)
        }
      } else if (diff < 0) {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
        setIsVisible(true)
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [])

  const shouldShow = isVisible || isHovered || isMobileMenuOpen

  return (
    <>
      <motion.div
        initial={false}
        animate={{
          y: shouldShow ? 0 : -100,
          opacity: shouldShow ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 260,
        }}
        className="fixed top-4 sm:top-5 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none"
      >
        <div 
          className={`${
            shouldShow ? 'pointer-events-auto' : 'pointer-events-none'
          } relative w-full max-w-5xl rounded-full bg-white/95 backdrop-blur-2xl border border-zinc-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <nav className="w-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <EpicrioLogo size={24} showWordmark={true} />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-[13px] font-normal text-zinc-500 hover:text-zinc-950 transition-colors
                             after:absolute after:-bottom-[2px] after:left-0 after:h-[1px] after:w-full 
                             after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 
                             after:transition-transform after:duration-300 after:ease-[0.16,1,0.3,1] after:bg-zinc-950"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
              <Link
                href="/book"
                className="group relative inline-flex items-center justify-center text-xs sm:text-[13px] font-medium text-zinc-900 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-zinc-900 overflow-hidden transition-all active:scale-[0.98]"
              >
                <span className="absolute inset-0 w-full h-full bg-zinc-900 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[0.16,1,0.3,1]"></span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-500 ease-[0.16,1,0.3,1]">Book a Call &rarr;</span>
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-full text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </nav>
          
          {/* Scroll Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-zinc-200">
            <motion.div 
              className="h-full bg-zinc-900 origin-left"
              style={{ scaleX }}
            />
          </div>
        </div>
      </motion.div>

      {/* Mobile Slide-Down Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 lg:hidden rounded-2xl bg-white border border-zinc-200/80 shadow-xl p-5 space-y-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-sm text-zinc-600 hover:text-zinc-950 font-medium"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-zinc-100">
              <Link
                href="/book"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center py-2.5 bg-zinc-950 text-white rounded-full text-[13px] font-medium"
              >
                Book a Call &rarr;
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
