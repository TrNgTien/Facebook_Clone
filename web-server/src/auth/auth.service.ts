import { Injectable, NotAcceptableException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from '../auth/types/tokens.type';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from '../constants/jwtCons';
import { User, UserDocument } from '../model/user.models';
import { AuthDto } from './dto';

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

  async getToken(userId: string, userName: string): Promise<Tokens>{
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync({
        sub: userId,
        userName,
      }, {
        secret: jwtConstants.atSecret,
        expiresIn: '1h',
      }),
      this.jwtService.signAsync({
        sub: userId,
        userName,
      }, {
        secret: jwtConstants.rtSecret,
        expiresIn: 60 * 60 * 24 * 7,
      }),
    ]);
    return {
      access_token: at,
      refresh_token: rt
    }
  }

  async userRegister(
      userName: string, 
      passReq: string,
      firstName: string,
      lastName: string,
      day: string,
      month: string,
      year: string,
      gender: string
    ) {
    const user = await this.userModel.findOne({ userName });
    if (user) throw new NotAcceptableException('Account already exists');
    if (passReq.length < 6) throw new NotAcceptableException('Password must be at least 6 characters');
    const hash = await this.hashData(passReq);

    const newUser = new this.userModel({
      userName,
      password: hash,
      firstName,
      lastName,
      DOB: `${day}/${month}/${year}`,
      gender
    });
    await newUser.save();
    // const token = await this.getToken(newUser._id, newUser.userName);
    // await this.updateRtHash(newUser._id, token.refresh_token);
    const userData = ({
      newUser,
      // token,
    });
    return userData;
  }

  async userLogin(userName: string, passReq: string) {
    const user = await this.userModel.findOne({ userName });
    if (!user) throw new ForbiddenException('Account does not exist');

    const checkPass = await bcrypt.compare(passReq, user.password);
    if (!checkPass) throw new ForbiddenException('Wrong password');
    
    const payload = { userName: user.userName, userId: user._id };
    const token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
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

  async getUser(userName: string) {
    const user = await this.userModel.findOne({userName});
    return user;
  }

  // async updateRtHash(userId: string, rt: string) {
  //   const hash = await this.hashData(rt);
  //   const user = await this.userModel.findByIdAndUpdate(userId, {
  //     refreshToken: hash,
  //   });
  // }
}
