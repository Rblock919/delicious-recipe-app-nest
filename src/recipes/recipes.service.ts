import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RecipeDto } from './dto/create-recipe.dto';
import { Recipe } from './interfaces/recipe.interface';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel('Recipe') private recipeModel: Model<Recipe>,
    @InjectModel('NewRecipe') private newRecipeModel: Model<Recipe>
  ) {}

  async getRecipes(): Promise<Recipe[]> {
    const recipes = await this.recipeModel.find().exec();
    if (recipes) {
      return recipes;
    }
    return null;
  }

  async getRecipe(id: string): Promise<Recipe> {
    const recipe = await this.recipeModel.findById(id).exec();
    if (recipe) {
      return recipe;
    }
    return null;
  }

  async getApprovalList(): Promise<Recipe[]> {
    const recipes = await this.newRecipeModel.find().exec();
    if (recipes) {
      return recipes;
    }
    return null;
  }

  async getApprovalById(id: string): Promise<Recipe> {
    const recipe = await this.newRecipeModel.findById(id).exec();
    if (recipe) {
      return recipe;
    }
    return null;
  }

  async updateRecipe(recipe: RecipeDto): Promise<Recipe> {
    const id = recipe._id;
    const updatedRecipe = await this.recipeModel
      .findByIdAndUpdate(id, recipe, { new: true })
      .exec();
    if (updatedRecipe) {
      return updatedRecipe;
    }
    return null;
  }

  async addRecipe(id: string, recipe: RecipeDto): Promise<{ id: string }> {
    const deleteResult = await this.newRecipeModel.findByIdAndDelete(id);
    if (!deleteResult) {
      return null;
    }
    // eslint-disable-next-line new-cap
    const newRecipe = await new this.recipeModel(recipe).save();
    if (!newRecipe) {
      return null;
    }
    return { id: newRecipe._id };
  }

  async submitForApproval(recipe: RecipeDto): Promise<Recipe> {
    // eslint-disable-next-line new-cap
    const newRecipe = new this.newRecipeModel(recipe);
    const returnRecipe = await newRecipe.save();
    if (returnRecipe) {
      return returnRecipe;
    }
    return null;
  }

  async deleteRecipe(id: string): Promise<{ message: string }> {
    const returnResult = await this.recipeModel.findByIdAndDelete(id).exec();
    if (returnResult) {
      return { message: 'Success' };
    }
    return null;
  }

  async rejectRecipe(id: string): Promise<{ message: string }> {
    const returnResult = await this.newRecipeModel.findByIdAndDelete(id).exec();
    if (returnResult) {
      return { message: 'Success' };
    }
    return null;
  }

  async favoriteRecipe(id: string, favoriters: string[]): Promise<Recipe> {
    const updatedData = { favoriters };
    const returnResult = await this.recipeModel
      .findByIdAndUpdate(id, updatedData, { new: true })
      .exec();
    if (returnResult) {
      return returnResult;
    }
    return null;
  }

  async rateRecipe(id: string, raters: Map<string, number>): Promise<Recipe> {
    const updatedData = { raters };
    const returnResult = await this.recipeModel
      .findByIdAndUpdate(id, updatedData, { new: true })
      .exec();
    if (returnResult) {
      return returnResult;
    }
    return null;
  }
}
