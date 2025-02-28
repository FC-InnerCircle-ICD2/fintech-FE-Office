import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@lib/api/apiClient';
import { API_ENDPOINTS } from '@constants/apiEndpoints';
import type { LoginReq, LoginRes, SignupReq } from '@type/auth';
import { createToastSuccess, createToastError } from '@lib/toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@store/authStore';
import { ROUTES } from '@constants/routes';

export const useLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const location = useLocation();

  return useMutation({
    mutationFn: (data: LoginReq) =>
      apiClient.post<LoginReq, LoginRes>(API_ENDPOINTS.LOGIN, data),
    onSuccess: (response: LoginRes) => {
      sessionStorage.setItem('auth', JSON.stringify(response.data));
      setAuth(response.data);
      createToastSuccess('', '로그인되었습니다');

      const from = location.state?.from?.pathname || '/';
      navigate(from);
    },
    onError: createToastError('로그인 실패'),
  });
};

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: SignupReq) => apiClient.post(API_ENDPOINTS.SIGNUP, data),
    onSuccess: () => {
      createToastSuccess('회원가입 성공', '로그인 페이지로 이동합니다');
      navigate(ROUTES.LOGIN);
    },
    onError: createToastError('회원가입 실패'),
  });
};
