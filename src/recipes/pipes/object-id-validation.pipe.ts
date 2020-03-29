import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || this.toValidate(metatype)) {
      return value;
    }
    const { ObjectId } = mongoose.Types;
    if (!ObjectId.isValid(value)) {
      throw new BadRequestException('Value Provided is not a Valid MongoDB Id');
    }
    return value;
  }

  // eslint-disable-next-line class-methods-use-this
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String];
    return !types.includes(metatype);
  }
}
