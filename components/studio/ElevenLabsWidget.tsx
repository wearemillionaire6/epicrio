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

    // 2. Target STRICTLY the poweredBy attribution class inside shadowRoot
    const hideAttributionOnly = () => {
      const widget = document.querySelector('elevenlabs-convai')
      if (widget && widget.shadowRoot) {
        if (!widget.shadowRoot.querySelector('#hide-powered-by-only')) {
          const style = document.createElement('style')
          style.id = 'hide-powered-by-only'
          style.textContent = `
            [class*="poweredBy"],
            [class*="_poweredBy"] {
              display: none !important;
              visibility: hidden !important;
              height: 0 !important;
              max-height: 0 !important;
              margin: 0 !important;
              padding: 0 !important;
              opacity: 0 !important;
              pointer-events: none !important;
              overflow: hidden !important;
            }
          `
          widget.shadowRoot.appendChild(style)
        }
      }
    }

    const interval = setInterval(hideAttributionOnly, 200)
    const timeout = setTimeout(() => clearInterval(interval), 8000)

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
