/*
  Warnings:

  - The primary key for the `OrderStatus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ORDER_ID` on the `OrderStatus` table. All the data in the column will be lost.
  - Added the required column `id` to the `OrderStatus` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderStatus" DROP CONSTRAINT "OrderStatus_ORDER_ID_fkey";

-- AlterTable
ALTER TABLE "OrderStatus" DROP CONSTRAINT "OrderStatus_pkey",
DROP COLUMN "ORDER_ID",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "OrderStatus_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "OrderStatus" ADD CONSTRAINT "OrderStatus_id_fkey" FOREIGN KEY ("id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
