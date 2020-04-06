import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentRequest = createParamDecorator(
  (
    data: unknown,
    context: ExecutionContext
  ): { _id: string; username: string } => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
);
