// src/professionals/dto/create-professional.dto.ts
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateProfessionalDto {
  @IsString()
  @IsNotEmpty()
  specialty: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string; // ID de l'utilisateur associé
}