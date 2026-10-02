'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Only show on first visit per session
    const hasVisited = sessionStorage.getItem('epicrio-visited')
    if (hasVisited) {
      setIsVisible(false)
      return
    }

    setIsVisible(true)
    sessionStorage.setItem('epicrio-visited', '1')

    // Auto-dismiss after animation completes
    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => setIsVisible(false), 600)
    }, 1400)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Animated SVG Monogram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative flex items-center justify-center w-16 h-16 rounded-[14px] bg-zinc-900">
                <svg
                  width="46"
                  height="46"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Continuous Infinite Automation Ribbon forming 'E' */}
                  <motion.path
                    d="M5 5.5h9a3 3 0 0 1 0 6h-5a3 3 0 0 0 0 6h9"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  />
                  {/* Vertical Backbone */}
                  <motion.path
                    d="M5 5.5v13"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                  />
                  {/* Central Anchor Bar */}
                  <motion.path
                    d="M5 11.5h6"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                  />
                </svg>
              </div>
            </motion.div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
              className="flex items-baseline gap-0.5"
            >
              <span className="text-xl font-semibold tracking-[-0.04em] text-zinc-900 font-sans">
                Epicrio
              </span>
              <span className="text-[8px] font-mono font-medium text-zinc-300 tracking-normal ml-0.5 align-super">
                ™
              </span>
            </motion.div>

            {/* Subtle loading bar */}
            <motion.div
              className="w-12 h-[1px] bg-zinc-200 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <motion.div
                className="h-full bg-zinc-900"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.5, ease: 'linear', delay: 0.9 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
