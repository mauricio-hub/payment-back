import { Request, Response } from 'express';
import { getProducts } from '../../../domain/use-cases/getProducts';

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
