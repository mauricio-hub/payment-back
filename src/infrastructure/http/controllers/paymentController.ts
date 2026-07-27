import { Request, Response, NextFunction } from 'express';
import { paymentRequestSchema } from '../../../domain/entities/index';
import { processPayment } from '../../../domain/use-cases/processPayment';

export async function handlePayment(req: Request, res: Response, next: NextFunction) {
  try {
    const data = paymentRequestSchema.parse(req.body);
    const result = await processPayment(data);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
