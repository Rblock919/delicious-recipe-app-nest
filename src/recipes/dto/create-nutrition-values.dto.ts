import { IsDefined, IsInt, IsOptional } from 'class-validator';

export class NutritionValuesDto {
  @IsDefined()
  @IsInt()
  calories: number;

  @IsOptional()
  @IsInt()
  fat: number;

  @IsOptional()
  @IsInt()
  saturatedFat: number;

  @IsOptional()
  @IsInt()
  carbohydrate: number;

  @IsOptional()
  @IsInt()
  sugar: number;

  @IsOptional()
  @IsInt()
  fiber: number;

  @IsOptional()
  @IsInt()
  protein: number;

  @IsOptional()
  @IsInt()
  cholesterol: number;

  @IsOptional()
  @IsInt()
  sodium: number;
}
