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
  title: "LangFlow - Master German Vocabulary | Free A1-B2 Learning Platform",
  description: "Master German vocabulary completely free. 2000+ words across A1-B2 levels, featuring spaced repetition flashcards, interactive quizzes, and sentence building exercises. The best open-source alternative to paid language apps.",
  keywords: [
    "free German learning",
    "German vocabulary app",
    "CEFR German",
    "German beginner",
    "German intermediate",
    "vocabulary builder",
    "spaced repetition",
    "German exercises",
    "learn German online free",
    "German language learning",
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