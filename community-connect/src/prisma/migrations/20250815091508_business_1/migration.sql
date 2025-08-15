-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "isAd" BOOLEAN,
ADD COLUMN     "originalPrice" TEXT,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "timePosted" DROP NOT NULL,
ALTER COLUMN "distance" DROP NOT NULL;
