import { IsDefined, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class EditUserDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsDefined()
  @IsBoolean()
  isAdmin: boolean;
}
