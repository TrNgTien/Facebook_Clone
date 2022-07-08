import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../model/user.models';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(userName);
    if (user && user.password === password) {
        const {password, ...result} = user;
        return result;
    }
    return null;
  }

  async loginWithCredentials(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
        access_token: this.jwtService.sign(payload),
    };
}
  // async userLogin(user: any) {
  //   const payload = { userName: user.userName, userId: user._id };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}
