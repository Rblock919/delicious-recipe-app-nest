import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../user/interface/user.interface';
import { EditUserInput } from '../user/models/inputs/edit-user.input';

@Injectable()
export class AdminService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async getUsers(): Promise<User[]> {
    return this.userModel.find({}, '-__v -password').exec();
  }

  async updateUsers(editedUsers: EditUserInput[]): Promise<string> {
    const setToFalseIds = [];
    const setToTrueIds = [];

    editedUsers.forEach(user => {
      if (user.isAdmin === true) {
        setToTrueIds.push(user._id);
      } else if (user.isAdmin === false) {
        setToFalseIds.push(user._id);
      }
    });

    let updateTrueResult;
    let updateFalseResult;

    if (setToTrueIds.length > 0) {
      updateTrueResult = await this.userModel
        .updateMany({ _id: { $in: setToTrueIds } }, { $set: { isAdmin: true } })
        .exec();
    }
    if (setToFalseIds.length > 0) {
      updateFalseResult = await this.userModel
        .updateMany(
          { _id: { $in: setToFalseIds } },
          { $set: { isAdmin: false } }
        )
        .exec();
    }

    if (updateTrueResult || updateFalseResult) {
      return 'Success';
    }
    throw new InternalServerErrorException('Error updating users');
  }
}
