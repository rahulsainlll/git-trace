import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DeleteBookmarkButton from "@/components/DeleteBookmarkButton";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return <div className="py-10 px-2.5 lg:px-20">Unauthorized</div>;
  }

  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: session.user.id },
    include: {
      user: true,
    },
  });

  console.log("Bookmarks:", bookmarks); // Debug logging

  return (
    <div className="py-10 px-2.5 lg:px-20">
      <h1 className="font-medium text-3xl text-gray-900 mb-4">Dashboard</h1>

      {bookmarks.length > 0 ? (
        <Table>
          <TableCaption>Your saved repositories and issues.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookmarks.map((bookmark) => (
              <TableRow key={bookmark.id}>
                <TableCell>
                  <a
                    href={bookmark.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {bookmark.name}
                  </a>
            
                </TableCell>
                <TableCell>
                  {bookmark.description || "No description available"}
                </TableCell>
                <TableCell className="flex gap-2">
                  <DeleteBookmarkButton bookmarkId={bookmark.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No bookmarks found.</p>
      )}
    </div>
  );
}
