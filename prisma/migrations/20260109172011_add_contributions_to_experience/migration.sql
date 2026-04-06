-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "contributions" TEXT[] DEFAULT ARRAY[]::TEXT[];
