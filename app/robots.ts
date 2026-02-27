import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://learngermandaily.com'

  return {
    rules: [
      // Allow all crawlers by default
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/debug-progress/'],
      },
      // ---- GOOGLE ----
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      // Google Gemini / Bard AI
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      // ---- OPENAI / CHATGPT ----
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      // ---- ANTHROPIC / CLAUDE ----
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      // ---- PERPLEXITY ----
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      // ---- META / LLAMA ----
      {
        userAgent: 'Meta-ExternalAgent',
        allow: '/',
      },
      {
        userAgent: 'Meta-ExternalFetcher',
        allow: '/',
      },
      // ---- MICROSOFT / COPILOT / BING ----
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'msnbot',
        allow: '/',
      },
      // ---- APPLE ----
      {
        userAgent: 'Applebot',
        allow: '/',
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
      },
      // ---- COHERE ----
      {
        userAgent: 'cohere-ai',
        allow: '/',
      },
      // ---- COMMON CRAWL (trains many AI models) ----
      {
        userAgent: 'CCBot',
        allow: '/',
      },
      // ---- YOU.COM ----
      {
        userAgent: 'YouBot',
        allow: '/',
      },
      // ---- BYTEDANCE / TIKTOK search ----
      {
        userAgent: 'Bytespider',
        allow: '/',
      },
      // ---- AMAZON ALEXA ----
      {
        userAgent: 'Amazonbot',
        allow: '/',
      },
      // ---- DUCKDUCKGO ----
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
      },
      // ---- YANDEX ----
      {
        userAgent: 'YandexBot',
        allow: '/',
      },
      // ---- BRAVE SEARCH ----
      {
        userAgent: 'Brave',
        allow: '/',
      },
      // ---- SCRAPY / General Fetchers ----
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
