/*
  Warnings:

  - You are about to drop the column `positionDetails` on the `Position` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "companyDetails" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Position" DROP COLUMN "positionDetails";

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "profilePicture" DROP NOT NULL;
