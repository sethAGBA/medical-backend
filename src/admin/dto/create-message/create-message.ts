// src/admin/dto/create-message.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  senderId: string; // ID de l'expéditeur

  @IsString()
  @IsNotEmpty()
  receiverId: string; // ID du destinataire
}