import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../model/user.models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async userRegister(
    userName: string,
    password: string,
    firstName: string,
    lastName: string,
    DOB: string,
    gender: string
  ): Promise<User> {
    const createdUser = new this.userModel({
      userName,
      password,
      firstName,
      lastName,
      DOB,
      gender,
    });
    return await createdUser.save();
  }

  async getUser(userName: string) {
    const user = await this.userModel.findOne({userName});
    return user;
  }
}
