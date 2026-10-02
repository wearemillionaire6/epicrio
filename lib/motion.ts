/**
 * Shared animation variants and utilities for the Epicrio premium motion system.
 * 
 * Use these consistently across all studio components for a cohesive motion language.
 */

// Premium ease curve — aggressive ease-out for snappy, confident reveals
export const premiumEase = [0.16, 1, 0.3, 1] as const

// ── Container Variants ─────────────────────────────────────────

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

export const fastContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

// ── Item Variants ───────────────────────────────────────────────

// Blur-up reveal for headlines — the signature premium motion
export const headingVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: premiumEase },
  },
}

// Standard fade-up for body text and secondary content
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: premiumEase },
  },
}

// Card reveal with subtle scale
export const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: premiumEase },
  },
}

// Horizontal slide for elements entering from the side
export const slideInVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: premiumEase },
  },
}

// Scale up for icons and badges
export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: premiumEase },
  },
}

// ── Hover Variants ──────────────────────────────────────────────

export const cardHover = {
  y: -4,
  transition: { duration: 0.3, ease: premiumEase },
}

export const buttonHover = {
  y: -2,
  transition: { duration: 0.2, ease: premiumEase },
}

// ── Generic Item Variants (alias for backward compat) ───────────

export const itemVariants = fadeUpVariants

// ── Viewport Config ─────────────────────────────────────────────

export const viewportConfig = {
  once: true,
  margin: '-80px' as const,
}

export const viewportConfigEager = {
  once: true,
  margin: '-40px' as const,
}
