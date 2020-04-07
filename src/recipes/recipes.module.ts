import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';
import { RecipeSchema } from './schemas/recipe.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Recipe', schema: RecipeSchema, collection: 'recipes' },
      { name: 'NewRecipe', schema: RecipeSchema, collection: 'approvallists' },
    ]),
  ],
  providers: [RecipesService, RecipesResolver],
  controllers: [],
})
export class RecipesModule {}
