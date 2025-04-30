// // src/auth/dto/login.dto.ts
// export class LoginDto {
//     email: string;
//     password: string;
    
//   }
  
//   // src/auth/dto/register.dto.ts
//   export class RegisterDto {
//     name: string;
//     email: string;
//     password: string;
//     role: 'admin' | 'user' | 'professional';
//   }

import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  emailOrPhone: string; // Changed from 'email' to support both email and phone

  @IsString()
  @IsNotEmpty()
  password: string;
}