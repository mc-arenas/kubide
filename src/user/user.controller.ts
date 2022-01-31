import {
  Controller,
  Get,
  Request,
  Param,
  UseGuards,
  Put,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ClientAuthGuard } from 'src/auth/guards/client-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(ClientAuthGuard)
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @UseGuards(ClientAuthGuard)
  @Get('me')
  async findMe(@Request() req) {
    return await this.userService.findOne(req.user.userId);
  }

  @UseGuards(ClientAuthGuard)
  @Get(':id')
  async findOne(@Param('id') userId: number) {
    return await this.userService.findOne(userId);
  }

  @UseGuards(ClientAuthGuard)
  @Put()
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    if (updateUserDto.name == undefined || updateUserDto.name.trim() == '') {
      throw { message: 'Invalid data', statusCode: HttpStatus.BAD_REQUEST };
    }

    return await this.userService.updateUser(req.user.userId, updateUserDto);
  }
}
