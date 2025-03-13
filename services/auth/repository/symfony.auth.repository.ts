import type { UserDTO } from "~/dtos/user.dto";
import type { AuthRepository } from "./auth.repository";

interface LoginResponse {
  token: string;
  user: UserDTO;
}

interface RegisterResponse {
  token: string;
  user: UserDTO;
}

export class SymfonyAuthRepository implements AuthRepository {
  private readonly API_URL: string;
  private readonly TOKEN_KEY: string;

  constructor(apiUrl: string) {
    this.API_URL = apiUrl;
    this.TOKEN_KEY = "auth.token";
  }

  async login(email: string, password: string): Promise<UserDTO> {
    const response = await $fetch<LoginResponse>(`${this.API_URL}/login`, {
      method: "POST",
      body: { email, password },
    });

    this.setToken(response.token);
    return response.user;
  }

  async register(userData: Partial<UserDTO>): Promise<UserDTO> {
    const response = await $fetch<RegisterResponse>(
      `${this.API_URL}/register`,
      {
        method: "POST",
        body: userData,
      }
    );

    this.setToken(response.token);
    return response.user;
  }

  async logout(): Promise<void> {
    // TODO: Implement logout endpoint
    // await $fetch(`${this.API_URL}/logout`, {
    //   method: "POST",
    //   headers: this.getAuthHeaders(),
    // });

    this.clearToken();
  }

  async getCurrentUser(): Promise<UserDTO | null> {
    if (!this.hasToken()) {
      return null;
    }

    try {
      const user = await $fetch<UserDTO>(`${this.API_URL}/user/me`, {
        headers: this.getAuthHeaders(),
      });

      return user;
    } catch (error) {
      this.clearToken();
      return null;
    }
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  private getToken(): string | null {
    if (import.meta.client) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  private setToken(token: string): void {
    if (import.meta.client) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  private clearToken(): void {
    if (import.meta.client) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  private getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}
