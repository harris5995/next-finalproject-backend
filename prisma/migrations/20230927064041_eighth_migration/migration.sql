-- CreateTable
CREATE TABLE "Outfits" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "tops_id" INTEGER NOT NULL,
    "bottoms_id" INTEGER NOT NULL,
    "shoes_id" INTEGER NOT NULL,
    "accs_id" INTEGER NOT NULL,

    CONSTRAINT "Outfits_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Outfits" ADD CONSTRAINT "Outfits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outfits" ADD CONSTRAINT "Outfits_tops_id_fkey" FOREIGN KEY ("tops_id") REFERENCES "Tops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outfits" ADD CONSTRAINT "Outfits_bottoms_id_fkey" FOREIGN KEY ("bottoms_id") REFERENCES "Bottoms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outfits" ADD CONSTRAINT "Outfits_shoes_id_fkey" FOREIGN KEY ("shoes_id") REFERENCES "Shoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outfits" ADD CONSTRAINT "Outfits_accs_id_fkey" FOREIGN KEY ("accs_id") REFERENCES "Accs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
