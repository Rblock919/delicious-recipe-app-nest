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
import { Raters } from './models/types/raters.model';
import { RecipeInput } from './models/inputs/recipe.input';
import { GqlJwtGuard } from '../auth/guards/gql-jwt.guard';
import { GqlAdminGuard } from '../auth/guards/gql-admin.guard';
import { RecipesService } from './recipes.service';
import { RecipeValidationPipe } from './pipes/recipe-validation.pipe';
import { ObjectIdValidationPipe } from './pipes/object-id-validation.pipe';

@UseGuards(GqlJwtGuard)
@Resolver(of => Recipe)
export class RecipesResolver {
  constructor(private recipesSerivce: RecipesService) {}

  @Query(returns => [Recipe], { name: 'recipes' })
  async getRecipes() {
    return this.recipesSerivce.getRecipes();
  }

  @Query(returns => Recipe, { name: 'recipe' })
  async getRecipe(
    @Args('id', { type: () => ID }, ObjectIdValidationPipe) id: string
  ) {
    return this.recipesSerivce.getRecipe(id);
  }

  @UseGuards(GqlAdminGuard)
  @Query(returns => [Recipe], { name: 'unapprovedRecipes' })
  async getUnapprovedRecipes() {
    return this.recipesSerivce.getApprovalList();
  }

  @UseGuards(GqlAdminGuard)
  @Query(returns => Recipe, { name: 'unapprovedRecipe' })
  async getUnapprovedRecipe(
    @Args('id', { type: () => ID }, ObjectIdValidationPipe) id: string
  ) {
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
  ) {
    const returnMap = new Map<string, number>();
    keys.forEach((key, index) => {
      returnMap.set(key, values[index]);
    });
    return this.recipesSerivce.rateRecipe(id, returnMap);
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
  ) {
    return this.recipesSerivce.favoriteRecipe(id, favoriters);
  }

  @Mutation(returns => String, { name: 'submitForApproval' })
  async submitRecipeForApproval(
    @Args('recipe', RecipeValidationPipe) recipe: RecipeInput
  ) {
    return this.recipesSerivce.submitForApproval(recipe);
  }

  @UseGuards(GqlAdminGuard)
  @Mutation(returns => Recipe, { name: 'update' })
  async updateRecipe(
    @Args('recipe', RecipeValidationPipe) recipe: RecipeInput
  ) {
    return this.recipesSerivce.updateRecipe(recipe);
  }

  @UseGuards(GqlAdminGuard)
  @Mutation(returns => ID, { name: 'add' })
  async addRecipe(
    @Args('approvalId', { type: () => ID }, ObjectIdValidationPipe) id: string,
    @Args('recipe', RecipeValidationPipe) recipeData: RecipeInput
  ) {
    return this.recipesSerivce.addRecipe(id, recipeData);
  }

  @UseGuards(GqlAdminGuard)
  @Mutation(returns => String, { name: 'reject' })
  async rejectRecipe(
    @Args('id', { type: () => ID }, ObjectIdValidationPipe) id: string
  ) {
    return this.recipesSerivce.rejectRecipe(id);
  }

  @UseGuards(GqlAdminGuard)
  @Mutation(returns => String, { name: 'delete' })
  async deleteRecipe(
    @Args('id', { type: () => ID }, ObjectIdValidationPipe) id: string
  ) {
    return this.recipesSerivce.deleteRecipe(id);
  }

  @ResolveField('raters', returns => Raters)
  // eslint-disable-next-line class-methods-use-this
  async deconstructRatersMap(@Parent() recipe: Recipe) {
    // TODO: see if I can use recipe interface instead of model for parent param to avoid this type casting
    const raters = (recipe.raters as any) as Map<string, number>;
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
