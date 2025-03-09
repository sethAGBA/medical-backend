import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/user.entity';
import { Logger } from '../logger/logger.service';

@Injectable()
export class AdminService {
  constructor(
    private usersService: UsersService,
    private logger: Logger,
  ) {}

  async updateUserRole(id: number, role: UserRole) {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.role = role;
    await this.usersService.updateUserRole(id, role);

    this.logger.log(`Admin updated user role: User ID ${id}, New Role: ${role}`);
    return user;
  }

  async deleteUser(id: number) {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersService.deleteUser(id);
    this.logger.log(`Admin deleted user: User ID ${id}`);
    return { message: 'User deleted successfully' };
  }
}