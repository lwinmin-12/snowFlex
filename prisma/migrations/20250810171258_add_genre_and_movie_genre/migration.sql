-- CreateTable
CREATE TABLE "genres" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_genres" (
    "contentId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,

    CONSTRAINT "content_genres_pkey" PRIMARY KEY ("contentId","genreId")
);

-- AddForeignKey
ALTER TABLE "content_genres" ADD CONSTRAINT "content_genres_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_genres" ADD CONSTRAINT "content_genres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
