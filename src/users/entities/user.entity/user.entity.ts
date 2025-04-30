// // src/users/entities/user.entity.ts
// import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
// import { Professional } from '../../../professionals/entities/professional.entity/professional.entity'; // Importez l'entité Professional
// import { Appointment } from '../../../appointments/entities/appointment.entity/appointment.entity'; // Importez l'entité Appointment
// import { Message } from '../../../chat/entities/message.entity/message.entity'; // Importez l'entité Message

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   fullName: string; // Nom complet de l'utilisateur

//   @Column({ unique: true, nullable: true })
//   email: string; // Email de l'utilisateur (optionnel si le téléphone est utilisé)

//   @Column({ unique: true, nullable: true })
//   phoneNumber: string; // Numéro de téléphone de l'utilisateur (optionnel si l'email est utilisé)

//   @Column()
//   password: string; // Mot de passe de l'utilisateur

//   @Column({ type: 'date' })
//   dateOfBirth: Date; // Date de naissance de l'utilisateur

//   @Column({ type: 'enum', enum: ['male', 'female', 'other'] })
//   gender: 'male' | 'female' | 'other'; // Sexe de l'utilisateur

//   @Column({ nullable: true })
//   profilePhoto: string; // URL de la photo de profil (optionnel)

//   @Column({ default: 'user' })
//   role: 'admin' | 'user' | 'professional'; // Rôle de l'utilisateur

//   @OneToOne(() => Professional, (professional) => professional.user) // Relation One-to-One avec Professional
//   professional: Professional; // Référence au professionnel associé

//   @OneToMany(() => Appointment, (appointment) => appointment.user) // Relation One-to-Many avec Appointment
//   appointments: Appointment[]; // Liste des rendez-vous de l'utilisateur

//   @OneToMany(() => Message, (message) => message.sender) // Relation One-to-Many avec Message (messages envoyés)
//   sentMessages: Message[]; // Liste des messages envoyés par l'utilisateur

//   @OneToMany(() => Message, (message) => message.receiver) // Relation One-to-Many avec Message (messages reçus)
//   receivedMessages: Message[]; // Liste des messages reçus par l'utilisateur
// }




// import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
// import { Professional } from '../../professionals/entities/professional.entity/professional.entity';
// import { Appointment } from '../../appointments/entities/appointment.entity/appointment.entity';
// import { Message } from '../../chat/entities/message.entity/message.entity';




// //// src/users/entities/user.entity.ts

// import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
// import { Professional } from '../../../professionals/entities/professional.entity/professional.entity'; // Importez l'entité Professional
// import { Appointment } from '../../../appointments/entities/appointment.entity/appointment.entity'; // Importez l'entité Appointment
// import { Message } from '../../../chat/entities/message.entity/message.entity'; // Importez l'entité Message

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   fullName: string;

//   @Column({ unique: true, nullable: true })
//   email: string;

//   @Column({ unique: true, nullable: true })
//   phoneNumber: string;

//   @Column()
//   password: string;

//   @Column({
//     type: 'date',
//     transformer: {
//       from(value: string): Date {
//         return new Date(value); // Convert string from DB to Date
//       },
//       to(value: Date): string {
//         return value.toISOString().split('T')[0]; // Convert Date to YYYY-MM-DD for DB
//       },
//     },
//   })
//   dateOfBirth: Date;

//   @Column({ type: 'enum', enum: ['male', 'female', 'other'] })
//   gender: 'male' | 'female' | 'other';

//   @Column({ nullable: true })
//   profilePhoto: string;

//   @Column({ default: 'user' })
//   role: 'admin' | 'user' | 'professional';

//   @OneToOne(() => Professional, (professional) => professional.user)
//   professional: Professional;

//   @OneToMany(() => Appointment, (appointment) => appointment.user)
//   appointments: Appointment[];

//   @OneToMany(() => Message, (message) => message.sender)
//   sentMessages: Message[];

//   @OneToMany(() => Message, (message) => message.receiver)
//   receivedMessages: Message[];
// }



// // src/users/entities/user.entity.ts
// import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
// import { Professional } from '../../../professionals/entities/professional.entity/professional.entity';
// import { Appointment } from '../../../appointments/entities/appointment.entity/appointment.entity';
// import { Message } from '../../../chat/entities/message.entity/message.entity';

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column({ nullable: true })
//   fullName: string;

//   @Column({ unique: true, nullable: true })
//   email: string;

//   @Column({ unique: true, nullable: true })
//   phoneNumber: string;

//   @Column()
//   password: string;

//   @Column({
//     type: 'date',
//     nullable: true,
//     transformer: {
//       from(value: string): Date | null {
//         return value ? new Date(value) : null; // Convert string to Date or null
//       },
//       to(value: Date | null): string | null {
//         return value ? value.toISOString().split('T')[0] : null; // Convert Date to YYYY-MM-DD or null
//       },
//     },
//   })
//   dateOfBirth: Date | null;

//   @Column({ type: 'enum', enum: ['male', 'female', 'other'], nullable: true })
//   gender: 'male' | 'female' | 'other' | null;

//   @Column({ nullable: true })
//   profilePhoto: string;

//   @Column({ nullable: true })
//   address: string;

//   @Column({ nullable: true })
//   bloodType: string;

//   @Column({ nullable: true })
//   allergies: string;

//   @Column({ nullable: true })
//   emergencyContact: string;

//   @Column({ default: 'user' })
//   role: 'admin' | 'user' | 'professional';

//   @OneToOne(() => Professional, (professional) => professional.user)
//   professional: Professional;

//   @OneToMany(() => Appointment, (appointment) => appointment.user)
//   appointments: Appointment[];

//   @OneToMany(() => Message, (message) => message.sender)
//   sentMessages: Message[];

//   @OneToMany(() => Message, (message) => message.receiver)
//   receivedMessages: Message[];
// }



import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { Professional } from '../../../professionals/entities/professional.entity/professional.entity';
import { Appointment } from '../../../appointments/entities/appointment.entity/appointment.entity';
import { Message } from '../../../chat/entities/message.entity/message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phoneNumber: string;

  @Column()
  password: string;

  @Column({
    type: 'date',
    nullable: true,
    transformer: {
      from(value: string | null): Date | null {
        return value ? new Date(value) : null; // Convert string from DB to Date or null
      },
      to(value: Date | string | null): string | null {
        if (!value) return null;
        if (typeof value === 'string') {
          // Validate and convert string (e.g., YYYY-MM-DD)
          const date = new Date(value);
          if (isNaN(date.getTime())) return null; // Invalid date
          return date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD
        }
        return value.toISOString().split('T')[0]; // Convert Date to YYYY-MM-DD
      },
    },
  })
  dateOfBirth: Date | null;

  @Column({ type: 'enum', enum: ['male', 'female', 'other'], nullable: true })
  gender: 'male' | 'female' | 'other' | null;

  @Column({ nullable: true })
  profilePhoto: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  bloodType: string;

  @Column({ nullable: true })
  allergies: string;

  @Column({ nullable: true })
  emergencyContact: string;

  @Column({ default: 'user' })
  role: 'admin' | 'user' | 'professional';

  @OneToOne(() => Professional, (professional) => professional.user)
  professional: Professional;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];

  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message[];
}