import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../interface/user.interface';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // Validation at database level
    // match: /[a-zA-Z]*/, //some reg ex
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

/* Can't use arrow functions below due to the usage of the 'this' keyword */

// TODO: convert this into a nestjs mongoose specific hook
// eslint-disable-next-line func-names
UserSchema.pre<User>('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // TODO remove this hardcoded salt rounds
    this.password = await bcrypt.hash(this.password, 12);
    return next();
  } catch (err) {
    console.log(`err ${err}`);
    return next(err);
  }
});

// eslint-disable-next-line func-names
UserSchema.methods.passwordIsValid = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    console.error(`err: ${err}`);
    return false;
  }
};

// export async function preSaveHook(next: Function) {
//   if (!this.isModified('password')) {
//     return next();
//   }

//   try {
//     this.password = await bcrypt.hash(this.password, 12);
//     return next();
//   } catch (err) {
//     console.log(`err ${err}`);
//     return next(err);
//   }
// }
