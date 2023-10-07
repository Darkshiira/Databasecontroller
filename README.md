This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Make sure the JSON-file is named data.json and matches the database entries.

Run the commandos in terminal to take down the latest database file:

```bash
npm prisma db pull
npm prisma generate
```

## To Clean the database:

Run the command:

```bash
npm run blowout
```

to clean the database.

## To add to the database:

Run the command:

```bash
npm run seed
```

to add into the database.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
