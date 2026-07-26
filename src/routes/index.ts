import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { listProducts } from '../controllers/productController';
import { handlePayment } from '../controllers/paymentController';

const router = Router();
const prisma = new PrismaClient();

router.get('/products', listProducts);
router.post('/payment', handlePayment);

router.post('/seed', async (_req, res) => {
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
  res.json({ message: 'Seeded' });
});

export default router;
