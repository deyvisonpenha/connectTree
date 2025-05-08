"use server";
import { ConnectTreeWithLinks } from "@/context/connectTreeContext";
import prisma from "@/lib/prisma";

export const deleteLink = async (linkId: string, connectTreeId: string) => {
  await prisma.link.delete({
    where: {
      id: linkId,
      connectTreeId,
    },
  });

  const updatedConnectTree = await prisma.connectTree.findFirst({
    where: {
      id: connectTreeId,
    },
    include: {
      links: true,
    },
  }) as  ConnectTreeWithLinks;
  return updatedConnectTree;
};
