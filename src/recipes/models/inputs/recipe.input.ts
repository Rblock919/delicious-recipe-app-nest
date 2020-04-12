import {
  IsDefined,
  IsArray,
  IsOptional,
  IsNotEmpty,
  IsString,
  IsObject,
  IsEnum,
} from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

import { StepInput } from './step.input';
import { RatersInput } from './raters.input';
import { RecipeProducer } from '../../enums/recipe-producer.enum';
import { IngredientInput } from './ingredient.input';
import { NutritionValuesInput } from './nutrition-values.input';

// TODO: check class-validator api and make sure there's not some decorators I'm forgetting

@InputType()
export class RecipeInput {
  @IsOptional()
  @IsNotEmpty()
  @Field({ nullable: true })
  _id?: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Field()
  title: string;

  // @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(RecipeProducer)
  @Field(type => RecipeProducer)
  producer: RecipeProducer;

  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  @Field(type => [IngredientInput])
  ingredients: IngredientInput[];

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @Field(type => [String], { nullable: 'itemsAndList' })
  preCook?: string[];

  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  @Field(type => [StepInput])
  steps: StepInput[];

  @IsDefined()
  @IsNotEmpty()
  @IsObject()
  @Field(type => NutritionValuesInput)
  nutritionValues: NutritionValuesInput;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Field()
  imgDir: string;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @Field(type => [String], { nullable: 'itemsAndList' })
  favoriters?: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  @Field(type => RatersInput, { nullable: true })
  raters?: RatersInput;
}
