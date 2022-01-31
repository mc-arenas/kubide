import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @Inject('MESSAGES_REPOSITORY')
    private messagesRepository: typeof Message,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    return await this.messagesRepository.create({...createMessageDto})
  }

  async findAll(userId: number) {
    return await this.messagesRepository.findAll({
      where: {
        userId: userId
      }
    })
  }
}
