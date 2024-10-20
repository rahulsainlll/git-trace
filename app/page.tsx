"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { FixedSizeList as List } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";

const SEARCH_HISTORY_KEY = "searchHistory";

export default function Component() {
  const [owner, setOwner] = useState("");
  const [repoName, setRepoName] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [repositories, setRepositories] = useState<any[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<any | null>(null);
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState({
    searchReposLoader: false,
    searchRepoUrlLoader: false,
    searchIssueLoader: false,
  });
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();
  const { toast } = useToast();
  const listRef = useRef<List>(null);

  useEffect(() => {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  const updateSearchHistory = (searchTerm: string) => {
    let history = [...searchHistory];
    if (history.includes(searchTerm)) {
      history = history.filter((term) => term !== searchTerm);
    }
    history.unshift(searchTerm);
    if (history.length > 5) {
      history.pop();
    }
    setSearchHistory(history);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
  };

  const handleSearchRepos = async () => {
    setLoading({ ...loading, searchReposLoader: true });
    try {
      if (owner == "" || repoName == "") {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Provide Both Owner Name and Repository Name .",
        });
        return;
      }
      updateSearchHistory(`${owner}/${repoName}`);
      const response = await axios.get("/api/search/repositories", {
        params: { owner, name: repoName },
      });
      if (response.data.length == 0) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Invalid Owner Name Or Repository Name .",
        });
        return;
      }
      setRepositories(response.data);
    } catch (error) {
      console.error("Failed to search repositories:", error);
    } finally {
      setLoading({ ...loading, searchReposLoader: false });
    }
  };

  const handleSearchReposUrl = async () => {
    setLoading({ ...loading, searchRepoUrlLoader: true });
    try {
      if (repoLink == "") {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Repository link cannot be empty .",
        });
        return;
      }
      const username = repoLink.replace("https://github.com/", "").split("/");
      if (!username) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong",
          description: "Provide correct url",
        });
        return;
      }
      if (username.length >= 2) {
        setOwner(username[0]);
        setRepoName(username[1]);
      }
      updateSearchHistory(repoLink);
      const response = await axios.get("/api/search/repositories", {
        params: { owner: username[0], name: username[1] },
      });
      if (response.data.length == 0) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Invalid Owner Name Or Repository Name .",
        });
        return;
      }
      setRepositories(response.data);
    } catch (error) {
      console.log(`Failed to search repositories ${error}`);
    } finally {
      setLoading({ ...loading, searchRepoUrlLoader: false });
    }
  };

  const handleSearchIssues = async (repoFullName: string) => {
    setLoading((prev) => ({ ...prev, searchIssueLoader: true }));
    setIssues([]);
    setPage(1);
    setHasMore(true);
    try {
      const response = await axios.get("/api/search/issues", {
        params: { repositoryFullName: repoFullName, page: 1, perPage: 30 },
      });
      setIssues(response.data.issues);
      setTotalCount(response.data.totalCount);
      setHasMore(response.data.issues.length < response.data.totalCount);
    } catch (error) {
      console.error("Failed to fetch issues:", error);
    } finally {
      setLoading((prev) => ({ ...prev, searchIssueLoader: false }));
    }
  };

  const loadMoreIssues = useCallback(async () => {
    if (!selectedRepo || loading.searchIssueLoader || !hasMore) return;

    setLoading((prev) => ({ ...prev, searchIssueLoader: true }));
    try {
      const nextPage = page + 1;
      const response = await axios.get("/api/search/issues", {
        params: { repositoryFullName: selectedRepo.full_name, page: nextPage, perPage: 30 },
      });
      setIssues((prevIssues) => [...prevIssues, ...response.data.issues]);
      setPage(nextPage);
      setHasMore(issues.length + response.data.issues.length < totalCount);
    } catch (error) {
      console.error("Failed to fetch more issues:", error);
    } finally {
      setLoading((prev) => ({ ...prev, searchIssueLoader: false }));
    }
  }, [selectedRepo, page, loading.searchIssueLoader, issues.length, totalCount, hasMore]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchRepos();
    }
  };

  const handleFocus = () => {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  };

  const handleHistoryClick = (searchTerm: string) => {
    if (searchTerm.startsWith("https://github.com/")) {
      setRepoLink(searchTerm);
      handleSearchReposUrl();
    } else {
      const [owner, repoName] = searchTerm.split("/");
      setOwner(owner);
      setRepoName(repoName);
      handleSearchRepos();
    }
  };

  const IssueRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const issue = issues[index];
    if (!issue) {
      return null;
    }
    return (
      <div style={style}>
        <TableRow className="w-full flex justify-between">
          <TableCell>{issue.title}</TableCell>
          <TableCell className="w-fit flex items-center gap-5">
          <TableCell>{issue.state}</TableCell>
          <TableCell>
            {new Date(issue.created_at).toLocaleDateString()}
          </TableCell>
          <TableCell className="flex items-center gap-2">
            <a
              href={issue.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline whitespace-nowrap"
            >
              View Issue
            </a>
            <NewBookmarkBtn
              name={issue.title}
              url={issue.html_url}
              description={issue.body || "No description available"}
            />
          </TableCell>
          </TableCell>
        </TableRow>
      </div>
    );
  };

  return (
    <div className="py-10 px-2.5 lg:px-20 mx-auto max-w-[1250px]">
      <h1 className="font-medium text-3xl text-gray-900 dark:text-slate-50 mb-2">
        Find repository
      </h1>
      <p className="text-base italic text-muted-foreground mb-4">
        Required fields are marked with an asterisk (*).
      </p>

      <p className="mt-6 mb-2 font-bold">Search by Individual details</p>
      <div className="flex flex-col md:flex-row md:gap-4 mb-8 max-w-2xl">
        <div className="flex flex-col mb-4 md:mb-0 w-full md:w-auto">
          <p>Owner Name *</p>
          <Input
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            placeholder="Owner Name"
          />
        </div>

        <div className="flex flex-col w-full md:w-auto">
          <p>Repository Name *</p>
          <Input
            value={repoName}
            onChange={(e) => setRepoName(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            placeholder="Repository Name"
          />
        </div>

        <div className="flex flex-col md:mt-0 md:ml-2">
          <Button
            onClick={handleSearchRepos}
            variant={"outline"}
            className="mt-6"
          >
            {loading.searchReposLoader ? <Loader /> : "Search"}
          </Button>
        </div>
      </div>

      <p className="font-bold mt-4 mb-2">Search By Repository Link</p>
      <div className="flex flex-col md:flex-row md:gap-4 mb-8 max-w-2xl">
        <div className="flex flex-col mb-4 md:mb-0 w-full md:w-auto">
          <p>Repository Link *</p>
          <Input
            value={repoLink}
            onChange={(e) => setRepoLink(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            placeholder="Repository Link"
          />
          {searchHistory.length > 0 && (
            <div className="mt-2">
              <p className="font-bold">Recent Searches:</p>
              <ul>
                {searchHistory.map((term, index) => (
                  <li
                    key={index}
                    className="cursor-pointer text-blue-500 underline"
                    onClick={() => handleHistoryClick(term)}
                  >
                    {term}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col md:mt-0 md:ml-2">
          <Button
            onClick={handleSearchReposUrl}
            variant={"outline"}
            className="mt-6"
          >
            {loading.searchRepoUrlLoader ? <Loader /> : "Search"}
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
        <p>Showing {issues.length} of {totalCount} issues</p>
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
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  height={400}
                  itemCount={issues.length}
                  itemSize={60}
                  width={width}
                  onItemsRendered={({ visibleStopIndex }) => {
                    if (visibleStopIndex === issues.length - 1 && hasMore) {
                      loadMoreIssues();
                    }
                  }}
                >
                  {IssueRow}
                </List>
              )}
            </AutoSizer>
          </TableBody>
        </Table>
        {loading.searchIssueLoader && (
          <div className="flex justify-center mt-4">
            <Loader className="animate-spin" />
          </div>
        )}
        {!hasMore && (
          <div className="text-center mt-4 text-gray-500">
            No more issues to load
          </div>
        )}
      </div>
    )}
    </div>
  );
}