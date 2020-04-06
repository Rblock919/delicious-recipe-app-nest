import { PassportStrategy } from '@nestjs/passport';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';
import { User } from '../../user/interface/user.interface';

@Injectable()
export class RegisterStrategy extends PassportStrategy(Strategy, 'register') {
  constructor(private authService: AuthService) {
    super();
  }

  /* TODO: find out if i can still access these from the gql mutations params to still use strategies
  for registering and loging in */
  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.regsiter({ username, password });
    if (!user) {
      throw new BadRequestException(
        'Could not successfully register. Please try again.'
      );
    }
    return user;
  }
}
