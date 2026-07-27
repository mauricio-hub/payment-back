import { Router } from 'express';
import { listProducts } from './controllers/productController';
import { handlePayment } from './controllers/paymentController';

const router = Router();

router.get('/products', listProducts);
router.post('/payment', handlePayment);

export default router;
