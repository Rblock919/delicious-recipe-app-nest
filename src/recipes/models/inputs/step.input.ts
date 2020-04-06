import { InputType, Field } from '@nestjs/graphql';
import { IsDefined, IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class StepInput {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Field()
  body: string;
}
