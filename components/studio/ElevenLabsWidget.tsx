'use client'

import { useEffect } from 'react'

interface ElevenLabsWidgetProps {
  agentId?: string
}

export default function ElevenLabsWidget({
  agentId = 'agent_5601m3p56sw0e4388zqe6m1g67es',
}: ElevenLabsWidgetProps) {
  useEffect(() => {
    // Check if the script is already present
    const existingScript = document.querySelector('script[src*="convai-widget"]')
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://elevenlabs.io/convai-widget/index.js'
      script.async = true
      script.type = 'text/javascript'
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div
      id="elevenlabs-widget-root"
      className="relative z-50 pointer-events-auto"
      dangerouslySetInnerHTML={{
        __html: `<elevenlabs-convai agent-id="${agentId}"></elevenlabs-convai>`,
      }}
    />
  )
}
