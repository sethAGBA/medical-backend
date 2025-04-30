export class UpdateMessage {}
// src/admin/dto/update-message.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class UpdateMessageDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  senderId?: string; // ID de l'expéditeur

  @IsOptional()
  @IsString()
  receiverId?: string; // ID du destinataire
}