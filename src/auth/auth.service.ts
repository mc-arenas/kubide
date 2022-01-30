import { Inject, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: {
        active: true,
        email: email,
      },
    });
  }

  async registerUser(registerAuthDto: RegisterAuthDto) {
    return await this.usersRepository.create({...registerAuthDto});
  }

}
