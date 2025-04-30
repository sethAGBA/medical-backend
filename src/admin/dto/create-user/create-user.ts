// src/admin/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(['admin', 'user', 'professional'])
  role: 'admin' | 'user' | 'professional';
}