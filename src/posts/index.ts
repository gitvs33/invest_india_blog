import { BlogPost } from '../types/blog';
import IndianTitans from './IndianTitans';

// Define post metadata
const postsMetadata: Omit<BlogPost, 'component'>[] = [
  {
    id: 'indian-titans',
    title: 'The Next Indian Titans: An Interactive Guide',
    content: 'An interactive guide to investing in the sectors shaping tomorrow\'s billionaires.',
    excerpt: 'An interactive guide to investing in the sectors shaping tomorrow\'s billionaires.',
    publishedAt: new Date('2025-01-21'),
    author: 'Admin',
    slug: 'indian-titans',
    metaDescription: 'Interactive guide to investing in Indian sectors like AI, renewables, EVs, fintech, and more.',
    keywords: 'India, investment, AI, renewable energy, electric vehicles, fintech',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop'
  }
];

// Map components to metadata
const postComponents = {
  'indian-titans': IndianTitans
};

// Create the posts array with components
export const posts: (BlogPost & { component: React.ComponentType<any> })[] = postsMetadata.map(metadata => ({
  ...metadata,
  component: postComponents[metadata.id as keyof typeof postComponents]
}));

// Export functions to get posts
export const getPosts = () => posts;
export const getPost = (slug: string) => posts.find(post => post.slug === slug) || null; 