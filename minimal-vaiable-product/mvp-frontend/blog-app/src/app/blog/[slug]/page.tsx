import { getBlogPosts } from '@/lib/api';

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.blogId,
  }));
}
