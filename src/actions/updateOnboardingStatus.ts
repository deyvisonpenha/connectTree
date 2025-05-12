"use server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const updateOnboardingStatus = async () => {
  const { userId } = await auth();

  try {
    const client = await clerkClient();
    const res = await client.users.updateUser(userId as string, {
      publicMetadata: {
        onboardingComplete: true,
      },
    });

    return {onboardingComplete: res.publicMetadata?.onboardingComplete}
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      return { error: "Failed to create the user in the database." };
    }
    return { error: "Unknown error" };
  }
};
