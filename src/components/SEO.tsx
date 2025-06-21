import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BlogPost } from '../types/blog';
import { SEO_CONFIG } from '../utils/seo';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  post?: BlogPost;
  posts?: BlogPost[];
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  post,
  posts 
}) => {
  // Default values
  const defaultTitle = 'InvestIndia - Your Gateway to Indian Investment Opportunities';
  const defaultDescription = 'Discover the next generation of Indian investment opportunities. Expert insights on emerging sectors, market trends, and wealth creation strategies.';
  const defaultImage = `${SEO_CONFIG.siteUrl}/og-image.jpg`;

  // Use provided values or defaults
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || SEO_CONFIG.defaultKeywords;
  const finalImage = image || defaultImage;
  const finalUrl = url || SEO_CONFIG.siteUrl;
  const finalType = type;

  // Generate structured data
  const generateStructuredData = () => {
    if (post) {
      // Article structured data
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.metaDescription || post.excerpt,
        "image": post.featuredImage || finalImage,
        "author": {
          "@type": "Person",
          "name": post.author
        },
        "publisher": {
          "@type": "Organization",
          "name": SEO_CONFIG.siteName,
          "logo": {
            "@type": "ImageObject",
            "url": SEO_CONFIG.logoUrl
          }
        },
        "datePublished": post.publishedAt.toISOString(),
        "dateModified": post.publishedAt.toISOString(),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${SEO_CONFIG.siteUrl}/post/${post.slug || post.id}`
        }
      };
    } else if (posts && posts.length > 0) {
      // Blog structured data
      return {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": SEO_CONFIG.siteName,
        "description": finalDescription,
        "url": SEO_CONFIG.siteUrl,
        "publisher": {
          "@type": "Organization",
          "name": SEO_CONFIG.siteName,
          "logo": {
            "@type": "ImageObject",
            "url": SEO_CONFIG.logoUrl
          }
        },
        "blogPost": posts.map(post => ({
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "author": {
            "@type": "Person",
            "name": post.author
          },
          "datePublished": post.publishedAt.toISOString(),
          "url": `${SEO_CONFIG.siteUrl}/post/${post.slug || post.id}`
        }))
      };
    } else {
      // Organization structured data
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": SEO_CONFIG.siteName,
        "url": SEO_CONFIG.siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": SEO_CONFIG.logoUrl
        },
        "description": finalDescription,
        "foundingDate": "2025",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mumbai",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-98765-43210",
          "contactType": "customer service",
          "email": "contact@investindia.com"
        }
      };
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={SEO_CONFIG.siteName} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={finalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={finalType} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalUrl} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={finalImage} />
      <meta property="twitter:site" content={SEO_CONFIG.twitterHandle} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      
      {/* Article specific meta tags */}
      {post && (
        <>
          <meta property="article:published_time" content={post.publishedAt.toISOString()} />
          <meta property="article:modified_time" content={post.publishedAt.toISOString()} />
          <meta property="article:author" content={post.author} />
          <meta property="article:section" content="Investment" />
          <meta property="article:tag" content={post.keywords || finalKeywords} />
        </>
      )}

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData())}
      </script>
    </Helmet>
  );
};

export default SEO; 