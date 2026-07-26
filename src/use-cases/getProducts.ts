import { productRepository } from '../repositories/productRepository';
import { type Product } from '../types/index';

export async function getProducts(): Promise<Product[]> {
  return productRepository.findAll();
}
