import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("test12", 12);

  const user = await prisma.user.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
      email: "test@test.com",
      password,
    },
  });

  const bookmark = await prisma.bookmark.create({
    data: {
      name: "Test Bookmark",
      url: "https://example.com",
      description: "This is a test bookmark",
      userId: user.id,
    },
  });


  const todos=await prisma.todo.createMany({
    data: [
      {
        id: 'todo-1',
        title: 'Implement Authentication',
        description: 'Set up JWT-based authentication for the app',
        completed: false,
        bookmarkId: bookmark.id,
      },
      {
        id: 'todo-2',
        title: 'Add Unit Tests',
        description: 'Write unit tests for all routes',
        completed: false,
        bookmarkId: bookmark.id,
      },
    ],
  });

  console.log({ user, bookmark ,todos});
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
