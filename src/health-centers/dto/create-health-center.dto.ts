// src/health-centers/dto/create-health-center.dto.ts
import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class CreateHealthCenterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsIn(['pharmacy', 'hospital'])
  type: 'pharmacy' | 'hospital';
}