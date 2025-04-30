// src/admin/admin.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity/user.entity';
import { Professional } from '../professionals/entities/professional.entity/professional.entity';
import { HealthCenter } from '../health-centers/entities/health-center.entity/health-center.entity';
import { Appointment } from '../appointments/entities/appointment.entity/appointment.entity';
import { Message } from '../chat/entities/message.entity/message.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Professional)
    private professionalsRepository: Repository<Professional>,
    @InjectRepository(HealthCenter)
    private healthCentersRepository: Repository<HealthCenter>,
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findAllProfessionals(): Promise<Professional[]> {
    return this.professionalsRepository.find();
  }

  async createHealthCenter(healthCenter: HealthCenter): Promise<HealthCenter> {
    return this.healthCentersRepository.save(healthCenter);
  }

  async deleteHealthCenter(id: string): Promise<void> {
    await this.healthCentersRepository.delete(id);
  }

  async findAllAppointments(): Promise<Appointment[]> {
    return this.appointmentsRepository.find();
  }

  async findAllMessages(): Promise<Message[]> {
    return this.messagesRepository.find();
  }
}