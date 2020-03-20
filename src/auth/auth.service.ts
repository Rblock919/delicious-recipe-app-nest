import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signIn(): string {
    return 'Signed In!';
  }

  signUp(): string {
    return 'Signed Up!';
  }
}
