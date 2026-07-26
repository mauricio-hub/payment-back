export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const ErrorCodes = {
  // Validación
  INVALID_CARD: { code: 'INVALID_CARD', statusCode: 400, message: 'Invalid card number' },
  INVALID_EXPIRY: { code: 'INVALID_EXPIRY', statusCode: 400, message: 'Card has expired' },
  INVALID_CVV: { code: 'INVALID_CVV', statusCode: 400, message: 'Invalid CVV' },
  INVALID_NAME: { code: 'INVALID_NAME', statusCode: 400, message: 'Invalid cardholder name' },
  INVALID_ADDRESS: { code: 'INVALID_ADDRESS', statusCode: 400, message: 'Invalid address' },
  INVALID_CITY: { code: 'INVALID_CITY', statusCode: 400, message: 'Invalid city' },
  INVALID_PHONE: { code: 'INVALID_PHONE', statusCode: 400, message: 'Invalid phone number' },

  // Negocio
  PRODUCT_NOT_FOUND: { code: 'PRODUCT_NOT_FOUND', statusCode: 404, message: 'Product not found' },
  OUT_OF_STOCK: { code: 'OUT_OF_STOCK', statusCode: 400, message: 'Product out of stock' },

  // Pagos
  PAYMENT_FAILED: { code: 'PAYMENT_FAILED', statusCode: 402, message: 'Payment declined' },
  CARD_DECLINED: { code: 'CARD_DECLINED', statusCode: 402, message: 'Your card was declined. Please check your card details.' },
  INSUFFICIENT_FUNDS: { code: 'INSUFFICIENT_FUNDS', statusCode: 402, message: 'Insufficient funds. Please check your account balance.' },
  NETWORK_ERROR: { code: 'NETWORK_ERROR', statusCode: 503, message: 'Payment gateway error. Please try again later.' },
  PAYMENT_TIMEOUT: { code: 'PAYMENT_TIMEOUT', statusCode: 408, message: 'Payment timeout' },
  INVALID_PAYMENT_DATA: { code: 'INVALID_PAYMENT_DATA', statusCode: 400, message: 'Invalid payment data' },

  // Servidor
  INTERNAL_ERROR: { code: 'INTERNAL_ERROR', statusCode: 500, message: 'Internal server error' },
};

export function createError(errorType: typeof ErrorCodes[keyof typeof ErrorCodes]) {
  return new AppError(errorType.statusCode, errorType.message, errorType.code);
}
