import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const repositoryFullName = searchParams.get("repositoryFullName");

  if (!repositoryFullName) {
    return NextResponse.json(
      { error: "Repository full name is required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${repositoryFullName}/issues`
    );

    const issues = response.data.map((issue: any) => ({
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

    return NextResponse.json(issues, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch issues:", error);
    return NextResponse.json(
      { error: "Failed to fetch issues" },
      { status: 500 }
    );
  }
}
