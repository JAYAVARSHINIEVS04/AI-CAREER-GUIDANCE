import axiosInstance from "../api/axiosInstance";
import type { AuthResponse, LoginPayload, RegisterPayload } from "../types/auth.types";

export const authService = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<AuthResponse>("/auth/register", payload);
    return data;
  },

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<AuthResponse>("/auth/login", payload);
    return data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post("/auth/logout");
  },

  getProfile: async () => {
    const { data } = await axiosInstance.get("/auth/profile");
    return data;
  },
};
