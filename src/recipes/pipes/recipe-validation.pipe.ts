import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { RecipeDto } from '../dto/create-recipe.dto';

@Injectable()
export class RecipeValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation Failed');
    }
    return value;
  }

  // eslint-disable-next-line class-methods-use-this
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [RecipeDto];
    return !types.includes(metatype);
  }
}
