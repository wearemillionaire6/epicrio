'use client'

import { useEffect, useState, useRef } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [isClicked, setIsClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cursorRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      setPos({ x, y })
      if (!isVisible) setIsVisible(true)

      // Directly update transform for zero-latency tracking
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
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
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[999999] will-change-transform select-none"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      {/* Clean Retro 8-bit Pixel Arrow without any attached static tag/box */}
      <svg
        width="20"
        height="22"
        viewBox="0 0 20 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-transform duration-75 ${
          isClicked ? 'scale-90' : 'scale-100'
        }`}
        style={{ imageRendering: 'pixelated' }}
      >
        {/* Black pixel outline */}
        <path
          d="M0 0V17H4V14H7V20H10V18H12V15H9V12H14V9H11V6H8V3H5V0H0Z"
          fill="#000000"
        />
        {/* Stark white interior with terminal red click feedback */}
        <path
          d="M1 1V15H3V12H6V11H7V17H9V16H10V14H7V9H12V8H9V5H6V2H3V1H1Z"
          fill={isClicked ? '#FF3333' : '#FFFFFF'}
        />
      </svg>
    </div>
  )
}
