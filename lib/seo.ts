import { Metadata, Viewport } from 'next'

interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  noindex?: boolean
}

const baseUrl = 'https://learngermandaily.com'
const siteName = 'Learn German Daily'
// Force HMR update

export function generateSEO({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = '/og-image.png',
  noindex = false,
}: SEOProps): Metadata {
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`
  const canonicalUrl = canonical || baseUrl

  return {
    title: fullTitle,
    description,
    keywords: [
      'German vocabulary',
      'Learn German',
      'German language',
      'German words',
      'German learning app',
      'A1 German',
      'A2 German',
      'B1 German',
      'B2 German',
      'German flashcards',
      'German practice',
      'German for beginners',
      'German daily words',
      'Goethe Institute prediction',
      'German language test',
      'free German course',
      'German pronunciation',
      'German grammar practice',
      'free language app',
      'learn german free',
      'german a1 word list',
      'german a2 word list',
      'german b1 word list',
      'goethe a1 word list',
      'goethe b1 word list',
      'best app to learn german',
      'german study guide',
      'german vocabulary builder',
      'german spaced repetition',
      ...keywords,
    ],
    authors: [{ name: 'Learn German Daily Team', url: baseUrl }],
    creator: 'Learn German Daily Team',
    publisher: 'Learn German Daily',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@langflow', // Update with your Twitter handle
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'available_on_console',
      // yandex: 'your-yandex-verification',
      // bing: 'your-bing-verification',
    },
    icons: {
      icon: '/app_logo.svg',
      shortcut: '/app_logo.svg',
      apple: '/app_logo.svg',
    },
    category: 'education',
    classification: 'Language Learning',
    referrer: 'origin-when-cross-origin',
  }
}

export const siteViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export function generateLevelSEO(level: string, wordCount: number): Metadata {
  return generateSEO({
    title: `Learn German ${level.toUpperCase()} Daily - ${wordCount} Words Free`,
    description: `Master ${wordCount} German ${level.toUpperCase()} words with daily practice. Free flashcards, quizzes & sentence exercises. CEFR-aligned. Start learning German ${level.toUpperCase()} today!`,
    keywords: [
      `learn German ${level.toUpperCase()}`,
      `German ${level.toUpperCase()} vocabulary`,
      `German ${level.toUpperCase()} words`,
      `learn German ${level.toUpperCase()} daily`,
      `German ${level.toUpperCase()} practice`,
      `${level.toUpperCase()} word list`,
      `goethe ${level.toUpperCase()}`,
      'CEFR German',
      'German for beginners' + (level.toLowerCase() === 'a1' ? '' : ''),
    ],
    canonical: `${baseUrl}/${level.toLowerCase()}`,
  })
}

export function generateTopicSEO(level: string, topic: string, wordCount: number): Metadata {
  const topicTitle = topic.charAt(0).toUpperCase() + topic.slice(1)

  return generateSEO({
    title: `${topicTitle} - Learn German ${level.toUpperCase()} Vocabulary Daily`,
    description: `Learn ${wordCount} German words about ${topicTitle}. Daily ${level.toUpperCase()}-level vocabulary practice with examples, pronunciation & interactive exercises. Free!`,
    keywords: [
      `German ${topic}`,
      `${topic} in German`,
      `German ${topic} vocabulary`,
      `learn German ${topic}`,
      `${level.toUpperCase()} ${topic}`,
    ],
    canonical: `${baseUrl}/${level.toLowerCase()}/${topic.toLowerCase()}`,
  })
}

export function generateWordSEO(word: string, translation: string, level: string, topic: string): Metadata {
  return generateSEO({
    title: `${word} - ${translation} | German ${level.toUpperCase()} Vocabulary`,
    description: `Learn the German word "${word}" meaning "${translation}". Includes pronunciation, example sentences, and practice exercises for ${level.toUpperCase()}-level learners.`,
    keywords: [
      `${word} German`,
      `${word} meaning`,
      `${translation} in German`,
      `German ${topic}`,
    ],
    canonical: `${baseUrl}/${level.toLowerCase()}/${topic.toLowerCase()}/${word}`,
  })
}

export function generatePracticeSEO(level: string, practiceType: string): Metadata {
  const types = {
    flashcards: 'Flashcard',
    sentences: 'Sentence Building',
    translation: 'Translation',
  }

  const typeName = types[practiceType as keyof typeof types] || practiceType

  return generateSEO({
    title: `German ${typeName} Practice Daily - ${level.toUpperCase()} Level Free`,
    description: `Practice German ${level.toUpperCase()} vocabulary daily with ${typeName.toLowerCase()} exercises. Spaced repetition, instant feedback & free access. Improve every day!`,
    keywords: [
      `German ${typeName.toLowerCase()}`,
      `learn German ${level.toUpperCase()}`,
      `German ${level.toUpperCase()} practice`,
      `daily German practice`,
      `German practice exercises`,
      `learn German online free`,
      'German vocabulary practice',
      'spaced repetition German',
    ],
    canonical: `${baseUrl}/${level.toLowerCase()}/practice/${practiceType}`,
  })
}

// JSON-LD structured data generators
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Learn German Daily',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Free open-source platform for learning German vocabulary',
    sameAs: [
      'https://github.com/taneeshk12/GermanVocab', // Update with actual URLs
      // Add other social media profiles
    ],
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Learn German Daily',
    url: baseUrl,
    description: 'Master German vocabulary with interactive practice and daily quizzes',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateEducationalSchema(level: string, wordCount: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `German ${level.toUpperCase()} Vocabulary Course`,
    description: `Comprehensive German ${level.toUpperCase()} vocabulary course with ${wordCount} words`,
    provider: {
      '@type': 'Organization',
      name: 'Learn German Daily',
      url: baseUrl,
    },
    educationalLevel: level.toUpperCase(),
    inLanguage: ['en', 'de'],
    coursePrerequisites: level.toLowerCase() === 'a1' ? 'None' : `German ${String.fromCharCode(level.charCodeAt(0) - 1)}${level.charAt(1)}`,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT10H', // 10 hours estimated
    },
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
