"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


const PopularRepositories = () => {
interface Repository {
    id: number;
    html_url: string;
    name: string;
    stargazers_count: number;
    forks_count: number;
    owner: {
        login: string;
    };
}

const router = useRouter();

  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    const fetchRepositories = async () => {
      const response = await axios.get(
        "https://api.github.com/search/repositories?q=stars:>10000&sort=stars"
      );
      setRepositories(response.data.items);
    };

    fetchRepositories();
  }, []);

  return (
    <div className="py-10 px-2.5 lg:px-20 mx-auto max-w-[1250px]">
      <h1 className="font-medium text-3xl text-gray-900 dark:text-slate-50 mb-4">
        Popular Repositories
      </h1>
      <div className="flex flex-col gap-4">
        {repositories.map((repo) => (
          <div
            key={repo.id}
            className="border rounded-xl p-4 bg-purple-50 dark:bg-black flex items-start justify-between"
          >
            {/* <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name} - ⭐ {repo.stargazers_count} - 🍴 {repo.forks_count} - 👥 {repo.contributors_count}
            </a> */}
            <div className="text-gray-600 dark:text-slate-50">
              <h2 className="font-medium text-xl mb-2">{repo.name}</h2>
              <div className="w-fit rounded-lg p-1 border mb-2">
                ⭐ {repo.stargazers_count}
              </div>
              <div className="w-fit rounded-lg p-1 border mb-2">
                🍴 {repo.forks_count}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => {
                  router.push(`/popular/repo?owner=${repo.owner.login}&repo=${repo.name}`);
                }}
              >
                View Details
              </Button>
              <Button
                onClick={() => {
                  window.open(repo.html_url, "_blank", "noopener,noreferrer");
                }}
              >
                Visit Repo
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularRepositories;
