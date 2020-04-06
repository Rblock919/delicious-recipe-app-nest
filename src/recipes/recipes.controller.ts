import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Body,
  Delete,
  Patch,
  UsePipes,
  ParseArrayPipe,
} from '@nestjs/common';

import { ObjectIdValidationPipe } from './pipes/object-id-validation.pipe';
import { RecipeValidationPipe } from './pipes/recipe-validation.pipe';
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
  async getRecipe(
    @Param('id', ObjectIdValidationPipe) id: string
  ): Promise<Recipe> {
    return this.recipesService.getRecipe(id);
  }

  @UseGuards(AdminAuthGuard)
  @Get('approval/:id')
  async getApprovalById(
    @Param('id', ObjectIdValidationPipe) id: string
  ): Promise<Recipe> {
    return this.recipesService.getApprovalById(id);
  }

  @UseGuards(AdminAuthGuard)
  @Post('add')
  async addRecipe(
    @Body('approvalId', ObjectIdValidationPipe) id: string,
    @Body('recipe', RecipeValidationPipe) recipe: RecipeDto
  ): Promise<{ id: string }> {
    // return this.recipesService.addRecipe(id, recipe);
    return null;
  }

  @UsePipes(RecipeValidationPipe)
  @UseGuards(AdminAuthGuard)
  @Patch('update')
  async updateRecipe(@Body('recipe') recipe: RecipeDto): Promise<Recipe> {
    // return this.recipesService.updateRecipe(recipe);
    return null;
  }

  @UsePipes(RecipeValidationPipe)
  @Post('submit')
  async submitForApproval(@Body('recipe') recipe: RecipeDto): Promise<Recipe> {
    return null;
    // return this.recipesService.submitForApproval(recipe);
  }

  @UseGuards(AdminAuthGuard)
  @Delete('delete/:id')
  async deleteRecipe(
    @Param('id', ObjectIdValidationPipe) id: string
  ): Promise<{ message: string }> {
    // return this.recipesService.deleteRecipe(id);
    return null;
  }

  @UseGuards(AdminAuthGuard)
  @Delete('reject/:id')
  async rejectRecipe(
    @Param('id', ObjectIdValidationPipe) id: string
  ): Promise<{ message: string }> {
    // return this.recipesService.rejectRecipe(id);
    return null;
  }

  /* TODO: eventually refactor favorite and rate calls to not just use the body param and
  intelligently add/remove the requesting users value */
  @Post('favorite')
  async favoriteRecipe(
    @Body('_id', ObjectIdValidationPipe) id: string,
    @Body('favoriters', new ParseArrayPipe({ items: String }))
    favoriters: string[]
  ): Promise<Recipe> {
    return this.recipesService.favoriteRecipe(id, favoriters);
  }

  @Post('rate')
  async rateRecipe(
    @Body('_id', ObjectIdValidationPipe) id: string,
    @Body('raters') raters: Map<string, number>
  ): Promise<Recipe> {
    return this.recipesService.rateRecipe(id, raters);
  }
}
