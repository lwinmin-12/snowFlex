-- CreateEnum
CREATE TYPE "AdType" AS ENUM ('Content', 'Web');

-- CreateTable
CREATE TABLE "banner_slider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "contentId" TEXT,
    "webUrl" TEXT,
    "status" BOOLEAN NOT NULL,
    "adType" "AdType" NOT NULL,
    "sequence" INTEGER NOT NULL,

    CONSTRAINT "banner_slider_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "banner_slider" ADD CONSTRAINT "banner_slider_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE SET NULL ON UPDATE CASCADE;
