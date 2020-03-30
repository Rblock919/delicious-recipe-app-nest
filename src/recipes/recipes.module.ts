import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RecipesController } from './recipes.controller';
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
  controllers: [RecipesController],
  providers: [RecipesService, RecipesResolver],
})
export class RecipesModule {}
