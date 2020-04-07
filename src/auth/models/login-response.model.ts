import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../../user/models/types/user.model';

@ObjectType()
export class LoginResponse {
  @Field(type => User)
  user: User;

  @Field()
  token: string;
}
