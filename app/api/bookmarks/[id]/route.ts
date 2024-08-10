// checks if the bookmark exists and is owned by the authenticated user before updating.
// updates the bookmark with the new data or returns an error if something goes wrong.
// deletes the bookmark if it exists and is owned by the authenticated user.
// returns a success message or an error if something goes wrong.

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  try {
    const result = await prisma.bookmark.deleteMany({
      where: {
        id: id as string,
        userId,
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { error: "Bookmark not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Bookmark deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete bookmark" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  const body = await req.json();
  const { name, url: bookmarkUrl, description } = body;

  try {
    const result = await prisma.bookmark.updateMany({
      where: {
        id: id as string,
        userId,
      },
      data: { name, url: bookmarkUrl, description },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { error: "Bookmark not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update bookmark" },
      { status: 500 }
    );
  }
}
