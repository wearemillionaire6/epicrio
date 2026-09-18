'use client'

export default function Biography() {
  return (
    <section id="biography" className="py-20 border-b border-[#222222]">
      {/* Section Title in Pixel Font */}
      <h2 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-widest mb-12">
        BIOGRAPHY
      </h2>

      {/* Columnar Manifesto matching Yannick's design */}
      <div className="space-y-12 font-mono text-xs sm:text-sm md:text-base leading-loose">
        
        {/* Row 1 */}
        <div className="grid grid-cols-3 max-w-2xl gap-4">
          <div>
            <div>SYSTEMS</div>
            <div>ENGINEERING</div>
          </div>
          <div>
            <div>FOCUSED</div>
            <div>BASED IN</div>
          </div>
          <div>
            <div>AUTONOMOUS</div>
            <div>ENTERPRISE</div>
          </div>
        </div>

        {/* Row 2: Over principles */}
        <div className="grid grid-cols-3 max-w-2xl gap-4 text-slate-300">
          <div>
            <div>CALM</div>
            <div>DETERMINISTIC</div>
            <div>PIPELINES</div>
          </div>
          <div className="text-muted">
            <div>OVER</div>
            <div>OVER</div>
            <div>OVER</div>
          </div>
          <div>
            <div>CHAOS</div>
            <div>MANUAL</div>
            <div>SLACK</div>
          </div>
        </div>

        {/* Row 3: Mission statements */}
        <div className="grid grid-cols-3 max-w-3xl gap-4 text-white">
          <div>
            <div>PAIRS</div>
            <div>TO</div>
            <div>ACROSS</div>
          </div>
          <div>
            <div>WITH</div>
            <div>BUILD</div>
            <div>ESTABLISHED</div>
          </div>
          <div>
            <div>ENTERPRISE</div>
            <div>INFRASTRUCTURE</div>
            <div>PLATFORMS</div>
          </div>
        </div>

        {/* Concise Prose Summary */}
        <div className="pt-8 max-w-3xl text-slate-400 text-xs sm:text-sm font-mono leading-relaxed border-t border-[#1A1A1A]">
          <p>
            CRM. AUTOMATION. SUB-300MS AI VOICE AGENTS. INTEGRATIONS. BESPOKE TECHNOLOGY.
            ONE CONNECTED OPERATING SYSTEM ENGINEERED SPECIFICALLY AROUND HOW YOUR BUSINESS SCALES.
          </p>
        </div>

      </div>
    </section>
  )
}
