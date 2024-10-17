"use client";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyCommitChart = () => {
  const [monthlyCommitData, setMonthlyCommitData] = useState<
    { month: string; count: number }[]
  >([]);
  const [selectedMonthCommits, setSelectedMonthCommits] = useState<number[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const searchParams = new URLSearchParams(window.location.search);
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");

  useEffect(() => {
    const fetchAllCommits = async () => {
      let page = 1;
      let allCommits: any[] = [];
      let hasMoreCommits = true;

      while (hasMoreCommits) {
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/commits?per_page=100&page=${page}`
        );
        const commits = response.data;
        allCommits = [...allCommits, ...commits];
        
        if (commits.length < 100) {
          hasMoreCommits = false;
        }
        page++;
      }

      return allCommits.map((commit: any) => commit.commit.author.date);
    };

    const fetchCommitHistory = async () => {
      if (owner && repo) {
        const commitDates = await fetchAllCommits();
        if (commitDates.length === 0) return;

        const groupedByMonth: { [key: string]: number } = {};

        // Get the date one year ago from today
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        // Filter commits within the last year
        const filteredCommitDates = commitDates.filter((date: string) => {
          const commitDate = new Date(date);
          return commitDate >= oneYearAgo;
        });

        // If no commits in the past year, exit early
        if (filteredCommitDates.length === 0) return;

        // Get the first and last commit dates within the last year
        const firstCommitDate = new Date(filteredCommitDates[filteredCommitDates.length - 1]);
        const lastCommitDate = new Date(filteredCommitDates[0]);

        // Create a range of months from the first commit to the last commit in the last year
        let currentMonth = new Date(
          firstCommitDate.getFullYear(),
          firstCommitDate.getMonth(),
          1
        );

        const monthsArray = [];
        while (currentMonth <= lastCommitDate) {
          const monthKey = `${currentMonth.getFullYear()}-${String(
            currentMonth.getMonth() + 1
          ).padStart(2, "0")}`;
          monthsArray.push(monthKey);
          currentMonth.setMonth(currentMonth.getMonth() + 1);
        }

        // Group commits by month
        filteredCommitDates.forEach((date: string) => {
          const commitDate = new Date(date);
          const formattedMonth = `${commitDate.getFullYear()}-${String(
            commitDate.getMonth() + 1
          ).padStart(2, "0")}`; // Format to YYYY-MM

          if (groupedByMonth[formattedMonth]) {
            groupedByMonth[formattedMonth]++;
          } else {
            groupedByMonth[formattedMonth] = 1;
          }
        });

        // Fill missing months with 0 commits
        const monthlyData = monthsArray.map((month) => ({
          month,
          count: groupedByMonth[month] || 0,
        }));

        setMonthlyCommitData(monthlyData);
      }
    };

    fetchCommitHistory();
  }, [owner, repo]);

  const handleBarClick = (elements: any) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      const month = monthlyCommitData[index].month;
      setSelectedMonth(month);

      fetchCommitDetailsForMonth(month);
    }
  };

  const fetchCommitDetailsForMonth = async (month: string) => {
    if (owner && repo && month) {
      const [year, monthNum] = month.split("-");
      const startDate = `${year}-${monthNum}-01T00:00:00Z`;
      const endDate = new Date(parseInt(year), parseInt(monthNum), 0) // Get last day of the month
        .toISOString()
        .split("T")[0] + "T23:59:59Z";

      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/commits?since=${startDate}&until=${endDate}`
      );
      const commitDates = response.data.map(
        (commit: any) => commit.commit.author.date
      );

      const groupedByWeek: { [key: string]: number } = {};

      commitDates.forEach((date: string) => {
        const weekStart = new Date(date);
        const formattedWeekStart = `${weekStart.getMonth() + 1}/${weekStart.getDate()}`; // Format to MM/DD

        if (groupedByWeek[formattedWeekStart]) {
          groupedByWeek[formattedWeekStart]++;
        } else {
          groupedByWeek[formattedWeekStart] = 1;
        }
      });

      setSelectedMonthCommits(Object.values(groupedByWeek));
    }
  };

  const barChartData = {
    labels: monthlyCommitData.map((data) => data.month),
    datasets: [
      {
        label: "Commits per Month (Last Year)",
        data: monthlyCommitData.map((data) => data.count),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"], // Weeks of the month
    datasets: [
      {
        label: `Commits for ${selectedMonth}`,
        data: selectedMonthCommits,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="py-10 px-2.5 lg:px-20 mx-auto max-w-[800px]">
        <h2>Monthly Commits (Last Year)</h2>
        <Bar
          className="border rounded-xl p-3 mb-3"
          data={barChartData}
          options={{
            onClick: (event, elements) => handleBarClick(elements),
          }}
        />

        {selectedMonth && (
          <div className="border rounded-xl p-3">
            <h2>Commits for Month: {selectedMonth}</h2>
            <Line data={lineChartData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyCommitChart;
