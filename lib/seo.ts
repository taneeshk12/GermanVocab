import { Metadata } from 'next'

interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  noindex?: boolean
}

const baseUrl = 'https://langflow.vercel.app' // Update with your actual domain
const siteName = 'LangFlow'

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
      ...keywords,
    ],
    authors: [{ name: 'LangFlow Team' }],
    creator: 'LangFlow',
    publisher: 'LangFlow',
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
      google: 'your-google-verification-code', // Add your Google Search Console verification
      // yandex: 'your-yandex-verification',
      // bing: 'your-bing-verification',
    },
  }
}

export function generateLevelSEO(level: string, wordCount: number): Metadata {
  return generateSEO({
    title: `German ${level.toUpperCase()} Vocabulary - ${wordCount} Essential Words`,
    description: `Master ${wordCount} essential German ${level.toUpperCase()} vocabulary words with interactive flashcards, translation exercises, and sentence practice. Perfect for CEFR ${level.toUpperCase()} learners.`,
    keywords: [
      `German ${level.toUpperCase()}`,
      `${level.toUpperCase()} vocabulary`,
      `${level.toUpperCase()} words`,
      `learn German ${level.toUpperCase()}`,
      `German ${level.toUpperCase()} practice`,
      'CEFR',
      'German beginner' + (level.toLowerCase() === 'a1' ? '' : ''),
    ],
    canonical: `${baseUrl}/${level.toLowerCase()}`,
  })
}

export function generateTopicSEO(level: string, topic: string, wordCount: number): Metadata {
  const topicTitle = topic.charAt(0).toUpperCase() + topic.slice(1)

  return generateSEO({
    title: `${topicTitle} - German ${level.toUpperCase()} Vocabulary`,
    description: `Learn ${wordCount} German words related to ${topicTitle}. Master essential ${level.toUpperCase()}-level vocabulary with examples, pronunciation, and interactive exercises.`,
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
    title: `${typeName} Practice - German ${level.toUpperCase()}`,
    description: `Practice German ${level.toUpperCase()} vocabulary with interactive ${typeName.toLowerCase()} exercises. Improve your vocabulary retention with spaced repetition and immediate feedback.`,
    keywords: [
      `German ${typeName.toLowerCase()}`,
      `${level.toUpperCase()} practice`,
      `German practice exercises`,
      `learn German online`,
      'German vocabulary practice',
    ],
    canonical: `${baseUrl}/${level.toLowerCase()}/practice/${practiceType}`,
  })
}

// JSON-LD structured data generators
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LangFlow',
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
    name: 'LangFlow',
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
      name: 'LangFlow',
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
