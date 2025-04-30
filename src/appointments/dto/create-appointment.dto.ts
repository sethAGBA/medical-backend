// src/appointments/dto/create-appointment.dto.ts
import { IsNotEmpty, IsDateString, IsUUID } from 'class-validator';

export class CreateAppointmentDto {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsUUID()
  @IsNotEmpty()
  userId: string; // ID de l'utilisateur

  @IsUUID()
  @IsNotEmpty()
  professionalId: string; // ID du professionnel
}