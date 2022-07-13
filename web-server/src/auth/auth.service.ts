import { Injectable, NotAcceptableException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from '../auth/types/tokens.type';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../model/user.models';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  hashData(data: string) {
    return bcrypt.hash(data, saltOrRounds);
  }

  // async getToken(userId: string, userName: string): Promise<Tokens>{
  //   const [at, rt] = await Promise.all([
  //     this.jwtService.signAsync({
  //       sub: userId,
  //       userName,
  //     }, {
  //       secret: jwtConstants.atSecret,
  //       expiresIn: '1h',
  //     }),
  //     this.jwtService.signAsync({
  //       sub: userId,
  //       userName,
  //     }, {
  //       secret: jwtConstants.rtSecret,
  //       expiresIn: 60 * 60 * 24 * 7,
  //     }),
  //   ]);
  //   return {
  //     access_token: at,
  //     refresh_token: rt
  //   }
  // }

  async userRegister(data) {
    const user = await this.userModel.findOne({ userName: data.userName });
    if (user) throw new NotAcceptableException('Account already exists');
    if (data.password.length < 6) throw new NotAcceptableException('Password must be at least 6 characters');
    const hash = await this.hashData(data.password);

    const newUser = new this.userModel({
      userName: data.userName,
      password: hash,
      firstName: data.firstName,
      lastName: data.lastName,
      DOB: data.DOB,
      gender: data.gender,
    });
    await newUser.save();
    return newUser;
    // const token = await this.getToken(newUser._id, newUser.userName);
    // await this.updateRtHash(newUser._id, token.refresh_token);
    // const userData = ({
    //   newUser,
    //   // token,
    // });
  }

  async userLogin(data) {
    const user = await this.userModel.findOne({ userName: data.userName });
    if (!user) throw new ForbiddenException('Account does not exist');

    const checkPass = await bcrypt.compare(data.password, user.password);
    if (!checkPass) throw new ForbiddenException('Wrong password');
    
    const payload = { userName: user.userName, userId: user._id };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1w',
    });
    // const token = await this.getToken(user._id, user.userName);
    const { password, ...rest } = user.toObject();
    const userData = ({
      ...rest,
      token,
    });
    return userData;
  }

  async getUser(data) {
    const user = await this.userModel.findOne({ userName: data.userName });
    if (!user) throw new ForbiddenException('Account does not exist');
    const { password, ...rest } = user.toObject();
    const userData = ({
      ...rest,
    });
    return userData;
  }
}
