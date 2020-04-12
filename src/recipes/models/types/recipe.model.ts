import { Field, ObjectType, ID } from '@nestjs/graphql';

import { RecipeProducer } from '../../enums/recipe-producer.enum';
import { NutritionValues } from './nutrition-values.model';
import { Ingredient } from './ingredient.model';
import { Raters } from './raters.model';
import { Step } from './step.model';

@ObjectType()
export class Recipe {
  @Field(type => ID, { nullable: true })
  _id?: string;

  @Field()
  title: string;

  @Field(type => RecipeProducer)
  producer: RecipeProducer;

  @Field(type => [Ingredient])
  ingredients: Ingredient[];

  @Field(type => [String], { nullable: 'itemsAndList' })
  preCook?: string[];

  @Field(type => [Step])
  steps: Step[];

  @Field(type => NutritionValues)
  nutritionValues: NutritionValues;

  @Field()
  imgDir: string;

  @Field(type => [String], { nullable: 'itemsAndList' })
  favoriters?: string[];

  @Field(type => Raters)
  raters: Raters;
}
