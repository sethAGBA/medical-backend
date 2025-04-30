// // src/admin/admin.controller.ts
// import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
// import { AdminService } from './admin.service';
// import { User } from '../users/entities/user.entity/user.entity';
// import { Professional } from '../professionals/entities/professional.entity/professional.entity';
// import { HealthCenter } from '../health-centers/entities/health-center.entity/health-center.entity';
// import { Appointment } from '../appointments/entities/appointment.entity/appointment.entity';
// import { Message } from '../chat/entities/message.entity/message.entity';
// import { JwtAuthGuard } from '../auth/jwt.strategy';
// import { RolesGuard } from '../auth/roles.guard';
// import { Roles } from '../auth/roles.decorator';

// @Controller('admin')
// @UseGuards(JwtAuthGuard, RolesGuard) // Protéger les routes avec JWT et vérifier les rôles
// export class AdminController {
//   constructor(private readonly adminService: AdminService) {}

//   @Get('users')
//   @Roles('admin') // Seul l'admin peut accéder à cette route
//   async findAllUsers(): Promise<User[]> {
//     return this.adminService.findAllUsers();
//   }

//   @Delete('users/:id')
//   @Roles('admin')
//   async deleteUser(@Param('id') id: string): Promise<void> {
//     return this.adminService.deleteUser(id);
//   }

//   @Get('professionals')
//   @Roles('admin')
//   async findAllProfessionals(): Promise<Professional[]> {
//     return this.adminService.findAllProfessionals();
//   }

//   @Post('health-centers')
//   @Roles('admin')
//   async createHealthCenter(@Body() healthCenter: HealthCenter): Promise<HealthCenter> {
//     return this.adminService.createHealthCenter(healthCenter);
//   }

//   @Delete('health-centers/:id')
//   @Roles('admin')
//   async deleteHealthCenter(@Param('id') id: string): Promise<void> {
//     return this.adminService.deleteHealthCenter(id);
//   }

//   @Get('appointments')
//   @Roles('admin')
//   async findAllAppointments(): Promise<Appointment[]> {
//     return this.adminService.findAllAppointments();
//   }

//   @Get('messages')
//   @Roles('admin')
//   async findAllMessages(): Promise<Message[]> {
//     return this.adminService.findAllMessages();
//   }
// }


import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { User } from '../users/entities/user.entity/user.entity';
import { Professional } from '../professionals/entities/professional.entity/professional.entity';
import { HealthCenter } from '../health-centers/entities/health-center.entity/health-center.entity';
import { Appointment } from '../appointments/entities/appointment.entity/appointment.entity';
import { Message } from '../chat/entities/message.entity/message.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Updated import
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard) // Protéger les routes avec JWT et vérifier les rôles
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  @Roles('admin') // Seul l'admin peut accéder à cette route
  async findAllUsers(): Promise<User[]> {
    return this.adminService.findAllUsers();
  }

  @Delete('users/:id')
  @Roles('admin')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.adminService.deleteUser(id);
  }

  @Get('professionals')
  @Roles('admin')
  async findAllProfessionals(): Promise<Professional[]> {
    return this.adminService.findAllProfessionals();
  }

  @Post('health-centers')
  @Roles('admin')
  async createHealthCenter(@Body() healthCenter: HealthCenter): Promise<HealthCenter> {
    return this.adminService.createHealthCenter(healthCenter);
  }

  @Delete('health-centers/:id')
  @Roles('admin')
  async deleteHealthCenter(@Param('id') id: string): Promise<void> {
    return this.adminService.deleteHealthCenter(id);
  }

  @Get('appointments')
  @Roles('admin')
  async findAllAppointments(): Promise<Appointment[]> {
    return this.adminService.findAllAppointments();
  }

  @Get('messages')
  @Roles('admin')
  async findAllMessages(): Promise<Message[]> {
    return this.adminService.findAllMessages();
  }
}