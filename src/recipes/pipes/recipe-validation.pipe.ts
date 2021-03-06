import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { RecipeInput } from '../models/inputs/recipe.input';

@Injectable()
export class RecipeValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Recipe Validation Failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [RecipeInput];
    return !types.includes(metatype);
  }
}
