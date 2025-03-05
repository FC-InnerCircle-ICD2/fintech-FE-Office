import type { Auth } from '@type/auth';
import type { NavigateFunction } from 'react-router-dom';

export interface AuthState {
  auth: Auth | null;
  setAuth: (auth: Auth) => void;
  logout: () => void;
  navigate: NavigateFunction | null;
}
