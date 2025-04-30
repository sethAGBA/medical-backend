export class AppointmentEntity {}
// src/appointments/entities/appointment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../../users/entities/user.entity/user.entity'; // Importez l'entité User
import { Professional } from '../../../professionals/entities/professional.entity/professional.entity'; // Importez l'entité Professional

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date; // Date et heure du rendez-vous

  @ManyToOne(() => User, (user) => user.appointments) // Relation Many-to-One avec User
  @JoinColumn({ name: 'userId' }) // Nom de la colonne de jointure
  user: User; // Référence à l'utilisateur (patient)

  @Column()
  userId: string; // ID de l'utilisateur (patient)

  @ManyToOne(() => Professional, (professional) => professional.appointments) // Relation Many-to-One avec Professional
  @JoinColumn({ name: 'professionalId' }) // Nom de la colonne de jointure
  professional: Professional; // Référence au professionnel de santé

  @Column()
  professionalId: string; // ID du professionnel de santé
}