// src/professionals/entities/professional.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../../users/entities/user.entity/user.entity'; // Importez l'entité User
import { Appointment } from '../../../appointments/entities/appointment.entity/appointment.entity'; // Importez l'entité Appointment

@Entity()
export class Professional {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  specialty: string; // Spécialité du professionnel (ex: "Médecin généraliste")

  @ManyToOne(() => User, (user) => user.id) // Relation Many-to-One avec User
  @JoinColumn({ name: 'userId' }) // Nom de la colonne de jointure
  user: User; // Référence à l'utilisateur associé

  @Column()
  userId: string; // ID de l'utilisateur associé

  @OneToMany(() => Appointment, (appointment) => appointment.professional) // Relation One-to-Many avec Appointment
  appointments: Appointment[]; // Liste des rendez-vous du professionnel
}