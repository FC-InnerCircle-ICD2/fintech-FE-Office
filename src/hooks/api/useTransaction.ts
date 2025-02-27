import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { apiClient } from '@lib/api/apiClient';
import { API_ENDPOINTS } from '@constants/apiEndpoints';
import type { PaymentResponse } from '@type/transaction';

export const usePayments = (accessToken: string, page: number = 0) => {
  return useQuery<PaymentResponse>({
    queryKey: ['get-payments', page],
    queryFn: () =>
      apiClient.get<PaymentResponse>(
        `${API_ENDPOINTS.PAYMENTS.PAYMENTS}?page=${page}`,
        {
          Authorization: `Bearer ${accessToken}`,
        },
      ),
    placeholderData: keepPreviousData,
  });
};

export const useTransactions = (accessToken: string, paymentKey: string) => {
  return useQuery<PaymentResponse>({
    queryKey: ['get-transactions', paymentKey],
    queryFn: () => {
      return apiClient.get(API_ENDPOINTS.PAYMENTS.TRANSACTIONS(paymentKey), {
        Authorization: `Bearer ${accessToken}`,
      });
    },
  });
};
