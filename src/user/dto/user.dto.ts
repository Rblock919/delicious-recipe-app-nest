import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  _id?: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsDefined()
  @IsBoolean()
  isAdmin?: boolean;
}
