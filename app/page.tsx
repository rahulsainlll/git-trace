"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input"; // Ensure this path is correct
import { Button } from "@/components/ui/button"; // Ensure this path is correct
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Ensure this path is correct
import { Badge } from "@/components/ui/badge"; // Ensure this path is correct
import { Loader } from "lucide-react"; // Ensure lucide-react is installed
import { useToast } from "@/components/ui/use-toast"; // Ensure this path is correct

interface Repository {
  id: number;
  name: string;
  description: string;
  full_name: string;
  html_url: string;
  owner: {
    login: string;
  };
}

interface Issue {
  id: number;
  title: string;
  state: string;
}

export default function Home() {
  const [owner, setOwner] = useState<string>("");
  const [repoName, setRepoName] = useState<string>("");
  const [repoLink, setRepoLink] = useState<string>("");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState({
    searchReposLoader: false,
    searchRepoUrlLoader: false,
    searchIssueLoader: false,
  });
  const { toast } = useToast();

  const handleSearchRepos = async () => {
    setLoading((prev) => ({ ...prev, searchReposLoader: true }));
    try {
      if (!owner || !repoName) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Provide both Owner Name and Repository Name.",
        });
        return;
      }

      const response = await axios.get("/api/search/repositories", {
        params: { owner, name: repoName },
      });

      if (response.data.length === 0) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Invalid Owner Name or Repository Name.",
        });
        return;
      }

      setRepositories(response.data);
    } catch (error) {
      console.error("Failed to search repositories:", error);
    } finally {
      setLoading((prev) => ({ ...prev, searchReposLoader: false }));
    }
  };

  const handleSearchReposUrl = async () => {
    setLoading((prev) => ({ ...prev, searchRepoUrlLoader: true }));
    try {
      if (!repoLink) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Repository link cannot be empty.",
        });
        return;
      }

      const username = repoLink.replace("https://github.com/", "").split("/");
      if (username.length >= 2) {
        setOwner(username[0]);
        setRepoName(username[1]);
      }

      const response = await axios.get("/api/search/repositories", {
        params: { owner: username[0], name: username[1] },
      });

      if (response.data.length === 0) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Invalid Owner Name or Repository Name.",
        });
        return;
      }

      setRepositories(response.data);
    } catch (error) {
      console.error("Failed to search repositories:", error);
    } finally {
      setLoading((prev) => ({ ...prev, searchRepoUrlLoader: false }));
    }
  };

  const handleSearchIssues = async (repoFullName: string) => {
    setLoading((prev) => ({ ...prev, searchIssueLoader: true }));
    try {
      const response = await axios.get("/api/search/issues", {
        params: { repositoryFullName: repoFullName },
      });
      setIssues(response.data);
    } catch (error) {
      console.error("Failed to fetch issues:", error);
    } finally {
      setLoading((prev) => ({ ...prev, searchIssueLoader: false }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchRepos();
    }
  };

  return (
    <div className="py-10 px-2.5 lg:px-20 mx-auto max-w-[1250px] flex flex-col items-center text-center">
      <hr style={{ border: "none", borderTop: "4px solid darkblue", width: "100%", margin: "20px 0" }} /> {/* Top line */}
      <h1
        className="font-medium text-6xl mb-4"
        style={{ fontFamily: "Marker Felt, fantasy", color: "#eec0c8" }}
      >
        Find Repository
      </h1>
      <hr style={{ border: "none", borderTop: "4px solid darkblue", width: "100%", margin: "20px 0" }} /> {/* Bottom line */}
  
      <p className="text-base italic text-muted-foreground mb-4">
        (Required fields are marked with an asterisk) (*).
      </p>

      <p className="mt-20 mb-5 font-bold text-4xl" style={{ color: "#eec0c8" }}>
        Search by Individual Details
      </p>
      <div className="flex flex-col md:flex-row md:gap-4 mb-8 max-w-2xl items-center">
        <div className="flex flex-col mb-4 md:mb-0 w-full md:w-auto">
          <p>Owner Name *</p>
          <Input
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Owner Name"
            style={{
              backgroundColor: "white",
              color: "black",
              border: "2px solid #06b6d4", // Tailwind's cyan-300 color
            }}
          />
        </div>

        <div className="flex flex-col w-full md:w-auto">
          <p>Repository Name *</p>
          <Input
            value={repoName}
            onChange={(e) => setRepoName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Repository Name"
            style={{
              backgroundColor: "white",
              color: "black",
              border: "2px solid #06b6d4", // Tailwind's cyan-300 color
            }}
          />
        </div>

        <div className="flex flex-col md:mt-0 md:ml-2">
          <Button
            onClick={handleSearchRepos}
            variant={"outline"}
            className="mt-6"
            style={{ backgroundColor: "#eec0c8", color: "white" }}
          >
            {loading.searchReposLoader ? <Loader /> : "Search"}
          </Button>
        </div>
      </div>

      <p className="font-bold mt-20 mb-5 text-4xl" style={{ color: "#eec0c8" }}>
        Search By Repository Link
      </p>
      <div className="flex flex-col md:flex-row md:gap-4 mb-8 max-w-2xl items-center">
        <div className="flex flex-col mb-4 md:mb-0 w-full md:w-auto">
          <p>Repository Link *</p>
          <Input
            value={repoLink}
            onChange={(e) => setRepoLink(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Repository Link"
            style={{
              backgroundColor: "white",
              color: "black",
              border: "2px solid #06b6d4", // Tailwind's cyan-300 color
            }}
          />
        </div>

        <div className="flex flex-col md:mt-0 md:ml-2">
          <Button
            onClick={handleSearchReposUrl}
            variant={"outline"}
            className="mt-6"
            style={{ backgroundColor: "#eec0c8", color: "white" }}
          >
            {loading.searchRepoUrlLoader ? <Loader /> : "Search"}
          </Button>
        </div>
      </div>

      {repositories.length > 0 && (
        <div>
          <h2 className="font-medium text-2xl mb-2" style={{ color: "#eec0c8" }}>
            Repositories
          </h2>
          <Table>
            <TableCaption>A list of repositories matching the search criteria.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {repositories.map((repo) => (
                <TableRow key={repo.id} onClick={() => {
                  setSelectedRepo(repo);
                  handleSearchIssues(repo.full_name); // Fetch issues for the selected repo
                }}>
                  <TableCell>{repo.name}</TableCell>
                  <TableCell>{repo.owner.login}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {selectedRepo && issues.length > 0 && (
        <div>
          <h2 className="font-medium text-2xl mb-2" style={{ color: "#eec0c8" }}>
            Issues for {selectedRepo.full_name}
          </h2>
          <Table>
            <TableCaption>List of issues in this repository.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell>{issue.title}</TableCell>
                  <TableCell>
                    <Badge variant={issue.state === "open" ? "outline" : "default"}>
                      {issue.state}
                    </Badge>
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
