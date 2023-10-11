import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type Objects = {
  billboards: Billboard[];
  categories: Category[];
  products: Product[];
  sizes: Size[];
  colors: Color[];
};

export type Product = {
  storeId: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  size?: string;
  color?: string;
  manufacturer?: string;
  isarchived?: boolean;
  isfeatured?: boolean;
};

export type Category = {
  storeId: string;
  title: string;
};

export type Billboard = {
  storeId: string;
  text: string;
  image: string;
  active: number;
};

export type Size = {
  storeId: string;
  size: string;
};

export type Color = {
  storeId: string;
  color: string;
};

const jsonData: Objects = JSON.parse(
  fs.readFileSync("./prisma/data.json", "utf-8")
);

async function main() {
  const storeId = "e6b1cfa4-3d85-4b0e-8de1-d5512cdea68b";
  for (const billboard of jsonData.billboards) {
    if (billboard.active === 1) {
      const updated = await prisma.billboard
        .updateMany({
          where: { storeId, active: 1 },
          data: { active: 0 },
        })
        .then(async () => {
          await prisma.billboard.create({
            data: {
              storeId,
              text: billboard.text,
              image: billboard.image,
              active: billboard.active,
            },
          });
        });
    }
  }

  for (const category of jsonData.categories) {
    await prisma.category.create({
      data: {
        storeId,
        title: category.title,
      },
    });
  }

  for (const product of jsonData.products) {
    await prisma.product.create({
      data: {
        storeId,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
