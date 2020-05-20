import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class NutritionValues {
  @Field(type => Int)
  calories: number;

  @Field(type => Float, { nullable: true })
  fat?: number;

  @Field(type => Float, { nullable: true })
  saturatedFat?: number;

  @Field(type => Int, { nullable: true })
  carbohydrate?: number;

  @Field(type => Int, { nullable: true })
  sugar?: number;

  @Field(type => Int, { nullable: true })
  fiber?: number;

  @Field(type => Int, { nullable: true })
  protein?: number;

  @Field(type => Int, { nullable: true })
  cholesterol?: number;

  @Field(type => Int, { nullable: true })
  sodium?: number;
}
