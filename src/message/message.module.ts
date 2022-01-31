import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database.module';
import { messagesProviders } from './providers/messages.providers';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot()],
  controllers: [MessageController],
  providers: [MessageService, ...messagesProviders],
})
export class MessageModule {}
