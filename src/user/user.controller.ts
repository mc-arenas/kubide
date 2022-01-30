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
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(ClientAuthGuard)
  @Get('me')
  findMe(@Request() req) {
    return this.userService.findOne(req.user.userId);
  }

  @UseGuards(ClientAuthGuard)
  @Get(':id')
  findOne(@Param('id') userId: number) {
    return this.userService.findOne(userId);
  }

  @UseGuards(ClientAuthGuard)
  @Put()
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    if (
      updateUserDto.name == undefined ||
      updateUserDto.name.trim() == ""
    ) {
      throw { message: 'Invalid data', statusCode: HttpStatus.BAD_REQUEST };
    }

    return this.userService.updateUser(req.user.userId, updateUserDto);
  }
}
