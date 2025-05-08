"use server"

import prisma from "@/lib/prisma";

type Props = {
    title?: string;
    bio?: string;
}

export const updateProfile = async (updatedData: Props, id: string) => {
    return await prisma.connectTree.update({where: {
        id
    }, data : updatedData})
}  