"use server";
import prisma from "@/lib/prisma";
import { currentUser, clerkClient } from "@clerk/nextjs/server";

export const createAccount = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true, username: true },
    });

    if (user) {
      return { error: "This username already taken" };
    }

    const clerkUser = await currentUser();
    const userId = clerkUser?.id as string;
    const email = clerkUser?.emailAddresses[0].emailAddress as string;
    const imageUrl = clerkUser?.imageUrl;

    await prisma.user.create({
      data: {
        id: userId,
        email,
        username,
        imageUrl,
      },
    });

    const client = await clerkClient();
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
      },
    });

    return res.publicMetadata;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      return { error: "Failed to create the user in the database." };
    }
    return { error: "Unknown error" };
  }
};
