import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

import { LoggerService } from './logger/logger.service.spec';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or 'mysql', 'mongodb', etc.
      host: 'localhost', // or your database host
      port: 5432, // or your database port
      username: 'postgres',
      password: 'root',
      database: 'medical',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Only for development, disable in production
    }),
    UsersModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}