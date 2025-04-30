// src/health-centers/dto/update-health-center.dto.ts
import { IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateHealthCenterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsIn(['pharmacy', 'hospital'])
  type?: 'pharmacy' | 'hospital';
}