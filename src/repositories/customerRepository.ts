import { prisma } from '../database/prisma';
import { type Customer } from '../types/index';

export const customerRepository = {
  async create(data: {
    name: string;
    phone: string;
    address: string;
    city: string;
    email?: string;
  }): Promise<Customer> {
    return prisma.customer.create({
      data,
    }) as Promise<Customer>;
  },

  async findById(id: string): Promise<Customer | null> {
    return prisma.customer.findUnique({
      where: { id },
    }) as Promise<Customer | null>;
  },
};
