import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Ingredient {
  @Field()
  name: string;

  @Field()
  amount: string;
}
