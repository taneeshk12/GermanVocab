import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Performance ──────────────────────────────────────────────
  compress: true,
  poweredByHeader: false,

  // Enable React strict mode for better error catching
  reactStrictMode: true,

  // ── Image optimisation ────────────────────────────────────────
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ── Experimental performance flags ───────────────────────────
  experimental: {
    optimizeCss: true,          // Inline critical CSS automatically
    optimizePackageImports: [   // Tree-shake heavy icon/animation packages
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-accordion',
    ],
  },

  // ── HTTP Headers: Security + SEO + Performance ───────────────
  async headers() {
    return [
      // Static assets – aggressive caching (1 year)
      {
        source: '/(.*)\\.(png|jpg|jpeg|gif|svg|ico|webp|avif|woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // JS / CSS bundles – long cache with stale-while-revalidate
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Sitemap + robots – short cache so updates propagate fast
      {
        source: '/(sitemap\\.xml|robots\\.txt|llms\\.txt)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      // All pages
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // Speakable / AI discovery header
          { key: 'X-Robots-Tag', value: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
        ],
      },
    ]
  },
};

export default nextConfig;
