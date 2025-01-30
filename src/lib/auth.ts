import { AxiosError } from "axios";
import {
  LoginCredentials,
  RegisterData,
  User,
  AuthResponse,
} from "@/src/types/auth";
import { AUTH_CONFIG } from "@/auth.config";
import { COOKIE_OPTIONS } from "@/src/lib/cookies";
import api, { cookieStore } from "@/services/api";

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(
        AUTH_CONFIG.endpoints.LOGIN,
        credentials
      );

      // Définir les cookies
      cookieStore.set(
        AUTH_CONFIG.storage.ACCESS_TOKEN,
        response.data.access,
        COOKIE_OPTIONS
      );
      cookieStore.set(
        AUTH_CONFIG.storage.REFRESH_TOKEN,
        response.data.refresh,
        COOKIE_OPTIONS
      );
      cookieStore.set(
        AUTH_CONFIG.storage.USER,
        JSON.stringify(response.data.user),
        {
          ...COOKIE_OPTIONS,
          httpOnly: false, // Permet l'accès côté client aux infos utilisateur
        }
      );

      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  },

  async register(data: RegisterData): Promise<void> {
    try {
      await api.post(AUTH_CONFIG.endpoints.REGISTER, data);
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  },

  async verifyEmail(token: string): Promise<void> {
    try {
      await api.post(AUTH_CONFIG.endpoints.VERIFY_EMAIL, { token });
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  },

  async forgotPassword(email: string): Promise<void> {
    try {
      await api.post(AUTH_CONFIG.endpoints.FORGOT_PASSWORD, { email });
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  },

  async resetPassword(token: string, password: string): Promise<void> {
    try {
      await api.post(AUTH_CONFIG.endpoints.RESET_PASSWORD, { token, password });
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  },

  async getProfile(): Promise<User> {
    try {
      const response = await api.get<User>(AUTH_CONFIG.endpoints.PROFILE);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const response = await api.put<User>(AUTH_CONFIG.endpoints.PROFILE, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  },

  logout() {
    cookieStore.delete(AUTH_CONFIG.storage.ACCESS_TOKEN);
    cookieStore.delete(AUTH_CONFIG.storage.REFRESH_TOKEN);
    cookieStore.delete(AUTH_CONFIG.storage.USER);
  },

  async refreshToken(): Promise<string> {
    try {
      const refreshToken = cookieStore.get(
        AUTH_CONFIG.storage.REFRESH_TOKEN
      )?.value;

      if (!refreshToken) {
        throw new Error("Pas de refresh token");
      }

      const response = await api.post(AUTH_CONFIG.endpoints.REFRESH_TOKEN, {
        refresh: refreshToken,
      });

      const { access } = response.data;
      cookieStore.set(AUTH_CONFIG.storage.ACCESS_TOKEN, access, COOKIE_OPTIONS);

      return access;
    } catch (error) {
      this.logout();
      throw error;
    }
  },

  handleError(error: AxiosError): Error {
    if (error.response?.data) {
      return new Error(
        typeof error.response.data === "string"
          ? error.response.data
          : JSON.stringify(error.response.data)
      );
    }
    return new Error("Une erreur est survenue");
  },
};
