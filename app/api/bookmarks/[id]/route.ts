// checks if the bookmark exists and is owned by the authenticated user before updating.
// updates the bookmark with the new data or returns an error if something goes wrong.
// deletes the bookmark if it exists and is owned by the authenticated user.
// returns a success message or an error if something goes wrong.

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

  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      const bookmark = await prisma.bookmark.deleteMany({
        where: {
          id: id as string,
          userId,
        },
      });

      if (!bookmark) {
        return res.status(404).json({ error: "Bookmark not found" });
      }

      res.status(200).json({ message: "Bookmark deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete bookmark" });
    }
  } else if (req.method === "PUT") {
    try {
      const { name, url, description } = req.body;

      const bookmark = await prisma.bookmark.updateMany({
        where: {
          id: id as string,
          userId,
        },
        data: { name, url, description },
      });

      if (!bookmark) {
        return res.status(404).json({ error: "Bookmark not found" });
      }

      res.status(200).json(bookmark);
    } catch (error) {
      res.status(500).json({ error: "Failed to update bookmark" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
