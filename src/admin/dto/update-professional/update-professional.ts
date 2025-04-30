// src/admin/dto/update-professional.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class UpdateProfessionalDto {
  @IsOptional()
  @IsString()
  specialty?: string;

  @IsOptional()
  @IsString()
  userId?: string; // ID de l'utilisateur associé
}