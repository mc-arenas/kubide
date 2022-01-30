import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginEntity } from './entities/login.entity';

@Injectable()
export class AuthService {
 
  constructor (private jwtService: JwtService){ }

  login(loginAuthDto: LoginAuthDto): LoginEntity {
    const payload = { id: 2, role: 'client' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  register(registerAuthDto: RegisterAuthDto) {
    return 'Ok';
  }
}
