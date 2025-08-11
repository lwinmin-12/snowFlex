-- CreateTable
CREATE TABLE "watch_histroy" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "watchedAt" TIMESTAMP(3) NOT NULL,
    "progress" INTEGER NOT NULL,

    CONSTRAINT "watch_histroy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "movieId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("movieId","userId")
);

-- CreateIndex
CREATE INDEX "watch_histroy_userId_idx" ON "watch_histroy"("userId");

-- CreateIndex
CREATE INDEX "watch_histroy_movieId_idx" ON "watch_histroy"("movieId");

-- AddForeignKey
ALTER TABLE "watch_histroy" ADD CONSTRAINT "watch_histroy_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
