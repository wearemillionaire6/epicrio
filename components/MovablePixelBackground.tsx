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
  opacity = 0.25,
  inverted = false,
  interactive = true,
  standalone = false,
}: MovablePixelBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
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
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.parentElement?.clientWidth || window.innerWidth
      height = canvas.parentElement?.clientHeight || window.innerHeight

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Spacing for mini square pixel effect (subtle geometric micro-grid)
      const step = standalone ? 16 : 28
      const cols = Math.ceil(width / step) + 4
      const rows = Math.ceil(height / step) + 4

      for (let r = -2; r < rows; r++) {
        for (let c = -2; c < cols; c++) {
          // Density variation: create elegant cyber clusters
          const hash = Math.sin(c * 12.9898 + r * 78.233) * 43758.5453
          const rand = hash - Math.floor(hash)

          // Filter to roughly ~28% visible squares for clean negative space
          if (rand > 0.32) continue

          const baseX = c * step + (rand * 6 - 3)
          const baseY = r * step + ((rand * 13) % 6 - 3)

          const isAccent = rand < 0.08
          const size = isAccent ? 4 : rand < 0.2 ? 3 : 2

          squares.push({
            baseX,
            baseY,
            x: baseX,
            y: baseY,
            vx: 0,
            vy: 0,
            size,
            isAccent,
            baseAlpha: isAccent ? 0.75 : 0.18 + rand * 0.25,
            pulseSpeed: 1.2 + rand * 2.5,
            pulseOffset: rand * Math.PI * 2,
          })
        }
      }
    }

    initGrid()

    // Mouse movement tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      state.mouseX = e.clientX - rect.left
      state.mouseY = e.clientY - rect.top

      const centerX = width / 2
      const centerY = height / 2
      state.targetOffsetX = ((e.clientX - centerX) / width) * 20
      state.targetOffsetY = ((e.clientY - centerY) / height) * 20
    }

    const handleMouseLeave = () => {
      state.mouseX = -1000
      state.mouseY = -1000
      state.targetOffsetX = 0
      state.targetOffsetY = 0
    }

    const handleResize = () => {
      initGrid()
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)

    let startTime = performance.now()

    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001

      // 60FPS Damped lerp for silky smooth parallax
      state.currentOffsetX += (state.targetOffsetX - state.currentOffsetX) * 0.06
      state.currentOffsetY += (state.targetOffsetY - state.currentOffsetY) * 0.06

      ctx.clearRect(0, 0, width, height)

      // Ambient organic drift
      const driftX = Math.sin(elapsed * 0.5) * 4
      const driftY = Math.cos(elapsed * 0.4) * 4

      const totalOffsetX = state.currentOffsetX + driftX
      const totalOffsetY = state.currentOffsetY + driftY

      const accentColor = inverted ? '#008744' : '#00FF88'
      const baseColorRgb = inverted ? '15, 23, 42' : '255, 255, 255'

      // Render mini squares
      for (let i = 0; i < squares.length; i++) {
        const sq = squares[i]

        // Target anchor with parallax and drift
        const targetX = sq.baseX + totalOffsetX
        const targetY = sq.baseY + totalOffsetY

        // Interactive cursor repulsion
        if (interactive && state.mouseX > 0 && state.mouseY > 0) {
          const dx = sq.x - state.mouseX
          const dy = sq.y - state.mouseY
          const dist = Math.hypot(dx, dy)
          const maxDist = 95

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 8
            sq.vx += (dx / dist) * force
            sq.vy += (dy / dist) * force
          }
        }

        // Spring force returning to anchor
        sq.vx += (targetX - sq.x) * 0.08
        sq.vy += (targetY - sq.y) * 0.08

        // Damping
        sq.vx *= 0.84
        sq.vy *= 0.84

        sq.x += sq.vx
        sq.y += sq.vy

        // Pulse calculation
        const pulse = 0.5 + Math.sin(elapsed * sq.pulseSpeed + sq.pulseOffset) * 0.5
        const isPerturbed = Math.hypot(sq.vx, sq.vy) > 0.3

        let alpha = sq.baseAlpha * (0.6 + pulse * 0.4)
        if (isPerturbed) alpha = Math.min(1, alpha + 0.45)

        // Draw mini square pixel
        if (sq.isAccent || isPerturbed) {
          ctx.fillStyle = accentColor
          ctx.shadowColor = accentColor
          ctx.shadowBlur = isPerturbed ? 8 : 4
        } else {
          ctx.fillStyle = `rgba(${baseColorRgb}, ${alpha})`
          ctx.shadowColor = 'transparent'
          ctx.shadowBlur = 0
        }

        ctx.fillRect(
          Math.round(sq.x),
          Math.round(sq.y),
          sq.size,
          sq.size
        )
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
    }
  }, [inverted, interactive, standalone])

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
