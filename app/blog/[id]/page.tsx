import { useRouter } from "next/router";
import React from "react";
import { Metadata } from "next";

// Dummy data
const blog = [
  {
    id: 1,
    title: "How to Use Git Efficiently",
    overview:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae magnam suscipit eius commodi modi officia inventore beatae doloribus adipisci! Animi!",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus accusamus quo facere quia quaerat, animi iste qui voluptatum inventore nisi rerum cum numquam placeat nulla voluptate aperiam praesentium, cupiditate omnis!",
  },
  {
    id: 2,
    title: "Git & Github",
    overview:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae magnam suscipit eius commodi modi officia inventore beatae doloribus adipisci! Animi!",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus accusamus quo facere quia quaerat, animi iste qui voluptatum inventore nisi rerum cum numquam placeat nulla voluptate aperiam praesentium, cupiditate omnis!",
  },
  {
    id: 3,
    title: "How to Use Git-Trace",
    overview:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae magnam suscipit eius commodi modi officia inventore beatae doloribus adipisci! Animi!",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus accusamus quo facere quia quaerat, animi iste qui voluptatum inventore nisi rerum cum numquam placeat nulla voluptate aperiam praesentium, cupiditate omnis!",
  },
];

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const postID = parseInt(params.id);
  const post = blog.find((p) => p.id === postID);

  return {
    title: post ? `${post.title} | Blogs` : "Blog Post",
    description:
      post?.overview ||
      "Explore insights on Git, development, and more in this Git-Trace blog post.",
  };
}

const BlogPost = ({ params }: { params: { id: string } }) => {
  const postID = parseInt(params.id);

  const post = blog.find((p) => p.id === postID);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <section className="m-6 py-16 bg-gray-50">
        <div className="container mx-auto px-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {post?.title}
          </h1>
          <p className="text-lg text-gray-600">{post?.content}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="prose max-w-none">
            <p className="text-xl leading-relaxed">{post?.content}</p>
            <p className="text-xl leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              mollis turpis ut dictum luctus. Nullam vitae tortor urna. Nam in
              dui a nulla viverra sollicitudin. Proin suscipit felis et justo
              fringilla, a feugiat purus facilisis.
            </p>
            <p className="text-xl leading-relaxed">
              Cras vel neque sit amet magna consequat venenatis. Nulla facilisi.
              Mauris aliquet consequat convallis. Sed nec ligula libero.
              Pellentesque id ullamcorper erat, nec varius mauris.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
