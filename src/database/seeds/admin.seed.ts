import { NestFactory } from '@nestjs/core';
 import { AppModule } from '../../app.module';
 import { UsersService } from '../../users/users.service';
 import { UserRole } from '../../users/user.entity';
 import * as bcrypt from 'bcryptjs';

 async function seed() {
   const app = await NestFactory.createApplicationContext(AppModule);
   const usersService = app.get(UsersService);

   const email = 'seedadmin@example.com';
   const password = 'seedpassword';
   const username = 'SeedAdmin';
   const profileUrl = 'http://example.com/seedadmin';

   // Check if the admin user already exists
   const existingUser = await usersService.findOneByEmail(email);
   if (!existingUser) {
     const salt = await bcrypt.genSalt();
     const hashedPassword = await bcrypt.hash(password, salt);

     await usersService.createUser(email, hashedPassword, username, profileUrl, UserRole.ADMIN);
     console.log('Admin user created successfully.');
   } else {
     console.log('Admin user already exists.');
   }

   await app.close();
 }

 seed();