import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../../user/models/user.model';

@ObjectType()
export class LoginResponse {
  @Field(type => User)
  user: User;

  @Field()
  token: string;
}
