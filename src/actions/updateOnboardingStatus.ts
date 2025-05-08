"use server";
import { currentUser, clerkClient } from "@clerk/nextjs/server";

export const updateOnboardingStatus = async () => {
  const clerkUser = await currentUser();
  const userId = clerkUser?.id as string;
  
  try {
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
