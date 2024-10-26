import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const repositoryFullName = searchParams.get("repositoryFullName");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("perPage") || "20", 10);

  if (!repositoryFullName) {
    return NextResponse.json(
      { error: "Repository full name is required" },
      { status: 400 }
    );
  }

  try {
    // Use the search API to get the total count and issues
    const response = await axios.get(
      `https://api.github.com/search/issues`,
      {
        params: {
          q: `repo:${repositoryFullName} is:issue`,
          page,
          per_page: perPage,
          sort: 'created',
          order: 'desc'
        },
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    const totalCount = response.data.total_count;
    const issues = response.data.items.map((issue: any) => ({
      id: issue.id,
      number: issue.number,
      title: issue.title,
      html_url: issue.html_url,
      user: {
        login: issue.user.login,
        avatar_url: issue.user.avatar_url,
      },
      state: issue.state,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
      body: issue.body,
    }));

    console.log("Total count:", totalCount);
    console.log("Fetched issues:", issues.length);

    return NextResponse.json({ 
      issues, 
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / perPage)
    }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch issues:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response:", error.response.data);
    }
    return NextResponse.json(
      { error: "Failed to fetch issues" },
      { status: 500 }
    );
  }
}