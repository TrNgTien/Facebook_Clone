import { Body, Request, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '../model/user.models';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('register')
  // async userRegister(@Body() userDto: User) {
  //   return await this.authService.userRegister(userDto);
  // }

  // @Post('login')
  // async userLogin(@Body() userDto: User) {
  //   return await this.authService.userLogin(userDto);
  // }

  // // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return this.authService.userLogin(req.user);
  // }
  
}
