'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check, CheckCircle2, ShieldCheck, Terminal } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function LeadForm() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  const [bottlenecks, setBottlenecks] = useState<string[]>([])
  const [companySize, setCompanySize] = useState<string>('')
  const [currentTools, setCurrentTools] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    notes: '',
  })

  const bottleneckOptions = [
    'Leads slipping through cracks due to delayed follow-up',
    'Disconnected CRM, spreadsheets, and manual re-entry',
    'High call volume / missed phone inquiries after hours',
    'Repetitive team workflows draining billable hours',
    'Lack of real-time pipeline telemetry & reporting',
    'Outgrown standard SaaS; need bespoke API/portal software',
  ]

  const sizeOptions = ['1–10 Employees', '11–50 Employees', '51–200 Employees', '200+ Enterprise']

  const toolOptions = ['HubSpot', 'Salesforce', 'GoHighLevel', 'Make / n8n', 'Twilio / WhatsApp', 'Custom DB / Postgres']

  const toggleBottleneck = (opt: string) => {
    if (bottlenecks.includes(opt)) {
      setBottlenecks(bottlenecks.filter((item) => item !== opt))
    } else {
      setBottlenecks([...bottlenecks, opt])
    }
  }

  const toggleTool = (tool: string) => {
    if (currentTools.includes(tool)) {
      setCurrentTools(currentTools.filter((t) => t !== tool))
    } else {
      setCurrentTools([...currentTools, tool])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#059669', '#34D399', '#ffffff'],
      })
    } catch (err) {
      // safe fallback
    }
  }

  return (
    <section id="lead-form" className="py-28 bg-[#070B14] border-b border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1424] border border-white/[0.1] text-xs font-mono text-primary mb-4">
            <span>INTAKE // SYSTEMS AUDIT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-display mb-4">
            Request an architecture review.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Specify your operational bottlenecks. Our systems architects will evaluate your stack and present an actionable blueprint.
          </p>
        </div>

        {/* Solid grounded card (NO GLASSMORPHISM on forms per DESIGN.md) */}
        <div className="bg-[#0D1424] border border-white/[0.12] rounded-2xl p-6 sm:p-10 shadow-2xl">
          {!submitted ? (
            <div>
              {/* Stepper Header */}
              <div className="mb-8 pb-6 border-b border-white/[0.08]">
                <div className="flex items-center justify-between font-mono text-xs text-slate-400 mb-2">
                  <span className="text-primary font-semibold">STAGE 0{step} / 03</span>
                  <span>{step === 1 ? 'Operational Friction' : step === 2 ? 'Stack & Volume' : 'Contact & Dispatch'}</span>
                </div>
                <div className="w-full h-1 bg-[#070B14] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${(step / 3) * 100}%` }}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-white font-display mb-1">
                        Where is friction slowing down your throughput?
                      </h3>
                      <p className="text-xs font-mono text-slate-400">Select all operational pain points that apply:</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {bottleneckOptions.map((opt) => {
                        const isSelected = bottlenecks.includes(opt)
                        return (
                          <button
                            type="button"
                            key={opt}
                            onClick={() => toggleBottleneck(opt)}
                            className={`p-4 rounded-xl border text-left text-xs font-medium transition-all duration-150 flex items-start gap-3 min-h-[56px] ${
                              isSelected
                                ? 'bg-primary/10 border-primary text-white'
                                : 'bg-[#0A0F1D] border-white/[0.08] text-slate-400 hover:border-white/[0.16] hover:text-white'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                                isSelected ? 'bg-primary border-primary text-[#070B14]' : 'border-white/[0.2]'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="leading-snug">{opt}</span>
                          </button>
                        )
                      })}
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={bottlenecks.length === 0}
                        className={`h-11 px-6 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold flex items-center gap-2 transition-all ${
                          bottlenecks.length > 0
                            ? 'bg-primary hover:bg-primaryHover text-[#070B14]'
                            : 'bg-[#0A0F1D] text-slate-600 border border-white/[0.06] cursor-not-allowed'
                        }`}
                      >
                        <span>Continue to Step 02</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-white font-display mb-1">
                        Team Scale & Software Stack
                      </h3>
                      <p className="text-xs font-mono text-slate-400">Specifies the appropriate engineering tier for your company:</p>
                    </div>

                    {/* Scale */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                        Team Size
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {sizeOptions.map((sz) => (
                          <button
                            type="button"
                            key={sz}
                            onClick={() => setCompanySize(sz)}
                            className={`h-11 px-3 rounded-lg border text-xs font-mono transition-all ${
                              companySize === sz
                                ? 'bg-primary/10 border-primary text-white font-semibold'
                                : 'bg-[#0A0F1D] border-white/[0.08] text-slate-400 hover:border-white/[0.16]'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tools */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                        Existing Software in Use
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {toolOptions.map((tool) => {
                          const isSelected = currentTools.includes(tool)
                          return (
                            <button
                              type="button"
                              key={tool}
                              onClick={() => toggleTool(tool)}
                              className={`h-11 px-3 rounded-lg border text-left text-xs font-mono transition-all flex items-center justify-between ${
                                isSelected
                                  ? 'bg-primary/10 border-primary text-white font-semibold'
                                  : 'bg-[#0A0F1D] border-white/[0.08] text-slate-400 hover:border-white/[0.16]'
                              }`}
                            >
                              <span>{tool}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="h-11 px-5 rounded-lg border border-white/[0.1] text-slate-400 hover:text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        disabled={!companySize}
                        className={`h-11 px-6 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold flex items-center gap-2 transition-all ${
                          companySize
                            ? 'bg-primary hover:bg-primaryHover text-[#070B14]'
                            : 'bg-[#0A0F1D] text-slate-600 border border-white/[0.06] cursor-not-allowed'
                        }`}
                      >
                        <span>Proceed to Final Step</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.form
                    key="step3"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-white font-display mb-1">
                        Where should we dispatch your blueprint?
                      </h3>
                      <p className="text-xs font-mono text-slate-400">Our systems architect will review your stack prior to our call:</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">Full Name *</label>
                        <input
                          required
                          type="text"
                          placeholder="Bhavesh Waghmare"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full h-11 bg-[#0A0F1D] border border-white/[0.12] focus:border-primary focus:outline-none rounded-lg px-3.5 text-xs font-mono text-white placeholder-slate-600 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">Work Email *</label>
                        <input
                          required
                          type="email"
                          placeholder="bhavesh@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-11 bg-[#0A0F1D] border border-white/[0.12] focus:border-primary focus:outline-none rounded-lg px-3.5 text-xs font-mono text-white placeholder-slate-600 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">Company Entity *</label>
                        <input
                          required
                          type="text"
                          placeholder="Acme Global Corp"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full h-11 bg-[#0A0F1D] border border-white/[0.12] focus:border-primary focus:outline-none rounded-lg px-3.5 text-xs font-mono text-white placeholder-slate-600 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">Direct Mobile / Phone *</label>
                        <input
                          required
                          type="tel"
                          placeholder="+1 (555) 234-5678"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full h-11 bg-[#0A0F1D] border border-white/[0.12] focus:border-primary focus:outline-none rounded-lg px-3.5 text-xs font-mono text-white placeholder-slate-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">System Scope or Target Volume (Optional)</label>
                      <textarea
                        rows={3}
                        placeholder="e.g. 500 inbound leads/month needing instant voice qualification and two-way CRM sync..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full bg-[#0A0F1D] border border-white/[0.12] focus:border-primary focus:outline-none rounded-lg p-3 text-xs font-mono text-white placeholder-slate-600 transition-colors"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="h-11 px-5 rounded-lg border border-white/[0.1] text-slate-400 hover:text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </button>

                      <button
                        type="submit"
                        className="h-11 px-6 bg-primary hover:bg-primaryHover text-[#070B14] font-semibold font-mono text-xs uppercase tracking-wider rounded-lg flex items-center gap-2 transition-all"
                      >
                        <span>Dispatch Architecture Request</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto text-primary">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                Architecture Request Dispatched
              </h3>
              <p className="text-xs font-mono text-slate-400 max-w-md mx-auto leading-relaxed">
                Thank you, {formData.name || 'there'}. Our systems architect is compiling your preliminary stack analysis for {formData.company || 'your entity'}. Check your email for calendar availability.
              </p>
              <div className="inline-flex items-center gap-2 text-[11px] font-mono text-primary bg-black/40 px-3 py-1 rounded border border-white/[0.08]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>NDA Protected Intake</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
