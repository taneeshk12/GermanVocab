import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { generateSEO, generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = generateSEO({
  title: "Learn German Daily - Free A1-B2 App | 5000+ Words",
  description: "Learn German daily with 5000+ words (A1-B2). Free flashcards, quizzes & AI pronunciation. Join 10,000+ learners. Start your daily practice now!",
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
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}


//comment 1