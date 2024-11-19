/*
  Warnings:

  - Changed the type of `createdAt` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `updatedAt` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" 
  ALTER COLUMN "createdAt" TYPE INT USING EXTRACT(EPOCH FROM "createdAt")::INT,
  ALTER COLUMN "updatedAt" TYPE INT USING EXTRACT(EPOCH FROM "updatedAt")::INT;

