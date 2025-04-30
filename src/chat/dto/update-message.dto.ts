// src/chat/dto/update-message.dto.ts
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateMessageDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsUUID()
  senderId?: string; // ID de l'expéditeur

  @IsOptional()
  @IsUUID()
  receiverId?: string; // ID du destinataire
}