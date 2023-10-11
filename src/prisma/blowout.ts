import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const storeId = "e6b1cfa4-3d85-4b0e-8de1-d5512cdea68b";
  await prisma.billboard.deleteMany({
    where: { storeId },
  });
  await prisma.category.deleteMany({ where: { storeId } });
  await prisma.product.deleteMany({ where: { storeId } });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
