import { RegisterUserResponse } from './../interfaces/user';
import { Test, TestingModule } from '@nestjs/testing';
import { hashPwd } from 'src/utils/hashPwd';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fitler user data', () => {
    const user = new User();
    user.email = 'test@email.com';
    user.pwdHash = 'Haslo';
    user.role = 1;

    const filteredUser = service.filter(user)
    expect(filteredUser).toMatchObject({ email: 'test@email.com', role: 1 });
  });
});
