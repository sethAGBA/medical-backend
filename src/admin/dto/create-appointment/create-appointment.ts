// src/admin/dto/create-appointment.dto.ts
import { IsDateString, IsString, IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  userId: string; // ID de l'utilisateur

  @IsString()
  @IsNotEmpty()
  professionalId: string; // ID du professionnel
}