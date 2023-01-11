/*
  Warnings:

  - You are about to drop the column `ref` on the `Post` table. All the data in the column will be lost.
  - The `type` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('TEXT', 'VIDEO', 'QUOTE', 'PHOTO', 'LINK');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "ref",
ADD COLUMN     "link" TEXT,
DROP COLUMN "type",
ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'TEXT',
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "announceText" DROP NOT NULL,
ALTER COLUMN "text" DROP NOT NULL,
ALTER COLUMN "quoteAuthor" DROP NOT NULL,
ALTER COLUMN "photo" DROP NOT NULL;
