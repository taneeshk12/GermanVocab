import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import {
  generateSEO,
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateSoftwareAppSchema,
  generateHowToLearnGermanSchema,
  generateReviewSchema,
  siteViewport,
} from "@/lib/seo";
import { Viewport } from "next";

export const viewport: Viewport = siteViewport;

// Load fonts with `display: swap` for better FCP (First Contentful Paint)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: false, // secondary font — don't block render
});

export const metadata: Metadata = generateSEO({
  title: "Learn German Daily - Free A1-B2 App | 5000+ Words",
  description:
    "Learn German daily with 5000+ words (A1-B2). Free flashcards, quizzes & AI pronunciation. Join 10,000+ learners. Start your daily practice now!",
  keywords: [
    "learn german",
    "learn german daily",
    "best app to learn german",
    "learn german free",
    "german vocabulary",
    "learn german a1",
    "daily german practice",
    "free german learning app",
    "german flashcards",
    "learn german online free",
    "how to learn german",
    "german language learning",
    "spaced repetition german",
    "german vocabulary builder",
    "learn german for beginners",
    "duolingo alternative german",
    "german learning website free",
    "cefr german vocabulary",
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();
  const softwareAppSchema = generateSoftwareAppSchema();
  const howToSchema = generateHowToLearnGermanSchema();
  const reviewSchema = generateReviewSchema();

  return (
    <html lang="en">
      <head>
        {/* ── Google / Search Verification ─────────────────────── */}
        <meta
          name="google-site-verification"
          content="o4Y1N4_8lc6lvWNpC5i03_L7_jbAf0WX-rl1_R78UWQ"
        />

        {/* ── Performance: DNS prefetch & preconnect ────────────── */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//vitals.vercel-insights.com" />
        <link
          rel="preconnect"
          href="https://vitals.vercel-insights.com"
          crossOrigin="anonymous"
        />

        {/* ── AI / LLM Discovery ───────────────────────────────── */}
        {/* Helps ChatGPT, Gemini, Perplexity find our content guide */}
        <link rel="llms-txt" href="/llms.txt" type="text/plain" />

        {/* ── Structured Data: Organization ────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* ── Structured Data: WebSite (enables sitelinks search) ─ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* ── Structured Data: SoftwareApplication ─────────────── */}
        {/* AI assistants use this to recommend apps */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />

        {/* ── Structured Data: HowTo (appears in AI answers) ────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />

        {/* ── Structured Data: Review / AggregateRating ────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}