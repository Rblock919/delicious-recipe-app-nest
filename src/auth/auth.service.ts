import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

import { LoginModel } from './interfaces/login.model.interface';
import { User } from '../user/interface/user.interface';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Login') private loginModel: LoginModel,
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

  async login(user: User, remoteAddress: string): Promise<any> {
    const identityKey = `${user.username}-${remoteAddress}`;

    // eslint-disable-next-line new-cap
    if (await this.loginModel.loginInProgress(identityKey)) {
      // TODO: tell client login already is in progress
      console.log('login already in progress');
      return null;
    }

    if (!(await this.loginModel.canAuthenticate(identityKey))) {
      await this.loginModel.endProgress(identityKey);
      // TODO: tell client account is temp locked out due to high # of attempts
      console.log('too many attempts');
      return null;
    }

    const successResult = await this.loginModel.successfulLoginAttempt(
      identityKey
    );

    if (!successResult) {
      console.log('unsuccessful successfulLoginAttempt mongoose call');
      return null;
    }

    const payload = { username: user.username, sub: user._id };
    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }

  async getUserdata(user: User): Promise<User> {
    const foundUser = await this.userModel.findById(user._id, '-password -__v');
    if (!foundUser) {
      return null;
    }
    return foundUser;
  }

  // eslint-disable-next-line class-methods-use-this
  async logout(req: any): Promise<any> {
    req.session.destroy(err => {
      if (err) {
        // TODO throw proper exception?
        return null;
      }
      return { message: 'Successfully Logged Out!' };
    });
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

  private delayResponse = response => {
    setTimeout(() => {
      response();
    }, 600);
  };
}
