import { InputType, Field, Int } from '@nestjs/graphql';
import { IsArray, IsDefined } from 'class-validator';

@InputType()
export class RatersInput {
  @IsDefined()
  @IsArray()
  @Field(type => [String], { nullable: 'items' })
  keys: string[];

  @IsDefined()
  @IsArray()
  @Field(type => [Int], { nullable: 'items' })
  values: number[];
}
