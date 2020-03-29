import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '../auth.service';
import { User } from '../../user/interface/user.interface';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('TOKEN_SECRET'),
    });
  }

  async validate(payload: any): Promise<User> {
    const id = payload.sub;
    const user = await this.authService.validateAdmin(id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
