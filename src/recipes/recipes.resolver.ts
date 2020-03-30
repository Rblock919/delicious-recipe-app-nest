import {
  Resolver,
  ResolveField,
  Args,
  Query,
  ID,
  Parent,
} from '@nestjs/graphql';

import { Recipe } from './models/recipe.model';
import { Raters } from './models/raters.model';
import { RecipesService } from './recipes.service';

@Resolver(of => Recipe)
export class RecipesResolver {
  constructor(private recipesSerivce: RecipesService) {}

  @Query(returns => [Recipe], { name: 'recipes' })
  async getRecipes() {
    return this.recipesSerivce.getRecipes();
  }

  @Query(returns => Recipe, { name: 'recipe' })
  async getRecipe(@Args('id', { type: () => ID }) id: string) {
    return this.recipesSerivce.getRecipe(id);
  }

  @Query(returns => [Recipe], { name: 'unapprovedRecipes' })
  async getUnapprovedRecipes() {
    return this.recipesSerivce.getApprovalList();
  }

  @Query(returns => Recipe, { name: 'unapprovedRecipe' })
  async getUnapprovedRecipe(@Args('id', { type: () => ID }) id: string) {
    return this.recipesSerivce.getApprovalById(id);
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
