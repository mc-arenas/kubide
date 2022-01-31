import { Injectable, Inject } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async findAll() {
    return await this.usersRepository.findAll({ where: { active: true } });
  }

  async findOne(userId: number) {
    return await this.usersRepository.findByPk(userId);
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(updateUserDto, {
      where: {
        id: userId,
      },
    });
  }
}
