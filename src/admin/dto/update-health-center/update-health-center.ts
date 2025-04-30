// src/admin/dto/update-health-center.dto.ts
import { IsOptional, IsString, IsEnum } from 'class-validator';

export class UpdateHealthCenterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEnum(['pharmacy', 'on_duty_pharmacy', 'hospital'])
  type?: 'pharmacy' | 'on_duty_pharmacy' | 'hospital';
}