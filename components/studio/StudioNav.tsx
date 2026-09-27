'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import EpicrioLogo from './EpicrioLogo'

interface StudioNavProps {
  isDark?: boolean
}

const navLinks = [
  { href: '#industries', label: 'Solutions' },
  { href: '#voice-receptionist', label: 'Voice AI' },
  { href: '#crm-workflows', label: 'Workflows' },
  { href: '#investment', label: 'Pricing' },
]

export default function StudioNav({ isDark = false }: StudioNavProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isHoveredRef = useRef(false)
  const isMobileOpenRef = useRef(false)
  const lastScrollYRef = useRef(0)
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    isHoveredRef.current = isHovered
  }, [isHovered])

  useEffect(() => {
    isMobileOpenRef.current = isMobileMenuOpen
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Reveal menu bar smoothly when cursor moves within the top 85px of the viewport
      if (e.clientY <= 85) {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
        setIsVisible(true)
      } else if (!isHoveredRef.current && !isMobileOpenRef.current) {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
        hideTimerRef.current = setTimeout(() => {
          if (!isHoveredRef.current && !isMobileOpenRef.current) {
            setIsVisible(false)
          }
        }, 220)
      }
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const diff = currentScrollY - lastScrollYRef.current

      // Filter out micro scrolls
      if (Math.abs(diff) < 8) return

      if (diff > 0 && currentScrollY > 70) {
        // User scrolling DOWN -> smoothly glide menu bar up out of view
        if (!isHoveredRef.current && !isMobileOpenRef.current) {
          setIsVisible(false)
        }
      } else if (diff < 0) {
        // User scrolling UP -> smoothly glide menu bar down into view
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
      {/* Floating Rounded Capsule Navigation - Butter-smooth spring scroll & cursor animation */}
      <motion.div
        initial={false}
        animate={{
          y: shouldShow ? 0 : -100,
          opacity: shouldShow ? 1 : 0,
        }}
        transition={{
          y: { type: 'spring', damping: 28, stiffness: 220, mass: 0.8 },
          opacity: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
        }}
        className="fixed top-3 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none transform-gpu will-change-transform"
      >
        <nav
          onMouseEnter={() => {
            setIsHovered(true)
            isHoveredRef.current = true
            setIsVisible(true)
          }}
          onMouseLeave={() => {
            setIsHovered(false)
            isHoveredRef.current = false
          }}
          className={`${
            shouldShow ? 'pointer-events-auto' : 'pointer-events-none'
          } w-full max-w-6xl rounded-full px-5 sm:px-7 py-2.5 sm:py-3 flex items-center justify-between gap-4 transition-all duration-300 bg-white/92 backdrop-blur-2xl border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] text-zinc-900`}
        >
          {/* Brand Identity */}
          <a href="#hero" className="flex items-center gap-2 group flex-shrink-0">
            <EpicrioLogo size={26} showWordmark={true} />
          </a>

          {/* Desktop Links (Clean Sans-Serif & Perfectly Centered) */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 text-xs xl:text-[13px] font-medium tracking-normal text-zinc-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-zinc-950 transition-colors whitespace-nowrap px-1 py-0.5"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            <Link
              href="/book"
              className="hidden sm:inline-flex text-xs px-3.5 py-1.5 font-medium tracking-wide rounded-full border border-black/10 text-zinc-800 hover:border-black/30 bg-black/[0.02] hover:bg-black/[0.05] transition-all duration-150 cursor-pointer whitespace-nowrap"
            >
              Book a Call
            </Link>

            <a
              href="#apply"
              className="text-xs sm:text-[13px] px-4 sm:px-5 py-1.5 sm:py-2 font-semibold tracking-wide rounded-full transition-all duration-150 cursor-pointer bg-zinc-950 hover:bg-zinc-800 text-white shadow-sm hover:shadow-md whitespace-nowrap active:scale-[0.98]"
            >
              Get Started
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-1.5 rounded-full hover:bg-black/5 text-zinc-800 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </motion.div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="fixed top-18 left-4 right-4 z-50 lg:hidden p-6 rounded-3xl bg-white/95 backdrop-blur-2xl border border-black/10 shadow-2xl space-y-4"
          >
            <div className="flex flex-col space-y-3 text-sm font-medium text-zinc-800">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-1 hover:text-zinc-950 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-black/10 flex flex-col gap-2">
              <Link
                href="/book"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-xs font-semibold rounded-full border border-black/15 text-zinc-800 hover:border-black/30"
              >
                Book a Systems Call
              </Link>
              <a
                href="#apply"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-xs font-semibold rounded-full bg-zinc-950 text-white hover:bg-zinc-800 transition-colors"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
