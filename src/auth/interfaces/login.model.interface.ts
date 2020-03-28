import { Model } from 'mongoose';
import { Login } from './login.interface';

export interface LoginModel extends Model<Login> {
  loginInProgress(key: string): Promise<any>;
  endProgress(key: string): Promise<boolean>;
  canAuthenticate(key: string): Promise<boolean>;
  failedLoginAttempt(key: string): Promise<any>;
  successfulLoginAttempt(key: string): Promise<any>;
}
