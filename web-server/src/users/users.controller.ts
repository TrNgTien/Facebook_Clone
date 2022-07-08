import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local.auth.gurad';

const saltOrRounds = 10;

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async createUser(
    @Body('userName') userName: string,
    @Body('password') password: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('DOB') DOB: string,
    @Body('gender') gender: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.userRegister(
      userName,
      hashedPassword,
      firstName,
      lastName,
      DOB,
      gender
    );
    return {
      msg: 'User successfully registered',
      userName: result.userName
    };
  }

  @Get('/')
  async getUser(@Body('userName') userName: string) {
    const findUser = await this.usersService.getUser(userName);
    return findUser;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async userLogin(@Request() req) {
    console.log(req.user);
  }
}
