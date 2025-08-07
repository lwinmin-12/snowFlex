/*
  Warnings:

  - The values [EMAIL,GOOGLE,FACEBOOK] on the enum `LoginType` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[provider_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LoginType_new" AS ENUM ('google', 'facebook');
ALTER TABLE "User" ALTER COLUMN "login_type" TYPE "LoginType_new" USING ("login_type"::text::"LoginType_new");
ALTER TYPE "LoginType" RENAME TO "LoginType_old";
ALTER TYPE "LoginType_new" RENAME TO "LoginType";
DROP TYPE "LoginType_old";
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "User_provider_id_key" ON "User"("provider_id");
