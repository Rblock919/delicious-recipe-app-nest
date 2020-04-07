import { InputType, Field } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

// TODO create validation pipe for this input
@InputType()
export class UserInput {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Field()
  username: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;
}
