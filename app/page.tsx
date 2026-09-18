import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import SystemArchitecture from '@/components/SystemArchitecture'
import Solutions from '@/components/Solutions'
import AiVoiceDemo from '@/components/AiVoiceDemo'
import HowWeWork from '@/components/HowWeWork'
import Industries from '@/components/Industries'
import LeadForm from '@/components/LeadForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/30 selection:text-white font-sans overflow-x-hidden">
      {/* Sticky Glassmorphic Navbar (PRD §24) */}
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* Interactive System Architecture & Data Flows (PRD §13) */}
      <SystemArchitecture />

      {/* Glassmorphism Solutions Grid (PRD §11) */}
      <Solutions />

      {/* AI Voice Receptionist Interactive Demo (PRD §15) */}
      <AiVoiceDemo />

      {/* Engineering Sprint Methodology */}
      <HowWeWork />

      {/* Vertical Specialization Cards */}
      <Industries />

      {/* High-Conversion Multi-Step Lead Qualification Form */}
      <LeadForm />

      {/* Engineering Footer with System Telemetry */}
      <Footer />
    </main>
  )
}
