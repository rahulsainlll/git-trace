import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// const db = globalForPrisma.prisma || prisma;

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export default db;
