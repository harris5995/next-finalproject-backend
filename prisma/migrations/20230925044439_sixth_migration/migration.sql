-- CreateTable
CREATE TABLE "Bottoms" (
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

    CONSTRAINT "Bottoms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shoes" (
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

    CONSTRAINT "Shoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accessories" (
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

    CONSTRAINT "Accessories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bottoms_url_key" ON "Bottoms"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Shoes_url_key" ON "Shoes"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Accessories_url_key" ON "Accessories"("url");

-- AddForeignKey
ALTER TABLE "Bottoms" ADD CONSTRAINT "Bottoms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shoes" ADD CONSTRAINT "Shoes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accessories" ADD CONSTRAINT "Accessories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
