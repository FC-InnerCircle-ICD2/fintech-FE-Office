import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '@lib/api/apiClient';
import { API_ENDPOINTS } from '@constants/apiEndpoints';
import type { KeyReq, KeyRes } from '@type/key';

export const useKeys = () => {
  return useMutation({
    mutationFn: (accessToken: string) => {
      return apiClient.post<KeyReq, KeyRes>(
        API_ENDPOINTS.MANAGEMENT.KEYS,
        {},
        {
          Authorization: `Bearer ${accessToken}`,
        },
      );
    },
  });
};

export const useKeysId = (accessToken: string) => {
  return useQuery({
    queryKey: ['get-key'],
    queryFn: () =>
      apiClient.get<KeyRes>(API_ENDPOINTS.MANAGEMENT.ID, {
        Authorization: `Bearer ${accessToken}`,
      }),
  });
};
