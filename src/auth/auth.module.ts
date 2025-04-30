// // src/auth/auth.module.ts
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { JwtModule } from '@nestjs/jwt';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { JwtStrategy } from './jwt.strategy';
// import { JwtAuthGuard } from './jwt-auth.guard';
// import { User } from '../users/entities/user.entity/user.entity'; // Adjust path if needed

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([User]), // Register User entity for repository injection
//     JwtModule.register({
//       secret: process.env.JWT_SECRET || 'your_secret_key',
//       signOptions: { expiresIn: '1h' },
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, JwtStrategy, JwtAuthGuard],
//   exports: [JwtAuthGuard, AuthService],
// })
// export class AuthModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from '../users/entities/user.entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule, // Import ConfigModule to provide ConfigService
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'your_secret_key',
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard, AuthService],
})
export class AuthModule {}