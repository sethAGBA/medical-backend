
// src/admin/dto/update-appointment.dto.ts
import { IsOptional, IsDateString, IsString } from 'class-validator';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsDateString()
  date?: Date;

  @IsOptional()
  @IsString()
  userId?: string; // ID de l'utilisateur

  @IsOptional()
  @IsString()
  professionalId?: string; // ID du professionnel
}