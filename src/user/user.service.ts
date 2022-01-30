import { Injectable, Inject } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  findAll() {
    return this.usersRepository.findAll({ where: { active: true } });
  }

  findOne(userId: number) {
    return this.usersRepository.findByPk(userId);
  }

  updateUser(userId: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(updateUserDto, {
      where: {
        id: userId
      }
    });
  }
}
