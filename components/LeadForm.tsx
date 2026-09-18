'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check, CheckCircle2, Sparkles, Building, Mail, User, Phone, ShieldCheck } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function LeadForm() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  // Form state
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
    'Leads falling through the cracks / slow response time',
    'Disconnected CRM, spreadsheets, and manual data entry',
    'High call volume / missed phone calls after hours',
    'Repetitive team tasks eating up billable employee hours',
    'Lack of custom dashboards or real-time business visibility',
    'Outgrown off-the-shelf tools; need custom web app/portal',
  ]

  const sizeOptions = ['1 - 10 Employees', '11 - 50 Employees', '51 - 200 Employees', '200+ Enterprise']

  const toolOptions = ['HubSpot', 'Salesforce', 'GoHighLevel', 'Make / Zapier', 'Slack / WhatsApp', 'Custom Database / Spreadsheets']

  const toggleBottleneck = (option: string) => {
    if (bottlenecks.includes(option)) {
      setBottlenecks(bottlenecks.filter((item) => item !== option))
    } else {
      setBottlenecks([...bottlenecks, option])
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
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10B981', '#059669', '#34D399', '#ffffff'],
      })
    } catch (err) {
      // safe fallback
    }
  }

  return (
    <section id="lead-form" className="py-28 bg-background relative border-t border-gray-900">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs font-mono text-primary mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SYSTEM AUDIT & SCOPING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Architect Your Autonomous Stack
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Answer a few quick questions to receive a tailored architecture blueprint and book a 1-on-1 engineering review.
          </p>
        </div>

        <div className="bg-glass-panel border border-gray-800 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {!submitted ? (
            <div>
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
                  <span>Step 0{step} of 03</span>
                  <span>{step === 1 ? 'Operational Bottlenecks' : step === 2 ? 'Stack & Scale' : 'Contact & Schedule'}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
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
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        Where is friction slowing down your growth?
                      </h3>
                      <p className="text-xs text-gray-400">Select all areas you want to automate or overhaul:</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {bottleneckOptions.map((opt) => {
                        const isSelected = bottlenecks.includes(opt)
                        return (
                          <button
                            type="button"
                            key={opt}
                            onClick={() => toggleBottleneck(opt)}
                            className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all duration-200 flex items-start gap-3 ${
                              isSelected
                                ? 'bg-primary/10 border-primary text-white shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                                : 'bg-surface/50 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                                isSelected ? 'bg-primary border-primary text-background' : 'border-gray-700'
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 font-bold stroke-[3]" />}
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
                        className={`px-7 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all ${
                          bottlenecks.length > 0
                            ? 'bg-primary hover:bg-primaryHover text-background shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        Tell us about your team size and current tools
                      </h3>
                      <p className="text-xs text-gray-400">This helps us match the right architectural tier for you.</p>
                    </div>

                    {/* Company Size */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-300 uppercase tracking-wider block">
                        Team Size
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {sizeOptions.map((sz) => (
                          <button
                            type="button"
                            key={sz}
                            onClick={() => setCompanySize(sz)}
                            className={`py-3 px-3 rounded-xl border text-xs font-medium transition-all ${
                              companySize === sz
                                ? 'bg-primary/10 border-primary text-white'
                                : 'bg-surface/50 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tools in Use */}
                    <div className="space-y-2 pt-2">
                      <label className="text-xs font-mono text-gray-300 uppercase tracking-wider block">
                        Tools Currently in Your Stack
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {toolOptions.map((tool) => {
                          const isSelected = currentTools.includes(tool)
                          return (
                            <button
                              type="button"
                              key={tool}
                              onClick={() => toggleTool(tool)}
                              className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                                isSelected
                                  ? 'bg-primary/10 border-primary text-white'
                                  : 'bg-surface/50 border-gray-800 text-gray-400 hover:border-gray-700'
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
                        className="px-5 py-3 rounded-xl border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 text-sm flex items-center gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        disabled={!companySize}
                        className={`px-7 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all ${
                          companySize
                            ? 'bg-primary hover:bg-primaryHover text-background shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <span>Final Step</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.form
                    key="step3"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        Where should we send your architecture blueprint?
                      </h3>
                      <p className="text-xs text-gray-400">Our engineering lead will review your submission before our call.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-gray-300 block mb-1.5">Full Name *</label>
                        <div className="relative">
                          <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                          <input
                            required
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-surface/70 border border-gray-800 focus:border-primary focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-gray-300 block mb-1.5">Work Email *</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                          <input
                            required
                            type="email"
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-surface/70 border border-gray-800 focus:border-primary focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-gray-300 block mb-1.5">Company Name *</label>
                        <div className="relative">
                          <Building className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                          <input
                            required
                            type="text"
                            placeholder="Acme Global Inc."
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full bg-surface/70 border border-gray-800 focus:border-primary focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-gray-300 block mb-1.5">Direct Phone / Mobile *</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                          <input
                            required
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-surface/70 border border-gray-800 focus:border-primary focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-gray-300 block mb-1.5">Additional Context (Optional)</label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about specific workflows, volumes, or software you want connected..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full bg-surface/70 border border-gray-800 focus:border-primary focus:outline-none rounded-xl p-3 text-sm text-white placeholder-gray-600 transition-colors"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-5 py-3 rounded-xl border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 text-sm flex items-center gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="submit"
                        className="px-8 py-3.5 bg-primary hover:bg-primaryHover text-background font-bold text-sm rounded-xl flex items-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all active:scale-95"
                      >
                        <span>Submit & Request Systems Audit</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center space-y-5"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto text-primary">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Systems Audit Request Received!
              </h3>
              <p className="text-sm text-gray-400 max-w-md mx-auto">
                Thank you, {formData.name || 'there'}. Our systems architect is compiling your preliminary blueprint for {formData.company || 'your organization'}. Expect our calendar invitation within 2 hours.
              </p>
              <div className="p-4 rounded-xl bg-surface/60 border border-gray-800 inline-flex items-center gap-3 text-xs text-primary font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>NDA & Confidentiality Guaranteed</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
