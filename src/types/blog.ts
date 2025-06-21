export interface BlogPost {
  id: string;
  title: string;
  content: string;
  htmlContent?: string;
  excerpt: string;
  publishedAt: Date;
  author: string;
  // SEO fields
  slug?: string;
  metaDescription?: string;
  keywords?: string;
  featuredImage?: string;
}

export interface User {
  username: string;
  isAdmin: boolean;
}