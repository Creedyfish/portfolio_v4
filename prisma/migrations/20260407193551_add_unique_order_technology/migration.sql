/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `Technology` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Technology" ALTER COLUMN "order" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Technology_order_key" ON "Technology"("order");
