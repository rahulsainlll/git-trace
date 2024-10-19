'use client'
import React, { useState } from 'react';
import { BlogCard } from '@/components/ui/blog-card';
import Pagination from '@/components/pagination';

// import { Metadata } from 'next'; // Ensure this import is added

// export const metadata: Metadata = {
//   title: "Blogs",
//   description: "Explore our latest articles, tutorials, and resources on Git, development, and more."
// };

const posts = [
  {
    id: "1",
    title: "How to Use Git Efficiently",
    author: "John Doe",
    description: "In this article, we'll explore advanced Git techniques to make your workflow more efficient.",
    date: "2023-10-01",
  },
  {
    id: "2",
    title: "Mastering Git & GitHub",
    author: "Jane Smith",
    description: "Learn how to integrate Git with GitHub for better version control and collaboration.",
    date: "2023-09-28",
  },
  {
    id: "3",
    title: "Introduction to Git-Trace",
    author: "Alex Johnson",
    description: "A beginner-friendly guide on using Git-Trace to track the performance of your Git commands.",
    date: "2023-09-25",
  },
  {
    id: "4",
    title: "Understanding Git Internals",
    author: "Chris Lee",
    description: "Dive deep into Git's architecture to understand how commits, branches, and objects are stored.",
    date: "2023-09-20",
  },
  {
    id: "5",
    title: "Top 10 Git Tips for Beginners",
    author: "Maria Gonzalez",
    description: "A curated list of tips and best practices to help new Git users get started.",
    date: "2023-09-18",
  },
  {
    id: "6",
    title: "Common Git Mistakes and How to Avoid Them",
    author: "Michael Chen",
    description: "We’ll cover the most frequent Git mistakes and how you can avoid or fix them quickly.",
    date: "2023-09-15",
  },
  {
    id: "7",
    title: "How to Resolve Git Merge Conflicts",
    author: "Sophia Patel",
    description: "Step-by-step instructions on how to handle merge conflicts in Git like a pro.",
    date: "2023-09-10",
  },
  {
    id: "8",
    title: "The Power of Git Rebase",
    author: "Daniel White",
    description: "Learn the pros and cons of Git Rebase and how to integrate it into your workflow.",
    date: "2023-09-05",
  },
  {
    id: "9",
    title: "Git Hooks: Automating Your Workflow",
    author: "Emily Brown",
    description: "An introduction to Git hooks and how they can help automate your development processes.",
    date: "2023-09-01",
  },
  {
    id: "10",
    title: "Best Practices for Writing Git Commit Messages",
    author: "James Wilson",
    description: "Find out how to write clear, concise, and meaningful commit messages to improve collaboration.",
    date: "2023-08-28",
  },
];

const ITEMS_PER_PAGE = 6;
const BlogPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Sample data
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);

  // Pagination logic
  const currentPosts = posts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-800 font-sans mb-10">
      <section className="py-16 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-slate-50 mb-4">Welcome to the Blog</h1>
          <p className="text-lg text-gray-600 dark:text-slate-50">
            Explore our latest articles, tutorials, and resources on Git, development, and more.
          </p>
        </div>
      </section>

      <section className="container mx-auto py-10 px-6 flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-8 dark:text-slate-50">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Dummy Blog Post */}
          {currentPosts.map((post, i) => (
            <BlogCard key={i} id={post.id} title={post.title} description ={post.description} />
          ))}
        </div>
        <div className='mt-10 flex justify-center'>
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        />
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
