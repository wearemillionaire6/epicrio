'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)

      // Detect hover on interactive elements
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'SELECT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('a') ||
          target.closest('button') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Primary Pixel Crosshair / Terminal Box */}
      <motion.div
        className="fixed top-0 left-0"
        animate={{
          x: mousePos.x - (isHovered ? 12 : 5),
          y: mousePos.y - (isHovered ? 12 : 5),
          scale: isClicked ? 0.8 : isHovered ? 1.3 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 400,
          mass: 0.1,
        }}
      >
        {isHovered ? (
          /* Focused terminal brackets on hover */
          <div className="flex items-center justify-center font-mono text-[10px] text-primary font-bold tracking-tighter mix-blend-difference select-none">
            <span>[</span>
            <span className="text-[7px] mx-0.5">■</span>
            <span>]</span>
          </div>
        ) : (
          /* Solid pixel dot / square */
          <div className="w-2.5 h-2.5 bg-primary mix-blend-difference shadow-[0_0_8px_rgba(0,255,136,0.8)]" />
        )}
      </motion.div>

      {/* Trailing Crosshair Ring */}
      <motion.div
        className="fixed top-0 left-0 border border-primary/40 rounded-none pointer-events-none"
        animate={{
          x: mousePos.x - (isHovered ? 20 : 14),
          y: mousePos.y - (isHovered ? 20 : 14),
          width: isHovered ? 40 : 28,
          height: isHovered ? 40 : 28,
          opacity: isHovered ? 0.9 : 0.4,
        }}
        transition={{
          type: 'spring',
          damping: 32,
          stiffness: 220,
          mass: 0.3,
        }}
      />
    </div>
  )
}
