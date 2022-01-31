import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ClientAuthGuard } from 'src/auth/guards/client-auth.guard';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(ClientAuthGuard)
  @Post()
  async create(@Request() req, @Body() createMessageDto: CreateMessageDto) {
    createMessageDto.userId = req.user.userId

    if (createMessageDto.content == undefined || createMessageDto.content.trim() == '') {
      throw { message: 'Invalid data', statusCode: HttpStatus.BAD_REQUEST };
    }

    return this.messageService.create(createMessageDto);
  }

  @UseGuards(ClientAuthGuard)
  @Get()
  async findAll(@Request() req) {
    return await this.messageService.findAll(req.user.userId);
  }
}
