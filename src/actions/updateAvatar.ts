"use server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const updateAvatar = async (imageUrl: string, connectTreeId: string) => {
    const { userId } = await auth();

  // Verify the user owns the ConnectTree
  const connectTree = await prisma.connectTree.findFirst({
    where: {
      id: connectTreeId,
      userId: userId as string,
    },
  });

  if (!connectTree) {
    throw new Error("ConnectTree not found or unauthorized");
  }
  return await prisma.connectTree.update({
    where: {
      id: connectTreeId,
    },
    data: {
      avatar: imageUrl,
    },
  });
}