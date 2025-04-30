// // src/users/users.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from '../users/entities/user.entity/user.entity';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//   ) {}

//   async create(user: Partial<User>): Promise<User> {
//     return this.usersRepository.save(user);
//   }

//   async findOneByEmailOrPhone(emailOrPhone: string): Promise<User | undefined> {
//     const user = await this.usersRepository.findOne({
//       where: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
//     });
//     return user ?? undefined;
//   }

//   async findAll(): Promise<User[]> {
//     return this.usersRepository.find();
//   }

//   async delete(id: string): Promise<void> {
//     await this.usersRepository.delete(id);
//   }
// }




// // src/users/users.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from '../users/entities/user.entity/user.entity';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//   ) {}

//   async create(user: Partial<User>): Promise<User> {
//     return this.usersRepository.save(user);
//   }

//   async findOneByEmailOrPhone(emailOrPhone: string): Promise<User | undefined> {
//     const user = await this.usersRepository.findOne({
//       where: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
//     });
//     return user ?? undefined;
//   }

//   async findOneById(id: string): Promise<User> {
//     const user = await this.usersRepository.findOne({ where: { id } });
//     if (!user) {
//       throw new Error('User not found');
//     }
//     return user;
//   }

//   async findAll(): Promise<User[]> {
//     return this.usersRepository.find();
//   }

//   async delete(id: string): Promise<void> {
//     await this.usersRepository.delete(id);
//   }
// }


// // src/users/users.service.ts
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from '../users/entities/user.entity/user.entity';
// import { UpdateUserDto } from './dto/update-user.dto';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//   ) {}

//   async findAll(): Promise<User[]> {
//     return this.usersRepository.find();
//   }

//   async findOneById(id: string): Promise<User> {
//     const user = await this.usersRepository.findOne({ where: { id } });
//     if (!user) {
//       throw new NotFoundException('Utilisateur non trouvé');
//     }
//     return user;
//   }

//   async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
//     const user = await this.findOneById(id);
//     Object.assign(user, updateUserDto);
//     return this.usersRepository.save(user);
//   }

//   async delete(id: string): Promise<void> {
//     const result = await this.usersRepository.delete(id);
//     if (result.affected === 0) {
//       throw new NotFoundException('Utilisateur non trouvé');
//     }
//   }
// }


// src/users/users.service.ts


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOneByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { phoneNumber } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);
    if (Object.keys(updateUserDto).length === 0) {
      return user; // No changes to apply
    }
    // Validate uniqueness of email and phoneNumber if provided
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingEmail = await this.findOneByEmail(updateUserDto.email);
      if (existingEmail && existingEmail.id !== id) {
        throw new NotFoundException('Cet email est déjà utilisé');
      }
    }
    if (updateUserDto.phoneNumber && updateUserDto.phoneNumber !== user.phoneNumber) {
      const existingPhone = await this.findOneByPhoneNumber(updateUserDto.phoneNumber);
      if (existingPhone && existingPhone.id !== id) {
        throw new NotFoundException('Ce numéro de téléphone est déjà utilisé');
      }
    }
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
  }
}