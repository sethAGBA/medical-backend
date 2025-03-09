// src/users/users.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      email: 'user@example.com',
      password: '$2b$10$...', // Mot de passe haché
    },
  ];

  async findOneByEmail(email: string): Promise<any> {
    return this.users.find((user) => user.email === email);
  }
}