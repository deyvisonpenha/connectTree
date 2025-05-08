"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const listConnectTree = async () => {
  const { userId } = await auth();
  
  return prisma.connectTree.findMany({
    where: {
      userId: userId as string,
    },
    include: {
      links: true
    }
  });
};
