import { Document } from 'mongoose';
import { NutritionValues } from './nutrition-values.interface';

export interface Recipe extends Document {
  readonly title: string;
  readonly producer: string;
  readonly ingredients: { name: string; amount: string }[];
  readonly preCook: string[];
  readonly steps: { name: string; body: string }[];
  readonly nutritionValues: NutritionValues;
  readonly imgDir: string;
  readonly favoriters: string[];
  readonly raters: Map<string, number>;
}
