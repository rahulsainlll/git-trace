import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"; // Import NextResponse

export async function POST(req: Request) {
  const { title, description, completed, bookmarkId } = await req.json(); // Parse JSON body

  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        completed,
        bookmarkId,
      },
    });

    return NextResponse.json(todo, { status: 200 }); // Return JSON response
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: "Unable to create todo" }, { status: 500 }); // Handle error
  }
}
