import { Module } from '@nestjs/common';
//import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module'; // Importer AuthModule
import { LoggerModule } from '../logger/logger.module'; // Importer LoggerModule

@Module({
  imports: [UsersModule, AuthModule, LoggerModule], // Importer LoggerModule
  //controllers: [AdminController],
  providers: [AdminService], // Logger est maintenant fourni par LoggerModule
})
export class AdminModule {}