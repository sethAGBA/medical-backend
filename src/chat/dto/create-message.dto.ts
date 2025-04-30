// src/chat/dto/create-message.dto.ts
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUUID()
  @IsNotEmpty()
  senderId: string; // ID de l'expéditeur

  @IsUUID()
  @IsNotEmpty()
  receiverId: string; // ID du destinataire
}