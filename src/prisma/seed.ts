import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type Objects = {
  billboards: Billboard[];
  categories: Category[];
  products: Product[];
  sizes: Size[];
  colors: Color[];
  customers: Customer[];
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
  title: string;
};

export type Color = {
  storeId: string;
  title: string;
  hex: string;
};

export type Customer = {
  id: string | undefined;
  storeId: string;
  firstName: string;
  lastName: string;
  street: string;
  zipCode: string;
  city: string;
  e_mail: string;
  phone: string;
  order: Order[];
};

export type Order = {
  id: string | undefined;
  storeId: string;
  order_date: Date;
  order_status: string;
  order_total: number;
  order_items: OrderItem[];
};

export type OrderItem = {
  id: string | undefined;
  storeId: string;
  orderId: string;
  amount: number;
  price: number;
  title: string;
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
  for (const size of jsonData.sizes) {
    await prisma.size.create({
      data: {
        storeId: storeID,
        title: size.title,
      },
    });
  }
  for (const color of jsonData.colors) {
    await prisma.color.create({
      data: {
        storeId: storeID,
        title: color.title,
        hex: color.hex,
      },
    });
  }

  for (const customer of jsonData.customers) {
    await prisma.customer.create({
      data: {
        storeId: storeID,
        firstName: customer.firstName,
        lastName: customer.lastName,
        street: customer.street,
        zipCode: customer.zipCode,
        city: customer.city,
        e_mail: customer.e_mail,
        phone: customer.phone,
        Order: {
          create: customer.order.map((order: Order) => ({
            storeId: storeID,
            order_date: order.order_date,
            order_number: Math.random() * 1000000,
            order_status: order.order_status,
            order_total: order.order_total,
            order_items: {
              create: order.order_items.map((orderItem) => ({
                amount: orderItem.amount,
                price: orderItem.price,
                title: orderItem.title,
              })),
            },
          })),
        },
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
