"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NewBookmarkBtn from "@/components/new-bookmark";
import { Badge } from "@/components/ui/badge";
import { Loader } from "lucide-react";

export default function Home() {
  const [owner, setOwner] = useState("");
  const [repoName, setRepoName] = useState("");
  const [repositories, setRepositories] = useState<any[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<any | null>(null);
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); 
  const router = useRouter();

  const handleSearchRepos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/search/repositories", {
        params: { owner, name: repoName },
      });
      setRepositories(response.data);
    } catch (error) {
      console.error("Failed to search repositories:", error);
    } finally {
      setLoading(false); 
    }
  };

  const handleSearchIssues = async (repoFullName: string) => {
    setLoading(true); 
    try {
      const response = await axios.get("/api/search/issues", {
        params: { repositoryFullName: repoFullName },
      });
      setIssues(response.data);
    } catch (error) {
      console.error("Failed to fetch issues:", error);
    } finally {
      setLoading(false); 
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchRepos();
    }
  };

  return (
    <div className="py-10 px-2.5 lg:px-20 mx-auto max-w-[1250px]">
      <h1 className="font-medium text-3xl text-gray-900 mb-2">
        Find repository
      </h1>
      <p className="text-base italic text-muted-foreground mb-4">
        Required fields are marked with an asterisk (*).
      </p>

      <div className="flex flex-col md:flex-row md:gap-4 mb-8 max-w-2xl">
        <div className="flex flex-col mb-4 md:mb-0 w-full md:w-auto">
          <p>Owner Name *</p>
          <Input
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            onKeyDown={handleKeyDown} 
            placeholder="Owner Name"
          />
        </div>

        <div className="flex flex-col w-full md:w-auto">
          <p>Repository Name *</p>
          <Input
            value={repoName}
            onChange={(e) => setRepoName(e.target.value)}
            onKeyDown={handleKeyDown} 
            placeholder="Repository Name"
          />
        </div>

        <div className="flex flex-col md:mt-0 md:ml-2">
          <Button
            onClick={handleSearchRepos}
            variant={"outline"}
            className="mt-6"
          >
            {loading ? <Loader /> : "Search"} 
          </Button>
        </div>
      </div>

      {repositories.length > 0 && (
        <div>
          <h2 className="font-medium text-2xl text-gray-900 mb-2">
            Repositories
          </h2>
          <Table>
            <TableCaption>
              A list of repositories matching the search criteria.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {repositories.map((repo: any) => (
                <TableRow key={repo.id}>
                  <TableCell>{repo.name}</TableCell>
                  <TableCell>{repo.description || "No description"}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      onClick={() => {
                        setSelectedRepo(repo);
                        handleSearchIssues(repo.full_name);
                      }}
                    >
                      View Issues
                    </Button>
                    <NewBookmarkBtn
                      name={repo.name}
                      url={repo.html_url}
                      description={
                        repo.description || "No description available"
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {issues.length > 0 && (
        <div className="mt-8">
          <h2 className="font-medium text-2xl text-gray-900 mb-2">Issues</h2>
          <Table>
            <TableCaption>Issues for the selected repository.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Issue Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issues.map((issue: any) => (
                <TableRow key={issue.id}>
                  <TableCell>{issue.title}</TableCell>
                  <TableCell>{issue.state}</TableCell>
                  <TableCell>
                    {new Date(issue.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <a
                      href={issue.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Issue
                    </a>

                    <NewBookmarkBtn
                      name={issue.title}
                      url={issue.html_url}
                      description={issue.body || "No description available"}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
