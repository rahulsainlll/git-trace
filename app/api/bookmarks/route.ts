// // post :
// // Checks if the request method is POST.
// // Retrieves the user’s ID using Clerk’s getAuth function.
// // Creates a new bookmark associated with the logged-in user using Prisma’s create method.
// // Returns the created bookmark or an error if something goes wrong.

// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";

// export async function GET(req: Request) {
//   const { userId } = auth();

//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const bookmarks = await prisma.bookmark.findMany({
//       where: { userId },
//     });
//     return NextResponse.json(bookmarks);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch bookmarks" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req: Request) {
//   const { userId } = auth();

//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     // Check if the user exists
//     const userExists = await prisma.user.findUnique({
//       where: { id: userId },
//     });

//     if (!userExists) {
//       return NextResponse.json(
//         { error: "User does not exist" },
//         { status: 404 }
//       );
//     }

//     const body = await req.json();
//     const { name, url, description } = body;

//     if (!name || !url) {
//       return NextResponse.json(
//         { error: "Name and URL are required" },
//         { status: 400 }
//       );
//     }

//     const bookmark = await prisma.bookmark.create({
//       data: {
//         name,
//         url,
//         description: description || null,
//         userId,
//       },
//     });

//     return NextResponse.json(bookmark, { status: 201 });
//   } catch (error) {
//     console.error("Failed to create bookmark:", error); // Added logging for better debugging
//     return NextResponse.json(
//       { error: "Failed to create bookmark" },
//       { status: 500 }
//     );
//   }
// }