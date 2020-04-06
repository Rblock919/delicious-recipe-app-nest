import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAdminGuard extends AuthGuard('admin') {
  // eslint-disable-next-line class-methods-use-this
  getRequest(context: ExecutionContext) {
    console.log('in gql admin auth guard');
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
