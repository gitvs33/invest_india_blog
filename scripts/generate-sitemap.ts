import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPosts } from '../src/posts';
import { generateSitemap } from '../src/utils/seo';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildSitemap() {
    try {
        const posts = getPosts();
        const sitemapContent = generateSitemap(posts);
        const publicDir = path.resolve(__dirname, '../public');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }
        const sitemapPath = path.resolve(publicDir, 'sitemap.xml');
        fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
        console.log('✅ Sitemap generated successfully at:', sitemapPath);
        console.log(`📄 Sitemap contains ${posts.length} blog posts`);
    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        process.exit(1);
    }
}

buildSitemap(); 