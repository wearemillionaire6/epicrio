'use client'

import { useEffect } from 'react'

interface ElevenLabsWidgetProps {
  agentId?: string
}

export default function ElevenLabsWidget({
  agentId = 'agent_5601m3p56sw0e4388zqe6m1g67es',
}: ElevenLabsWidgetProps) {
  useEffect(() => {
    // Ensure the ElevenLabs widget script is loaded
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
      id="elevenlabs-widget-container"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[99999] pointer-events-auto"
    >
      {/* ElevenLabs Official Web Component */}
      <div
        dangerouslySetInnerHTML={{
          __html: `<elevenlabs-convai 
            agent-id="${agentId}" 
            action-text="Talk with 24/7 AI Voice Agent" 
            start-call-text="Talk to Voice Agent" 
            end-call-text="End Call" 
            listening-text="Listening to you..." 
            speaking-text="Sarah is speaking..." 
            avatar-orb-color-1="#09090B" 
            avatar-orb-color-2="#3F3F46"
          ></elevenlabs-convai>`,
        }}
      />
    </div>
  )
}
