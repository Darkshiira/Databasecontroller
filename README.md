This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Make sure the JSON-file is named data.json and matches the database entries.
Make sure your .env have the right DATABASE_URL. 

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

