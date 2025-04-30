// // src/users/dto/update-user.dto.ts
// import { IsOptional, IsString, IsEmail, IsIn } from 'class-validator';

// export class UpdateUserDto {
//   @IsOptional()
//   @IsString()
//   name?: string;

//   @IsOptional()
//   @IsEmail()
//   email?: string;

//   @IsOptional()
//   @IsString()
//   password?: string;

//   @IsOptional()
//   @IsIn(['admin', 'user', 'professional'])
//   role?: 'admin' | 'user' | 'professional';
// }



// src/users/dto/update-user.dto.ts
import { IsOptional, IsString, IsEmail, Matches, IsEnum, IsDateString, IsIn } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email invalide' })
  email?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Numéro de téléphone invalide' })
  phoneNumber?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Date de naissance invalide (attendu: YYYY-MM-DD)' })
  dateOfBirth?: string;

  @IsOptional()
  @IsEnum(['male', 'female', 'other'], { message: 'Genre invalide' })
  gender?: 'male' | 'female' | 'other';

  @IsOptional()
  @IsString()
  profilePhoto?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  bloodType?: string;

  @IsOptional()
  @IsString()
  allergies?: string;

  @IsOptional()
  @IsString()
  emergencyContact?: string;

  @IsOptional()
  @IsIn(['admin', 'user', 'professional'])
  role?: 'admin' | 'user' | 'professional';
}