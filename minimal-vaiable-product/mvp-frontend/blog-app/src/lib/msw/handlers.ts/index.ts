import { http, HttpResponse, type RequestHandler } from 'msw';

type BlogPost = {
  blogId: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};

const blogPosts: BlogPost[] = [
  {
    blogId: 'hello-world',
    title: 'Hello, World!',
    date: '2023-06-01',
    excerpt: 'Welcome to my new blog. This is my first post!',
    content:
      "<p>Welcome to my new blog. This is my first post!</p><p>I'm excited to share my thoughts and experiences with you all.</p>",
  },
  {
    blogId: 'nextjs-is-awesome',
    title: 'Next.js is Awesome',
    date: '2023-06-05',
    excerpt:
      'Learn why Next.js is a great framework for building web applications.',
    content:
      "<p>Next.js is an awesome framework for building web applications. Here's why:</p><ul><li>Server-side rendering</li><li>Static site generation</li><li>API routes</li><li>And much more!</li></ul>",
  },
];

const blogsHandler = http.get('http://localhost:3000/blogs', () => {
  return HttpResponse.json(blogPosts);
});

export const handlers: RequestHandler[] = [blogsHandler];
