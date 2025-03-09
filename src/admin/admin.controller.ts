/*import {
  Controller,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpException,
  HttpStatus,
  Post,
  Logger,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { UserRole } from '../users/user.entity';

import { RolesGuard } from '../auth/strategies/roles/roles.guard';
import { Roles } from '../auth/strategies/roles/roles.decorator';
import { CreateAdminDto } from '../auth/dto/create-admin.dto';
import { JwtAuthGuard } from 'src/auth/wt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard) // Protéger toutes les routes avec JwtAuthGuard et RolesGuard
export class AdminController {
  private readonly logger = new Logger(AdminController.name);

  constructor(
    private adminService: AdminService,
    private usersService: UsersService,
    private authService: AuthService, // Pour hacher le mot de passe
  ) {}

  // Créer un administrateur
  @Post('create-admin')
  @Roles(UserRole.ADMIN) // Seuls les administrateurs peuvent créer un autre administrateur
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    const { email, password, username, profileUrl } = createAdminDto;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      this.logger.warn(`Tentative de création d'un admin avec un email existant: ${email}`);
      throw new HttpException('Cet email est déjà utilisé.', HttpStatus.BAD_REQUEST);
    }

    try {
      // Hacher le mot de passe
      const hashedPassword = await this.authService.hashPassword(password);

      // Créer l'administrateur
      const adminUser = await this.usersService.createUser(
        email,
        hashedPassword,
        username,
        profileUrl || '', // Provide a default value if profileUrl is undefined
        UserRole.ADMIN, // Attribuer le rôle ADMIN
      );

      // Journaliser l'action
      this.logger.log(`Admin créé avec succès: ${email}`);

      return { message: 'Admin created successfully', user: adminUser };
    } catch (error) {
      this.logger.error(`Erreur lors de la création de l'admin: ${error.message}`, error.stack);
      throw new HttpException('Erreur lors de la création de l\'administrateur', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Mettre à jour le rôle d'un utilisateur
  @Put('users/:id/role')
  @Roles(UserRole.ADMIN) // Seuls les administrateurs peuvent mettre à jour les rôles
  async updateUserRole(@Param('id') id: string, @Body('role') role: UserRole) {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }

    // Valider que le rôle fourni est valide
    if (!Object.values(UserRole).includes(role)) {
      throw new HttpException('Invalid role', HttpStatus.BAD_REQUEST);
    }

    try {
      const updatedUser = await this.adminService.updateUserRole(userId, role);
      this.logger.log(`Admin updated user role: User ID ${userId}, New Role: ${role}`);
      return updatedUser;
    } catch (error) {
      this.logger.error(`Error updating user role: ${error.message}`, error.stack);
      throw new HttpException('Failed to update user role', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Supprimer un utilisateur
  @Delete('users/:id')
  @Roles(UserRole.ADMIN) // Seuls les administrateurs peuvent supprimer des utilisateurs
  async deleteUser(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.adminService.deleteUser(userId);
      this.logger.log(`Admin deleted user: User ID ${userId}`);
      return { message: 'User deleted successfully' };
    } catch (error) {
      this.logger.error(`Error deleting user: ${error.message}`, error.stack);
      throw new HttpException('Failed to delete user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

*/