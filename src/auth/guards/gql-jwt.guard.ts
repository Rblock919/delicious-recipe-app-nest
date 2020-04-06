import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlJwtGuard extends AuthGuard('jwt') {
  // eslint-disable-next-line class-methods-use-this
  getRequest(context: ExecutionContext) {
    console.log('in gql-jwt auth guard');
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
