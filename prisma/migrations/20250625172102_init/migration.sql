/*
  Warnings:

  - Made the column `provider_id` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "provider_id" SET NOT NULL;
