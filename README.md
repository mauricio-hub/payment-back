# Payment Backend API

A Node.js/Express backend for processing credit card payments with Domain-Driven Design architecture (Controllers → Use Cases → Repositories).

## Architecture

The codebase is split into `domain/` (business logic, framework-independent) and `infrastructure/` (technical implementations):

```
src/
├── domain/
│   ├── entities/      # TypeScript types and Zod validation schemas
│   ├── errors/         # AppError class and centralized error codes
│   └── use-cases/      # Business logic - payment processing, product queries
│
├── infrastructure/
│   ├── database/        # Prisma client configuration
│   ├── http/
│   │   ├── controllers/ # HTTP handlers - validate input, call use cases
│   │   ├── middlewares/ # Express error handler (catches AppError/ZodError)
│   │   └── index.ts     # API route definitions
│   ├── repositories/    # Data access layer - Prisma abstractions
│   └── services/        # External integrations - payment provider abstraction
│
└── index.ts            # App entry point
```

## Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Express.js 5
- **Database**: PostgreSQL (development and production)
- **API Docs**: Swagger (OpenAPI 3.0)
- **ORM**: Prisma
- **Validation**: Zod
- **Language**: TypeScript

## Quick Start

### Prerequisites
- Node.js 20+
- npm 10+
- PostgreSQL (local via Docker, or a hosted instance)

### Installation

```bash
npm install
npm run build
```

### Development

```bash
# Create .env from .env.example
cp .env.example .env

# Update DATABASE_URL in .env
npm run dev
```

Server runs on `http://localhost:3000`

### Production

```bash
npm run build
npm start
```

## API Endpoints

Swagger API documentation was added and is available at `/docs` (e.g. `http://localhost:3000/docs`), covering both endpoints with request/response schemas and all error codes.

### Products
- `GET /api/products` - List all available products
  - Response: Array of products with id, name, price, stock

### Payment
- `POST /api/payment` - Process a payment transaction
  - Body: `{ name, cardNumber, expiryDate, cvv, address, city, phone, productId }`
  - Response: `{ success, transactionId, message }`

## Testing

```bash
npm test              # Run all tests
npm run test:coverage # Generate coverage report
```

## Database

Uses PostgreSQL in both development and production. Configure via `DATABASE_URL` environment variable.

For local development, run PostgreSQL via Docker:
```bash
docker run --name postgres-dev -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=payment_dev -p 5555:5432 -d postgres:latest
```

### Schema
- **Products**: Available items for purchase
- **Customers**: Customer information from transactions
- **Transactions**: Payment attempts with status tracking (PENDING, COMPLETED, FAILED)
- **Deliveries**: Delivery records for completed transactions

## Payment Flow

1. **Request**: Frontend sends payment with product ID and card details
2. **Validation**: Check product exists and has stock
3. **Customer**: Create or fetch customer record
4. **Transaction**: Create PENDING transaction
5. **Payment**: Call payment provider (sandbox simulator)
6. **Result**:
   - ✅ Success: Update transaction to COMPLETED, decrease stock, create delivery
   - ❌ Failed: Update transaction to FAILED, return error code

## Error Handling

All errors return a consistent format:
```json
{
  "success": false,
  "code": "CARD_DECLINED",
  "message": "User-friendly error message"
}
```

Error codes:
- `PRODUCT_NOT_FOUND`, `OUT_OF_STOCK` - Product issues
- `CARD_DECLINED`, `INSUFFICIENT_FUNDS`, `NETWORK_ERROR` - Payment issues
- `VALIDATION_ERROR` - Request validation failures

## Environment Variables

See `.env.example` for all available configuration options.
