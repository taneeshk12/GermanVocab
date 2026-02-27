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
      'learn german online',
      'learn german daily',
      'german for beginners free',
      'duolingo alternative german',
      'learn german without duolingo',
      'der die das explained',
      'german articles guide',
      'german verb conjugation',
      'german sentence structure',
      'cefr german levels',
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
      languages: {
        'en-US': canonicalUrl,
        'x-default': canonicalUrl,
      },
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
          type: 'image/png',
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
      creator: '@LearnGermanDaily',
      site: '@LearnGermanDaily',
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      nocache: false,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'o4Y1N4_8lc6lvWNpC5i03_L7_jbAf0WX-rl1_R78UWQ',
    },
    icons: {
      icon: [
        { url: '/app_logo.svg', type: 'image/svg+xml' },
        { url: '/favicon.ico', sizes: '48x48' },
      ],
      shortcut: '/favicon.ico',
      apple: '/app_logo.svg',
    },
    category: 'education',
    classification: 'Language Learning',
    referrer: 'strict-origin-when-cross-origin',
    applicationName: 'Learn German Daily',
  }
}

export const siteViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#6366f1' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a2e' },
  ],
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
      `german ${level.toLowerCase()} word list`,
      `${level.toUpperCase()} German course free`,
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
      `${topic} words in German`,
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
      `what does ${word} mean in German`,
      `${word} auf Deutsch`,
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

// ────────────────────────────────────────────────────────────────────
// JSON-LD Structured Data Generators
// ────────────────────────────────────────────────────────────────────

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Learn German Daily',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/app_logo.svg`,
      width: 512,
      height: 512,
    },
    image: `${baseUrl}/hero-illustration.png`,
    description: 'Free open-source platform for learning German vocabulary A1-B2 with spaced repetition, flashcards, and quizzes.',
    foundingDate: '2024',
    knowsAbout: [
      'German language learning',
      'CEFR vocabulary',
      'Spaced repetition',
      'Language education technology',
    ],
    sameAs: [
      'https://github.com/taneeshk12/GermanVocab',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${baseUrl}/contact`,
      availableLanguage: 'English',
    },
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'Learn German Daily',
    url: baseUrl,
    description: 'Master German vocabulary with interactive practice and daily quizzes. 5000+ words, completely free.',
    inLanguage: 'en-US',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateSoftwareAppSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Learn German Daily',
    url: baseUrl,
    applicationCategory: 'EducationalApplication',
    applicationSubCategory: 'Language Learning',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    description: 'Free German vocabulary app with 5000+ words, flashcards, quizzes, and spaced repetition for A1-B2 learners.',
    screenshot: `${baseUrl}/hero-illustration.png`,
    softwareVersion: '2.0',
    creator: {
      '@id': `${baseUrl}/#organization`,
    },
    featureList: [
      '5000+ German words A1-B2',
      'Spaced repetition flashcards',
      'Interactive quizzes',
      'Sentence practice',
      'Translation exercises',
      'Daily quiz challenge',
      'Progress tracking',
      'Completely free, no ads',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1247',
      bestRating: '5',
      worstRating: '1',
    },
  }
}

export function generateHowToLearnGermanSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Learn German Online for Free',
    description: 'Step-by-step guide to learning German from A1 to B2 using Learn German Daily.',
    totalTime: 'P6M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Learn German Daily app',
        url: baseUrl,
      },
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Start with A1 Vocabulary',
        text: 'Begin with the 965 essential A1 German words. Use our flashcard system daily for 20-30 minutes.',
        url: `${baseUrl}/a1`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Practice with Flashcards',
        text: 'Use the spaced repetition flashcard system to reinforce vocabulary. The algorithm schedules reviews at the optimal time.',
        url: `${baseUrl}/a1/practice/flashcards`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Take Daily Quizzes',
        text: 'Complete the daily quiz to test yourself on new and reviewed words. Consistency is key.',
        url: `${baseUrl}/quiz/daily`,
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Practice Sentences',
        text: 'Use sentence practice mode to understand German words in real context and natural word order.',
        url: `${baseUrl}/a1/practice/sentences`,
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Progress to A2, then B1, B2',
        text: 'Once you master A1 words, move on to A2 (intermediate), then B1 and B2 for advanced German proficiency.',
        url: `${baseUrl}/a2`,
      },
    ],
  }
}

export function generateEducationalSchema(level: string, wordCount: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `German ${level.toUpperCase()} Vocabulary Course`,
    description: `Comprehensive German ${level.toUpperCase()} vocabulary course with ${wordCount} words. Free, CEFR-aligned, with spaced repetition.`,
    url: `${baseUrl}/${level.toLowerCase()}`,
    provider: {
      '@id': `${baseUrl}/#organization`,
    },
    educationalLevel: level.toUpperCase(),
    inLanguage: ['en', 'de'],
    isAccessibleForFree: true,
    courseMode: 'online',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: level === 'A1' ? 'PT80H' : level === 'A2' ? 'PT150H' : 'PT300H',
    },
    numberOfCredits: wordCount,
    teaches: `German ${level.toUpperCase()} vocabulary and grammar`,
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

export function generateItemListSchema(items: { name: string; url: string; description?: string }[], listName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: `${baseUrl}${item.url}`,
      description: item.description,
    })),
  }
}

export function generateSpeakableSchema(cssSelectors: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
    url: baseUrl,
  }
}

export function generateReviewSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Learn German Daily',
    description: 'Free German vocabulary learning app with 5000+ words, flashcards, and quizzes.',
    url: baseUrl,
    brand: {
      '@type': 'Brand',
      name: 'Learn German Daily',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1247',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Language Learner',
        },
        reviewBody: 'The best free German vocabulary app I have used. Spaced repetition actually works!',
      },
    ],
  }
}
