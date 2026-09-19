'use client'

import { useEffect, useRef, useState } from 'react'

interface MovablePixelBackgroundProps {
  interactive?: boolean
  opacity?: number
  inverted?: boolean
  standalone?: boolean
}

interface PixelNode {
  x: number
  y: number
  origX: number
  origY: number
  vx: number
  vy: number
  size: number
  baseAlpha: number
  isAccent?: boolean
}

export default function MovablePixelBackground({
  interactive = true,
  opacity = 0.35,
  inverted = false,
  standalone = false,
}: MovablePixelBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let nodes: PixelNode[] = []
    let imgW = 500
    let imgH = 344

    // Pan & parallax state with spring damping
    const state = {
      mouseX: -2000,
      mouseY: -2000,
      targetOffsetX: 0,
      targetOffsetY: 0,
      currentOffsetX: 0,
      currentOffsetY: 0,
      dragOffsetX: 0,
      dragOffsetY: 0,
      targetDragX: 0,
      targetDragY: 0,
    }

    // Set canvas dimensions with high-DPI support
    const handleResize = () => {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    // Load and parse the user's uploaded retro pixel photo
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = '/retro-pixel-bg.png'

    img.onload = () => {
      imgW = img.width || 500
      imgH = img.height || 344

      // Sample pixels on an offscreen canvas
      const offscreen = document.createElement('canvas')
      offscreen.width = imgW
      offscreen.height = imgH
      const offCtx = offscreen.getContext('2d')
      if (!offCtx) return

      offCtx.drawImage(img, 0, 0, imgW, imgH)
      const imgData = offCtx.getImageData(0, 0, imgW, imgH).data

      // Step interval to extract clean retro 8-bit blocks
      const step = 8
      const parsedNodes: PixelNode[] = []

      for (let y = 0; y < imgH; y += step) {
        for (let x = 0; x < imgW; x += step) {
          const idx = (y * imgW + x) * 4
          const r = imgData[idx]
          const g = imgData[idx + 1]
          const b = imgData[idx + 2]
          const brightness = (r + g + b) / 3

          // Only keep the white/bright pixel blocks
          if (brightness > 90) {
            const isAcc = (x * 13 + y * 7) % 23 === 0
            parsedNodes.push({
              x: x,
              y: y,
              origX: x,
              origY: y,
              vx: 0,
              vy: 0,
              size: step - 1.5,
              baseAlpha: Math.min(brightness / 255, 1),
              isAccent: isAcc,
            })
          }
        }
      }

      nodes = parsedNodes
      setIsLoaded(true)
    }

    // Fallback if image load fails
    img.onerror = () => {
      const fallbackNodes: PixelNode[] = []
      for (let y = 20; y < 320; y += 12) {
        for (let x = 20; x < 480; x += 12) {
          const dist1 = Math.hypot(x - 180, y - 160)
          const dist2 = Math.hypot(x - 340, y - 180)
          if (dist1 < 80 || dist2 < 70) {
            fallbackNodes.push({
              x,
              y,
              origX: x,
              origY: y,
              vx: 0,
              vy: 0,
              size: 7,
              baseAlpha: 0.9,
              isAccent: (x + y) % 24 === 0,
            })
          }
        }
      }
      nodes = fallbackNodes
      setIsLoaded(true)
    }

    // Interactive mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      state.mouseX = e.clientX - rect.left
      state.mouseY = e.clientY - rect.top

      // Smooth parallax tilt based on screen position
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      state.targetOffsetX = ((e.clientX - centerX) / centerX) * 45
      state.targetOffsetY = ((e.clientY - centerY) / centerY) * 35

      if (isDragging.current) {
        const deltaX = e.clientX - dragStart.current.x
        const deltaY = e.clientY - dragStart.current.y
        state.targetDragX += deltaX * 0.8
        state.targetDragY += deltaY * 0.8
        dragStart.current = { x: e.clientX, y: e.clientY }
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (!interactive) return
      isDragging.current = true
      dragStart.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseUp = () => {
      isDragging.current = false
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return
      const touch = e.touches[0]
      const rect = canvas.getBoundingClientRect()
      state.mouseX = touch.clientX - rect.left
      state.mouseY = touch.clientY - rect.top

      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      state.targetOffsetX = ((touch.clientX - centerX) / centerX) * 45
      state.targetOffsetY = ((touch.clientY - centerY) / centerY) * 35
    }

    const handleScroll = () => {
      state.targetOffsetY = Math.sin(window.scrollY * 0.003) * 25
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Animation & Physics Loop
    let time = 0
    const render = () => {
      time += 0.02
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      ctx.clearRect(0, 0, w, h)

      // Lerp smooth parallax
      state.currentOffsetX += (state.targetOffsetX - state.currentOffsetX) * 0.05
      state.currentOffsetY += (state.targetOffsetY - state.currentOffsetY) * 0.05

      // Lerp drag offset
      state.dragOffsetX += (state.targetDragX - state.dragOffsetX) * 0.08
      state.dragOffsetY += (state.targetDragY - state.dragOffsetY) * 0.08

      // Gentle organic ambient drift
      const ambientX = Math.sin(time * 0.4) * 18
      const ambientY = Math.cos(time * 0.3) * 14

      // Center the constellation on canvas
      const scale = standalone
        ? Math.min(w / (imgW * 1.1), h / (imgH * 1.1))
        : Math.max(w / (imgW * 1.6), h / (imgH * 1.6), 1.2)

      const originX = (w - imgW * scale) / 2 + state.currentOffsetX + state.dragOffsetX + ambientX
      const originY = (h - imgH * scale) / 2 + state.currentOffsetY + state.dragOffsetY + ambientY

      // Pulse color values
      const pulse = 0.5 + Math.sin(time * 2) * 0.5
      const whiteColor = inverted ? '#000000' : '#FFFFFF'
      const accentColor = '#FF3333'

      // Render connecting circuit lines between adjacent nodes
      if (nodes.length > 0) {
        ctx.lineWidth = 1
        ctx.strokeStyle = inverted
          ? `rgba(200, 20, 20, ${0.1 + pulse * 0.1})`
          : `rgba(255, 51, 51, ${0.12 + pulse * 0.08})`

        // Draw horizontal & vertical circuit paths
        ctx.beginPath()
        for (let i = 0; i < nodes.length; i += 18) {
          const n1 = nodes[i]
          const x1 = originX + n1.x * scale
          const y1 = originY + n1.y * scale

          if (i + 1 < nodes.length) {
            const n2 = nodes[i + 1]
            const x2 = originX + n2.x * scale
            const y2 = originY + n2.y * scale
            if (Math.hypot(n1.x - n2.x, n1.y - n2.y) < 28) {
              ctx.moveTo(x1, y1)
              ctx.lineTo(x2, y2)
            }
          }
        }
        ctx.stroke()
      }

      // Update & Draw each pixel node with spring physics
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        // Node position on screen
        const screenX = originX + node.x * scale
        const screenY = originY + node.y * scale

        // Cursor distance for interactive magnetic repulsion
        if (interactive) {
          const dx = screenX - state.mouseX
          const dy = screenY - state.mouseY
          const dist = Math.hypot(dx, dy)
          const maxDist = 130

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 14
            node.vx += (dx / dist) * force
            node.vy += (dy / dist) * force
          }
        }

        // Spring force pulling back to original anchor
        node.vx += (node.origX - node.x) * 0.09
        node.vy += (node.origY - node.y) * 0.09

        // Velocity damping for butter-smooth fluidity
        node.vx *= 0.82
        node.vy *= 0.82

        node.x += node.vx
        node.y += node.vy

        // Draw pixel block
        const finalX = originX + node.x * scale
        const finalY = originY + node.y * scale
        const finalSize = node.size * scale

        // Color selection: Crimson red for accent nodes or when perturbed, else Stark White
        const isPerturbed = Math.hypot(node.vx, node.vy) > 0.4
        if (node.isAccent || isPerturbed) {
          ctx.fillStyle = accentColor
          ctx.shadowColor = accentColor
          ctx.shadowBlur = isPerturbed ? 12 : 6
        } else {
          ctx.fillStyle = whiteColor
          ctx.shadowColor = 'transparent'
          ctx.shadowBlur = 0
        }

        ctx.fillRect(
          Math.round(finalX),
          Math.round(finalY),
          Math.max(2, Math.round(finalSize)),
          Math.max(2, Math.round(finalSize))
        )
      }

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [interactive, inverted, standalone])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none overflow-hidden ${
        standalone ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
      }`}
      style={{ opacity }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block will-change-transform"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  )
}
