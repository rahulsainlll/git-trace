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
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, ArcElement, Title, Tooltip, Legend, PointElement } from 'chart.js';

// Register Chart.js elements
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, ArcElement, PointElement, Title, Tooltip, Legend);

export default function IssuesPage() {
  const searchParams = useSearchParams();
  const repoFullName = searchParams.get("repoFullName");
  const [searchIssueLoader, setSearchIssueLoader] = useState(false);
  const [issues, setIssues] = useState<any[]>([]);
  const [filter, setFilter] = useState("");
  const [timeframe, setTimeframe] = useState("daily");
  const [chartType, setChartType] = useState("bar");

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

  const getIssueCounts = () => {
    const counts: any = { daily: {}, monthly: {}, yearly: {} };

    issues.forEach(issue => {
      const date = new Date(issue.created_at);
      const day = date.toLocaleDateString();
      const month = date.toLocaleDateString('default', { year: 'numeric', month: 'long' });
      const year = date.getFullYear();

      counts.daily[day] = (counts.daily[day] || 0) + 1;
      counts.monthly[month] = (counts.monthly[month] || 0) + 1;
      counts.yearly[year] = (counts.yearly[year] || 0) + 1;
    });

    return counts;
  };

  const getOpenClosedCounts = () => {
    return issues.reduce(
      (acc, issue) => {
        if (issue.state === "open") {
          acc.open++;
        } else {
          acc.closed++;
        }
        return acc;
      },
      { open: 0, closed: 0 }
    );
  };

  const counts = getIssueCounts();
  const labels = Object.keys(counts[timeframe]);
  const data = Object.values(counts[timeframe]);

  const chartData = {
    labels,
    datasets: [{
      label: `${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} Issue Counts`,
      data,
      backgroundColor: chartType === "bar" ? 'rgba(54, 162, 235, 0.6)' : 'rgba(54, 162, 235, 0.3)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      fill: chartType === "line",
    }],
  };

  const openClosedCounts = getOpenClosedCounts();
  const pieChartData = {
    labels: ["Open", "Closed"],
    datasets: [{
      data: [openClosedCounts.open, openClosedCounts.closed],
      backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
      borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
      borderWidth: 1,
    }],
  };

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      options: { responsive: true },
      className: "",
    };

    if (chartType === "bar") {
      return <Bar {...commonProps} />;
    } else {
      return <Line {...commonProps} />;
    }
  };

  const renderPieChart = () => {
    return <Pie data={pieChartData} options={{ responsive: true }} />;
  };

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

      {/* Dropdown for selecting timeframe */}
      <select
        value={timeframe}
        onChange={(e) => setTimeframe(e.target.value)}
        className="mb-4"
      >
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      {/* Dropdown for selecting chart type */}
      <select
        value={chartType}
        onChange={(e) => setChartType(e.target.value)}
        className="mb-4"
      >
        <option value="bar">Bar Chart</option>
        <option value="line">Line Chart</option>
      </select>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        {/* Responsive graph container for issue counts */}
        <div className="w-full md:w-1/2 h-48 md:h-56 lg:h-64">
            {renderChart()}
        </div>

        {/* Responsive graph container for open vs closed issues */}
        <div className="w-full md:w-1/2 h-48 md:h-56 lg:h-64">
            {renderPieChart()}
        </div>
      </div>

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
