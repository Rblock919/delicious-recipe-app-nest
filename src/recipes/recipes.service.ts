import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Recipe } from './interfaces/recipe.interface';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel('Recipe') private recipeModel: Model<Recipe>,
    @InjectModel('NewRecipe') private newRecipeModel: Model<Recipe>
  ) {}

  async getRecipes(): Promise<Recipe[]> {
    return this.recipeModel.find().exec();
  }

  async getRecipe(id: string): Promise<Recipe> {
    return this.recipeModel.findById(id).exec();
  }

  async getApprovalList(): Promise<Recipe[]> {
    return this.newRecipeModel.find().exec();
  }

  async getApprovalById(id: string): Promise<Recipe> {
    return this.newRecipeModel.findById(id).exec();
  }

  async submitForApproval(recipe: any): Promise<any> {
    // eslint-disable-next-line new-cap
    const newRecipe = new this.newRecipeModel(recipe);
    const returnRecipe = await newRecipe.save();
    if (!returnRecipe) {
      return null;
    }
    return returnRecipe;
  }
}
