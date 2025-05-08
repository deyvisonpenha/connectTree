"use server";

import prisma from "@/lib/prisma";

export const getConnectTreeByUsername = async (username: string) => {
  const connectTree = await prisma.connectTree.findUnique({
    where: {
      username,
    },
    include: {
      links: true,
    },
  });

  if (!connectTree) {
    throw new Error("ConnectTree not found");
  }

  return connectTree;
};