import { prisma } from '../database/prisma';
import { type Product } from '../types/index';

export const productRepository = {
  async findAll(): Promise<Product[]> {
    return prisma.product.findMany();
  },

  async findById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
    });
  },

  async updateStock(id: string, newStock: number): Promise<Product> {
    return prisma.product.update({
      where: { id },
      data: { stock: newStock },
    });
  },
};
