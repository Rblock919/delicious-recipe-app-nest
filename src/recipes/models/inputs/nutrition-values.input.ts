import { InputType, Field, Int } from '@nestjs/graphql';
import { IsDefined, IsInt, IsOptional } from 'class-validator';

@InputType()
export class NutritionValuesInput {
  @IsDefined()
  @IsInt()
  @Field(type => Int)
  calories: number;

  @IsInt()
  @IsOptional()
  @Field(type => Int, { nullable: true })
  fat?: number;

  @IsInt()
  @IsOptional()
  @Field(type => Int, { nullable: true })
  saturatedFat?: number;

  @IsInt()
  @IsOptional()
  @Field(type => Int, { nullable: true })
  carbohydrate?: number;

  @IsInt()
  @IsOptional()
  @Field(type => Int, { nullable: true })
  sugar?: number;

  @IsInt()
  @IsOptional()
  @Field(type => Int, { nullable: true })
  fiber?: number;

  @IsInt()
  @IsOptional()
  @Field(type => Int, { nullable: true })
  protein?: number;

  @IsInt()
  @IsOptional()
  @Field(type => Int, { nullable: true })
  cholesterol?: number;

  @IsInt()
  @IsOptional()
  @Field(type => Int, { nullable: true })
  sodium?: number;
}
