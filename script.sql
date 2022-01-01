-- CreateTable
CREATE TABLE "printers" (
    "id" SERIAL NOT NULL,
    "serial_number" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "toner_last_swap" TIMESTAMP(3),
    "page_count_instructions" TEXT,
    "overall_count" INTEGER,
    "department_name" TEXT,
    "proprietor_name" TEXT,
    "toner_model" TEXT,

    CONSTRAINT "printers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "in_charge" TEXT NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proprietors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,

    CONSTRAINT "proprietors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toners" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "quant" INTEGER NOT NULL,

    CONSTRAINT "toners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "printers_serial_number_key" ON "printers"("serial_number");

-- CreateIndex
CREATE UNIQUE INDEX "departments_name_key" ON "departments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "proprietors_name_key" ON "proprietors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "toners_model_key" ON "toners"("model");

-- AddForeignKey
ALTER TABLE "printers" ADD CONSTRAINT "printers_department_name_fkey" FOREIGN KEY ("department_name") REFERENCES "departments"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "printers" ADD CONSTRAINT "printers_proprietor_name_fkey" FOREIGN KEY ("proprietor_name") REFERENCES "proprietors"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "printers" ADD CONSTRAINT "printers_toner_model_fkey" FOREIGN KEY ("toner_model") REFERENCES "toners"("model") ON DELETE SET NULL ON UPDATE CASCADE;
