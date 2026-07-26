import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: 'Tenis Samba OG',
        description: 'Celebrate a legacy with the Samba OG sneakers, a true icon in adidas history.',
        price: 499,
        image: '/images/1.avif',
        stock: 5,
      },
    ],
  });

  console.log('Database seeded successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
