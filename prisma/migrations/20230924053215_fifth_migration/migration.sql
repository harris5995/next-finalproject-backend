-- CreateTable
CREATE TABLE "Tops" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "brand" TEXT,
    "color" TEXT,
    "size" TEXT,
    "occasion" TEXT,
    "material" TEXT,

    CONSTRAINT "Tops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tops_url_key" ON "Tops"("url");

-- AddForeignKey
ALTER TABLE "Tops" ADD CONSTRAINT "Tops_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
