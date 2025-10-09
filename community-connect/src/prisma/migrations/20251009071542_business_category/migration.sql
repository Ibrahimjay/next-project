-- CreateEnum
CREATE TYPE "BusinessCategories" AS ENUM ('sale', 'free', 'job', 'services');

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "category" "BusinessCategories" DEFAULT 'sale';
