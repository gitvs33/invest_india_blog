import { BlogPost } from '../types/blog';

const POSTS_KEY = 'blog_posts';
const AUTH_KEY = 'blog_auth';

export const storage = {
  getPosts: (): BlogPost[] => {
    const posts = localStorage.getItem(POSTS_KEY);
    if (!posts) return [];
    
    const parsedPosts = JSON.parse(posts);
    // Convert publishedAt strings back to Date objects
    return parsedPosts.map((post: any) => ({
      ...post,
      publishedAt: new Date(post.publishedAt)
    }));
  },

  savePosts: (posts: BlogPost[]) => {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  },

  getAuth: () => {
    const auth = localStorage.getItem(AUTH_KEY);
    return auth ? JSON.parse(auth) : null;
  },

  saveAuth: (auth: any) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  },

  clearAuth: () => {
    localStorage.removeItem(AUTH_KEY);
  }
};

// Initialize with sample posts if empty
if (storage.getPosts().length === 0) {
  const samplePosts: BlogPost[] = [
    {
      id: '1',
      title: 'Welcome to Our Blog',
      content: 'This is the first post on our beautiful blog. We\'re excited to share our thoughts and ideas with you.',
      htmlContent: '<p>This is the first post on our <strong>beautiful blog</strong>. We\'re excited to share our thoughts and ideas with you.</p>',
      excerpt: 'This is the first post on our beautiful blog. We\'re excited to share our thoughts...',
      publishedAt: new Date('2024-01-15'),
      author: 'Admin'
    },
    {
      id: '2',
      title: 'The Art of Minimalism',
      content: 'Minimalism is not just about having less stuff. It\'s about making room for what matters most.',
      htmlContent: '<p>Minimalism is not just about having less stuff. It\'s about making room for what <em>matters most</em>.</p>',
      excerpt: 'Minimalism is not just about having less stuff. It\'s about making room for what matters...',
      publishedAt: new Date('2024-01-10'),
      author: 'Admin'
    }
  ];
  storage.savePosts(samplePosts);
}