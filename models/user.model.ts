import type { UserDTO } from "~/dtos/user.dto";

export class User {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;

  constructor(dto: UserDTO) {
    this.id = dto.id;
    this.email = dto.email;
    this.name = dto.name;
    this.password = dto.password;
    this.createdAt = new Date(dto.created_at);
  }
}
