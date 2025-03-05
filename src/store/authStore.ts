import { create } from 'zustand';
import type { AuthState } from '@type/zustand';
import type { NavigateFunction } from 'react-router-dom';

const getStoredAuth = () => {
  const storedAuth = sessionStorage.getItem('auth');
  return storedAuth ? JSON.parse(storedAuth) : null;
};

export const useAuthStore = create<AuthState>((set) => ({
  auth: null,
  setAuth: (auth) => set({ auth }),
  navigate: null as NavigateFunction | null,
  logout: () => {
    sessionStorage.removeItem('auth');
    set({ auth: null });

    const state = useAuthStore.getState();
    if (state.navigate) state.navigate('/login');
  },
}));

const initializeAuth = () => {
  const auth = getStoredAuth();
  if (auth) {
    useAuthStore.getState().setAuth(auth);
  }
};

initializeAuth();
