# Payment Backend

Backend API for the payment processing application.

## Architecture

```
src/
├── controllers/   # HTTP handlers - validate input, call use cases
├── use-cases/     # Business logic
├── repositories/  # Database access via Prisma
├── services/      # External integrations (payments, etc)
├── routes/        # API routes
├── types/         # TypeScript interfaces
├── schemas/       # Zod validation schemas
└── database/      # Database configuration
```

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL

### Installation

```bash
npm install
```

### Database Setup

1. Update `.env` with your PostgreSQL connection string
2. Run migrations:

```bash
npx prisma migrate dev --name init
```

This will create all tables and seed sample data.

### Development

```bash
npm run dev
```

Server runs on `http://localhost:3000`

### Build

```bash
npm run build
npm start
```

## API Endpoints

- `GET /api/products` - List all products
- `POST /api/payment` - Process payment

## Payment Flow

1. Frontend sends payment request with product ID and customer details
2. Backend creates customer record
3. Backend creates transaction (PENDING status)
4. Backend calls payment provider
5. If successful:
   - Update transaction to COMPLETED
   - Decrease product stock
   - Create delivery record
6. Return result to frontend
