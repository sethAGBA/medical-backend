import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Logger } from '../logger/logger.service';
import { UserRole } from '../users/user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AdminController', () => {
  let controller: AdminController;
  let adminService: AdminService;
  let logger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AdminService,
          useValue: {
            updateUserRole: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    adminService = module.get<AdminService>(AdminService);
    logger = module.get<Logger>(Logger);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('updateUserRole', () => {
    it('should update user role and return the updated user', async () => {
      const userId = 1;
      const role = UserRole.ADMIN;
      const updatedUser = { 
        id: userId, 
        role, 
        email: 'test@example.com', 
        password: 'password', 
        username: 'testuser', 
        profileUrl: 'http://example.com/profile', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      };

      jest.spyOn(adminService, 'updateUserRole').mockResolvedValue(updatedUser);

      const result = await controller.updateUserRole(userId.toString(), role);
      expect(result).toEqual(updatedUser);
      expect(adminService.updateUserRole).toHaveBeenCalledWith(userId, role);
      expect(logger.log).toHaveBeenCalledWith(
        `Admin updated user role: User ID ${userId}, New Role: ${role}`,
      );
    });

    it('should throw an error if user ID is invalid', async () => {
      const userId = 'invalid';
      const role = UserRole.ADMIN;

      await expect(
        controller.updateUserRole(userId, role),
      ).rejects.toThrow(HttpException);
      await expect(
        controller.updateUserRole(userId, role),
      ).rejects.toMatchObject({
        message: 'Invalid user ID',
        status: HttpStatus.BAD_REQUEST,
      });
    });

    it('should throw an error if AdminService.updateUserRole fails', async () => {
      const userId = 1;
      const role = UserRole.ADMIN;

      jest.spyOn(adminService, 'updateUserRole').mockRejectedValue(new Error('Internal server error'));

      await expect(controller.updateUserRole(userId.toString(), role)).rejects.toThrow(HttpException);
      await expect(controller.updateUserRole(userId.toString(), role)).rejects.toMatchObject({
        message: 'Failed to update user role',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    });

    it('should log an error if AdminService.updateUserRole fails', async () => {
      const userId = 1;
      const role = UserRole.ADMIN;

      jest.spyOn(adminService, 'updateUserRole').mockRejectedValue(new Error('Internal server error'));

      await expect(controller.updateUserRole(userId.toString(), role)).rejects.toThrow(HttpException);
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('Error updating user role'),
        expect.any(String), // Trace de l'erreur
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete the user and return a success message', async () => {
      const userId = 1;

      jest.spyOn(adminService, 'deleteUser').mockResolvedValue({ message: 'User deleted successfully' });

      const result = await controller.deleteUser(userId.toString());
      expect(result).toEqual({ message: 'User deleted successfully' });
      expect(adminService.deleteUser).toHaveBeenCalledWith(userId);
      expect(logger.log).toHaveBeenCalledWith(
        `Admin deleted user: User ID ${userId}`,
      );
    });

    it('should throw an error if user ID is invalid', async () => {
      const userId = 'invalid';

      await expect(controller.deleteUser(userId)).rejects.toThrow(HttpException);
      await expect(controller.deleteUser(userId)).rejects.toMatchObject({
        message: 'Invalid user ID',
        status: HttpStatus.BAD_REQUEST,
      });
    });

    it('should throw an error if AdminService.deleteUser fails', async () => {
      const userId = 1;

      jest.spyOn(adminService, 'deleteUser').mockRejectedValue(new Error('Internal server error'));

      await expect(controller.deleteUser(userId.toString())).rejects.toThrow(HttpException);
      await expect(controller.deleteUser(userId.toString())).rejects.toMatchObject({
        message: 'Failed to delete user',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    });

    it('should log an error if AdminService.deleteUser fails', async () => {
      const userId = 1;

      jest.spyOn(adminService, 'deleteUser').mockRejectedValue(new Error('Internal server error'));

      await expect(controller.deleteUser(userId.toString())).rejects.toThrow(HttpException);
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('Error deleting user'),
        expect.any(String), // Trace de l'erreur
      );
    });
  });
});