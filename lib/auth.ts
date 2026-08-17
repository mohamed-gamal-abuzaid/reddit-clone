import { apiClient } from './api';
import { LoginRequest, RegisterRequest, AuthResponse, RegisterResponse, VerifyEmailRequest } from '@/types/api';

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>('/auth/register', data);
    return response.data;
  },

  // 🎯 POST /api/auth/verify-email
  async verifyEmail(data: VerifyEmailRequest): Promise<void> {
    await apiClient.post('/auth/verify-email', data);
  },

  // 🎯 POST /api/auth/resend-verification?email=...
  async resendVerification(email: string): Promise<void> {
    await apiClient.post('/auth/resend-verification', null, {
      params: { email },
    });
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },
};