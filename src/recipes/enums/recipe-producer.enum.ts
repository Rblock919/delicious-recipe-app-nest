import { registerEnumType } from '@nestjs/graphql';

export enum RecipeProducer {
  HELLO_FRESH = 'Hello Fresh',
  HOME_CHEF = 'Home Chef',
  BLUE_APRON = 'Blue Apron',
}

registerEnumType(RecipeProducer, {
  name: 'RecipeProducer',
});
