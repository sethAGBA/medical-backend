// src/admin/dto/create-professional.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProfessionalDto {
  @IsString()
  @IsNotEmpty()
  specialty: string;

  @IsString()
  @IsNotEmpty()
  userId: string; // ID de l'utilisateur associé
}