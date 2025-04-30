// // src/users/users.controller.ts
// import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { User } from './entities/user.entity/user.entity';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Get()
//   findAll(): Promise<User[]> {
//     return this.usersService.findAll();
//   }

//   @Delete(':id')
//   delete(@Param('id') id: string): Promise<void> {
//     return this.usersService.delete(id);
//   }
// }

// // src/users/users.controller.ts
// import { Controller, Get, Delete, Param, Request, UseGuards } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { User } from './entities/user.entity/user.entity';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { RolesGuard } from '../auth/roles.guard';
// import { Roles } from '../auth/roles.decorator';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Get()
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles('admin')
//   findAll(): Promise<User[]> {
//     return this.usersService.findAll();
//   }

//   @Get('me')
//   @UseGuards(JwtAuthGuard)
//   getProfile(@Request() req): Promise<User> {
//     return this.usersService.findOneById(req.user.userId);
//   }

//   @Delete(':id')
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles('admin')
//   delete(@Param('id') id: string): Promise<void> {
//     return this.usersService.delete(id);
//   }
// }


// // src/users/users.controller.ts
// import { Controller, Get, Delete, Patch, Param, Request, Body, UseGuards } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { User } from './entities/user.entity/user.entity';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { RolesGuard } from '../auth/roles.guard';
// import { Roles } from '../auth/roles.decorator';
// import { UpdateUserDto } from './dto/update-user.dto';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Get()
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles('admin')
//   findAll(): Promise<User[]> {
//     return this.usersService.findAll();
//   }

//   @Get('me')
//   @UseGuards(JwtAuthGuard)
//   getProfile(@Request() req): Promise<User> {
//     return this.usersService.findOneById(req.user.userId);
//   }

//   @Patch('me')
//   @UseGuards(JwtAuthGuard)
//   updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto): Promise<User> {
//     return this.usersService.update(req.user.userId, updateUserDto);
//   }

//   @Delete(':id')
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles('admin')
//   delete(@Param('id') id: string): Promise<void> {
//     return this.usersService.delete(id);
//   }
// }




// src/users/users.controller.ts


import { Controller, Get, Delete, Patch, Param, Request, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req): Promise<User> {
    return this.usersService.findOneById(req.user.id);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  delete(@Param('id') id: string): Promise<void> {
    return this.usersService.delete(id);
  }
}