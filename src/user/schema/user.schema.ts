import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

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

// Can't use arrow function below due to the usage of the 'this' keyword
// eslint-disable-next-line func-names
UserSchema.methods.passwordIsValid = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    console.error(`err: ${err}`);
    return false;
  }
};
