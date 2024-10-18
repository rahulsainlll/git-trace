import Image from "next/image";
export const BlogCard = ({ title, id,description }: any) => {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <Image
        src="https://via.placeholder.com/300"
        alt="Post Thumbnail"
        width={300}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold dark:text-slate-50 text-gray-800 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-slate-50 mb-4">
         {description}
        </p>
        <a href={`/blog/${id}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
          Read More
        </a>
      </div>
    </div>
  );
};
