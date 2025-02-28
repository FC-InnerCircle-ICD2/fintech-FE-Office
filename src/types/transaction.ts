export interface Payment {
  paymentKey: string;
  cardNumber: string;
  accountId: string;
  transactions: {
    id: string;
    paymentKey: string;
    amount: number;
    status: string;
    reason: string;
    requestedAt: string;
    completedAt: string;
  }[];
  paymentType: string;
  orderId: string;
  orderName: string;
}

export interface PaymentResponse {
  data: {
    payments: Payment[];
  };
}

export interface FlattenedPayment {
  paymentKey: string;
  completedAt: string;
  orderName: string;
  cardNumber: string;
  amount: number;
  status: string;
}
