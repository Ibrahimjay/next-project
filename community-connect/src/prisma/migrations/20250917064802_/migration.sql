-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('reported', 'in_progress', 'resolved');

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "ctaText" TEXT,
ADD COLUMN     "isPinned" BOOLEAN DEFAULT false,
ADD COLUMN     "isSponsored" BOOLEAN DEFAULT false,
ALTER COLUMN "source" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "imageStoreID" TEXT;

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "priority" "Priority" NOT NULL DEFAULT 'medium',
    "status" "Status" NOT NULL DEFAULT 'reported',
    "photos" TEXT[],
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publisherId" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
