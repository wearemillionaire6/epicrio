'use client'

import { useEffect } from 'react'

interface ElevenLabsWidgetProps {
  agentId?: string
}

export default function ElevenLabsWidget({
  agentId = 'agent_5601m3p56sw0e4388zqe6m1g67es',
}: ElevenLabsWidgetProps) {
  useEffect(() => {
    // 1. Inject ElevenLabs Widget script if not already present
    const existingScript = document.querySelector('script[src*="convai-widget"]')
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://elevenlabs.io/convai-widget/index.js'
      script.async = true
      script.type = 'text/javascript'
      document.body.appendChild(script)
    }

    // 2. Poll & observe shadowRoot to guarantee "Powered by ElevenLabs" banner is completely hidden
    const hideBanner = () => {
      const widget = document.querySelector('elevenlabs-convai')
      if (widget && widget.shadowRoot) {
        if (!widget.shadowRoot.querySelector('#hide-eleven-branding')) {
          const style = document.createElement('style')
          style.id = 'hide-eleven-branding'
          style.textContent = `
            a[href*="elevenlabs"],
            [class*="banner"],
            [class*="branding"],
            [class*="powered"],
            [class*="attribution"],
            [aria-label*="Powered by"] {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
              height: 0 !important;
              width: 0 !important;
              overflow: hidden !important;
            }
          `
          widget.shadowRoot.appendChild(style)
        }

        // Also directly find and remove/hide any anchor or text with elevenlabs
        widget.shadowRoot.querySelectorAll('a, p, span, div').forEach((el) => {
          if (
            el.textContent?.toLowerCase().includes('powered by') ||
            (el as HTMLAnchorElement).href?.includes('elevenlabs')
          ) {
            ;(el as HTMLElement).style.display = 'none'
          }
        })
      }
    }

    const interval = setInterval(hideBanner, 250)
    const timeout = setTimeout(() => clearInterval(interval), 10000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div
      id="elevenlabs-widget-root"
      className="relative z-50 pointer-events-auto"
      dangerouslySetInnerHTML={{
        __html: `<elevenlabs-convai agent-id="${agentId}" disable-banner="true"></elevenlabs-convai>`,
      }}
    />
  )
}
