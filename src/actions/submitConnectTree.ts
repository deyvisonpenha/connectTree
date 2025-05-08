"use server";
import { ConnectTreeWithLinks } from "@/context/connectTreeContext";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

type Props = {
  data: {
    title: string;
    url: string;
    thumbnail?: string | null;
  };
  linkId?: string;
  connectTreeId: string;
};

export const submitConnectTree = async ({
  data,
  linkId,
  connectTreeId,
}: Props) => {
  const { userId } = await auth();
  const type = linkId ? "edit" : "create";
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

  switch (type) {
    case "edit":
      await prisma.link.update({
        where: {
          id: linkId,
        },
        data: data,
        select: { id: true },
      });
      break;
    case "create":
      await prisma.link.create({
        data: {
          title: data.title,
          url: data.url,
          thumbnail: data.thumbnail,
          connectTreeId: connectTreeId,
        },
        select: { id: true },
      });
      break;
  }

  // Return the updated ConnectTree with its links
  const updatedConnectTree = (await prisma.connectTree.findUnique({
    where: {
      id: connectTreeId,
    },
    include: {
      links: true,
    },
  })) as ConnectTreeWithLinks;

  return updatedConnectTree;
};
