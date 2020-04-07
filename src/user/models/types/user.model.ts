import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(type => ID, { nullable: true })
  _id?: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  password: string;

  @Field()
  isAdmin: boolean;
}
