import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { clientAuthStrategy } from './client-auth.strategy';
import { ConfigModule } from '@nestjs/config';
import { usersProviders } from 'src/user/providers/users.providers';
import { DatabaseModule } from 'src/database.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, clientAuthStrategy, ...usersProviders],
})
export class AuthModule {}
