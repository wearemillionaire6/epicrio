// Lightweight Web Audio sound generator for retro mechanical clicks and terminal beeps
class SoundFX {
  private ctx: AudioContext | null = null

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtx) this.ctx = new AudioCtx()
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
    return this.ctx
  }

  // Soft mechanical keyboard click
  click() {
    const ctx = this.getContext()
    if (!ctx) return
    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(800, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.03)

      gain.gain.setValueAtTime(0.04, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.03)
    } catch {
      // Safe fallback
    }
  }

  // Terminal acknowledge beep
  beep() {
    const ctx = this.getContext()
    if (!ctx) return
    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'square'
      osc.frequency.setValueAtTime(1200, ctx.currentTime)

      gain.gain.setValueAtTime(0.03, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.05)
    } catch {
      // Safe fallback
    }
  }

  // Pacman 8-bit chomp blip
  chomp(pitch = 1) {
    const ctx = this.getContext()
    if (!ctx) return
    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      const startFreq = pitch === 1 ? 360 : 480
      const endFreq = pitch === 1 ? 180 : 260
      osc.frequency.setValueAtTime(startFreq, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.08)

      gain.gain.setValueAtTime(0.04, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.08)
    } catch {
      // Safe fallback
    }
  }

  // Cinematic Netflix-style "Ta-Dum" synthesizer impact
  taDum() {
    const ctx = this.getContext()
    if (!ctx) return
    try {
      const now = ctx.currentTime

      // First beat "TA" (Low sub bass thud at 60Hz)
      const osc1 = ctx.createOscillator()
      const gain1 = ctx.createGain()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(65, now)
      osc1.frequency.exponentialRampToValueAtTime(40, now + 0.3)
      gain1.gain.setValueAtTime(0.18, now)
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.3)
      osc1.connect(gain1)
      gain1.connect(ctx.destination)
      osc1.start(now)
      osc1.stop(now + 0.3)

      // Second beat "DUM" (Colossal resonant boom at 80Hz ramping down with stereo shimmer)
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.type = 'sawtooth'
      osc2.frequency.setValueAtTime(110, now + 0.18)
      osc2.frequency.exponentialRampToValueAtTime(35, now + 1.2)

      // Low pass filter for heavy cinematic weight
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(280, now + 0.18)
      filter.frequency.exponentialRampToValueAtTime(80, now + 1.2)

      gain2.gain.setValueAtTime(0.22, now + 0.18)
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.4)

      osc2.connect(filter)
      filter.connect(gain2)
      gain2.connect(ctx.destination)
      osc2.start(now + 0.18)
      osc2.stop(now + 1.4)

      // Shimmering harmonic overtone
      const osc3 = ctx.createOscillator()
      const gain3 = ctx.createGain()
      osc3.type = 'sine'
      osc3.frequency.setValueAtTime(440, now + 0.22)
      osc3.frequency.exponentialRampToValueAtTime(220, now + 0.8)
      gain3.gain.setValueAtTime(0.04, now + 0.22)
      gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.8)
      osc3.connect(gain3)
      gain3.connect(ctx.destination)
      osc3.start(now + 0.22)
      osc3.stop(now + 0.8)
    } catch {
      // Safe fallback
    }
  }
}

export const sound = new SoundFX()
