export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
}

export interface Transaction {
  id: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  amount: number;
  customerId: string;
  productId: string;
  quantity: number;
}

export interface Delivery {
  id: string;
  transactionId: string;
  status: 'PENDING' | 'SHIPPED' | 'DELIVERED';
  address: string;
  city: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  message: string;
}
