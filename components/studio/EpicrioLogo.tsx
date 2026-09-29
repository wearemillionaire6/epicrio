'use client'

interface EpicrioLogoProps {
  size?: number
  showWordmark?: boolean
  className?: string
  markOnly?: boolean
}

export default function EpicrioLogo({
  size = 28,
  showWordmark = true,
  className = '',
  markOnly = false,
}: EpicrioLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Brand Trademark Monogram (Precision E & Infinite Automation Loop) */}
      <div
        style={{ width: size, height: size }}
        className="relative flex-shrink-0 flex items-center justify-center rounded-[7px] bg-zinc-900 text-white shadow-sm group-hover:scale-105 transition-transform duration-200"
      >
        <svg
          width={Math.round(size * 0.72)}
          height={Math.round(size * 0.72)}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Continuous Infinite Automation Ribbon forming 'E' */}
          <path
            d="M5 5.5h9a3 3 0 0 1 0 6h-5a3 3 0 0 0 0 6h9"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Vertical Backbone of 'E' */}
          <path
            d="M5 5.5v13"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Central Anchor Bar of 'E' */}
          <path
            d="M5 11.5h6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Trademark Typographic Wordmark */}
      {showWordmark && !markOnly && (
        <div className="flex items-baseline gap-0.5 select-none">
          <span
            className="font-semibold tracking-[-0.04em] text-zinc-900 font-display"
            style={{ fontSize: Math.max(14, Math.round(size * 0.58)) }}
          >
            Epicrio
          </span>
          <span className="text-[8px] font-mono font-medium text-zinc-300 tracking-normal ml-0.5 align-super">
            ™
          </span>
        </div>
      )}
    </div>
  )
}
