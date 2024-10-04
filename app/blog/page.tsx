import React from 'react';
import { BlogCard } from '@/components/ui/blog-card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blogs",
  description: "Explore our latest articles, tutorials, and resources on Git, development, and more.",
};

const posts = [
    {
      id: "1",
      title: "How to Use Git Efficiently",
    },
    {
      id: "2",
      title: "Git & Github",
    },
    {
      id: "3",
      title: "How to Use Git-Trace",
    },
  ]

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Blog</h1>
          <p className="text-lg text-gray-600">
            Explore our latest articles, tutorials, and resources on Git, development, and more.
          </p>
        </div>
      </section>

      <section className="container mx-auto py-10 px-6">
        <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Dummy Blog Post */}
          {posts.map((post, i) => (
            <BlogCard key={i} id={post.id} title={post.title} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
