import { processPayment } from '../processPayment';
import { productRepository } from '../../repositories/productRepository';
import { customerRepository } from '../../repositories/customerRepository';
import { deliveryRepository } from '../../repositories/deliveryRepository';
import { transactionRepository } from '../../repositories/transactionRepository';
import { getPaymentProvider } from '../../services/paymentProvider';

jest.mock('../../repositories/productRepository', () => ({
  productRepository: {
    findById: jest.fn(),
    updateStock: jest.fn(),
  },
}));

jest.mock('../../repositories/customerRepository', () => ({
  customerRepository: {
    create: jest.fn(),
  },
}));

jest.mock('../../repositories/transactionRepository', () => ({
  transactionRepository: {
    create: jest.fn(),
    updateStatus: jest.fn(),
  },
}));

jest.mock('../../repositories/deliveryRepository', () => ({
  deliveryRepository: {
    create: jest.fn(),
  },
}));

jest.mock('../../services/paymentProvider', () => ({
  getPaymentProvider: jest.fn(),
}));


describe('processPayment', () => {
  it('should throw error when product does not exist', async () => {

    (productRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(processPayment({
      name: 'Fiona',
      cardNumber: '4111111111111111',
      expiryDate: '12',
      cvv: '123',
      address: 'Street',
      city: 'calle 1',
      phone: '123',
      productId: 'non-existent',
    })).rejects.toThrow();
  });


  it('should throw error when product has no stock', async () => {
    (productRepository.findById as jest.Mock).mockResolvedValue({
      id: 'prod-1',
      name: 'Test Product',
      price: 0,
      stock: 0,
    });

    try {
      await processPayment({
        name: 'Fiona',
        cardNumber: '4111111111111111',
        expiryDate: '12',
        cvv: '123',
        address: 'call1 1',
        city: 'City',
        phone: '123',
        productId: 'non-existent',
      });
      throw new Error('Should have thrown');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  /* pago exitoso */

  it('should process payment successfully', async () => {
    (productRepository.findById as jest.Mock).mockResolvedValue({
      id: 'prod-1',
      name: 'Test Product',
      price: 100,
      stock: 5,
    });

    (customerRepository.create as jest.Mock).mockResolvedValue({
      id: 'cust-1',
      name: 'test',
    });

    (transactionRepository.create as jest.Mock).mockResolvedValue({
      id: 'txn-1',
      amount: 115,
    });

    (transactionRepository.updateStatus as jest.Mock).mockResolvedValue(undefined);

    (productRepository.updateStock as jest.Mock).mockResolvedValue(undefined);

    (deliveryRepository.create as jest.Mock).mockResolvedValue({
      id: 'del-1',
    });

    const mockPaymentProvider = {
      processPayment: jest.fn().mockResolvedValue({ success: true }),
    };
    (getPaymentProvider as jest.Mock).mockReturnValue(mockPaymentProvider);

    const result = await processPayment({
      name: 'Fiona',
      cardNumber: '4111111111111111',
      expiryDate: '12',
      cvv: '123',
      address: 'Street',
      city: 'calle 1',
      phone: '123',
      productId: 'non-existent',
    });

    expect(result.success).toBe(true);
    expect(result.transactionId).toBe('txn-1');
  });


});