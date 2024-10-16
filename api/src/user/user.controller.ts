import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { response } from 'src/utils/response.util';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('v1')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }
  @Post('login')
  // used Response from express to set cookie
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    try {
      const result = await this.userService.login(loginUserDto);

      res.cookie('access_token', result.accessToken);
      res.cookie('refresh_token', result.refreshToken);

      const { accessToken, refreshToken, ...userInfo } = result;

      return res.json({
        success: true,
        message: 'Login successful!',
        data: userInfo,
      });
    } catch (error) {
      console.error('Login error:', error);

      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'An unexpected error occurred.',
        data: null,
      });
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
