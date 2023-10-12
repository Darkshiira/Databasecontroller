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
  manufacturer: string;
  isarchived: boolean;
  isfeatured: boolean;
  stock: number;
  ingredients: string;
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
  const storeID = `${process.env.STORE_ID}`;

  for (const category of jsonData.categories) {
    await prisma.category.create({
      data: {
        storeId: storeID,
        title: category.title,
      },
    });
  }

  for (const product of jsonData.products) {
    await prisma.product.create({
      data: {
        storeId: storeID,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        size: product.size,
        color: product.color,
        manufacturer: product.manufacturer,
        isarchived: product.isarchived,
        isfeatured: product.isfeatured,
        stock: product.stock,
        ingredients: product.ingredients,
      },
    });
  }

  for (const billboard of jsonData.billboards) {
    await prisma.billboard.create({
      data: {
        storeId: storeID,
        text: billboard.text,
        image: billboard.image,
        active: billboard.active,
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
