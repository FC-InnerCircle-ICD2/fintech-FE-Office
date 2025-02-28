import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { apiClient } from '@lib/api/apiClient';
import { API_ENDPOINTS } from '@constants/apiEndpoints';
import type { PaymentResponse } from '@type/transaction';

interface PaymentFilters {
  paymentKey?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}

export const usePayments = (
  accessToken: string,
  page: number = 0,
  filters: PaymentFilters = {},
) => {
  return useQuery<PaymentResponse>({
    queryKey: ['get-payments', page, filters],
    queryFn: () => {
      const params = new URLSearchParams({
        page: String(page),
        limit: '10',
        ...(filters.paymentKey && { paymentKey: filters.paymentKey }),
        ...(filters.startDate && { startDate: filters.startDate }),
        ...(filters.endDate && { endDate: filters.endDate }),
        // ...(filters.status && { status: filters.status }),
      });

      return apiClient.get<PaymentResponse>(
        `${API_ENDPOINTS.PAYMENTS.PAYMENTS}?${params.toString()}`,
        {
          Authorization: `Bearer ${accessToken}`,
        },
      );
    },
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
