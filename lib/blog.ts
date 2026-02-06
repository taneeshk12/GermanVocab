/**
 * Blog Content Management System for German Grammar Articles
 * Provides SEO-friendly blog utilities and content structure
 */

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  tags: string[];
  author: string;
  date: string;
  readTime: string;
  image?: string;
  keywords: string[];
  relatedPosts?: string[];
  grammarLevel?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  featured?: boolean;
  seoScore?: number;
}

export type BlogCategory = 
  | 'Grammar'
  | 'Vocabulary'
  | 'Learning Strategies'
  | 'Culture'
  | 'Exams'
  | 'Resources'
  | 'Pronunciation';

export interface GrammarArticleTemplate {
  title: string;
  grammarTopic: string;
  level: string;
  sections: GrammarSection[];
}

export interface GrammarSection {
  heading: string;
  content: string;
  examples?: GrammarExample[];
  exercises?: GrammarExercise[];
}

export interface GrammarExample {
  german: string;
  english: string;
  highlighted?: string[];
}

export interface GrammarExercise {
  question: string;
  answer: string;
  explanation: string;
}

/**
 * SEO-optimized slug generator
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100); // Keep URLs reasonable
}

/**
 * Calculate read time based on word count
 */
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Generate SEO-optimized keywords for German grammar articles
 */
export function generateGrammarKeywords(topic: string, level: string): string[] {
  const baseKeywords = [
    `german ${topic.toLowerCase()}`,
    `${topic.toLowerCase()} german grammar`,
    `learn german ${topic.toLowerCase()}`,
    `german ${level.toLowerCase()} ${topic.toLowerCase()}`,
    `how to use ${topic.toLowerCase()} in german`,
  ];

  const additionalKeywords = [
    'german grammar explained',
    'german language learning',
    'free german lessons',
    `${level.toLowerCase()} german`,
  ];

  return [...baseKeywords, ...additionalKeywords];
}

/**
 * SEO Score Calculator
 */
export function calculateSEOScore(post: BlogPost): number {
  let score = 0;
  
  // Title optimization (30 points)
  if (post.title.length >= 50 && post.title.length <= 60) score += 15;
  if (post.title.toLowerCase().includes('german')) score += 10;
  if (/\d{4}|\d{2}/.test(post.title)) score += 5; // Contains year
  
  // Description optimization (20 points)
  if (post.description.length >= 150 && post.description.length <= 160) score += 15;
  if (post.description.includes('?')) score += 5; // Question format
  
  // Keywords (20 points)
  if (post.keywords.length >= 5 && post.keywords.length <= 10) score += 20;
  
  // Content length (20 points)
  const wordCount = post.content.split(/\s+/).length;
  if (wordCount >= 800 && wordCount <= 2000) score += 20;
  
  // Structure (10 points)
  if (post.content.includes('<h2>')) score += 5;
  if (post.content.includes('<ul>') || post.content.includes('<ol>')) score += 5;
  
  return Math.min(score, 100);
}

/**
 * German Grammar Article Templates
 */
export const grammarTemplates = {
  articles: {
    title: 'Mastering German Articles: Der, Die, Das Made Simple',
    topic: 'Articles (Der, Die, Das)',
    level: 'A1-A2',
    keywords: ['german articles', 'der die das', 'german genders', 'noun genders german'],
  },
  cases: {
    title: 'German Cases Explained: Nominative, Accusative, Dative, Genitive',
    topic: 'German Cases',
    level: 'A2-B1',
    keywords: ['german cases', 'nominative accusative', 'dative genitive', 'german grammar cases'],
  },
  verbs: {
    title: 'German Verb Conjugation: Present, Past, and Perfect Tenses',
    topic: 'Verb Conjugation',
    level: 'A1-B1',
    keywords: ['german verbs', 'verb conjugation german', 'german tenses', 'present tense german'],
  },
  wordOrder: {
    title: 'German Word Order: The Ultimate Guide to Sentence Structure',
    topic: 'Word Order',
    level: 'A2-B1',
    keywords: ['german word order', 'sentence structure german', 'german syntax', 'TeKaMoLo'],
  },
  adjectives: {
    title: 'German Adjective Endings: Complete Rules and Charts',
    topic: 'Adjective Declension',
    level: 'B1-B2',
    keywords: ['german adjectives', 'adjective endings german', 'declension german', 'weak strong mixed'],
  },
  modalVerbs: {
    title: 'German Modal Verbs: Können, Müssen, Wollen, and More',
    topic: 'Modal Verbs',
    level: 'A1-A2',
    keywords: ['german modal verbs', 'können müssen', 'modal auxiliaries german', 'german modals'],
  },
  separableVerbs: {
    title: 'German Separable Verbs: Rules, Examples, and Practice',
    topic: 'Separable Verbs',
    level: 'A2-B1',
    keywords: ['german separable verbs', 'trennbare verben', 'prefix verbs german'],
  },
  passiveVoice: {
    title: 'German Passive Voice: Formation and Usage Guide',
    topic: 'Passive Voice',
    level: 'B1-B2',
    keywords: ['german passive voice', 'passiv german', 'werden passive', 'vorgangspassiv'],
  },
  subjunctive: {
    title: 'German Subjunctive (Konjunktiv I & II): Complete Guide',
    topic: 'Subjunctive Mood',
    level: 'B2-C1',
    keywords: ['german subjunctive', 'konjunktiv', 'conditional german', 'würde construction'],
  },
  prepositions: {
    title: 'German Prepositions: Which Case to Use and When',
    topic: 'Prepositions',
    level: 'A2-B1',
    keywords: ['german prepositions', 'two-way prepositions', 'wechselpräpositionen', 'dative accusative prepositions'],
  },
};

