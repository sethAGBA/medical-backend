// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
// import { ChatModule } from './chat/chat.module';
// import { AppointmentsModule } from './appointments/appointments.module';
// import { HealthCentersModule } from './health-centers/health-centers.module';
// import { ProfessionalsModule } from './professionals/professionals.module';
// import { UsersModule } from './users/users.module';

// @Module({
//   imports: [AuthModule, ChatModule, AppointmentsModule, HealthCentersModule, ProfessionalsModule, UsersModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';
// import { HealthCenter } from './health-centers/entities/health-center.entity/health-center.entity';
// import { AppointmentsModule } from './appointments/appointments.module';
// import { UsersModule } from './users/users.module';
// import { User } from './users/entities/user.entity/user.entity';
// import { Appointment } from './appointments/entities/appointment.entity/appointment.entity';

// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: process.env.DB_HOST || 'localhost',
//       port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
//       username: process.env.DB_USERNAME || 'postgres',
//       password: process.env.DB_PASSWORD || 'root',
//       database: process.env.DB_NAME || 'medical_db',
//       entities: [HealthCenter, User, Appointment],
//       synchronize: true,
//       autoLoadEntities: true,
//     }),
//     AppointmentsModule,
//     UsersModule,
//   ],
// })
// export class AppModule {}


// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
// import { AdminModule } from './admin/admin.module';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'postgres',
//       password: 'root',
//       database: 'medical_db',
//       entities: [__dirname + '/**/*.entity{.ts,.js}'],
//       synchronize: true, // À désactiver en production
//     }),
//     AuthModule,
//     AdminModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}



// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { ProfessionalsModule } from './professionals/professionals.module';
// import { HealthCentersModule } from './health-centers/health-centers.module';
// import { AppointmentsModule } from './appointments/appointments.module';
// import { ChatModule } from './chat/chat.module';
// import { AdminModule } from './admin/admin.module';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'postgres',
//       password: 'root', // Update this
//       database: 'medical_db',
//       autoLoadEntities: true, // Loads all entities automatically
//       synchronize: true, // Set to false in production
//     }),
//     AuthModule,
//     UsersModule,
//     ProfessionalsModule,
//     HealthCentersModule,
//     AppointmentsModule,
//     ChatModule,
//     AdminModule,
//   ],
// })
// export class AppModule {}




// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { ProfessionalsModule } from './professionals/professionals.module';
// import { HealthCentersModule } from './health-centers/health-centers.module';
// import { AppointmentsModule } from './appointments/appointments.module';
// import { ChatModule } from './chat/chat.module';
// import { AdminModule } from './admin/admin.module';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'aws-0-eu-central-1.pooler.supabase.com',
//       port: 6543,
//       username: 'postgres.wqxchwutzhntklcupfan',
//       password: '067c0f2d8fda', // Update this
//       database: 'postgres',
//       autoLoadEntities: true, // Loads all entities automatically
//       synchronize: true, // Set to false in production
//     }),
//     AuthModule,
//     UsersModule,
//     ProfessionalsModule,
//     HealthCentersModule,
//     AppointmentsModule,
//     ChatModule,
//     AdminModule,
//   ],
// })
// export class AppModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfessionalsModule } from './professionals/professionals.module';
import { HealthCentersModule } from './health-centers/health-centers.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ChatModule } from './chat/chat.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'], // Support multiple .env files
      ignoreEnvFile: process.env.NODE_ENV === 'production', // Ignore .env in production
      load: [() => {
        console.log('Loading .env file from:', process.cwd());
        return {};
      }],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const host = configService.get<string>('DATABASE_HOST');
        const port = configService.get<string>('DATABASE_PORT');
        const username = configService.get<string>('DATABASE_USERNAME');
        const password = configService.get<string>('DATABASE_PASSWORD');
        const database = configService.get<string>('DATABASE_NAME');

        // Log configuration for debugging
        console.log('Database Config:', {
          host,
          port,
          username,
          password: password ? '[REDACTED]' : undefined,
          database,
        });

        // Validate environment variables
        if (!host || !port || !username || !password || !database) {
          throw new Error(
            `Missing or invalid database configuration. Ensure DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, and DATABASE_NAME are set in .env. Current working directory: ${process.cwd()}`,
          );
        }

        return {
          type: 'postgres',
          host,
          port: parseInt(port, 10) || 5432,
          username,
          password: String(password), // Explicitly coerce to string
          database,
          autoLoadEntities: true,
          synchronize: configService.get<string>('NODE_ENV') !== 'production',
          logging: true, // Enable query logging for debugging
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ProfessionalsModule,
    HealthCentersModule,
    AppointmentsModule,
    ChatModule,
    AdminModule,
  ],
})
export class AppModule {}