import { BlogPost } from '../types/blog';

// SEO Configuration
const SEO_CONFIG = {
  siteName: 'InvestIndia',
  siteUrl: 'https://investindia.com',
  defaultTitle: 'InvestIndia - Your Gateway to Indian Investment Opportunities',
  defaultDescription: 'Discover the next generation of Indian investment opportunities. Expert insights on emerging sectors, market trends, and wealth creation strategies.',
  defaultKeywords: 'India, investment, AI, renewable energy, electric vehicles, fintech, deep tech, agritech, space tech, portfolio, wealth creation, Indian markets',
  defaultImage: 'https://investindia.com/og-image.jpg',
  logoUrl: 'https://investindia.com/logo.png',
  twitterHandle: '@InvestIndia',
  author: 'InvestIndia Team'
};

// Generate structured data for a blog post
export const generatePostStructuredData = (post: BlogPost) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription || post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author || SEO_CONFIG.author
    },
    "datePublished": post.publishedAt.toISOString(),
    "dateModified": post.publishedAt.toISOString(),
    "publisher": {
      "@type": "Organization",
      "name": SEO_CONFIG.siteName,
      "logo": {
        "@type": "ImageObject",
        "url": SEO_CONFIG.logoUrl
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SEO_CONFIG.siteUrl}/post/${post.slug || post.id}`
    },
    "image": post.featuredImage ? {
      "@type": "ImageObject",
      "url": post.featuredImage,
      "alt": post.title
    } : {
      "@type": "ImageObject",
      "url": SEO_CONFIG.defaultImage,
      "alt": post.title
    },
    "keywords": post.keywords || SEO_CONFIG.defaultKeywords,
    "articleSection": "Investment Analysis",
    "inLanguage": "en-US"
  };
};

// Generate structured data for the blog listing
export const generateBlogStructuredData = (posts: BlogPost[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": SEO_CONFIG.siteName,
    "description": SEO_CONFIG.defaultDescription,
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
      "description": post.metaDescription || post.excerpt,
      "author": {
        "@type": "Person",
        "name": post.author || SEO_CONFIG.author
      },
      "datePublished": post.publishedAt.toISOString(),
      "url": `${SEO_CONFIG.siteUrl}/post/${post.slug || post.id}`,
      "image": post.featuredImage || SEO_CONFIG.defaultImage
    }))
  };
};

// Generate structured data for the organization
export const generateOrganizationStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SEO_CONFIG.siteName,
    "url": SEO_CONFIG.siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": SEO_CONFIG.logoUrl
    },
    "description": SEO_CONFIG.defaultDescription,
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
    },
    "sameAs": [
      `https://twitter.com/${SEO_CONFIG.twitterHandle}`,
      "https://linkedin.com/company/investindia"
    ]
  };
};

// Generate structured data for FAQ page
export const generateFAQStructuredData = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Generate sitemap XML
export const generateSitemap = (posts: BlogPost[]) => {
  const baseUrl = SEO_CONFIG.siteUrl;
  
  const staticPages: Array<{ url: string; priority: string; changefreq: string; lastmod?: string }> = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.5', changefreq: 'yearly' }
  ];

  const postPages = posts.map(post => ({
    url: `/post/${post.slug || post.id}`,
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: post.publishedAt.toISOString().split('T')[0]
  }));

  const allPages = [...staticPages, ...postPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

// Generate robots.txt content
export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${SEO_CONFIG.siteUrl}/sitemap.xml

# Disallow admin and private pages
Disallow: /admin
Disallow: /admin/*
Disallow: /private
Disallow: /api/

# Allow important pages
Allow: /post/
Allow: /about
Allow: /contact
Allow: /privacy

# Crawl delay for respectful crawling
Crawl-delay: 1
`;
};

// Update meta tags for a specific page
export const updatePageMetaTags = (options: {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}) => {
  const {
    title = SEO_CONFIG.defaultTitle,
    description = SEO_CONFIG.defaultDescription,
    keywords = SEO_CONFIG.defaultKeywords,
    image = SEO_CONFIG.defaultImage,
    url = SEO_CONFIG.siteUrl,
    type = 'website',
    author = SEO_CONFIG.author,
    publishedTime,
    modifiedTime,
    section,
    tags = []
  } = options;

  // Update document title
  document.title = title;

  // Update meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', description);

  // Update keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.setAttribute('content', keywords);

  // Update author
  let metaAuthor = document.querySelector('meta[name="author"]');
  if (!metaAuthor) {
    metaAuthor = document.createElement('meta');
    metaAuthor.setAttribute('name', 'author');
    document.head.appendChild(metaAuthor);
  }
  metaAuthor.setAttribute('content', author);

  // Update Open Graph tags
  const ogTags = [
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: SEO_CONFIG.siteName },
    { property: 'og:locale', content: 'en_US' }
  ];

  if (image) {
    ogTags.push({ property: 'og:image', content: image });
    ogTags.push({ property: 'og:image:width', content: '1200' });
    ogTags.push({ property: 'og:image:height', content: '630' });
  }

  if (publishedTime) {
    ogTags.push({ property: 'article:published_time', content: publishedTime });
  }

  if (modifiedTime) {
    ogTags.push({ property: 'article:modified_time', content: modifiedTime });
  }

  if (section) {
    ogTags.push({ property: 'article:section', content: section });
  }

  tags.forEach(tag => {
    ogTags.push({ property: 'article:tag', content: tag });
  });

  ogTags.forEach(({ property, content }) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  });

  // Update Twitter tags
  const twitterTags = [
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:title', content: title },
    { property: 'twitter:description', content: description },
    { property: 'twitter:url', content: url },
    { property: 'twitter:site', content: SEO_CONFIG.twitterHandle }
  ];

  if (image) {
    twitterTags.push({ property: 'twitter:image', content: image });
  }

  twitterTags.forEach(({ property, content }) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  });

  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);
};

// Generate breadcrumb structured data
export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${SEO_CONFIG.siteUrl}${crumb.url}`
    }))
  };
};

// Generate article structured data for investment analysis
export const generateArticleStructuredData = (article: {
  title: string;
  description: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  image?: string;
  keywords?: string;
  section?: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": SEO_CONFIG.siteName,
      "logo": {
        "@type": "ImageObject",
        "url": SEO_CONFIG.logoUrl
      }
    },
    "datePublished": article.publishedTime,
    "dateModified": article.modifiedTime || article.publishedTime,
    "image": article.image || SEO_CONFIG.defaultImage,
    "keywords": article.keywords || SEO_CONFIG.defaultKeywords,
    "articleSection": article.section || "Investment Analysis",
    "inLanguage": "en-US"
  };
}; 