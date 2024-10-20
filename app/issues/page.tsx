"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
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

export default function IssuesPage() {
  const searchParams = useSearchParams();
  const repoFullName = searchParams.get("repoFullName");
  const [searchIssueLoader, setSearchIssueLoader] = useState(false);
  const [issues, setIssues] = useState<any[]>([]);
  const [filter, setFilter] = useState("");

  const handleSearchIssues = async (repoFullName: string) => {
    setSearchIssueLoader(true);
    try {
      const response = await axios.get("/api/search/issues", {
        params: { repositoryFullName: repoFullName },
      });
      setIssues(response.data);
    } catch (error) {
      console.error("Failed to fetch issues:", error);
    } finally {
      setSearchIssueLoader(false);
    }
  };

  useEffect(() => {
    if (repoFullName) {
      handleSearchIssues(repoFullName);
    }
  }, [repoFullName]);

  const filteredIssues = issues.filter((issue) =>
    issue.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="py-10 px-2.5 lg:px-20 mx-auto max-w-[1250px]">
      <h1 className="font-medium text-3xl text-gray-900 dark:text-slate-50 mb-2">
        Issues for {repoFullName}
      </h1>
      <Input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter issues by title"
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Issue Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredIssues.map((issue: any) => (
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
  );
}
