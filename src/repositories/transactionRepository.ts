import { prisma } from '../database/prisma';
import { type Transaction } from '../types/index';

export const transactionRepository = {
  async create(data: {
    amount: number;
    customerId: string;
    productId: string;
    quantity: number;
  }): Promise<Transaction> {
    return prisma.transaction.create({
      data: {
        amount: data.amount,
        customerId: data.customerId,
        productId: data.productId,
        quantity: data.quantity,
        status: 'PENDING',
      },
    }) as Promise<Transaction>;
  },

  async findById(id: string): Promise<Transaction | null> {
    return prisma.transaction.findUnique({
      where: { id },
    }) as Promise<Transaction | null>;
  },

  async updateStatus(id: string, status: string): Promise<Transaction> {
    return prisma.transaction.update({
      where: { id },
      data: { status },
    }) as Promise<Transaction>;
  },
};
