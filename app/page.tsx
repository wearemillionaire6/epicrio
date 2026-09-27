'use client'

import StudioNav from '@/components/studio/StudioNav'
import StudioEveryBusiness from '@/components/studio/StudioEveryBusiness'
import StudioHero from '@/components/studio/StudioHero'
import StudioOdooSuite from '@/components/studio/StudioOdooSuite'
import StudioVoiceReceptionist from '@/components/studio/StudioVoiceReceptionist'
import StudioCrmWorkflows from '@/components/studio/StudioCrmWorkflows'
import StudioThesis from '@/components/studio/StudioThesis'
import StudioPilot from '@/components/studio/StudioPilot'
import StudioPricing from '@/components/studio/StudioPricing'
import StudioInquiry from '@/components/studio/StudioInquiry'
import StudioFooter from '@/components/studio/StudioFooter'

export default function Home() {
  // Light Mode Only - Luxury Monochrome Minimalist
  const isDark = false

  return (
    <div className="min-h-screen font-sans selection:bg-zinc-950 selection:text-white bg-[#FAFAF8] text-[#1A1A1E]">
      {/* Spacious Floating Capsule Navigation */}
      <StudioNav isDark={false} />

      {/* Main Container - Responsive Full Screen across all device ratios */}
      <main className="w-full max-w-[1536px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* 1. Hero Statement: Everything Under One Roof */}
        <StudioHero isDark={isDark} />

        {/* 1.5. Built for Every Business: Converting Heavy Workload into Easy Automation */}
        <StudioEveryBusiness isDark={isDark} />

        {/* 2. The All-in-One Operations Suite */}
        <StudioOdooSuite isDark={isDark} />

        {/* 3. 24/7 AI Voice Receptionist (Never Miss a Customer Call) */}
        <StudioVoiceReceptionist isDark={isDark} />

        {/* 4. CRM & Back-Office Tech Services (Take Load Off Your Team) */}
        <StudioCrmWorkflows isDark={isDark} />

        {/* 5. Simple How It Works */}
        <StudioThesis isDark={isDark} />

        {/* 6. 7-Day Zero-Risk Trial */}
        <StudioPilot isDark={isDark} />

        {/* 8. Transparent All-in-One Productized Packages */}
        <StudioPricing isDark={isDark} />

        {/* 9. Feasibility Assessment & Pilot Application */}
        <StudioInquiry isDark={isDark} />

        {/* 10. Colophon & Links */}
        <StudioFooter isDark={false} />
      </main>
    </div>
  )
}
