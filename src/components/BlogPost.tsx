import React, { useEffect, useRef } from 'react';
import { BlogPost as BlogPostType } from '../types/blog';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';

interface BlogPostProps {
  post: BlogPostType;
  isPreview?: boolean;
  onBack?: () => void;
  onClick?: () => void;
}

const BlogPostComponent: React.FC<BlogPostProps> = ({ post, isPreview = false, onBack, onClick }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle script execution for interactive content
  useEffect(() => {
    if (!isPreview && contentRef.current && post.htmlContent) {
      // Find and execute any scripts in the content
      const scripts = contentRef.current.querySelectorAll('script');
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        if (script.src) {
          newScript.src = script.src;
        } else {
          newScript.textContent = script.textContent;
        }
        document.head.appendChild(newScript);
      });
    }
  }, [post.htmlContent, isPreview]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderPostContent = () => (
    <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="w-full h-64 bg-gray-200 overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      <div className="p-8">
        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={new Date(post.publishedAt).toISOString()} className="text-sm">
                {formatDate(post.publishedAt)}
              </time>
            </div>
            {post.keywords && (
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4" />
                <div className="flex flex-wrap gap-1">
                  {post.keywords.split(',').map((keyword, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {keyword.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Meta Description for SEO */}
          {post.metaDescription && !isPreview && (
            <meta name="description" content={post.metaDescription} />
          )}
        </header>

        {/* Post Content */}
        <div className="prose prose-gray max-w-none">
          <div 
            ref={contentRef}
            dangerouslySetInnerHTML={{ __html: post.htmlContent || `<p>${post.content}</p>` }}
            className="text-gray-700 leading-relaxed"
          />
        </div>

        {/* Post Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <span>Published on {formatDate(post.publishedAt)}</span>
            </div>
            {!isPreview && (
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Posts</span>
              </button>
            )}
          </div>
        </footer>
      </div>
    </article>
  );

  // For preview mode (homepage), show a condensed version
  if (isPreview) {
    return (
      <article 
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
        onClick={onClick}
      >
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="w-full h-48 bg-gray-200 overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        <div className="p-6">
          <header className="mb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
              {post.title}
            </h2>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-3">
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <time dateTime={post.publishedAt.toISOString()}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
            </div>
          </header>

          <div className="text-gray-700 mb-4">
            <p>{post.excerpt}</p>
          </div>

          <footer>
            <span className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors">
              Read more →
            </span>
          </footer>
        </div>
      </article>
    );
  }

  return renderPostContent();
};

export default BlogPostComponent;