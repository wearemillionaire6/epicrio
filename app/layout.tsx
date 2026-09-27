import type { Metadata, Viewport } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAFAF8",
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
    <html lang="en" className={`scroll-smooth bg-[#FAFAF8] ${inter.variable}`}>
      <body className="antialiased min-h-screen bg-[#FAFAF8] text-[#1A1A1E] selection:bg-zinc-950 selection:text-white">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
