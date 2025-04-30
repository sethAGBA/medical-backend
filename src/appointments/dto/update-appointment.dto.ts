// src/appointments/dto/update-appointment.dto.ts
import { IsOptional, IsDateString, IsUUID } from 'class-validator';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsDateString()
  date?: Date;

  @IsOptional()
  @IsUUID()
  userId?: string; // ID de l'utilisateur

  @IsOptional()
  @IsUUID()
  professionalId?: string; // ID du professionnel
}