import { User } from "~/models/user.model";
import type { AuthRepository } from "./repository/auth.repository";

export class AuthService {
  private repository: AuthRepository;

  constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const userData = await this.repository.login(email, password);
      return new User(userData);
    } catch (error) {
      throw error;
    }
  }

  async register(userData: Partial<User>): Promise<User> {
    try {
      const registeredUser = await this.repository.register(userData);
      return new User(registeredUser);
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.repository.logout();
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await this.repository.getCurrentUser();
      return userData ? new User(userData) : null;
    } catch (error) {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.repository.hasToken();
  }
}
