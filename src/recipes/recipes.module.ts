import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RecipesController } from './recipes.controller';
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
  providers: [RecipesService],
})
export class RecipesModule {}
