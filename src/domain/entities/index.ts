import { z } from 'zod';
export type { Product, Customer, Transaction, Delivery } from './types';

export const paymentRequestSchema = z.object({
  name: z.string().min(2).max(100),
  cardNumber: z.string().regex(/^\d{16}$/),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/),
  cvv: z.string().regex(/^\d{3,4}$/),
  address: z.string().min(5).max(200),
  city: z.string().min(2).max(100),
  phone: z.string().regex(/^\d{10,}$/),
  productId: z.string(),
});

export type PaymentRequest = z.infer<typeof paymentRequestSchema>;
