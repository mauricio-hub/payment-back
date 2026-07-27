import { prisma } from '../database/prisma';
import { type Delivery } from '../../domain/entities/index';

export const deliveryRepository = {
  async create(data: {
    transactionId: string;
    address: string;
    city: string;
  }): Promise<Delivery> {
    return prisma.delivery.create({
      data: {
        transactionId: data.transactionId,
        address: data.address,
        city: data.city,
        status: 'PENDING',
      },
    }) as Promise<Delivery>;
  },

  async findByTransactionId(transactionId: string): Promise<Delivery | null> {
    return prisma.delivery.findUnique({
      where: { transactionId },
    }) as Promise<Delivery | null>;
  },

  async updateStatus(id: string, status: string): Promise<Delivery> {
    return prisma.delivery.update({
      where: { id },
      data: { status },
    }) as Promise<Delivery>;
  },
};
