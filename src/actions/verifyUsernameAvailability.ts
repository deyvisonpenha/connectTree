"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const verifyUsernameAvailability = async (
  username: string
): Promise<boolean> => {
  const clerkUser = await currentUser();
  const userId = clerkUser?.id as string;

  const connectTreeDomain = await prisma.connectTree.findUnique({
    where: {
      user: {
        id: userId,
      },
      username,
    },
    select: { id: true, username: true },
  });

  if (connectTreeDomain) {
    return true;
  }

  return false;
};
