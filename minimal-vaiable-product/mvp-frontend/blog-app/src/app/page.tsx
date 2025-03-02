import { getBlogPosts } from '../lib/api';

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
      {posts.map((post) => (
        <article
          key={post.blogId}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold mb-2 hover:text-blue-600">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-4">{post.excerpt}</p>
          <div className="text-sm text-gray-500">
            Published on {new Date(post.date).toLocaleDateString()}
          </div>
        </article>
      ))}
    </div>
  );
}
