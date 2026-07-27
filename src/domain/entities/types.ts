export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  email?: string;
};

export type Transaction = {
  id: string;
  amount: number;
  customerId: string;
  productId: string;
  quantity: number;
  status: string;
};

export type Delivery = {
  id: string;
  transactionId: string;
  address: string;
  city: string;
  status: string;
};
