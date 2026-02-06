'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle, Upload, FileJson, Copy } from 'lucide-react';

export default function BlogAdminPanel() {
  const [jsonInput, setJsonInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [generatedCode, setGeneratedCode] = useState({ index: '', detail: '' });

  const handleAddArticle = () => {
    try {
      // Parse the JSON
      const article = JSON.parse(jsonInput);

      // Validate required fields
      if (!article.slug || !article.title || !article.content) {
        setStatus('error');
        setMessage('Missing required fields: slug, title, or content');
        return;
      }

      // Generate code for blog index (page.tsx)
      const indexCode = `  {
    slug: "${article.slug}",
    title: "${article.title}",
    excerpt: "${article.excerpt || ''}",
    date: "${article.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}",
    readTime: "${article.readTime || '5 min read'}",
    category: "${article.category || 'Grammar'}",
    image: "/blog/${article.category?.toLowerCase() || 'grammar'}.jpg",
  },`;

      // Generate code for blog detail ([slug]/page.tsx)
      const detailCode = `  "${article.slug}": {
    title: "${article.title}",
    excerpt: "${article.excerpt || ''}",
    content: \`${article.content}\`,
    date: "${article.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}",
    readTime: "${article.readTime || '5 min read'}",
    category: "${article.category || 'Grammar'}",
    keywords: ${JSON.stringify(article.keywords || [])},
  },`;

      setGeneratedCode({ index: indexCode, detail: detailCode });
      setStatus('success');
      setMessage('✅ Code generated! Copy and paste into your files.');
    } catch (error) {
      setStatus('error');
      setMessage(`❌ Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setMessage(`✅ ${type} code copied to clipboard!`);
    setTimeout(() => setMessage(''), 2000);
  };

  const sampleJSON = {
    slug: "your-article-slug",
    title: "Your Article Title",
    description: "Meta description for SEO",
    excerpt: "Brief excerpt for listing",
    content: "<h2>Your HTML Content</h2><p>Article body...</p>",
    category: "Grammar",
    tags: ["tag1", "tag2"],
    keywords: ["keyword1", "keyword2"],
    author: "LinguFlow Team",
    date: "2026-02-06",
    readTime: "10 min read",
    grammarLevel: "A1"
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <FileJson className="w-10 h-10 text-primary" />
            Blog Admin Panel
          </h1>
          <p className="text-muted-foreground">Paste your JSON article and generate the code automatically</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white/80 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Paste Your JSON Article</h2>
                <button
                  onClick={() => setJsonInput(JSON.stringify(sampleJSON, null, 2))}
                  className="text-sm text-primary hover:underline"
                >
                  Load Sample
                </button>
              </div>
              
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder={JSON.stringify(sampleJSON, null, 2)}
                rows={20}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-white/50 dark:bg-black/20 font-mono text-sm"
              />

              <button
                onClick={handleAddArticle}
                className="w-full mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 font-semibold flex items-center justify-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Generate Code
              </button>
            </div>

            {/* Status Message */}
            {message && (
              <div className={`p-4 rounded-lg border-l-4 ${
                status === 'success' 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-500' 
                  : status === 'error'
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-500'
                  : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
              }`}>
                <div className="flex items-center gap-2">
                  {status === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : status === 'error' ? (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                  )}
                  <p className="text-sm font-medium">{message}</p>
                </div>
              </div>
            )}
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            {/* For Blog Index */}
            <div className="bg-white/80 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">1️⃣ Blog Index Code</h3>
                <button
                  onClick={() => copyToClipboard(generatedCode.index, 'Index')}
                  disabled={!generatedCode.index}
                  className="text-sm text-primary hover:underline flex items-center gap-1 disabled:opacity-50"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Add this to <code className="bg-primary/10 px-2 py-1 rounded">web/app/blog/page.tsx</code> in the <code>BLOG_POSTS</code> array
              </p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
                {generatedCode.index || '// Generated code will appear here...'}
              </pre>
            </div>

            {/* For Blog Detail */}
            <div className="bg-white/80 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">2️⃣ Blog Detail Code</h3>
                <button
                  onClick={() => copyToClipboard(generatedCode.detail, 'Detail')}
                  disabled={!generatedCode.detail}
                  className="text-sm text-primary hover:underline flex items-center gap-1 disabled:opacity-50"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Add this to <code className="bg-primary/10 px-2 py-1 rounded">web/app/blog/[slug]/page.tsx</code> in the <code>BLOG_POSTS</code> object
              </p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs max-h-96">
                {generatedCode.detail || '// Generated code will appear here...'}
              </pre>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">📋 Quick Steps</h3>
              <ol className="text-sm space-y-2 text-blue-800 dark:text-blue-200">
                <li><strong>1.</strong> Paste your JSON article in the left panel</li>
                <li><strong>2.</strong> Click &ldquo;Generate Code&rdquo;</li>
                <li><strong>3.</strong> Copy the &ldquo;Blog Index Code&rdquo; and paste it in <code>blog/page.tsx</code></li>
                <li><strong>4.</strong> Copy the &ldquo;Blog Detail Code&rdquo; and paste it in <code>blog/[slug]/page.tsx</code></li>
                <li><strong>5.</strong> Save both files and refresh your blog!</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Example */}
        <div className="mt-8 bg-white/80 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-3">💡 JSON Format Example</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
{`{
  "slug": "german-noun-genders-and-plurals-a1-guide",
  "title": "German Noun Genders & Plurals Explained",
  "description": "Learn German noun genders easily...",
  "excerpt": "Confused about der, die, das?...",
  "content": "<h2>Your Article</h2><p>Content here...</p>",
  "category": "Grammar",
  "tags": ["A1", "noun genders"],
  "keywords": ["german noun genders", "plurals"],
  "author": "LinguFlow Team",
  "date": "2026-02-06",
  "readTime": "10 min read",
  "grammarLevel": "A1"
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
