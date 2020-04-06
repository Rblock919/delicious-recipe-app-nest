import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Step {
  @Field()
  name: string;

  @Field()
  body: string;
}
