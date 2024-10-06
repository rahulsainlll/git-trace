import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const owner = searchParams.get("owner");
  const name = searchParams.get("name");
  

  if (!owner || !name) {
    return NextResponse.json(
      { error: "Owner and name are required" },
      { status: 400 }
    );
  }

  try {
    const query = `${owner}/${name}`;
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=${query}`
    );
    console.log(response)
    const repositories = response.data.items.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      open_issues_count: repo.open_issues_count,
    }));
    console.log(repositories);
    return NextResponse.json(repositories, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to search repositories" },
      { status: 500 }
    );
  }
}
