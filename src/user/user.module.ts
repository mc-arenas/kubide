import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database.module';
import { usersProviders } from './providers/users.providers';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot()],
  controllers: [UserController],
  providers: [UserService, ...usersProviders],
})
export class UserModule {}
