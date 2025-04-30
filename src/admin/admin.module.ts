// src/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { User } from '../users/entities/user.entity/user.entity';
import { Professional } from '../professionals/entities/professional.entity/professional.entity';
import { HealthCenter } from '../health-centers/entities/health-center.entity/health-center.entity';
import { Appointment } from '../appointments/entities/appointment.entity/appointment.entity';
import { Message } from '../chat/entities/message.entity/message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Professional, HealthCenter, Appointment, Message]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}