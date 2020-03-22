import { Document } from 'mongoose';

export interface User extends Document {
  readonly username: string;
  password: string; // subject to change due to hashing
  readonly isAdmin: boolean;
  passwordIsValid(password: string): Promise<boolean>;
}
