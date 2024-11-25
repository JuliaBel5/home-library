/*
  Warnings:

  - Changed the type of `createdAt` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `updatedAt` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/

ALTER TABLE "User"
  ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3) USING to_timestamp("createdAt" / 1000);

ALTER TABLE "User"
  ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3) USING to_timestamp("updatedAt" / 1000);
