import { productRepository } from '../../infrastructure/repositories/productRepository';
import { type Product } from '../entities/index';

export async function getProducts(): Promise<Product[]> {
  return productRepository.findAll();
}
