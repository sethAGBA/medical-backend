// // // src/auth/dto/register.dto.ts
// import { IsEmail, IsNotEmpty, IsString, IsOptional, IsPhoneNumber, IsDateString, IsEnum,IsISO8601 } from 'class-validator';

// export class RegisterDto {
//   @IsString()
//   @IsNotEmpty()
//   fullName: string; // Nom complet

//   @IsEmail()
//   @IsOptional() // Email est optionnel si le téléphone est fourni
//   email?: string;

//   @IsPhoneNumber()
//   @IsOptional() // Téléphone est optionnel si l'email est fourni
//   phoneNumber?: string;

//   @IsString()
//   @IsNotEmpty()
//   password: string; // Mot de passe

//   @IsDateString()
//   @IsNotEmpty()
//   dateOfBirth: Date; // Date de naissance

//   @IsEnum(['male', 'female', 'other'])
//   @IsNotEmpty()
//   gender: 'male' | 'female' | 'other'; // Sexe

//   @IsString()
//   @IsOptional()
//   profilePhoto?: string; // Photo de profil (optionnel)

//   @IsEnum(['admin', 'user', 'professional'])
//   @IsNotEmpty()
//   role: 'admin' | 'user' | 'professional'; // Rôle
// }


// import { IsString, IsEmail, IsOptional, IsISO8601, IsEnum } from 'class-validator';

// export class RegisterDto {
//   @IsString()
//   fullName: string;

//   @IsEmail()
//   @IsOptional()
//   email?: string;

//   @IsString()
//   @IsOptional()
//   phoneNumber?: string;

//   @IsString()
//   password: string;

//   @IsISO8601()
//   dateOfBirth: string;

//   @IsEnum(['male', 'female', 'other'])
//   gender: string;

//   @IsString()
//   @IsOptional()
//   profilePhoto?: string;

//   @IsEnum(['user', 'professional', 'admin']) // Allow 'admin' role
//   @IsOptional()
//   role?: string; // Default to 'user' in service if not provided
// }


// src/auth/dto/register.dto.ts
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsPhoneNumber, IsISO8601, IsEnum } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  fullName: string; // Nom complet

  @IsEmail()
  @IsOptional() // Email est optionnel si le téléphone est fourni
  email?: string;

  @IsPhoneNumber()
  @IsOptional() // Téléphone est optionnel si l'email est fourni
  phoneNumber?: string;

  @IsString()
  @IsNotEmpty()
  password: string; // Mot de passe

  @IsISO8601() // Valide une chaîne ISO 8601 (ex. : "1980-01-01T00:00:00.000Z")
  @IsNotEmpty()
  dateOfBirth: string; // Changé de Date à string

  @IsEnum(['male', 'female', 'other'])
  @IsNotEmpty()
  gender: 'male' | 'female' | 'other'; // Sexe

  @IsString()
  @IsOptional()
  profilePhoto?: string; // Photo de profil (optionnel)

  @IsEnum(['admin', 'user', 'professional'])
  @IsNotEmpty()
  role: 'admin' | 'user' | 'professional'; // Rôle
}