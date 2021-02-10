import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserRoleEnum } from './user.entity';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    userController = new UserController(userService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [
        {
          id: 'string',
          email: 'string',
          role: UserRoleEnum.ADMIN,
          person: null,
        },
        {
          id: 'string2',
          email: 'string2',
          role: UserRoleEnum.MODERATOR,
          person: null,
        },
      ];
      jest.spyOn(userService, 'getAll').mockImplementation(async () => result);

      expect(await userController.getAll()).toBe(result);
    });
  });

  describe('change', () => {
    it('should return success: true', async () => {
      const result = { success: true };
      jest.spyOn(userService, 'changeRole').mockImplementation(async () => result);

      expect(await userController.changeRole('', 2)).toBe(result);
    });
  });
});
