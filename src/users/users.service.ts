import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRole } from './user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(email: string, password: string, username: string, profileUrl: string, role: UserRole = UserRole.USER): Promise<User> {
    this.logger.log(`Creating user with email: ${email}`);
    try {
      const user = this.usersRepository.create({
        email,
        password,
        username,
        profileUrl,
        role,
      });
      return await this.usersRepository.save(user);
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`, error.stack);
      throw error; // Relancer l'erreur pour que AuthService puisse la gérer
    }
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    this.logger.log(`Finding user by email: ${email}`);
    const user = await this.usersRepository.findOne({ where: { email } });
    this.logger.log(`User found: ${user}`);
    return user ?? undefined;
  }

  async updateUserRole(id: number, role: UserRole): Promise<User> {
    const user = await this.findOneById(id);
    user.role = role;
    return this.usersRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.findOneById(id);
    await this.usersRepository.remove(user);
  }
}