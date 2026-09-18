'use client'

import { useState, useEffect, useRef } from 'react'

interface PixelHeaderProps {
  onToggleInvert: () => void
  inverted: boolean
}

export default function PixelHeader({ onToggleInvert, inverted }: PixelHeaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Draw dithered silhouette / matrix graphic in the hero
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    ctx.clearRect(0, 0, width, height)

    // Generate dithering halftone pattern
    const cols = 48
    const rows = 32
    const cellW = width / cols
    const cellH = height / rows

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        // Create an organic silhouette / orbital shape
        const dx = x - cols / 2
        const dy = y - rows / 2
        const dist = Math.sqrt(dx * dx + dy * dy)
        const val = Math.sin(x * 0.25) * Math.cos(y * 0.25) + (1 - dist / (cols * 0.6))
        
        if (val > 0.45) {
          ctx.fillStyle = inverted ? '#000000' : '#FFFFFF'
          // Ordered dither effect
          const dither = (x % 2 === 0 && y % 2 === 0) || (val > 0.75)
          if (dither) {
            ctx.fillRect(x * cellW, y * cellH, cellW * 0.85, cellH * 0.85)
          }
        }
      }
    }
  }, [inverted])

  return (
    <header className="pt-8 pb-10 border-b border-[#222222]">
      {/* Giant Pixelated Wordmark */}
      <div className="mb-10 overflow-hidden">
        <h1 className="font-pixel text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-widest text-white leading-none">
          AGENCY CO
        </h1>
      </div>

      {/* Hero Body: Left Dithered Graphic + Right Meta Copy */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
        
        {/* Left Dithered Graphic */}
        <div className="md:col-span-4 flex justify-start">
          <div className="border border-[#333333] p-1 bg-black inline-block">
            <canvas
              ref={canvasRef}
              width={240}
              height={160}
              className="w-full max-w-[240px] h-auto block"
            />
          </div>
        </div>

        {/* Right Editorial Copy */}
        <div className="md:col-span-8 space-y-6 text-xs sm:text-sm font-mono leading-relaxed">
          <div>
            <span className="text-muted block mb-1">/ SYSTEM ARCHITECT & AUTOMATION INFRASTRUCTURE</span>
            <p className="text-white">
              WE BUILD THE CONNECTED SYSTEMS BEHIND HIGH-STAKES MODERN BUSINESS.
            </p>
          </div>

          <div>
            <span className="text-muted block mb-1">/ OPERATIONAL DOMAINS</span>
            <p className="text-white">
              CRM • SUB-300MS VOICE AI • RECURSIVE WORKFLOWS • KNOWLEDGE RAG
            </p>
          </div>

          <div className="pt-2">
            <span className="text-muted font-mono">
              / USE YOUR KEYBOARD TO NAVIGATE .
            </span>
          </div>
        </div>

      </div>

      {/* Keyboard Shortcuts Nav Bar */}
      <nav className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-6 border-t border-[#222222] font-mono text-[11px]">
        <a
          href="#home"
          className="border border-[#333333] hover:border-white p-2 flex flex-col justify-between transition-colors"
        >
          <span className="text-muted">^H</span>
          <span className="text-white font-bold">HOME</span>
        </a>

        <a
          href="#biography"
          className="border border-[#333333] hover:border-white p-2 flex flex-col justify-between transition-colors"
        >
          <span className="text-muted">^B</span>
          <span className="text-white font-bold">MANIFESTO</span>
        </a>

        <a
          href="#architecture"
          className="border border-[#333333] hover:border-white p-2 flex flex-col justify-between transition-colors"
        >
          <span className="text-muted">^A</span>
          <span className="text-white font-bold">ARCHITECTURE</span>
        </a>

        <a
          href="#services"
          className="border border-[#333333] hover:border-white p-2 flex flex-col justify-between transition-colors"
        >
          <span className="text-muted">^S</span>
          <span className="text-white font-bold">SERVICES</span>
        </a>

        <a
          href="#voice"
          className="border border-[#333333] hover:border-white p-2 flex flex-col justify-between transition-colors"
        >
          <span className="text-muted">^V</span>
          <span className="text-white font-bold">VOICE DEMO</span>
        </a>

        <a
          href="#contact"
          className="border border-[#333333] hover:border-white p-2 flex flex-col justify-between transition-colors"
        >
          <span className="text-muted">^C</span>
          <span className="text-white font-bold">CONTACT</span>
        </a>

        <button
          type="button"
          onClick={onToggleInvert}
          className="border border-[#333333] hover:border-white p-2 flex flex-col justify-between transition-colors text-left"
        >
          <span className="text-muted">^I</span>
          <span className="text-primary font-bold">INVERT</span>
        </button>
      </nav>
    </header>
  )
}
