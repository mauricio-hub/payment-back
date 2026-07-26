# Payment Backend API

A Node.js/Express backend for processing credit card payments with clean architecture patterns (Controllers → Use Cases → Repositories).

## Architecture

The codebase follows a **layered architecture** with separation of concerns:

```
src/
├── controllers/      # HTTP handlers - validate input, orchestrate use cases
├── use-cases/        # Business logic - payment processing, product queries
├── repositories/     # Data access layer - Prisma abstractions
├── services/         # External integrations - payment provider abstraction
├── routes/           # API route definitions
├── types/            # TypeScript interfaces and types
├── schemas/          # Zod validation schemas for request/response
├── errors/           # Centralized error definitions
├── middlewares/      # Express middleware (error handling, CORS)
└── database/         # Database configuration
```

## Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Express.js 5
- **Database**: PostgreSQL (production) / SQLite (development)
- **ORM**: Prisma
- **Validation**: Zod
- **Language**: TypeScript

## Quick Start

### Prerequisites
- Node.js 20+
- npm 10+
- PostgreSQL (for production)

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

### Products
- `GET /api/products` - List all available products
  - Response: Array of products with id, name, price, stock

### Payment
- `POST /api/payment` - Process a payment transaction
  - Body: `{ productId, cardNumber, amount, customerDetails }`
  - Response: `{ success, transactionId, message }`

## Testing

```bash
npm test              # Run all tests
npm run test:coverage # Generate coverage report
```

## Database

### Local Development
Uses SQLite automatically. Database file: `test.db`

### Production
Uses PostgreSQL. Configure via `DATABASE_URL` environment variable.

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
