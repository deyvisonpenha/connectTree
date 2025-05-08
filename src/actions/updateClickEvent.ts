"use server";

import prisma from "@/lib/prisma";

export const updateClickEvent = async (linkId: string) => {
  return await prisma.link.update({
    where: {
      id: linkId,
    },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });
};
