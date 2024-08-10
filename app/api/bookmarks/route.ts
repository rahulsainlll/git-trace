// post :
// Checks if the request method is POST.
// Retrieves the user’s ID using Clerk’s getAuth function.
// Creates a new bookmark associated with the logged-in user using Prisma’s create method.
// Returns the created bookmark or an error if something goes wrong.

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const bookmarks = await prisma.bookmark.findMany({
        where: { userId },
      });
      res.status(200).json(bookmarks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookmarks" });
    }
  } else if (req.method === "POST") {
    try {
      const { name, url, description } = req.body;
      const { userId } = getAuth(req);

      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const bookmark = await prisma.bookmark.create({
        data: {
          name,
          url,
          description,
          userId,
        },
      });

      res.status(201).json(bookmark);
    } catch (error) {
      res.status(500).json({ error: "Failed to create bookmark" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
