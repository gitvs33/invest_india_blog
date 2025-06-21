# MinimalBlog - File-Based Blog System

A clean, minimal blog built with React, TypeScript, and Tailwind CSS. This is a file-based blog system where you can easily add new posts by editing a single file.

## Features

- **File-based posts**: Add new posts by editing `src/utils/filePosts.ts`
- **SEO optimized**: Meta tags, Open Graph, Twitter cards, structured data
- **Responsive design**: Works on all devices
- **External content support**: Images, videos, maps, charts, iframes
- **Clean, minimal UI**: Focus on content, not distractions

## How to Add New Posts

To add a new blog post, simply edit the `src/utils/filePosts.ts` file and add a new post object to the `posts` array:

```typescript
{
  id: 'your-post-id',
  title: 'Your Post Title',
  content: 'Brief description of your post',
  htmlContent: `
    <h1>Your HTML Content Here</h1>
    <p>You can use any HTML, including:</p>
    <ul>
      <li>External images: <img src="https://example.com/image.jpg" alt="Description"></li>
      <li>YouTube videos: <iframe src="https://www.youtube.com/embed/VIDEO_ID"></iframe></li>
      <li>Google Maps: <iframe src="https://www.google.com/maps/embed?..."></iframe></li>
      <li>Charts: <canvas id="myChart"></canvas> with Chart.js</li>
      <li>Any other HTML content</li>
    </ul>
  `,
  excerpt: 'A brief excerpt for the post preview',
  publishedAt: new Date('2024-01-20'),
  author: 'Your Name',
  slug: 'your-post-slug',
  metaDescription: 'SEO description for search engines',
  keywords: 'seo, keywords, for, your, post',
  featuredImage: 'https://example.com/featured-image.jpg'
}
```

### Required Fields

- `id`: Unique identifier for the post
- `title`: Post title
- `content`: Brief description
- `htmlContent`: The full HTML content of your post
- `excerpt`: Short preview text
- `publishedAt`: Publication date
- `author`: Author name
- `slug`: URL-friendly version of the title

### Optional Fields

- `metaDescription`: SEO description (defaults to excerpt)
- `keywords`: SEO keywords
- `featuredImage`: Featured image URL

## External Content Support

The blog supports various types of external content:

### Images
```html
<img src="https://images.unsplash.com/photo-1234567890?w=600&h=300&fit=crop" alt="Description">
```

### YouTube Videos
```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
```

### Google Maps
```html
<iframe src="https://www.google.com/maps/embed?pb=..." width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
```

### Charts (Chart.js)
```html
<canvas id="myChart" width="400" height="200"></canvas>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: { /* your chart data */ },
    options: { /* your chart options */ }
  });
</script>
```

### Any Other HTML
You can include any HTML content, including:
- Tables
- Forms
- Custom CSS
- External scripts (with security considerations)
- Iframes for other services

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open `http://localhost:5173` in your browser

## Building for Production

```bash
npm run build
```

## SEO Features

- Dynamic meta tags for each post
- Open Graph tags for social media sharing
- Twitter Card support
- Structured data (JSON-LD) for search engines
- Semantic HTML structure
- Sitemap generation ready
- Robots.txt included

## File Structure

```
src/
├── components/          # React components
├── types/              # TypeScript type definitions
├── utils/
│   ├── filePosts.ts    # Blog posts data (edit this to add posts)
│   └── seo.ts          # SEO utilities
└── App.tsx             # Main application component
```

## Customization

- **Styling**: Modify Tailwind classes in components
- **Layout**: Edit `App.tsx` and `Navigation.tsx`
- **SEO**: Update `src/utils/seo.ts` for site-wide SEO settings
- **Posts**: Edit `src/utils/filePosts.ts` to add/remove posts

## Security Notes

- External scripts are allowed but be cautious of XSS risks
- Only include content from trusted sources
- Consider using Content Security Policy headers in production

## License

MIT License - feel free to use this for your own projects! 