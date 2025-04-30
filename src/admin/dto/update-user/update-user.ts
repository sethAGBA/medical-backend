// src/admin/dto/update-user.dto.ts
import { IsOptional, IsString, IsEmail, IsEnum } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEnum(['admin', 'user', 'professional'])
  role?: 'admin' | 'user' | 'professional';
}