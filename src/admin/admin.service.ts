import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../user/interface/user.interface';

@Injectable()
export class AdminService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async getUsers(): Promise<User[]> {
    return this.userModel.find({}, '-__v -password').exec();
  }
}
