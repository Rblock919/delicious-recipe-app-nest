import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminAuthGuard } from '../auth/guards/admin-auth.guard';
import { RecipesService } from './recipes.service';
import { RecipeDto } from './dto/create-recipe.dto';
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

  @UseGuards(AdminAuthGuard)
  @Post('add')
  async addRecipe(
    @Body('approvalId') id: string,
    @Body('recipe') recipe: RecipeDto
  ): Promise<any> {
    return this.recipesService.addRecipe(id, recipe);
  }

  // TODO: test below route
  @UseGuards(AdminAuthGuard)
  @Patch('update')
  async updateRecipe(@Body('recipe') recipe: RecipeDto): Promise<Recipe> {
    return this.recipesService.updateRecipe(recipe);
  }

  @Post('submit')
  async submitForApproval(@Body('recipe') recipe: RecipeDto): Promise<Recipe> {
    return this.recipesService.submitForApproval(recipe);
  }

  @UseGuards(AdminAuthGuard)
  @Delete('delete/:id')
  async deleteRecipe(@Param('id') id: string): Promise<any> {
    return this.recipesService.deleteRecipe(id);
  }

  @UseGuards(AdminAuthGuard)
  @Delete('reject/:id')
  async rejectRecipe(@Param('id') id: string): Promise<any> {
    return this.recipesService.rejectRecipe(id);
  }

  /* TODO: eventually refactor favorite and rate calls to not just use the body param and
  intelligently add/remove the requesting users value */
  @Post('favorite')
  async favoriteRecipe(
    @Body('_id') id: string,
    @Body('favoriters') favoriters: string[]
  ): Promise<any> {
    return this.recipesService.favoriteRecipe(id, favoriters);
  }

  // TODO: test below route
  @Post('rate')
  async rateRecipe(
    @Body('_id') id: string,
    @Body('raters') raters: Map<string, number>
  ): Promise<any> {
    return this.recipesService.rateRecipe(id, raters);
  }
}
