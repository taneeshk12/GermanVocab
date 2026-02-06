'use client';

import { useState } from 'react';
import { BlogPost, calculateReadTime, calculateSEOScore, generateSlug, generateGrammarKeywords, grammarTemplates } from '@/lib/blog';
import { CheckCircle2, AlertCircle, TrendingUp, Eye, FileText } from 'lucide-react';

export default function BlogWriter() {
  const [post, setPost] = useState<Partial<BlogPost>>({
    title: '',
    description: '',
    excerpt: '',
    content: '',
    category: 'Grammar',
    tags: [],
    keywords: [],
    author: 'LinguFlow Team',
    date: new Date().toISOString().split('T')[0],
    grammarLevel: 'A1',
  });

  const [currentTag, setCurrentTag] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  // Calculate SEO score
  const seoScore = post.title && post.description && post.content && post.keywords 
    ? calculateSEOScore(post as BlogPost) 
    : 0;

  const handleTemplateSelect = (templateKey: keyof typeof grammarTemplates) => {
    const template = grammarTemplates[templateKey];
    setPost({
      ...post,
      title: template.title,
      keywords: template.keywords,
      grammarLevel: template.level.split('-')[0] as any,
    });
  };

  const addTag = () => {
    if (currentTag && !post.tags?.includes(currentTag)) {
      setPost({ ...post, tags: [...(post.tags || []), currentTag] });
      setCurrentTag('');
    }
  };

  const removeTag = (tag: string) => {
    setPost({ ...post, tags: post.tags?.filter(t => t !== tag) || [] });
  };

  const generateSlugFromTitle = () => {
    if (post.title) {
      const slug = generateSlug(post.title);
      setPost({ ...post, slug });
    }
  };

  const autoGenerateKeywords = () => {
    if (post.title && post.grammarLevel) {
      const topic = post.title.split(':')[0].replace('German', '').trim();
      const keywords = generateGrammarKeywords(topic, post.grammarLevel);
      setPost({ ...post, keywords });
    }
  };

  const getSEOScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSEOScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/20';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/20';
    return 'bg-red-100 dark:bg-red-900/20';
  };

  const exportAsJSON = () => {
    const readTime = post.content ? calculateReadTime(post.content) : '0 min read';
    const fullPost = {
      ...post,
      readTime,
      slug: post.slug || generateSlug(post.title || ''),
      seoScore,
    };
    
    const dataStr = JSON.stringify(fullPost, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fullPost.slug}.json`;
    link.click();
  };

  const exportAsMarkdown = () => {
    const markdown = `---
title: ${post.title}
description: ${post.description}
date: ${post.date}
category: ${post.category}
level: ${post.grammarLevel}
tags: ${post.tags?.join(', ')}
keywords: ${post.keywords?.join(', ')}
---

# ${post.title}

${post.excerpt}

${post.content}
`;
    
    const dataBlob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${post.slug || 'article'}.md`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-linear-to-r from-violet-600 to-indigo-600">
            SEO Blog Writer
          </h1>
          <p className="text-muted-foreground">Create SEO-optimized German grammar articles</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Templates */}
            <div className="bg-white/80 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">📝 Quick Templates</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(grammarTemplates).map(([key, template]) => (
                  <button
                    key={key}
                    onClick={() => handleTemplateSelect(key as keyof typeof grammarTemplates)}
                    className="p-3 text-left border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-sm"
                  >
                    <div className="font-semibold text-xs mb-1">{template.level}</div>
                    <div className="text-xs">{template.topic}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Title & Slug */}
            <div className="bg-white/80 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <label className="block text-sm font-semibold mb-2">Title *</label>
              <input
                type="text"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                onBlur={generateSlugFromTitle}
                placeholder="e.g., German Articles Explained: Der, Die, Das Made Simple"
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-white/50 dark:bg-black/20"
              />
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className={post.title && post.title.length >= 50 && post.title.length <= 60 ? 'text-green-600' : 'text-muted-foreground'}>
                  {post.title?.length || 0}/60 characters
                </span>
                {post.title && post.title.length >= 50 && post.title.length <= 60 && (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                )}
              </div>

              <label className="block text-sm font-semibold mb-2 mt-4">URL Slug</label>
              <input
                type="text"
                value={post.slug}
                onChange={(e) => setPost({ ...post, slug: e.target.value })}
                placeholder="german-articles-explained"
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-white/50 dark:bg-black/20 font-mono text-sm"
              />
            </div>

            {/* Meta Description */}
            <div className="bg-white/80 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <label className="block text-sm font-semibold mb-2">Meta Description *</label>
              <textarea
                value={post.description}
                onChange={(e) => setPost({ ...post, description: e.target.value })}
                placeholder="Write a compelling description that includes your main keyword..."
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-white/50 dark:bg-black/20"
              />
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className={post.description && post.description.length >= 150 && post.description.length <= 160 ? 'text-green-600' : 'text-muted-foreground'}>
                  {post.description?.length || 0}/160 characters
                </span>
                {post.description && post.description.length >= 150 && post.description.length <= 160 && (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                )}
              </div>
            </div>

            {/* Excerpt */}
            <div className="bg-white/80 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <label className="block text-sm font-semibold mb-2">Excerpt</label>
              <textarea
                value={post.excerpt}
                onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                placeholder="Brief summary for the blog listing page..."
                rows={2}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-white/50 dark:bg-black/20"
              />
            </div>

            {/* Main Content */}
            <div className="bg-white/80 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold">Content * (HTML/Markdown)</label>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  {showPreview ? 'Edit' : 'Preview'}
                </button>
              </div>
              
              {!showPreview ? (
                <textarea
                  value={post.content}
                  onChange={(e) => setPost({ ...post, content: e.target.value })}
                  placeholder="Write your article content with HTML tags or Markdown..."
                  rows={20}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-white/50 dark:bg-black/20 font-mono text-sm"
                />
              ) : (
                <div 
                  className="prose dark:prose-invert max-w-none p-4 border border-border rounded-lg bg-white/50 dark:bg-black/20"
                  dangerouslySetInnerHTML={{ __html: post.content || '' }}
                />
              )}
              
              <div className="mt-2 text-xs text-muted-foreground">
                {post.content ? `${post.content.split(/\s+/).length} words • ${calculateReadTime(post.content)}` : '0 words'}
              </div>
            </div>

            {/* Keywords */}
            <div className="bg-white/80 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold">SEO Keywords</label>
                <button
                  onClick={autoGenerateKeywords}
                  className="text-sm text-primary hover:underline"
                >
                  Auto-generate
                </button>
              </div>
              <textarea
                value={post.keywords?.join(', ')}
                onChange={(e) => setPost({ ...post, keywords: e.target.value.split(',').map(k => k.trim()) })}
                placeholder="german grammar, articles, der die das"
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-white/50 dark:bg-black/20"
              />
            </div>

            {/* Tags */}
            <div className="bg-white/80 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <label className="block text-sm font-semibold mb-2">Tags</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  placeholder="Add a tag..."
                  className="flex-1 px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-white/50 dark:bg-black/20"
                />
                <button
                  onClick={addTag}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-primary/70">×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* SEO Score */}
            <div className={`${getSEOScoreBg(seoScore)} border border-white/20 rounded-xl p-6`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">SEO Score</h3>
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div className={`text-5xl font-bold ${getSEOScoreColor(seoScore)} mb-2`}>
                {seoScore}
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                <div
                  className={`h-3 rounded-full transition-all ${
                    seoScore >= 80 ? 'bg-green-600' : seoScore >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                  }`}
                  style={{ width: `${seoScore}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {seoScore >= 80 && '🎉 Excellent! Your post is well-optimized.'}
                {seoScore >= 60 && seoScore < 80 && '👍 Good! A few improvements will boost your score.'}
                {seoScore < 60 && '⚠️ Needs work. Follow the checklist below.'}
              </p>
            </div>

            {/* Metadata */}
            <div className="bg-white/80 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold mb-4">Metadata</h3>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select
                  value={post.category}
                  onChange={(e) => setPost({ ...post, category: e.target.value as any })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-white/50 dark:bg-black/20"
                >
                  <option value="Grammar">Grammar</option>
                  <option value="Vocabulary">Vocabulary</option>
                  <option value="Learning Strategies">Learning Strategies</option>
                  <option value="Culture">Culture</option>
                  <option value="Exams">Exams</option>
                  <option value="Resources">Resources</option>
                  <option value="Pronunciation">Pronunciation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Grammar Level</label>
                <select
                  value={post.grammarLevel}
                  onChange={(e) => setPost({ ...post, grammarLevel: e.target.value as any })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-white/50 dark:bg-black/20"
                >
                  <option value="A1">A1 - Beginner</option>
                  <option value="A2">A2 - Elementary</option>
                  <option value="B1">B1 - Intermediate</option>
                  <option value="B2">B2 - Upper Intermediate</option>
                  <option value="C1">C1 - Advanced</option>
                  <option value="C2">C2 - Proficient</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Author</label>
                <input
                  type="text"
                  value={post.author}
                  onChange={(e) => setPost({ ...post, author: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-white/50 dark:bg-black/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Publish Date</label>
                <input
                  type="date"
                  value={post.date}
                  onChange={(e) => setPost({ ...post, date: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-white/50 dark:bg-black/20"
                />
              </div>
            </div>

            {/* SEO Checklist */}
            <div className="bg-white/80 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">✓ SEO Checklist</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  {post.title && post.title.length >= 50 && post.title.length <= 60 ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
                  )}
                  <span>Title length (50-60 chars)</span>
                </div>
                <div className="flex items-start gap-2">
                  {post.description && post.description.length >= 150 && post.description.length <= 160 ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
                  )}
                  <span>Meta description (150-160 chars)</span>
                </div>
                <div className="flex items-start gap-2">
                  {post.keywords && post.keywords.length >= 5 && post.keywords.length <= 10 ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
                  )}
                  <span>Keywords (5-10)</span>
                </div>
                <div className="flex items-start gap-2">
                  {post.content && post.content.split(/\s+/).length >= 800 ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
                  )}
                  <span>Content length (800+ words)</span>
                </div>
                <div className="flex items-start gap-2">
                  {post.content && post.content.includes('<h2>') ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
                  )}
                  <span>Has subheadings (H2)</span>
                </div>
                <div className="flex items-start gap-2">
                  {post.content && (post.content.includes('<ul>') || post.content.includes('<ol>')) ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
                  )}
                  <span>Has lists</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white/80 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-xl p-6 space-y-3">
              <button
                onClick={exportAsJSON}
                className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 font-semibold flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Export as JSON
              </button>
              <button
                onClick={exportAsMarkdown}
                className="w-full px-4 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 font-semibold flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Export as Markdown
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
