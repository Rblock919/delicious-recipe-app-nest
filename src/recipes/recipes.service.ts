import { Injectable } from '@nestjs/common';

@Injectable()
export class RecipesService {
  getRecipes(): string {
    return 'Hello Recipes!';
  }

  getRecipe(id: string): string {
    return `Hello Recipe #${id}`;
  }
}
