import { NutritionValuesDto } from './create-nutrition-values.dto';

export class RecipeDto {
  title: string;

  producer: string;

  ingredients: { name: string; amount: string }[];

  preCook: string[];

  steps: { name: string; body: string }[];

  nutritionValues: NutritionValuesDto;

  imgDir: string;

  favoriters: string[];

  raters: Map<number, number>;
}
