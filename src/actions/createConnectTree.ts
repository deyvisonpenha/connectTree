"use server";
import prisma from "@/lib/prisma";

export const createConnectTree = async (username: string, userId: string) => {
  const newConnectTree = await prisma.connectTree.create({
    data: {
      username,
      userId,
    },
    select: {
        id: true
    }
  });

  return newConnectTree
};
