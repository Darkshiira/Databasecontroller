import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type Objects = {
  billboards: Billboard[];
  categories: Category[];
  products: Product[];
};

export type Product = {
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export type Category = {
  title: string;
};

export type Billboard = {
  text: string;
  image: string;
  active: number;
};

const jsonData: Objects = JSON.parse(
  fs.readFileSync("./prisma/data.json", "utf-8")
);

async function main() {
  for (const billboard of jsonData.billboards) {
    if (billboard.active === 1) {
      const updated = await prisma.billboard
        .updateMany({
          where: { active: 1 },
          data: { active: 0 },
        })
        .then(async () => {
          await prisma.billboard.create({
            data: {
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
        title: category.title,
      },
    });
  }

  for (const product of jsonData.products) {
    await prisma.product.create({
      data: {
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
