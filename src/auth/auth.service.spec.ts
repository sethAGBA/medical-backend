import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    this.logger.log(`Validating user with email: ${email}`);
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      this.logger.warn(`User not found with email: ${email}`);
      return null; // Utilisateur non trouvé
    }

    this.logger.log(`User found: ${user.email}`);
    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      this.logger.warn(`Password does not match for user: ${email}`);
      return null; // Mot de passe incorrect
    }

    this.logger.log(`Password matches for user: ${email}`);
    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: user,
    };
  }

  async register(email: string, password: string, username: string, profileUrl: string): Promise<any> {
    this.logger.log(`Registering user with email: ${email}`);
    try {
      // Hash the password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create the user
      const newUser = await this.usersService.createUser(email, hashedPassword, username, profileUrl);

      this.logger.log(`User registered successfully with email: ${email}`);
      return this.login(newUser);
    } catch (error) {
      this.logger.error(`Error during registration: ${error.message}`, error.stack);
      throw new UnauthorizedException('User registration failed');
    }
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}