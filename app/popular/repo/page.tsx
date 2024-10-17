"use client";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const RepositoryStats = () => {
  const [commitHistory, setCommitHistory] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [languageUsage, setLanguageUsage] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  const searchParams = useSearchParams();
  console.log(searchParams);
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");

  const token = "your_token_here"; // Replace with your actual token

  // Fetch commit activity data (timeline)
  const fetchCommitHistory = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`
      );
      const weeklyCommits = response.data.map(
        (week: { week: number; total: number }) => ({
          week: new Date(week.week * 1000).toLocaleDateString(), // Convert Unix timestamp
          total: week.total,
        })
      );
      setCommitHistory(weeklyCommits);
    } catch (error) {
      console.error("Error fetching commit history:", error);
      setError("Failed to fetch commit history");
    }
  };

  // Fetch top contributors
  const fetchContributors = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/contributors`
      );
      const topContributors = response.data
        .slice(0, 10)
        .map((contributor: { login: string; contributions: number }) => ({
          name: contributor.login,
          commits: contributor.contributions,
        }));
      setContributors(topContributors);
    } catch (error) {
      console.error("Error fetching contributors:", error);
      setError("Failed to fetch contributors");
    }
  };

  // Fetch language usage
  const fetchLanguageUsage = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/languages`
      );
      setLanguageUsage(response.data);
    } catch (error) {
      console.error("Error fetching language usage:", error);
      setError("Failed to fetch language usage");
    }
  };

  // Call all the fetch functions
  const fetchAllData = async () => {
    setLoading(true);
    setError(null); // Reset error
    await fetchCommitHistory();
    await fetchContributors();
    await fetchLanguageUsage();
    setLoading(false); // Data is ready
  };

  useEffect(() => {
    if (owner && repo) {
      fetchAllData();
    } 
  }, [owner, repo]);

  // Data for Commit History Line Chart
  const commitHistoryData = {
    labels: commitHistory.map(
      (commit: { week: string; total: number }) => commit.week
    ),
    datasets: [
      {
        label: "Commits per Week",
        data: commitHistory.map(
          (commit: { week: string; total: number }) => commit.total
        ),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Data for Contributor Bar Chart
  const contributorData = {
    labels: contributors.map(
      (contributor: { name: string; commits: number }) => contributor.name
    ),
    datasets: [
      {
        label: "Commits",
        data: contributors.map(
          (contributor: { name: string; commits: number }) =>
            contributor.commits
        ),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Data for Language Usage Pie Chart
  const languageData = {
    labels: Object.keys(languageUsage),
    datasets: [
      {
        label: "Languages",
        data: Object.values(languageUsage),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="py-10 px-2.5 lg:px-20 mx-auto max-w-[900px]">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            {/* Commit History Chart */}
            <h2>Commit History</h2>
            <Line
              data={commitHistoryData}
              className="border rounded-xl p-3 mb-9"
            />

            {/* Contributor Activity Chart */}
            <h2>Top Contributors</h2>
            <Bar
              data={contributorData}
              className="border rounded-xl p-3 mb-9"
            />

            {/* Language Usage Pie Chart */}
            <h2>Language Usage</h2>
            <Pie data={languageData} className="border rounded-xl p-3 mb-9" />
          </>
        )}
      </div>
    </div>
  );
};

export default RepositoryStats;
