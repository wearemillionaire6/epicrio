import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B132B",
};

export const metadata: Metadata = {
  title: "Agency.co | High-Impact B2B Automation & AI Infrastructure",
  description:
    "We build the connected systems behind modern enterprises: CRM, Automation, AI Voice Receptionists, Custom Technology, and Unified Workflows.",
  keywords: [
    "AI Automation Agency",
    "B2B Automation",
    "AI Voice Receptionist",
    "Enterprise CRM",
    "Workflow Integration",
    "Zig.ai aesthetic",
  ],
  authors: [{ name: "Agency.co" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-mono antialiased bg-black text-white min-h-screen selection:bg-[#00FF88] selection:text-black uppercase">
        {children}
      </body>
    </html>
  );
}
