import type { UserDTO } from "~/dtos/user.dto";

export interface AuthRepository {
  login(email: string, password: string): Promise<UserDTO>;
  register(userData: Partial<UserDTO>): Promise<UserDTO>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<UserDTO | null>;
  hasToken(): boolean;
}
