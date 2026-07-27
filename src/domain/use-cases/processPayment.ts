import { customerRepository } from '../../infrastructure/repositories/customerRepository';
import { transactionRepository } from '../../infrastructure/repositories/transactionRepository';
import { deliveryRepository } from '../../infrastructure/repositories/deliveryRepository';
import { productRepository } from '../../infrastructure/repositories/productRepository';
import { getPaymentProvider } from '../../infrastructure/services/paymentProvider';
import { createError, ErrorCodes } from '../errors/AppError';
import { type PaymentRequest } from '../entities/index';

export async function processPayment(data: PaymentRequest) {
  const product = await productRepository.findById(data.productId);

  if (!product) {
    throw createError(ErrorCodes.PRODUCT_NOT_FOUND);
  }

  if (product.stock <= 0) {
    throw createError(ErrorCodes.OUT_OF_STOCK);
  }

  const customer = await customerRepository.create({
    name: data.name,
    phone: data.phone,
    address: data.address,
    city: data.city,
  });

  const amount = product.price + 5 + 10; // producto + cargo base + envío

  const transaction = await transactionRepository.create({
    amount,
    customerId: customer.id,
    productId: product.id,
    quantity: 1,
  });

  await transactionRepository.updateStatus(transaction.id, 'PROCESSING');

  const paymentProvider = getPaymentProvider();
  const paymentResult = await paymentProvider.processPayment(amount, data.cardNumber);

  if (paymentResult.success) {
    await transactionRepository.updateStatus(transaction.id, 'COMPLETED');
    await productRepository.updateStock(product.id, product.stock - 1);

    await deliveryRepository.create({
      transactionId: transaction.id,
      address: data.address,
      city: data.city,
    });

    return {
      success: true,
      transactionId: transaction.id,
      message: 'Payment processed successfully',
    };
  } else {
    await transactionRepository.updateStatus(transaction.id, 'FAILED');

    // Mapear razón de fallo a código de error
    const failureCode = paymentResult.reason || 'PAYMENT_FAILED';
    const errorMap: Record<string, typeof ErrorCodes[keyof typeof ErrorCodes]> = {
      CARD_DECLINED: ErrorCodes.CARD_DECLINED,
      INSUFFICIENT_FUNDS: ErrorCodes.INSUFFICIENT_FUNDS,
      NETWORK_ERROR: ErrorCodes.NETWORK_ERROR,
    };

    const error = errorMap[failureCode] || ErrorCodes.PAYMENT_FAILED;
    throw createError(error);
  }
}
