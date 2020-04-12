import { UseGuards, ParseArrayPipe } from '@nestjs/common';
import {
  Resolver,
  ResolveField,
  Args,
  Query,
  ID,
  Parent,
  Mutation,
  Int,
} from '@nestjs/graphql';

import { Recipe } from './models/types/recipe.model';
import { Recipe as IRecipe } from './interfaces/recipe.interface';
import { Raters } from './models/types/raters.model';
import { RecipeProducer } from './enums/recipe-producer.enum';
import { RecipeInput } from './models/inputs/recipe.input';
import { GqlJwtGuard } from '../auth/guards/gql-jwt.guard';
import { GqlAdminGuard } from '../auth/guards/gql-admin.guard';
import { RecipesService } from './recipes.service';
import { RecipeValidationPipe } from './pipes/recipe-validation.pipe';
import { ObjectIdValidationPipe } from './pipes/object-id-validation.pipe';

// TODO: generate spec files for all resolvers

@UseGuards(GqlJwtGuard)
@Resolver(of => Recipe)
export class RecipesResolver {
  constructor(private recipesSerivce: RecipesService) {}

  @Query(returns => [Recipe], { name: 'recipes' })
  async getRecipes(): Promise<IRecipe[]> {
    return this.recipesSerivce.getRecipes();
  }

  @Query(returns => Recipe, { name: 'recipe' })
  async getRecipe(
    @Args('id', { type: () => ID }, ObjectIdValidationPipe) id: string
  ): Promise<IRecipe> {
    return this.recipesSerivce.getRecipe(id);
  }

  @UseGuards(GqlAdminGuard)
  @Query(returns => [Recipe], { name: 'unapprovedRecipes' })
  async getUnapprovedRecipes(): Promise<IRecipe[]> {
    return this.recipesSerivce.getApprovalList();
  }

  @UseGuards(GqlAdminGuard)
  @Query(returns => Recipe, { name: 'unapprovedRecipe' })
  async getUnapprovedRecipe(
    @Args('id', { type: () => ID }, ObjectIdValidationPipe) id: string
  ): Promise<IRecipe> {
    return this.recipesSerivce.getApprovalById(id);
  }

  @Mutation(returns => Recipe, { name: 'rate' })
  async rateRecipe(
    @Args('id', { type: () => ID }, ObjectIdValidationPipe) id: string,
    @Args(
      'ratersKeys',
      { type: () => [String] },
      new ParseArrayPipe({ items: ObjectIdValidationPipe })
    )
    keys: string[],
    @Args(
      'ratersValues',
      { type: () => [Int] },
      new ParseArrayPipe({ items: Number })
    )
    values: number[]
  ): Promise<IRecipe> {
    const newMap = new Map<string, number>();
    keys.forEach((key, index) => {
      newMap.set(key, values[index]);
    });
    return this.recipesSerivce.rateRecipe(id, newMap);
  }

  @Mutation(returns => Recipe, { name: 'favorite' })
  async favoriteRecipe(
    @Args('id', { type: () => ID }, ObjectIdValidationPipe) id: string,
    @Args(
      'favoriters',
      { type: () => [String] },
      new ParseArrayPipe({ items: ObjectIdValidationPipe })
    )
    favoriters: string[]
  ): Promise<IRecipe> {
    return this.recipesSerivce.favoriteRecipe(id, favoriters);
  }

  @Mutation(returns => String, { name: 'submitForApproval' })
  async submitRecipeForApproval(
    @Args('recipe', RecipeValidationPipe) recipe: RecipeInput
  ): Promise<string> {
    return this.recipesSerivce.submitForApproval(recipe);
  }

  @UseGuards(GqlAdminGuard)
  @Mutation(returns => Recipe, { name: 'update' })
  async updateRecipe(
    @Args('recipe', RecipeValidationPipe) recipe: RecipeInput
  ): Promise<IRecipe> {
    return this.recipesSerivce.updateRecipe(recipe);
  }

  @UseGuards(GqlAdminGuard)
  @Mutation(returns => ID, { name: 'add' })
  async addRecipe(
    @Args('approvalId', { type: () => ID }, ObjectIdValidationPipe) id: string,
    @Args('recipe', RecipeValidationPipe) recipeData: RecipeInput
  ): Promise<string> {
    return this.recipesSerivce.addRecipe(id, recipeData);
  }

  @UseGuards(GqlAdminGuard)
  @Mutation(returns => String, { name: 'reject' })
  async rejectRecipe(
    @Args('id', { type: () => ID }, ObjectIdValidationPipe) id: string
  ): Promise<string> {
    return this.recipesSerivce.rejectRecipe(id);
  }

  @UseGuards(GqlAdminGuard)
  @Mutation(returns => String, { name: 'delete' })
  async deleteRecipe(
    @Args('id', { type: () => ID }, ObjectIdValidationPipe) id: string
  ): Promise<string> {
    return this.recipesSerivce.deleteRecipe(id);
  }

  // This is to return 'Blue Apron' instead of 'BLUE_APRON' back to the client for example
  @ResolveField('producer', returns => String)
  formatProducer(@Parent() recipe: IRecipe): RecipeProducer {
    return recipe.producer;
  }

  @ResolveField('raters', returns => Raters)
  deconstructRatersMap(@Parent() recipe: IRecipe): Raters {
    const { raters } = recipe;
    const ratersIds = [] as string[];
    const ratersValues = [] as number[];
    Array.from(raters.keys()).forEach(key => {
      ratersIds.push(key as string);
    });
    Array.from(raters.values()).forEach(value => {
      ratersValues.push(value as number);
    });
    return {
      keys: ratersIds,
      values: ratersValues,
    };
  }
}
