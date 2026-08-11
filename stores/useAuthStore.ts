import { create } from 'zustand';
import { AuthResponse } from '@/types/api';

interface AuthState {
  user: string | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (data: AuthResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: typeof window !== 'undefined' ? localStorage.getItem('username') : null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('token') : false,

  setAuth: (data: AuthResponse) => {
    localStorage.setItem('token', data.authenticationToken);
    localStorage.setItem('username', data.username);
    set({
      token: data.authenticationToken,
      user: data.username,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },
}));