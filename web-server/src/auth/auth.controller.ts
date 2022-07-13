import { Get, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('')
  async getUser(
    @Req() req: Request, 
    @Res() res: Response
  ) {
    const findUser = await this.authService.getUser(req.body);
    res.json({ data: findUser });
  }

  @Post('register')
  async createUser(
    @Req() req: Request,
    @Res() res: Response
  ) {
    const newUser = await this.authService.userRegister(req.body);
    res.json({
      message: 'User created successfully',
      data: newUser,
    });
  }

  @Post('login')
  async userLogin(
    @Req() req: Request,
    @Res() res: Response
  ){
    const userData = await this.authService.userLogin(req.body);
    res.json({
      message: 'Login success',
      data: userData,
    });
  }
}
