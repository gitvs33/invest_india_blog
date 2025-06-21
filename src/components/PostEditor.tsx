import React, { useState } from 'react';
import { BlogPost } from '../types/blog';
import { Save, X, Eye, Code, Type, Hash } from 'lucide-react';

interface PostEditorProps {
  post?: BlogPost;
  onSave: (post: Omit<BlogPost, 'id'>) => void;
  onCancel: () => void;
}

const PostEditor: React.FC<PostEditorProps> = ({ post, onSave, onCancel }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [htmlContent, setHtmlContent] = useState(post?.htmlContent || '');
  const [author, setAuthor] = useState(post?.author || 'Admin');
  const [isPreview, setIsPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'html' | 'seo'>('content');
  
  // SEO fields
  const [slug, setSlug] = useState(post?.slug || '');
  const [metaDescription, setMetaDescription] = useState(post?.metaDescription || '');
  const [keywords, setKeywords] = useState(post?.keywords || '');
  const [featuredImage, setFeaturedImage] = useState(post?.featuredImage || '');

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!slug) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const excerpt = content.length > 150 ? content.substring(0, 150) + '...' : content;
    
    onSave({
      title,
      content,
      htmlContent: htmlContent || `<p>${content}</p>`,
      excerpt,
      author,
      publishedAt: post?.publishedAt || new Date(),
      slug: slug || generateSlug(title),
      metaDescription: metaDescription || excerpt,
      keywords,
      featuredImage
    });
  };

  const insertHtmlTag = (tag: string) => {
    const textarea = document.getElementById('html-content') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = htmlContent.substring(start, end);
      
      let replacement = '';
      switch (tag) {
        case 'h1': replacement = `<h1>${selectedText || 'Heading 1'}</h1>`; break;
        case 'h2': replacement = `<h2>${selectedText || 'Heading 2'}</h2>`; break;
        case 'h3': replacement = `<h3>${selectedText || 'Heading 3'}</h3>`; break;
        case 'p': replacement = `<p>${selectedText || 'Paragraph text'}</p>`; break;
        case 'strong': replacement = `<strong>${selectedText || 'Bold text'}</strong>`; break;
        case 'em': replacement = `<em>${selectedText || 'Italic text'}</em>`; break;
        case 'a': replacement = `<a href="#" target="_blank">${selectedText || 'Link text'}</a>`; break;
        case 'ul': replacement = `<ul>\n  <li>${selectedText || 'List item'}</li>\n</ul>`; break;
        case 'blockquote': replacement = `<blockquote>${selectedText || 'Quote text'}</blockquote>`; break;
      }
      
      const newContent = htmlContent.substring(0, start) + replacement + htmlContent.substring(end);
      setHtmlContent(newContent);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {post ? 'Edit Post' : 'Create New Post'}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Eye className="h-4 w-4" />
            <span>{isPreview ? 'Edit' : 'Preview'}</span>
          </button>
          <button
            onClick={onCancel}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </button>
        </div>
      </div>

      {isPreview ? (
        <div className="prose prose-gray max-w-none">
          <h1 className="text-3xl font-bold mb-4">{title || 'Untitled Post'}</h1>
          <div className="text-gray-600 mb-6">By {author}</div>
          <div dangerouslySetInnerHTML={{ __html: htmlContent || `<p>${content}</p>` }} />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Enter post title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author *
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Enter author name"
                required
              />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'content'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Type className="h-4 w-4 inline mr-2" />
                Content
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('html')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'html'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Code className="h-4 w-4 inline mr-2" />
                HTML Editor
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('seo')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'seo'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Hash className="h-4 w-4 inline mr-2" />
                SEO
              </button>
            </nav>
          </div>

          {/* Content Tab */}
          {activeTab === 'content' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content (Plain Text)
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Write your post content here..."
                required
              />
            </div>
          )}

          {/* HTML Tab */}
          {activeTab === 'html' && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {['h1', 'h2', 'h3', 'p', 'strong', 'em', 'a', 'ul', 'blockquote'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => insertHtmlTag(tag)}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded border transition-colors"
                  >
                    {tag.toUpperCase()}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => insertIndianTitansTemplate()}
                  className="px-3 py-1 text-sm bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded border transition-colors"
                >
                  Indian Titans Template
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HTML Content
                </label>
                <textarea
                  id="html-content"
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors font-mono text-sm"
                  placeholder="Enter HTML content for rich formatting..."
                />
                <p className="text-sm text-gray-500 mt-1">
                  Use HTML tags for rich formatting. This will override the plain text content.
                </p>
              </div>
            </div>
          )}

          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="post-url-slug"
                />
                <p className="text-sm text-gray-500 mt-1">
                  URL-friendly version of the title. Leave empty to auto-generate.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Brief description for search engines..."
                />
                <p className="text-sm text-gray-500 mt-1">
                  {metaDescription.length}/160 characters (recommended for SEO)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="keyword1, keyword2, keyword3"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Comma-separated keywords for SEO optimization.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-sm text-gray-500 mt-1">
                  URL for the featured image (used in social media sharing).
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors font-medium"
            >
              <Save className="h-4 w-4" />
              <span>{post ? 'Update Post' : 'Create Post'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PostEditor;