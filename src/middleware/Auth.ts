// src/api/authAPI.ts
import apiClient from './Base';

export interface User {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  role: string;
  profilePic: string
  bio: string;
}

export interface LoginData {
  user: User;
  token: {
    access_token : string,
    refresh_token : string
  };
}

export interface LoginResponse {
  status: boolean;
  message: string;
  data: LoginData;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const loginAPI = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/api/v1/auth/login', credentials);
  return response.data;
};

export const refreshTokenAPI = async (refresh_token: string): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/api/v1/auth/refresh', {refresh_token} );
  return response.data;
};