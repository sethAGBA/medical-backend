// src/users/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty, IsString, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsIn(['admin', 'user', 'professional'])
  role: 'admin' | 'user' | 'professional';
}