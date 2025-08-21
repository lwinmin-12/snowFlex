/*
  Warnings:

  - A unique constraint covering the columns `[userId,movieId]` on the table `watch_histroy` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "AdType" ADD VALUE 'Image';

-- CreateIndex
CREATE UNIQUE INDEX "watch_histroy_userId_movieId_key" ON "watch_histroy"("userId", "movieId");
