import {
  UseGuards,
  UnauthorizedException,
  BadRequestException,
  Request,
} from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { User } from '../user/models/user.model';
import { UserInput } from '../user/models/inputs/user.input';
import { LoginResponse } from './models/login-response.model';
import { LogoutResponse } from './models/logout-response.model';
import { GqlJwtGuard } from './guards/gql-jwt.guard';
import { RemoteAddress } from './decorators/remote-addess.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentRequest } from './decorators/gql-request.decorator';

@Resolver(of => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(GqlJwtGuard)
  @Query(returns => User, { name: 'getUserData' })
  async getUserData(@CurrentUser() user: { _id: string; username: string }) {
    return this.authService.getUserdata(user._id);
  }

  @UseGuards(GqlJwtGuard)
  @Query(returns => LogoutResponse, { name: 'logout' })
  async signOut(@CurrentRequest() req: Request) {
    return this.authService.logout(req);
  }

  @Mutation(returns => LoginResponse, { name: 'login' })
  async signIn(
    @Args('user') inUser: UserInput,
    @RemoteAddress() remoteAddress: string
  ) {
    const user = await this.authService.validateUser(
      inUser.username,
      inUser.password
    );
    if (!user) {
      throw new UnauthorizedException('Incorrect Username and/or Password');
    }
    return this.authService.login(user, remoteAddress);
  }

  @Mutation(returns => LoginResponse, { name: 'register' })
  async signUp(
    @Args('userInfo') userInfo: UserInput,
    @RemoteAddress() remoteAddress: string
  ) {
    const user = await this.authService.regsiter({
      username: userInfo.username,
      password: userInfo.password,
    });
    if (!user) {
      throw new BadRequestException();
    }
    return this.authService.login(user, remoteAddress);
  }
}
