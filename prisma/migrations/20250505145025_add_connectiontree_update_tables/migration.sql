/*
  Warnings:

  - You are about to drop the column `userId` on the `links` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - Added the required column `connectTreeId` to the `links` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "links" DROP CONSTRAINT "links_userId_fkey";

-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "links" DROP COLUMN "userId",
ADD COLUMN     "connectTreeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "username";

-- CreateTable
CREATE TABLE "connecttrees" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "connecttrees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "connecttrees_username_key" ON "connecttrees"("username");

-- AddForeignKey
ALTER TABLE "connecttrees" ADD CONSTRAINT "connecttrees_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("clerk_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_connectTreeId_fkey" FOREIGN KEY ("connectTreeId") REFERENCES "connecttrees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
