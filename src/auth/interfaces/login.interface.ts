import { Document } from 'mongoose';

export interface Login extends Document {
  readonly identityKey: string;
  readonly failedAttempts: number;
  readonly timeOut: Date;
  inProgress: boolean;
}
