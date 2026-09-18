'use client'

interface TerminalFooterProps {
  onToggleInvert: () => void
}

export default function TerminalFooter({ onToggleInvert }: TerminalFooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  return (
    <footer className="pt-8 pb-16 font-mono text-[11px]">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Col 1 */}
        <div className="border border-[#222222] p-3 space-y-1">
          <div>
            <a href="#home" className="hover:text-primary transition-colors flex items-center gap-2">
              <span className="text-muted">^H</span>
              <span className="text-white font-bold">HOME</span>
            </a>
          </div>
          <div>
            <a href="#biography" className="hover:text-primary transition-colors flex items-center gap-2">
              <span className="text-muted">^B</span>
              <span className="text-white font-bold">BIOGRAPHY</span>
            </a>
          </div>
        </div>

        {/* Col 2 */}
        <div className="border border-[#222222] p-3 space-y-1">
          <div>
            <a href="#architecture" className="hover:text-primary transition-colors flex items-center gap-2">
              <span className="text-muted">^P</span>
              <span className="text-white font-bold">PROJECTS</span>
            </a>
          </div>
          <div>
            <a href="#services" className="hover:text-primary transition-colors flex items-center gap-2">
              <span className="text-muted">^S</span>
              <span className="text-white font-bold">SERVICES</span>
            </a>
          </div>
        </div>

        {/* Col 3 */}
        <div className="border border-[#222222] p-3 space-y-1">
          <div>
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-primary transition-colors flex items-center gap-2 w-full text-left"
            >
              <span className="text-muted">^PAGE UP</span>
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={scrollToBottom}
              className="hover:text-primary transition-colors flex items-center gap-2 w-full text-left"
            >
              <span className="text-muted">^PAGE DOWN</span>
            </button>
          </div>
        </div>

        {/* Col 4 */}
        <div className="border border-[#222222] p-3 space-y-1">
          <div>
            <a href="#contact" className="hover:text-primary transition-colors flex items-center gap-2">
              <span className="text-muted">^C</span>
              <span className="text-white font-bold">CONTACT</span>
            </a>
          </div>
          <div>
            <button
              type="button"
              onClick={onToggleInvert}
              className="hover:text-primary transition-colors flex items-center gap-2 w-full text-left"
            >
              <span className="text-muted">^I</span>
              <span className="text-primary font-bold">INVERT</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
