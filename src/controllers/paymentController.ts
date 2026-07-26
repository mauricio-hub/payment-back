import { Request, Response, NextFunction } from 'express';
import { paymentRequestSchema } from '../schemas/index';
import { processPayment } from '../use-cases/processPayment';

export async function handlePayment(req: Request, res: Response, next: NextFunction) {
  try {
    const data = paymentRequestSchema.parse(req.body);
    const result = await processPayment(data);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
