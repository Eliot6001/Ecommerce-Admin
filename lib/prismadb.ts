import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
  //globalThis, is the global Vars obj
}

//Creating a prismaClient if there isnt client
const prismadb = globalThis.prisma || new PrismaClient();

//if on production, prismadb is used
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;
