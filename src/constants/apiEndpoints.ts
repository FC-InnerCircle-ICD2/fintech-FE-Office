const BASE_URL = '/proxy/api/backoffice/v1';

const getTransactionEndpoint = (paymentKey: string) =>
  `${BASE_URL}/payments/${paymentKey}/transactions`;

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/sign-in`,
  SIGNUP: `${BASE_URL}/sign-up`,
  PAYMENTS: {
    PAYMENTS: `${BASE_URL}/payments`,
    TRANSACTIONS: getTransactionEndpoint,
  },
  MANAGEMENT: {
    KEYS: `${BASE_URL}/keys`,
    ID: `${BASE_URL}/my-key`,
  },
} as const;
