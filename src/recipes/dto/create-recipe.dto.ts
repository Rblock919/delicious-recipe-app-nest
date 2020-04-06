import {
  IsDefined,
  IsArray,
  IsOptional,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

import { NutritionValuesDto } from './create-nutrition-values.dto';

export class RecipeDto {
  @IsOptional()
  @IsNotEmpty()
  _id?: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  producer: string;

  @IsDefined()
  @IsNotEmpty()
  ingredients: { name: string; amount: string }[];

  @IsOptional()
  @IsArray()
  preCook?: string[];

  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  steps: { name: string; body: string }[];

  @IsNotEmpty()
  nutritionValues: NutritionValuesDto;

  @IsNotEmpty()
  @IsString()
  imgDir: string;

  @IsOptional()
  @IsArray()
  favoriters: string[];

  @IsOptional()
  @MaxLength(20, {
    each: true,
  })
  raters: Map<string, number>;
}
