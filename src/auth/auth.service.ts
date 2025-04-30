// src/auth/auth.service.ts
// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UsersService } from '../users/users.service';
// import { RegisterDto } from './dto/register.dto';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private usersService: UsersService,
//     private jwtService: JwtService,
//   ) {}

//   async validateUser(emailOrPhone: string, pass: string): Promise<any> {
//     const user = await this.usersService.findOneByEmailOrPhone(emailOrPhone);
//     if (user && await bcrypt.compare(pass, user.password)) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }

//   async login(user: any) {
//     const payload = { email: user.email, sub: user.id, role: user.role };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }

//   async register(registerDto: RegisterDto) {
//     const hashedPassword = await bcrypt.hash(registerDto.password, 10);
//     return this.usersService.create({
//       ...registerDto,
//       password: hashedPassword,
//     });
//   }
// }


// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { JwtService } from '@nestjs/jwt';
// import { User } from '../users/entities/user.entity/user.entity'; // Verify this path
// import * as bcrypt from 'bcrypt';
// import { LoginDto } from './dto/login.dto';
// import { RegisterDto } from './dto/register.dto';

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectRepository(User) private userRepository: Repository<User>,
//     private jwtService: JwtService,
//   ) {}

//   async validateUser(emailOrPhone: string, password: string): Promise<any> {
//     const user = await this.userRepository.findOne({
//       where: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
//     });
//     if (user && await bcrypt.compare(password, user.password)) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }

//   async login(loginDto: LoginDto) {
//     const user = await this.validateUser(loginDto.emailOrPhone, loginDto.password);
//     if (!user) {
//       throw new Error('Invalid credentials'); // Replace with UnauthorizedException
//     }
//     const payload = { email: user.email, sub: user.id, role: user.role };
//     return {
//       access_token: this.jwtService.sign(payload),
//       user: {
//         id: user.id,
//         fullName: user.fullName,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         role: user.role,
//         dateOfBirth: user.dateOfBirth.toISOString(), // Convert Date to string
//         gender: user.gender,
//         profilePhoto: user.profilePhoto,
//       },
//     };
//   }

//   async register(registerDto: RegisterDto) {
//     const hashedPassword = await bcrypt.hash(registerDto.password, 10);
//     const user = this.userRepository.create({
//       fullName: registerDto.fullName,
//       email: registerDto.email,
//       phoneNumber: registerDto.phoneNumber,
//       password: hashedPassword,
//       dateOfBirth: new Date(registerDto.dateOfBirth), // Parse string to Date
//       gender: registerDto.gender,
//       profilePhoto: registerDto.profilePhoto || 'https://via.placeholder.com/150',
//       role: registerDto.role,
//     });
//     const savedUser = await this.userRepository.save(user);
//     const { password, ...result } = savedUser;
//     return this.login({
//       emailOrPhone: result.email || result.phoneNumber,
//       password: registerDto.password,
//     });
//   }
// }

// //auth.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { JwtService } from '@nestjs/jwt';
// import { User } from '../users/entities/user.entity/user.entity'; // Adjust path if needed
// import * as bcrypt from 'bcrypt';
// import { LoginDto } from './dto/login.dto';
// import { RegisterDto } from './dto/register.dto';

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectRepository(User) private userRepository: Repository<User>,
//     private jwtService: JwtService,
//   ) {}

//   async validateUser(emailOrPhone: string, password: string): Promise<any> {
//     const user = await this.userRepository.findOne({
//       where: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
//     });
//     if (user && await bcrypt.compare(password, user.password)) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }

//   async login(loginDto: LoginDto) {
//     const user = await this.validateUser(loginDto.emailOrPhone, loginDto.password);
//     if (!user) {
//       throw new Error('Invalid credentials'); // Replace with UnauthorizedException
//     }
//     const payload = { email: user.email, sub: user.id, role: user.role };
//     return {
//       access_token: this.jwtService.sign(payload),
//       user: {
//         id: user.id,
//         fullName: user.fullName,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         role: user.role,
//         dateOfBirth: user.dateOfBirth instanceof Date
//           ? user.dateOfBirth.toISOString()
//           : user.dateOfBirth, // Handle string case
//         gender: user.gender,
//         profilePhoto: user.profilePhoto,
//       },
//     };
//   }

//   async register(registerDto: RegisterDto) {
//     const hashedPassword = await bcrypt.hash(registerDto.password, 10);
//     const user = this.userRepository.create({
//       fullName: registerDto.fullName,
//       email: registerDto.email,
//       phoneNumber: registerDto.phoneNumber,
//       password: hashedPassword,
//       dateOfBirth: new Date(registerDto.dateOfBirth), // Convert string to Date
//       gender: registerDto.gender,
//       profilePhoto: registerDto.profilePhoto || 'https://via.placeholder.com/150',
//       role: registerDto.role,
//     });
//     const savedUser = await this.userRepository.save(user);
//     const { password, ...result } = savedUser;
//     return this.login({
//       emailOrPhone: result.email || result.phoneNumber,
//       password: registerDto.password,
//     });
//   }
// }



// src/auth/auth.service.ts


import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(emailOrPhone: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
    });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.emailOrPhone, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    const payload = { id: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        dateOfBirth: user.dateOfBirth instanceof Date
          ? user.dateOfBirth.toISOString().split('T')[0]
          : user.dateOfBirth,
        gender: user.gender,
        profilePhoto: user.profilePhoto,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    // Check if email or phoneNumber already exists
    const existingUser = await this.userRepository.findOne({
      where: [{ email: registerDto.email }, { phoneNumber: registerDto.phoneNumber }],
    });
    if (existingUser) {
      throw new UnauthorizedException('Email ou numéro de téléphone déjà utilisé');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = this.userRepository.create({
      fullName: registerDto.fullName,
      email: registerDto.email,
      phoneNumber: registerDto.phoneNumber,
      password: hashedPassword,
      dateOfBirth: registerDto.dateOfBirth ? new Date(registerDto.dateOfBirth) : null,
      gender: registerDto.gender,
      profilePhoto: registerDto.profilePhoto || 'https://via.placeholder.com/150',
      role: registerDto.role || 'user',
    });
    const savedUser = await this.userRepository.save(user);
    const { password, ...result } = savedUser;
    return this.login({
      emailOrPhone: result.email || result.phoneNumber,
      password: registerDto.password,
    });
  }
}