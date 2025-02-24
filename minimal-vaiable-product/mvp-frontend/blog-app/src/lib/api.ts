type BlogPost = {
  blogId: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  const response = await fetch('http://localhost:3000/blogs');

  if (!response.ok) {
    throw new Error('Failed to fetch blog posts');
  }

  return response.json();
}
