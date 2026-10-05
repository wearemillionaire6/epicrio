'use client'

import StudioNav from '@/components/studio/StudioNav'
import StudioHero from '@/components/studio/StudioHero'
import StudioEveryBusiness from '@/components/studio/StudioEveryBusiness'
import StudioOdooSuite from '@/components/studio/StudioOdooSuite'
import StudioVoiceReceptionist from '@/components/studio/StudioVoiceReceptionist'
import StudioCrmWorkflows from '@/components/studio/StudioCrmWorkflows'
import StudioThesis from '@/components/studio/StudioThesis'
import StudioPilot from '@/components/studio/StudioPilot'
import StudioPricing from '@/components/studio/StudioPricing'
import StudioInquiry from '@/components/studio/StudioInquiry'
import StudioFooter from '@/components/studio/StudioFooter'

export default function Home() {
  return (
    <div className="min-h-screen w-full font-sans selection:bg-zinc-950 selection:text-white bg-white text-zinc-900 overflow-x-hidden">
      {/* Floating Capsule Navigation */}
      <StudioNav />

      {/* Main Flow - Fluid and responsive across all device aspect ratios */}
      <main className="w-full">
        {/* 1. Hero Statement: Everything Under One Roof */}
        <StudioHero />

        {/* 1.5. Built for Every Business: Converting Heavy Workload into Easy Automation */}
        <StudioEveryBusiness />

        {/* 2. The All-in-One Operations Suite */}
        <StudioOdooSuite />

        {/* 3. 24/7 AI Voice Receptionist */}
        <StudioVoiceReceptionist />

        {/* 4. CRM & Back-Office Tech Services */}
        <StudioCrmWorkflows />

        {/* 5. Simple How It Works */}
        <StudioThesis />

        {/* 6. The Business Case & ROI */}
        <StudioPilot />

        {/* 7. Transparent All-in-One Productized Packages */}
        <StudioPricing />

        {/* 8. Feasibility Assessment & Pilot Application */}
        <StudioInquiry />
      </main>

      {/* 9. Full-Width Footer */}
      <StudioFooter />
    </div>
  )
}
