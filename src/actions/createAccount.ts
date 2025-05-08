"use server";
import { User } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
interface IResponse {
  user: Pick<User, "id">;
}

export const createAccount = async (): Promise<IResponse> => {
  const clerkUser = await currentUser();
  const userId = clerkUser?.id as string;
  try {
    const email = clerkUser?.emailAddresses[0].emailAddress as string;
    const imageUrl = clerkUser?.imageUrl;

    const user = await prisma.user.create({
      data: {
        id: userId,
        email,
        imageUrl,
      },
      select: {
        id: true,
      },
    });

    return { user };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      throw new Error("Failed to create the user in the database.")
    }
    throw new Error("Unknown error");
  }
};
