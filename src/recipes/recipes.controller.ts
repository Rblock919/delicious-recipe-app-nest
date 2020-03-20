import { Controller, Get, Param } from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  getRecipes(): string {
    return this.recipesService.getRecipes();
  }

  @Get(':id')
  getRecipe(@Param('id') id: string): string {
    return this.recipesService.getRecipe(id);
  }
}
