import { HttpException } from '@nestjs/common';

export class LockedException extends HttpException {
  constructor(message: string) {
    super(message, 423);
  }
}
