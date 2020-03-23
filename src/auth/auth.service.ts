import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

import { User } from '../user/interface/user.interface';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  // TODO implement typed returns for these methods and the possibly strategies too
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username }, '-__v').exec();
    if (user && (await user.passwordIsValid(password))) {
      return { _id: user._id, username: user.username, isAdmin: user.isAdmin };
    }
    return null;
  }

  async login(user: User): Promise<any> {
    const payload = { username: user.username, sub: user._id };
    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }

  async validateAdmin(id: string): Promise<any> {
    const user = await this.userModel.findById(id).exec();
    if (user && user.isAdmin) {
      return { _id: user._id, username: user.username, isAdmin: user.isAdmin };
    }
    return null;
  }

  async regsiter(userDto: UserDto): Promise<any> {
    // eslint-disable-next-line new-cap
    const newUser = new this.userModel(userDto);
    try {
      const createdUser = await newUser.save();
      if (createdUser) {
        const { username, _id, isAdmin } = createdUser;
        return {
          user: { username, _id, isAdmin },
        };
      }
    } catch (error) {
      if (error.code === 11000) {
        // TODO: return status 409
        console.log('err: username already exists');
      }
      console.log('err creating new user', error);
      // return null;
    }
    return null;
  }
}
