import { Controller, Get, Param, UseGuards, Post, Body } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminAuthGuard } from '../auth/guards/admin-auth.guard';
import { RecipesService } from './recipes.service';
import { Recipe } from './interfaces/recipe.interface';

@UseGuards(JwtAuthGuard)
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async getRecipes(): Promise<Recipe[]> {
    return this.recipesService.getRecipes();
  }

  @UseGuards(AdminAuthGuard)
  @Get('approval')
  async getApprovalList(): Promise<Recipe[]> {
    return this.recipesService.getApprovalList();
  }

  @Get(':id')
  async getRecipe(@Param('id') id: string): Promise<Recipe> {
    return this.recipesService.getRecipe(id);
  }

  @UseGuards(AdminAuthGuard)
  @Get('approval/:id')
  async getApprovalById(@Param('id') id: string): Promise<Recipe> {
    return this.recipesService.getApprovalById(id);
  }

  @Post('submit')
  async submitForApproval(@Body('recipe') recipe: any): Promise<any> {
    return this.recipesService.submitForApproval(recipe);
  }
}
