import { InputType, Field } from '@nestjs/graphql';
import { IsDefined, IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class IngredientInput {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Field()
  amount: string;
}
