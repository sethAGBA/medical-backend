// filepath: /Users/cavris/Desktop/Projets/Medical+/backend/src/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    this.logger.log('Register endpoint called');
    const { email, password, username, profileUrl } = registerDto;

    try {
      const user = await this.authService.register(email, password, username, profileUrl);
      this.logger.log(`User registered successfully: ${email}`);
      return { success: true, access_token: user.access_token, user: user.user };
    } catch (error) {
      this.logger.error(`Error during registration: ${error.message}`, error.stack);
      throw new HttpException(error.message || 'Erreur lors de l\'inscription', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    this.logger.log('Login endpoint called');
    const { email, password } = loginDto;

    try {
      const user = await this.authService.validateUser(email, password);
      if (!user) {
        this.logger.warn(`Invalid login attempt for email: ${email}`);
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const { access_token } = await this.authService.login(user);
      this.logger.log(`User logged in successfully: ${email}`);
      return { success: true, access_token, user };
    } catch (error) {
      this.logger.error(`Error during login: ${email} - ${error.message}`, error.stack);
      throw new HttpException(error.message || 'Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}