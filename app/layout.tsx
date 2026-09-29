import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, DM_Mono } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ElevenLabsWidget from "@/components/studio/ElevenLabsWidget";

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500'],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  title: "Epicrio | Autonomous Business Operations & Automation Platform",
  description:
    "We automate the work your team shouldn't be doing manually. 24/7 AI voice reception, autonomous CRM pipelines, and back-office automation — one integrated system.",
  keywords: [
    "AI Automation Agency",
    "B2B Automation",
    "AI Voice Receptionist",
    "Enterprise CRM",
    "Workflow Integration",
  ],
  authors: [{ name: "Epicrio" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth bg-white ${outfit.variable} ${plusJakartaSans.variable} ${dmMono.variable}`}>
      <body className="antialiased min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-950 selection:text-white">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {/* Live ElevenLabs Conversational Voice Receptionist Widget */}
        <ElevenLabsWidget />
      </body>
    </html>
  );
}
