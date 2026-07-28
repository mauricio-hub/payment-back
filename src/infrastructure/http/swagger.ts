import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Payment Backend API',
      version: '1.0.0',
      description: 'API for processing credit card payments',
    },
    servers: [
      {
        url: '/api',
        description: 'API base path',
      },
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'cms2qx61x00002ft2wary4xb5' },
            name: { type: 'string', example: 'Tenis Samba OG' },
            description: { type: 'string', example: 'Celebrate a legacy with the Samba OG sneakers.' },
            price: { type: 'number', example: 499 },
            image: { type: 'string', example: '/images/1.avif' },
            stock: { type: 'integer', example: 5 },
          },
        },
        PaymentRequest: {
          type: 'object',
          required: ['name', 'cardNumber', 'expiryDate', 'cvv', 'address', 'city', 'phone', 'productId'],
          properties: {
            name: { type: 'string', example: 'John Doe' },
            cardNumber: { type: 'string', example: '4111111111111111' },
            expiryDate: { type: 'string', example: '12/28' },
            cvv: { type: 'string', example: '123' },
            address: { type: 'string', example: '123 Main St' },
            city: { type: 'string', example: 'Bogota' },
            phone: { type: 'string', example: '3001234567' },
            productId: { type: 'string', example: 'cms2qx61x00002ft2wary4xb5' },
          },
        },
        PaymentSuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            transactionId: { type: 'string', example: 'txn-123' },
            message: { type: 'string', example: 'Payment processed successfully' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            code: { type: 'string', example: 'CARD_DECLINED' },
            message: { type: 'string', example: 'Your card was declined. Please check your card details.' },
          },
        },
      },
    },
  },
  apis: ['./src/infrastructure/http/*.ts', './dist/infrastructure/http/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
