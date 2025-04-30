// src/health-centers/entities/health-center.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class HealthCenter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Nom du centre de santé

  @Column()
  address: string; // Adresse du centre de santé

  @Column({ type: 'enum', enum: ['pharmacy', 'on_duty_pharmacy', 'hospital'] })
  type: 'pharmacy' | 'on_duty_pharmacy' | 'hospital'; // Type de centre de santé
}