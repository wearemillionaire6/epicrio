'use client'

import React, { useEffect, useRef } from 'react'

interface MovablePixelBackgroundProps {
  opacity?: number
  inverted?: boolean
  interactive?: boolean
  standalone?: boolean
}

interface MiniSquare {
  baseX: number
  baseY: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  isAccent: boolean
  baseAlpha: number
  pulseSpeed: number
  pulseOffset: number
}

export default function MovablePixelBackground({
  opacity = 0.2,
  inverted = false,
  interactive = true,
  standalone = false,
}: MovablePixelBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  
  // Use refs to prevent canvas teardown / buffer reallocation on theme toggle
  const invertedRef = useRef(inverted)
  invertedRef.current = inverted

  const opacityRef = useRef(opacity)
  opacityRef.current = opacity

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    if (!ctx) return

    let animId: number
    let width = 0
    let height = 0
    const squares: MiniSquare[] = []

    const state = {
      mouseX: -1000,
      mouseY: -1000,
      targetOffsetX: 0,
      targetOffsetY: 0,
      currentOffsetX: 0,
      currentOffsetY: 0,
    }

    const initGrid = () => {
      squares.length = 0
      width = window.innerWidth
      height = window.innerHeight

      // 1:1 hardware pixel mapping for crisp retro pixels and ultra-lightweight GPU footprint
      canvas.width = width
      canvas.height = height

      const step = standalone ? 18 : 32
      const cols = Math.ceil(width / step) + 2
      const rows = Math.ceil(height / step) + 2

      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          const hash = Math.sin(c * 12.9898 + r * 78.233) * 43758.5453
          const rand = hash - Math.floor(hash)

          // Curated sparse density: ~22% squares visible for pure elegance
          if (rand > 0.22) continue

          const baseX = c * step + (rand * 8 - 4)
          const baseY = r * step + ((rand * 17) % 8 - 4)

          const isAccent = rand < 0.07
          const size = isAccent ? 4 : rand < 0.15 ? 3 : 2

          squares.push({
            baseX,
            baseY,
            x: baseX,
            y: baseY,
            vx: 0,
            vy: 0,
            size,
            isAccent,
            baseAlpha: isAccent ? 0.8 : 0.15 + rand * 0.2,
            pulseSpeed: 1.0 + rand * 2.0,
            pulseOffset: rand * Math.PI * 2,
          })
        }
      }
    }

    initGrid()

    // Damped throttled mouse move tracking
    const handleMouseMove = (e: MouseEvent) => {
      state.mouseX = e.clientX
      state.mouseY = e.clientY

      const centerX = width / 2
      const centerY = height / 2
      state.targetOffsetX = ((e.clientX - centerX) / width) * 16
      state.targetOffsetY = ((e.clientY - centerY) / height) * 16
    }

    const handleMouseLeave = () => {
      state.mouseX = -1000
      state.mouseY = -1000
      state.targetOffsetX = 0
      state.targetOffsetY = 0
    }

    let resizeTimer: any = null
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        initGrid()
      }, 150)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    let startTime = performance.now()

    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001

      // 60-120FPS Damped lerp
      state.currentOffsetX += (state.targetOffsetX - state.currentOffsetX) * 0.06
      state.currentOffsetY += (state.targetOffsetY - state.currentOffsetY) * 0.06

      ctx.clearRect(0, 0, width, height)

      // Ambient organic drift
      const driftX = Math.sin(elapsed * 0.4) * 3
      const driftY = Math.cos(elapsed * 0.35) * 3

      const totalOffsetX = state.currentOffsetX + driftX
      const totalOffsetY = state.currentOffsetY + driftY

      const isCurrentInverted = invertedRef.current
      const accentColor = isCurrentInverted ? '#008744' : '#00FF88'
      const baseColorRgb = isCurrentInverted ? '30, 41, 59' : '255, 255, 255'

      // Arrays for batched rendering to eliminate canvas state switches
      const normalSquares: { x: number; y: number; size: number; alpha: number }[] = []
      const accentSquares: { x: number; y: number; size: number }[] = []

      for (let i = 0; i < squares.length; i++) {
        const sq = squares[i]

        const targetX = sq.baseX + totalOffsetX
        const targetY = sq.baseY + totalOffsetY

        // Interactive cursor repulsion
        if (interactive && state.mouseX > 0 && state.mouseY > 0) {
          const dx = sq.x - state.mouseX
          const dy = sq.y - state.mouseY
          const distSq = dx * dx + dy * dy
          const maxDist = 90

          if (distSq < maxDist * maxDist && distSq > 0) {
            const dist = Math.sqrt(distSq)
            const force = (1 - dist / maxDist) * 7
            sq.vx += (dx / dist) * force
            sq.vy += (dy / dist) * force
          }
        }

        // Spring force returning to anchor
        sq.vx += (targetX - sq.x) * 0.08
        sq.vy += (targetY - sq.y) * 0.08
        sq.vx *= 0.85
        sq.vy *= 0.85

        sq.x += sq.vx
        sq.y += sq.vy

        const isPerturbed = Math.abs(sq.vx) + Math.abs(sq.vy) > 0.4

        if (sq.isAccent || isPerturbed) {
          accentSquares.push({
            x: Math.round(sq.x),
            y: Math.round(sq.y),
            size: sq.size,
          })
        } else {
          const pulse = 0.5 + Math.sin(elapsed * sq.pulseSpeed + sq.pulseOffset) * 0.5
          normalSquares.push({
            x: Math.round(sq.x),
            y: Math.round(sq.y),
            size: sq.size,
            alpha: sq.baseAlpha * (0.6 + pulse * 0.4),
          })
        }
      }

      // 1. Batch render normal pixel squares
      for (let i = 0; i < normalSquares.length; i++) {
        const sq = normalSquares[i]
        ctx.fillStyle = `rgba(${baseColorRgb}, ${sq.alpha})`
        ctx.fillRect(sq.x, sq.y, sq.size, sq.size)
      }

      // 2. Batch render accent pixel squares in a single state
      if (accentSquares.length > 0) {
        ctx.fillStyle = accentColor
        for (let i = 0; i < accentSquares.length; i++) {
          const sq = accentSquares[i]
          ctx.fillRect(sq.x, sq.y, sq.size, sq.size)
        }
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      if (resizeTimer) clearTimeout(resizeTimer)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
    }
  }, [interactive, standalone]) // Notice inverted is completely removed from dependencies!

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        opacity,
        imageRendering: 'pixelated',
      }}
    />
  )
}
