export class MessageEntity {}
// src/chat/entities/message.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../../users/entities/user.entity/user.entity'; // Importez l'entité User


@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string; // Contenu du message

  @ManyToOne(() => User, (user) => user.sentMessages) // Relation Many-to-One avec User (expéditeur)
  @JoinColumn({ name: 'senderId' }) // Nom de la colonne de jointure
  sender: User; // Référence à l'utilisateur expéditeur

  @Column()
  senderId: string; // ID de l'utilisateur expéditeur

  @ManyToOne(() => User, (user) => user.receivedMessages) // Relation Many-to-One avec User (destinataire)
  @JoinColumn({ name: 'receiverId' }) // Nom de la colonne de jointure
  receiver: User; // Référence à l'utilisateur destinataire

  @Column()
  receiverId: string; // ID de l'utilisateur destinataire

  @Column({ default: () => 'CURRENT_TIMESTAMP' }) // Date d'envoi du message
  createdAt: Date;
}