import { Body, Get, Controller, Post, UseGuards, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getUser(@Body('userName') userName: string) {
    const findUser = await this.authService.getUser(userName);
    return findUser;
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body('userName') userName: string,
    @Body('password') password: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('day') day: string,
    @Body('month') month: string,
    @Body('year') year: string,
    @Body('gender') gender: string
  ) {
    const newUser = await this.authService.userRegister(userName, password, firstName, lastName, day, month, year, gender);
    return newUser;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async userLogin(
    @Body('userName') userName: string,
    @Body('password') password: string
  ){
    const userData = await this.authService.userLogin(userName, password);
    return userData;
  }
}
