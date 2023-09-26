-- CreateTable
CREATE TABLE "Accs" (
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

    CONSTRAINT "Accs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Accs_url_key" ON "Accs"("url");

-- AddForeignKey
ALTER TABLE "Accs" ADD CONSTRAINT "Accs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
