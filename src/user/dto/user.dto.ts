import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;
}
