import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ElevenLabsWidget from "@/components/studio/ElevenLabsWidget";
import SmoothScroll from "@/components/SmoothScroll";
import LoadingScreen from "@/components/studio/LoadingScreen";

/* ── Premium Typography Stack ──────────────────────────────────── */

// Display: Instrument Serif — elegant, high-contrast editorial serif
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400'],
  style: ['normal', 'italic'],
});

// Mono: JetBrains Mono — engineered for technical labels & metrics
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://epicrio.com'),
  title: {
    default: 'Epicrio | Autonomous Business Operations & Automation Platform',
    template: '%s | Epicrio',
  },
  description:
    "We automate the work your team shouldn't be doing manually. 24/7 AI voice reception, autonomous CRM pipelines, and back-office automation — one integrated system.",
  keywords: [
    'Epicrio',
    'Epicrio AI',
    'AI Automation Agency',
    'AI Voice Receptionist',
    'Autonomous Operations',
    'Enterprise CRM Integration',
    'Back-Office Workflows',
  ],
  authors: [{ name: 'Epicrio', url: 'https://epicrio.com' }],
  creator: 'Epicrio',
  publisher: 'Epicrio',
  alternates: {
    canonical: 'https://epicrio.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://epicrio.com',
    siteName: 'Epicrio',
    title: 'Epicrio | Autonomous Business Operations & Automation Platform',
    description:
      "We automate the work your team shouldn't be doing manually. 24/7 AI voice reception, autonomous CRM pipelines, and back-office automation.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Epicrio | Autonomous Business Operations & Automation Platform',
    description:
      "We automate the work your team shouldn't be doing manually. 24/7 AI voice reception, autonomous CRM pipelines, and back-office automation.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`bg-white ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Satoshi — premium sans-serif from Fontshare (not on Google Fonts) */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700,800,900&display=swap"
          rel="stylesheet"
        />
        {/* Structured Data (JSON-LD) for Google Brand Entity Indexing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Epicrio',
              url: 'https://epicrio.com',
              logo: 'https://epicrio.com/icon',
              description:
                "Autonomous Business Operations & Automation Platform. 24/7 AI Voice Receptionists, CRM pipelines, and back-office automation.",
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="antialiased min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
        <LoadingScreen />
        <SmoothScroll>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </SmoothScroll>
        {/* Live ElevenLabs Conversational Voice Receptionist Widget */}
        <ElevenLabsWidget />
      </body>
    </html>
  );
}
