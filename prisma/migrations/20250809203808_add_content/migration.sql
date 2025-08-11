-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('Movie', 'Series');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "titleMm" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descriptionMm" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "trailerUrl" TEXT NOT NULL,
    "portraitUrl" TEXT NOT NULL,
    "landscapeUrl" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "type" "ContentType" NOT NULL,
    "status" "ContentStatus" NOT NULL,
    "isPremium" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);
