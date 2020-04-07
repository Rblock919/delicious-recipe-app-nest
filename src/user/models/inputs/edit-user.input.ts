import { InputType, Field, ID } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsBoolean } from 'class-validator';

// TODO create validation pipe for this input
@InputType()
export class EditUserInput {
  @IsDefined()
  @IsNotEmpty()
  @Field(type => ID)
  _id: string;

  @IsDefined()
  @IsBoolean()
  @Field()
  isAdmin: boolean;
}
