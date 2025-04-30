// src/professionals/dto/update-professional.dto.ts
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateProfessionalDto {
  @IsOptional()
  @IsString()
  specialty?: string;

  @IsOptional()
  @IsUUID()
  userId?: string; // ID de l'utilisateur associé
}