/**
 * Generate HTML content for German grammar articles
 */
export function generateGrammarArticleHTML(template: keyof typeof grammarTemplates): string {
  const topic = grammarTemplates[template];
  
  return `
    <article class="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
      <div class="not-prose mb-8">
        <span class="text-sm font-semibold text-primary">${topic.level}</span>
      </div>

      <h2>Why ${topic.topic} Matters in German</h2>
      <p>Understanding ${topic.topic.toLowerCase()} is crucial for mastering German at the ${topic.level} level. This comprehensive guide will help you understand and apply these grammar rules with confidence.</p>

      <h2>Key Concepts</h2>
      <p>In this article, you'll learn:</p>
      <ul>
        <li>The fundamental rules of ${topic.topic.toLowerCase()}</li>
        <li>Common mistakes and how to avoid them</li>
        <li>Practical examples with English translations</li>
        <li>Memory tricks and mnemonics</li>
        <li>Interactive exercises to test your knowledge</li>
      </ul>

      <div class="not-prose my-8 p-6 bg-primary/10 rounded-lg border-l-4 border-primary">
        <p class="text-sm font-semibold mb-2">💡 Pro Tip</p>
        <p class="text-sm">Practice ${topic.topic.toLowerCase()} daily with our <a href="/practice" class="text-primary hover:underline font-bold">interactive exercises</a> to build lasting fluency.</p>
      </div>

      <h2>Examples and Usage</h2>
      <p>Let's look at real-world examples of ${topic.topic.toLowerCase()} in action:</p>
      
      <!-- Content sections would be added here based on the specific topic -->

      <h2>Common Mistakes to Avoid</h2>
      <p>Even advanced learners struggle with ${topic.topic.toLowerCase()}. Here are the most common pitfalls:</p>

      <h2>Practice Exercises</h2>
      <p>Ready to test your knowledge? Try these exercises:</p>

      <div class="not-prose my-8 p-6 bg-secondary/10 rounded-lg">
        <p class="text-sm font-semibold mb-4">🎯 Want more practice?</p>
        <a href="/quiz" class="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold">
          Take the ${topic.level} Quiz
        </a>
      </div>

      <h2>Related Topics</h2>
      <p>Once you've mastered ${topic.topic.toLowerCase()}, continue your journey with these related topics:</p>

      <div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <a href="/blog" class="p-4 border border-border rounded-lg hover:border-primary transition-colors">
          <h4 class="font-semibold mb-2">More Grammar Guides</h4>
          <p class="text-sm text-muted-foreground">Explore our complete collection of German grammar articles</p>
        </a>
        <a href="/practice" class="p-4 border border-border rounded-lg hover:border-primary transition-colors">
          <h4 class="font-semibold mb-2">Interactive Practice</h4>
          <p class="text-sm text-muted-foreground">Apply what you've learned with real exercises</p>
        </a>
      </div>
    </article>
  `;
}

/**
 * Blog post database (in a real app, this would be Supabase or CMS)
 */
export const blogPosts: Record<string, BlogPost> = {
  // This will be populated with actual blog posts
};
