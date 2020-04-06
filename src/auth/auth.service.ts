import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

import { LoginModel } from './interfaces/login.model.interface';
import { User } from '../user/interface/user.interface';
import { UserDto } from '../user/dto/user.dto';
import { LockedException } from './exceptions/locked.exception';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Login') private loginModel: LoginModel,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ username }, '-__v').exec();
    if (user && (await user.passwordIsValid(password))) {
      return {
        username: user.username,
        _id: user._id,
        isAdmin: user.isAdmin,
      } as User;
    }
    return null;
  }

  async login(
    user: UserDto,
    remoteAddress: string
  ): Promise<{ user: UserDto; token: string }> {
    const identityKey = `${user.username}-${remoteAddress}`;

    if (await this.loginModel.loginInProgress(identityKey)) {
      throw new LockedException(
        'Login is already in progess. Please try again'
      );
    }

    if (!(await this.loginModel.canAuthenticate(identityKey))) {
      await this.loginModel.endProgress(identityKey);
      throw new LockedException(
        'Account is locked due to excessive number of login attempts. Please try again in a few minutes.'
      );
    }

    const successResult = await this.loginModel.successfulLoginAttempt(
      identityKey
    );

    if (!successResult) {
      console.log('unsuccessful successfulLoginAttempt mongoose call');
    }

    const payload = { username: user.username, sub: user._id };

    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }

  async getUserdata(id: string): Promise<User> {
    const foundUser = await this.userModel.findById(id, '-password -__v');
    if (!foundUser) {
      return null;
    }
    return foundUser;
  }

  // eslint-disable-next-line class-methods-use-this
  async logout(req: any): Promise<{ message: string }> {
    try {
      req.logout();
      return { message: 'Successfully Logged Out!' };
    } catch (err) {
      console.log({ err });
      return { message: JSON.stringify(err) };
    }
  }

  async validateAdmin(id: string): Promise<User> {
    const user = await this.userModel.findById(id, '-password -__v').exec();
    if (user && user.isAdmin) {
      return user;
    }
    return null;
  }

  async regsiter(userDto: UserDto): Promise<User> {
    // eslint-disable-next-line new-cap
    const newUser = new this.userModel(userDto);
    try {
      const createdUser = await newUser.save();
      if (createdUser) {
        const { username, _id, isAdmin } = createdUser;
        const returnUser = { username, _id, isAdmin } as User;
        return returnUser;
      }
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Username Already Exists');
      }
      console.log('err creating new user', error);
      throw new BadRequestException('Error creating user');
    }
    return null;
  }

  private delayResponse = response => {
    setTimeout(() => {
      response();
    }, 600);
  };
}
