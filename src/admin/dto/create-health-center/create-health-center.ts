// src/admin/dto/create-health-center.dto.ts
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateHealthCenterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEnum(['pharmacy', 'on_duty_pharmacy', 'hospital'])
  type: 'pharmacy' | 'on_duty_pharmacy' | 'hospital';
}