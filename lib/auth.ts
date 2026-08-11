import { apiClient } from './api';
import { LoginRequest, RegisterRequest, AuthResponse } from '@/types/api';

export const authService = {
  // POST /api/auth/login
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  // POST /api/auth/register
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  // POST /api/auth/logout
  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },
};