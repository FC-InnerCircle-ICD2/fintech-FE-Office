import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@lib/api/apiClient';
import { API_ENDPOINTS } from '@constants/apiEndpoints';
import type { PaymentResponse } from '@type/transaction';

export const usePayments = (accessToken: string) => {
  return useQuery<PaymentResponse>({
    queryKey: ['get-payments'],
    queryFn: () =>
      apiClient.get<PaymentResponse>(API_ENDPOINTS.PAYMENTS.PAYMENTS, {
        Authorization: `Bearer ${accessToken}`,
      }),
  });
};

export const useTransactions = (accessToken: string) => {
  return useQuery<PaymentResponse>({
    queryKey: ['get-transactions'],
    queryFn: () => {
      return apiClient.get(API_ENDPOINTS.PAYMENTS.TRANSACTIONS('payment-key'), {
        Authorization: `Bearer ${accessToken}`,
      });
    },
  });
};
