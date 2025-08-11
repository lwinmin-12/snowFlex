-- CreateTable
CREATE TABLE "play_list" (
    "id" TEXT NOT NULL,
    "titleMm" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "type" "ContentType" NOT NULL,
    "sequence" INTEGER NOT NULL,

    CONSTRAINT "play_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_playlist" (
    "id" TEXT NOT NULL,
    "playListId" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,

    CONSTRAINT "content_playlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "content_playlist_playListId_contentId_key" ON "content_playlist"("playListId", "contentId");

-- AddForeignKey
ALTER TABLE "content_playlist" ADD CONSTRAINT "content_playlist_playListId_fkey" FOREIGN KEY ("playListId") REFERENCES "play_list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_playlist" ADD CONSTRAINT "content_playlist_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
