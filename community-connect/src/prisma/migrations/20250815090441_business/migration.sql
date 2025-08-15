-- CreateTable
CREATE TABLE "Business" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "timePosted" TEXT NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "isFavorited" BOOLEAN NOT NULL,
    "isFree" BOOLEAN NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);
