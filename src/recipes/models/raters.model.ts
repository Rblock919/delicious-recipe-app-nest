import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Raters {
  @Field(type => [String], { nullable: 'items' })
  keys: string[];

  @Field(type => [Int], { nullable: 'items' })
  values: number[];
}
