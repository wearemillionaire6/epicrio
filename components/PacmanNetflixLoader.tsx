'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sound } from '@/lib/sound'

interface PacmanNetflixLoaderProps {
  onComplete?: () => void
}

export default function PacmanNetflixLoader({ onComplete }: PacmanNetflixLoaderProps) {
  const [phase, setPhase] = useState<'pacman' | 'tadum' | 'fadeout' | 'done'>('pacman')
  const [pacmanX, setPacmanX] = useState(0) // 0 to 100 percent
  const [mouthOpen, setMouthOpen] = useState(true)
  const [dotsEaten, setDotsEaten] = useState<number[]>([])
  const [score, setScore] = useState(100)
  const [ghostScared, setGhostScared] = useState(false)
  const totalDots = 9
  const hasTriggeredAudio = useRef(false)

  // Listen for replay events
  useEffect(() => {
    const handleReplay = () => {
      setDotsEaten([])
      setPacmanX(0)
      setGhostScared(false)
      setScore(100)
      hasTriggeredAudio.current = false
      setPhase('pacman')
    }

    window.addEventListener('replay-loader', handleReplay)
    return () => window.removeEventListener('replay-loader', handleReplay)
  }, [])

  // Keyboard shortcut: Space or Escape to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Space') {
        skipIntro()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const skipIntro = () => {
    setPhase('done')
    onComplete?.()
  }

  // Pacman movement & chomp loop
  useEffect(() => {
    if (phase !== 'pacman') return

    const startTime = Date.now()
    const duration = 2100 // 2.1 seconds for pacman run

    const chompInterval = setInterval(() => {
      setMouthOpen((prev) => !prev)
    }, 110)

    const moveInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const currentX = progress * 100
      setPacmanX(currentX)

      // Calculate dot index eaten
      // Dots are evenly spaced from 15% to 85%
      const dotStep = 70 / totalDots
      const currentDot = Math.floor((currentX - 15) / dotStep)

      if (currentDot >= 0 && currentDot < totalDots) {
        setDotsEaten((prev) => {
          if (!prev.includes(currentDot)) {
            sound.chomp(currentDot % 2 === 0 ? 1 : 2)
            setScore((s) => s + (currentDot === totalDots - 1 ? 500 : 50))
            if (currentDot === totalDots - 1) {
              setGhostScared(true)
            }
            return [...prev, currentDot]
          }
          return prev
        })
      }

      // Reached the Power Pellet at end of run -> Trigger Netflix Ta-Dum
      if (progress >= 1) {
        clearInterval(moveInterval)
        clearInterval(chompInterval)
        triggerNetflixTaDum()
      }
    }, 24)

    return () => {
      clearInterval(moveInterval)
      clearInterval(chompInterval)
    }
  }, [phase])

  // Trigger Netflix-style Ta-Dum sequence
  const triggerNetflixTaDum = () => {
    setPhase('tadum')
    if (!hasTriggeredAudio.current) {
      sound.taDum()
      hasTriggeredAudio.current = true
    }

    // After 1.4s of Ta-Dum prism ribbon explosion, initiate smooth fade out
    setTimeout(() => {
      setPhase('fadeout')
    }, 1500)

    // Complete loader after 1.8s
    setTimeout(() => {
      setPhase('done')
      onComplete?.()
    }, 1900)
  }

  if (phase === 'done') return null

  // Netflix-style 16 vertical ribbon bar parameters
  const ribbonCount = 18
  const ribbonWidths = [
    'w-2', 'w-3', 'w-4', 'w-1.5', 'w-5', 'w-2', 'w-3.5', 'w-6',
    'w-5', 'w-3.5', 'w-2', 'w-4', 'w-1.5', 'w-5', 'w-3', 'w-2',
    'w-4', 'w-2.5'
  ]
  const ribbonDelays = [
    0.02, 0.05, 0.08, 0.03, 0.1, 0.06, 0.12, 0.01,
    0.04, 0.09, 0.07, 0.11, 0.05, 0.13, 0.02, 0.08,
    0.06, 0.1
  ]
  const ribbonHues = [
    '#FF3333', '#CC0000', '#FF1A1A', '#FF4D4D', '#990000',
    '#FFFFFF', '#FF3333', '#FF6666', '#B30000', '#FF3333',
    '#FFFFFF', '#CC0000', '#FF1A1A', '#FF8080', '#990000',
    '#FF3333', '#FFFFFF', '#CC0000'
  ]

  return (
    <AnimatePresence>
      <motion.div
        id="pacman-loader-screen"
        key="pacman-loader-screen"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'fadeout' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        className="fixed inset-0 z-[999990] bg-black text-white font-mono select-none overflow-hidden flex flex-col justify-between p-6 sm:p-10 pointer-events-auto"
      >
        {/* Retro Scanline CRT Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 z-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.75) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 255, 0, 0.03))',
            backgroundSize: '100% 4px, 6px 100%',
          }}
        />

        {/* Top Header / Arcade Marquee HUD */}
        <div className="relative z-20 flex items-center justify-between border-b border-[#222222] pb-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-primary animate-pulse" />
              <span className="text-primary font-bold text-xs tracking-widest">
                AGENCY.CO // KERNEL BOOT
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs text-muted">
              <span>1UP <span className="text-white font-bold">{String(score).padStart(5, '0')}</span></span>
              <span>HIGH <span className="text-primary font-bold">99990</span></span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-[10px] text-muted tracking-wider">
              [SPACE / ESC TO SKIP]
            </span>
            <button
              onClick={skipIntro}
              className="px-3 py-1 text-xs border border-white/20 hover:border-primary hover:text-primary transition-colors bg-[#080808] text-muted tracking-widest uppercase"
            >
              SKIP INTRO &gt;&gt;
            </button>
          </div>
        </div>

        {/* Center Stage: Switch between Pacman & Netflix Ta-Dum */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center my-auto">
          {phase === 'pacman' && (
            <div className="w-full max-w-4xl px-4 flex flex-col items-center">
              {/* Arcade Title */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
              >
                <div className="text-[11px] text-primary tracking-[0.3em] font-bold mb-2">
                  [LEVEL 01 // AGENT OS INITIALIZING]
                </div>
                <h1 className="text-2xl sm:text-4xl font-bold tracking-widest text-white">
                  INSERTING COIN <span className="text-primary animate-pulse">_</span>
                </h1>
              </motion.div>

              {/* Pacman Maze Wire Track */}
              <div className="relative w-full h-24 border-y-2 border-[#333333] bg-[#050505] flex items-center overflow-hidden px-8">
                {/* Horizontal Neon Red Grid Guide Lines */}
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(to_right,#FF3333_1px,transparent_1px),linear-gradient(to_bottom,#FF3333_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* Pellets (Dots) across the track */}
                <div className="relative w-full flex items-center justify-between z-10">
                  {Array.from({ length: totalDots }).map((_, i) => {
                    const isEaten = dotsEaten.includes(i)
                    const isPowerPellet = i === totalDots - 1

                    if (isPowerPellet) {
                      return (
                        <div
                          key={i}
                          className={`transition-all duration-100 ${
                            isEaten ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-primary border-2 border-white shadow-[0_0_20px_#FF3333] animate-ping" />
                        </div>
                      )
                    }

                    return (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-none bg-white/80 transition-all duration-75 ${
                          isEaten ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                        }`}
                        style={{
                          boxShadow: isEaten ? 'none' : '0 0 8px rgba(255,255,255,0.6)',
                        }}
                      />
                    )
                  })}
                </div>

                {/* Pacman & Ghost Moving Entity Group */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 flex items-center gap-6 z-20 will-change-transform pointer-events-none"
                  style={{
                    left: `${Math.max(2, Math.min(pacmanX * 0.88, 86))}%`,
                    transition: 'left 0.03s linear',
                  }}
                >
                  {/* Blinky (Red Ghost) in pursuit */}
                  <div
                    className="transition-transform duration-100"
                    style={{
                      transform: ghostScared ? 'scale(0.8)' : 'scale(1)',
                    }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ imageRendering: 'pixelated' }}
                      className="filter drop-shadow-[0_0_8px_rgba(255,51,51,0.8)]"
                    >
                      {/* Ghost Body */}
                      <path
                        d="M3 1H13V3H15V8H14V14H12V12H10V14H8V12H6V14H4V12H2V14H1V8H2V3H3V1Z"
                        fill={ghostScared ? '#3388FF' : '#FF3333'}
                      />
                      {/* Pixel Eyes */}
                      <rect x="4" y="4" width="3" height="4" fill="#FFFFFF" />
                      <rect x="9" y="4" width="3" height="4" fill="#FFFFFF" />
                      <rect x="6" y="5" width="2" height="2" fill="#000000" />
                      <rect x="11" y="5" width="2" height="2" fill="#000000" />
                    </svg>
                  </div>

                  {/* Retro 8-bit Pac-Man */}
                  <div className="filter drop-shadow-[0_0_12px_#FFE600]">
                    <svg
                      width="38"
                      height="38"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {mouthOpen ? (
                        // Mouth Open Chomping
                        <path
                          d="M16 16 L28 6 A14 14 0 1 0 28 26 Z"
                          fill="#FFE600"
                        />
                      ) : (
                        // Mouth Closed
                        <circle cx="16" cy="16" r="14" fill="#FFE600" />
                      )}
                    </svg>
                  </div>
                </div>
              </div>

              {/* Real-time Subsystem Boot Telemetry */}
              <div className="w-full mt-8 p-3 bg-[#080808] border border-[#222222] flex flex-col sm:flex-row items-center justify-between text-[11px] gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">&gt;</span>
                  <span className="text-[#888888]">
                    {pacmanX < 40
                      ? 'READING OBSIDIAN KNOWLEDGE GRAPH...'
                      : pacmanX < 80
                      ? 'COMPILING 12-FACTOR AGENT OS PIPELINES...'
                      : 'ACQUIRING TARGET POWER PELLET...'}
                  </span>
                </div>
                <div className="text-primary font-mono font-bold">
                  PROGRESS: {Math.round(pacmanX)}%
                </div>
              </div>
            </div>
          )}

          {/* NETFLIX-STYLE "TA-DUM" PRISM RIBBON IMPACT */}
          {(phase === 'tadum' || phase === 'fadeout') && (
            <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
              {/* Massive Lens Flare Center Flash */}
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [0, 2.5, 5], opacity: [1, 0.8, 0] }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute w-96 h-96 rounded-full bg-white blur-3xl z-10 pointer-events-none"
              />

              {/* Netflix-Style Crimson & Spectrum Striated Light Ribbons */}
              <div className="absolute inset-0 flex items-center justify-center gap-1 sm:gap-2 z-20 pointer-events-none perspective-[1200px]">
                {Array.from({ length: ribbonCount }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      scaleY: 0,
                      opacity: 0,
                      y: 0,
                      scaleX: 0.8,
                    }}
                    animate={{
                      scaleY: [0, 1.8, 3.2, 0.4],
                      opacity: [0, 1, 0.95, 0],
                      scaleX: [0.8, 1.4, 2.5, 4],
                      y: [100, 0, -40, -120],
                    }}
                    transition={{
                      duration: 1.4,
                      delay: ribbonDelays[i],
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`h-[140vh] ${ribbonWidths[i]} origin-center`}
                    style={{
                      backgroundColor: ribbonHues[i],
                      boxShadow: `0 0 25px ${ribbonHues[i]}, 0 0 50px ${ribbonHues[i]}`,
                      filter: 'blur(0.5px)',
                    }}
                  />
                ))}
              </div>

              {/* Center Emblem: AGENCY.CO Cinematic Zoom & Chromatic Blast */}
              <motion.div
                initial={{ scale: 0.4, opacity: 0, letterSpacing: '0.1em' }}
                animate={{
                  scale: [0.4, 1.1, 1, 1.8],
                  opacity: [0, 1, 1, 0],
                  letterSpacing: ['0.1em', '0.25em', '0.4em', '0.8em'],
                }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-30 text-center flex flex-col items-center"
              >
                {/* Iconic Emblem Monogram [A] */}
                <div className="text-6xl sm:text-8xl md:text-9xl font-black text-white tracking-tighter filter drop-shadow-[0_0_35px_#FF3333] mb-4">
                  <span className="text-primary">[</span>A<span className="text-primary">]</span>
                </div>

                <div className="text-xl sm:text-3xl md:text-5xl font-black text-white tracking-[0.35em] uppercase border-y border-white/30 py-2 px-6 bg-black/60 backdrop-blur-sm">
                  AGENCY<span className="text-primary">.CO</span>
                </div>

                <div className="text-xs sm:text-sm text-primary tracking-[0.5em] font-bold mt-3">
                  AGENT OS // PRODUCTION DEPLOYED
                </div>
              </motion.div>
            </div>
          )}
        </div>

        {/* Bottom Footer Telemetry */}
        <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between border-t border-[#222222] pt-4 text-[10px] text-muted gap-2">
          <div className="flex items-center gap-2">
            <span className="text-primary">●</span>
            <span>SYSTEM: BHAVESH WAGHMARE // AGENT OS ARCHITECTURE</span>
          </div>
          <div>
            <span>AUDIO SYNTHESIS: WEB AUDIO API (TA-DUM FX ACTIVE)</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
